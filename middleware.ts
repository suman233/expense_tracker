import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
// If the incoming request has the "token" cookie
export function middleware(request: NextRequest) {
  const has_token = request.cookies.get(
    process.env.NEXT_APP_TOKEN_NAME!!
  )?.name

  if (has_token === undefined || has_token === null) {
    console.log('token', has_token);
    
    request.nextUrl.pathname = "/auth/login";
    return NextResponse.redirect(request.nextUrl);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/expense"]
};
// import { type NextRequest } from 'next/server'
// import { updateSession } from 'utils/supabase/middleware'

// export async function middleware(request: NextRequest) {
//   return await updateSession(request)
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     // '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//     "/expense",
//   ],
// }