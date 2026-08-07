import { NextResponse, type NextRequest } from "next/server";

/**
 * English is served from the root (`/road-tests`) so the legacy site's URLs keep
 * their search rankings, while the App Router still sees a `[lang]` segment.
 * Anything that is not already under `/es` is rewritten to `/en/...`.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Everything except Next internals, the API, and files with an extension
     * (images, video, sitemap.xml, robots.txt, favicons…).
     */
    "/((?!_next/static|_next/image|api/|.*\\.[\\w]+$).*)",
  ],
};
