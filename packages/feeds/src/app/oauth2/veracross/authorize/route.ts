import { Veracross } from '@/lib/Veracross';
import { NextResponse } from 'next/server';

export async function GET() {
  // TODO pop out auth into new window
  // Issue URL: https://github.com/groton-school/athletics/issues/3
  return NextResponse.redirect(await Veracross.OAuth.authorizationURL());
}
