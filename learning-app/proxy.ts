import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseDay } from "@/lib/parse-day";

/**
 * Real 404s for invalid days.
 *
 * With Cache Components, a page that calls notFound() after streaming has started
 * still answers HTTP 200 (documented behavior). Rejecting bad days here, before any
 * rendering, returns a true 404 with the normal not-found page. The page itself still
 * validates too (defense in depth), so it stays correct if this file is removed.
 */
export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.split("/")[2] ?? "";
  let decoded: string;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    decoded = ""; // malformed %-encoding is never a valid day
  }
  if (parseDay(decoded) === null) {
    // A path that matches no route: Next.js answers with its 404 page and status 404.
    return NextResponse.rewrite(new URL("/_invalid-day", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/tutorial/:day",
};
