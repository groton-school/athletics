import { getAthleticEvents } from '@/actions/getAthleticEvents';
import { currentAcademicYear } from '@/lib/currentAcademicYear';
import { toISODateTime } from '@/lib/toISODateTime';
import { getReport } from '@groton/report-actions';
import { DateTime, Interval } from 'luxon';
import { NextResponse } from 'next/server';
import RSS from 'rss';

/*
 * TODO investigate Next.js caching of RSS feed
 Issue URL: https://github.com/groton-school/veracross-athletic-feeds/issues/2
 *   Naive use failed compilation, likely due to cache data serialization.
 */

const CACHE_LIFETIME = 15; // minutes

let timestamp = DateTime.now();
let cached: string | undefined = undefined;

export async function GET() {
  if (
    !cached ||
    Interval.fromDateTimes(timestamp, DateTime.now()).length('minutes') >
      CACHE_LIFETIME
  ) {
    const feed = new RSS({
      title: 'Athletic Scores',
      feed_url: `${process.env.PUBLIC_URL}/feed/rss`,
      site_url: 'https://www.groton.org/athletics',
      language: 'en',
      pubDate: new Date(),
      ttl: 60
    });
    (
      await Promise.all(
        (await getAthleticEvents(currentAcademicYear()))
          .filter((event) => event.game_score_us !== null)
          .map(getReport)
      )
    ).forEach(async (report) =>
      feed.item({
        date: toISODateTime(report.event.start_date, report.event.start_time),
        url: 'https://www.groton.org/athletics',
        categories: [report.event.game_outcome_description],
        title: report.title,
        description: report.outcome || ''
      })
    );

    cached = feed.xml();
    timestamp = DateTime.now();
  }
  return new NextResponse(new Blob([cached], { type: 'application/rss+xml' }));
}
