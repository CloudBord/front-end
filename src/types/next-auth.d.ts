import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    idToken: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: number | undefined;
    user: {
      email: string;
      id: string;
    }
    error?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      preferredUsername: string;
      givenName: string;
      email: string;
      id: string;
    }
    accessToken?: string;
    error?: string;
    idToken: string;
    refreshToken: string;
  }

   interface User {
    sub: string;
    email_verified: boolean;
    name: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email: string;
    id: string;
  }

  interface Account {
    provider: string;
    type: ProviderType;
    id: string;
    access_token: string;
    refresh_token: string;
    idToken: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    id_token: string;
    "not-before-policy": number;
    session_state: string;
    scope: string;
  }
}