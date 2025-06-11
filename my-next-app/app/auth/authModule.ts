declare module "next-auth" {
  interface Session {
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
  }
}

export type { Session } from "next-auth";
export type { JWT } from "next-auth/jwt";
