// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    const host = req.headers.get('host')
    if (host?.slice(0, 4) !== 'www.' && !host?.includes('localhost')) {
        return NextResponse.redirect(`https://www.${host}${req.nextUrl.pathname}`, 301);
    }
}