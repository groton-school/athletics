import { getAthleticEvents } from '@/actions/getAthleticEvents';
import { toGameReport } from '@/actions/toGameReport';
import { currentAcademicYear } from '@/lib/currentAcademicYear';
import { toISODateTime } from '@/lib/toISODateTime';
import ics from 'ics';
import { DateTime, Interval } from 'luxon';
import { NextResponse } from 'next/server';

/*
 * TODO investigate Next.js caching of ICS feed
 Issue URL: https://github.com/groton-school/veracross-athletic-feeds/issues/1
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
    const { error, value } = ics.createEvents(
      (
        await Promise.all(
          (await getAthleticEvents(currentAcademicYear())).map(toGameReport)
        )
      ).map((report) => ({
        title: `${report.title}${report.outcome ? ` (${report.event.game_outcome_description}: ${report.outcome})` : ''}`,
        start: toISODateTime(report.event.start_date, report.event.start_time),
        end: toISODateTime(report.event.end_date, report.event.end_time),
        description:
          report.summary ||
          report.event.google_map
            ?.replaceAll(/(\r|\n)+/g, ', ')
            .replaceAll(/\s+/g, '+') ||
          '',
        location:
          report.event.event_type_id === 1
            ? 'Groton School, 282 Farmers Row, Groton, MA 01450'
            : `${report.event.destination_organization}${
                report.event.google_map
                  ? `\n${report.event.google_map.replace(
                      /http:\/\/maps\.google\.com\/maps?q=(.*)&hl=en/,
                      '$1'
                    )}`
                  : ''
              }`
      })),
      { calName: 'Athletic Events' }
    );
    if (error) {
      return NextResponse.json(error, { status: 500 });
    }
    if (value) {
      cached = value;
      timestamp = DateTime.now();
    } else {
      throw new Error('No calendar data rendered');
    }
  }
  return new NextResponse(new Blob([cached], { type: 'text/calendar' }));
}
