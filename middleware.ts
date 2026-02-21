import NextAuth from "next-auth";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { authConfig } from "./lib/auth.config";

const intlMiddleware = createIntlMiddleware(routing);

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // Run next-intl middleware for locale routing
  return intlMiddleware(req as unknown as NextRequest);
});

export const config = {
  matcher: ["/", "/(de|en)/:path*"],
};
