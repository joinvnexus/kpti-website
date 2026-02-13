import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin-login",
  },
});

// Protect admin routes
// Note: Route groups like (admin) are not part of the URL,
// so we protect the concrete paths instead.
export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
