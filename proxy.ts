import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  // const host = req.headers.get('host')
  // if (!host?.includes('localhost')) {
  //     return NextResponse.redirect(`https://${host}${req.nextUrl.pathname}`, 301);
  // }
}
