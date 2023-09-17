import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { USER_COOKIE_KEY } from './hooks/useUser';

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get(USER_COOKIE_KEY)?.value;
    const pathname = request.nextUrl.pathname;

    if (!currentUser && pathname !== '/signin' && pathname !== '/password-reset') {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        // '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/((?!api|_next/static|_next/image|favicon.ico|assets/images).*)',
    ],
};
