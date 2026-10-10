import { getAthleticEvents } from '@/actions/getAthleticEvents';
import { toGameReport } from '@/actions/toGameReport';
import { currentAcademicYear } from '@/lib/currentAcademicYear';
import { toISODateTime } from '@/lib/toISODateTime';
import ics from 'ics';
import { NextResponse } from 'next/server';

export async function GET() {
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
        report.event.google_map?.replaceAll(/(\r|\n|\s)+/g, '+') ||
        '',
      location:
        report.event.event_type_id === 1
          ? 'Groton School, 282 Farmers Row, Groton, MA 01450'
          : `${report.event.destination_organization}${
              report.event.google_map
                ? `, ${report.event.google_map.replace(
                    'http://maps.google.com/maps?q=',
                    ''
                  )}`
                : ''
            }`
    })),
    { calName: 'Athletic Events' }
  );
  return error
    ? NextResponse.json(error, { status: 500 })
    : new NextResponse(new Blob([value!], { type: 'text/calendar' }));
}
