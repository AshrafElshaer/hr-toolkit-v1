import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "./env.mjs";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  let res = NextResponse.next({
    request: req,
    headers: {
      ...req.headers,
      "x-pathname": req.nextUrl.pathname,
    },
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const c of cookiesToSet) {
            req.cookies.set(c);
          }

          res = NextResponse.next({ request: req });
          for (const c of cookiesToSet) {
            res.cookies.set(c);
          }
        },
      },
    },
  );

  if (!req.nextUrl.pathname.startsWith("/auth")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      const url = req.nextUrl.clone();

      return NextResponse.redirect(new URL("/auth", url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/auth",
  ],
};
