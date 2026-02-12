import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin-login",
  },
});

// Route groups like (admin) are not part of the URL,
// so we protect the concrete paths instead.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admissions/:path*",
    "/notices/:path*",
    "/courses/:path*",
    "/gallery/:path*",
    "/settings/:path*",
  ],
};
