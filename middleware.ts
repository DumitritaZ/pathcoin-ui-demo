// web/middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PROTECT = process.env.DEMO_PROTECT === "1";
const USER = process.env.DEMO_USER || "demo";
const PASS = process.env.DEMO_PASS || "pathcoin";

// Lasă acces pentru resurse publice
const PUBLIC_PATHS = [
  "/_next",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/manifest.webmanifest",
  "/robots.txt",
];

export function middleware(req: NextRequest) {
  if (!PROTECT) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // permite acces la assets
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // verifică Basic Auth
  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic") {
      const [u, p] = Buffer.from(encoded, "base64").toString().split(":");
      if (u === USER && p === PASS) return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="PathCoin Demo"' },
  });
}

export const config = {
  matcher: ["/((?!api/health).*)"], 
};
