import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}