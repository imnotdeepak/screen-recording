import { NextRequest, NextResponse } from "next/server";
import aj, { createMiddleware, detectBot, shield } from "./lib/arcjet";

export async function middleware(request: NextRequest) {
  // Allow public access to video pages and the main page
  const isPublicRoute =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/video/");

  // Skip auth check for public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, we'll rely on the auth check in the individual pages
  // This avoids the Edge Runtime compatibility issue with better-auth
  // The pages will handle their own auth and redirect if needed
  return NextResponse.next();
}
const validate = aj
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "G00G1E_CRAWLER"],
    })
  );

export default createMiddleware(validate);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in|assets).*)"],
};
