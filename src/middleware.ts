import { NextRequest, NextResponse } from 'next/server';
import { APP_ROUTES } from './constants/app-routes';

const redirect = (request: NextRequest, url: string) => {
  const redirectUrl = new URL(url, request.nextUrl.origin);
  return NextResponse.redirect(redirectUrl.toString());
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("bearer");

  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  } else if (pathname === APP_ROUTES.LOGIN && token) {
    return redirect(request, APP_ROUTES.HOME);  
  } else if (!token && pathname.includes(APP_ROUTES.HOME)) {
    return redirect(request, APP_ROUTES.LOGIN);  
  }

  return NextResponse.next();
}
