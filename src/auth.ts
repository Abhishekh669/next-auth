import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./lib/connectDB";
import {compare} from "bcryptjs";
import { User } from "./models/user.model";
export const BASE_PATH = "/api/auth";
const credentialsConfig = CredentialsProvider({
  name: "credentials",
  credentials: {
    email: {
      label: "Email",
      type: "text",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },
  async authorize(credentials) {
    try {
      if (!credentials) {
        throw new Error("Please enter username and password");
      }
      console.log("this is the credentials", credentials);
      await connectDB();
      const user = await User.findOne({ email: credentials.email });
      if (!user) {
        throw new Error("Invalid Credentails");
      }
      console.log("this is the user",user)
      const isMatch = await compare(credentials.password as string, user.password);
      console.log("this is matched", isMatch);
      if (isMatch) {
        return user;
      }
      // throw new Error("Invalid credentials");
      return null;
      
    } catch (error) {
      console.log("this is the error try ");
      throw new Error("Invalid Credentails");
    }
  },
});

export const config = {
  providers: [credentialsConfig],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  basePath: BASE_PATH,
  callbacks: {
    authorized({ auth }) {
      console.log("this is the auth in the auth", auth);
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // session.user._id = token._id;
        session.user._id = token._id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
