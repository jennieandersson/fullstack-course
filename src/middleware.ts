import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here
    return
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - signin (sign in page)
     * - register (register page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|signin|register).*)',
  ],
}
