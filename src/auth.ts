import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";

const params = {
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    issuer: process.env.KEYCLOAK_ISSUER,
    wellKnown: `${process.env.KEYCLOAK_ISSUER}/.well-known/openid-configuration`
}

function refreshAccessToken(refreshToken: string){
    return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            client_id: params.clientId,
            client_secret: params.clientSecret,
            "grant_type": "refresh_token",
            refresh_token: refreshToken
        }),
        method: "POST"
    });
}

export const { auth, handlers: { GET, POST } , signIn, signOut } = NextAuth({
    providers: [KeycloakProvider({
        ...params
    })],
    trustHost: true,
    session: {
        strategy: "jwt",
        maxAge: 60 * 30
    },
    pages: {

    },
    callbacks: {
        async session({ session, token }){
            session.token = {
                accessToken: token.accessToken as unknown as string,
                refreshToken: token.refreshToken as unknown as string,
                idToken: token.idToken as unknown as string
            };
            return session;
        },
        async jwt({ token, user, account }) {
            if(account){
                token.idToken = account.id_token;
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
                token.user = user;
                return token;
            }
            if(Date.now() < (token.exp!)){
                return token;
            }
            try{
                const response = await refreshAccessToken(token.refreshToken!);
                if(!response.ok) throw new Error();
                const newToken = await response.json();
                const updatedToken: JWT = {
                    ...token,
                    idToken: newToken.id_token,
                    accessToken: newToken.access_token,
                    expiresAt: newToken.expires_at
                }
                return updatedToken;
            }
            catch(error){
                return { ...token, error: "RefreshAccessTokenError" }
            };
        }
    }
})