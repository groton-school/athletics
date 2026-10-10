import { getAthleticEvents } from '@/actions/getAthleticEvents';
import { toGameReport } from '@/actions/toGameReport';
import { currentAcademicYear } from '@/lib/currentAcademicYear';
import { toISODateTime } from '@/lib/toISODateTime';
import { DateTime, Interval } from 'luxon';
import { NextResponse } from 'next/server';
import RSS from 'rss';

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
      feed_url: 'https://athletics.groton.org/feed/rss',
      site_url: 'https://www.groton.org/athletics',
      language: 'en',
      pubDate: new Date(),
      ttl: 60
    });
    (
      await Promise.all(
        (await getAthleticEvents(currentAcademicYear()))
          .filter((event) => event.game_score_us !== null)
          .map(toGameReport)
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
