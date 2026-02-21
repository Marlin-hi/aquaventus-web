import type { NextAuthConfig } from "next-auth";

// Minimal auth config for middleware (no Prisma, no Node.js modules)
// The actual Credentials provider with DB lookup is in auth.ts
export const authConfig: NextAuthConfig = {
  providers: [], // Providers are added in auth.ts
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      const pathWithoutLocale = pathname.replace(/^\/(de|en)/, "");

      // Protect /mitglieder and /admin routes
      if (pathWithoutLocale.startsWith("/mitglieder") || pathWithoutLocale.startsWith("/admin")) {
        if (!isLoggedIn) return false; // Redirect to signIn page
        // Admin routes require ADMIN role
        if (pathWithoutLocale.startsWith("/admin") && auth?.user && (auth.user as { role?: string }).role !== "ADMIN") {
          return Response.redirect(new URL(`/${nextUrl.pathname.match(/^\/(de|en)/)?.[1] || "de"}/mitglieder`, nextUrl));
        }
      }

      return true;
    },
  },
};
