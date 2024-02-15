import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import db from "@/libs/db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email || credentials?.password) {
          throw new Error("Invaid credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invaid credentials");
        }

        const isPasswordCorrect = await bcrypt.compare(
          user.hashedPassword,
          credentials?.password!
        );

        if (!isPasswordCorrect) {
          throw new Error("Invaid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };