import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    idToken: string | undefined
    accessToken: string | undefined
    refreshToken: string | undefined
    expiresAt: number | undefined
    error?: string
  }
}

declare module "next-auth" {
  interface Session {
    token: JWT;
    error?: string;
  }
}

// interface Token {
//   accessToken: string;
//   refreshToken: string;
//   idToken: string;
// }