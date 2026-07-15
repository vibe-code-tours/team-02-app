import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Server-side Auth0 client - reads config from env vars automatically
export const auth0 = new Auth0Client();
