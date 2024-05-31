declare namespace NodeJS{
    export interface ProcessEnv {
        AUTH_URL: string
        AUTH_SECRET: string
        KEYCLOAK_CLIENT_ID: string
        KEYCLOAK_CLIENT_SECRET: string
        KEYCLOAK_ISSUER: string
        KEYCLOAK_END_SESSION_ENDPOINT: string
    }
}