declare namespace NodeJS{
    export interface ProcessEnv {
        API_URL: string
        NEXT_PUBLIC_SOCKET_URL: string
        AUTH_URL: string
        AUTH_URL_INTERNAL: string
        AUTH_SECRET: string
        AUTH_SIGNOUT_URL: string
        KEYCLOAK_CLIENT_ID: string
        KEYCLOAK_CLIENT_SECRET: string
        KEYCLOAK_ISSUER: string
        KEYCLOAK_ISSUER_INTERNAL: string;
        KEYCLOAK_END_SESSION_ENDPOINT: string
    }
}