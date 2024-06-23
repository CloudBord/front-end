import { redirect } from "next/dist/server/api-utils";
import { auth } from "./auth";
import { signIn } from "next-auth/react";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}