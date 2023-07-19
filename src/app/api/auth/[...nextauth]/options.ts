import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
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
            // toast.success("Login successful!");
            return foundUser; // Return the user data
          } else {
            // toast.error("Invalid password.");
            return null;
          }
        } else {
          // toast.error("User not found");
          return null;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_Secret as string,
    }),
  ],
};
