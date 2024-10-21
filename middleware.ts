// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    // const host = req.headers.get('host')
    // if (!host?.includes('localhost')) {
    //     return NextResponse.redirect(`https://${host}${req.nextUrl.pathname}`, 301);
    // }
}