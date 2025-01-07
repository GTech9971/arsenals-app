import { env } from "./config/env";

const issuer = env.OKTA_ISSUER;
const clientId = env.OKTA_CLIENTID;
const redirectUri = env.OKTA_REDIRECTURI;

export interface OktaConfig {
    issuer: string;
    clientId: string;
    redirectUri: string;
    scopes: string[];
    pkce: boolean
}

export const oktaConfig: OktaConfig = {
    issuer: issuer,
    clientId: clientId,
    redirectUri: redirectUri,
    scopes: ['openid', 'profile', 'email'],
    pkce: true
}