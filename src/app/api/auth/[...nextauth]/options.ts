import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import { toast } from "react-toastify";
const getUserData = async () => {
  const res = await fetch(
    "https://zulker-nien.github.io/demo-json-data/db.json"
  );
  return res.json();
};
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const userData = await getUserData();
        const { user } = userData;
        console.log(user);

        const foundUser = user.find((u: any) => u.email === credentials?.email);

        if (foundUser) {
          if (foundUser.password === credentials?.password) {
            return foundUser;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GitHubProvider({
      profile(profile: GithubProfile) {
        // console.log(profile)
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
          img: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_Secret as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
