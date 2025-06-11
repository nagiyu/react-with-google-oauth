import NextAuth from "next-auth";
import { authOptions } from "@/app/config/authOptions";

declare module "next-auth" {
  interface Session {
    token?: string; // token プロパティをオプショナルに変更
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
