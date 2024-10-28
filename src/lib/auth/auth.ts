import { fetchGetRequest, fetchPostRequest } from "@utils/fetchRequest";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import { getUser } from "../data/auth.data";
import { authConfig } from "./auth.config";

const login = async (credentials: any) => {
  const email = credentials.email;
  const password = credentials.password;

  const url = `${process.env.SERVER}/auth/login`;
  const data = {
    email,
    password,
  };

  try {
    const response = await fetchPostRequest({ url, data });
    if (response?.data?.statusCode === 500) throw new Error("User not found!");

    const user = response?.data;
    return user;
  } catch (error) {
    if (error instanceof Error) throw new Error(`Failed to login! ${error}`);
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          if (error instanceof Error) return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account.provider === "google") {
        const { picture } = profile;
        try {
          const url = `${process.env.SERVER}/auth/user/${profile.email}`;
          const response = await fetchGetRequest({ url });
          const fetchedUser = response?.statusCode === 500 ? null : response;
          console.log(fetchedUser);

          if (fetchedUser) {
            user.id = fetchedUser.id;
            user.phone = fetchedUser.phone;
            user.roles = fetchedUser.roles;
            user.google = fetchedUser.google;
            user.shoppingCart = fetchedUser.shoppingCart;
            user.status = fetchedUser.status;
          } else {
            let backUpLastName = " ";
            const email = profile.email;
            const [name, lastName] = profile.name.split(" ");
            if (lastName) backUpLastName = lastName;

            const url = `${process.env.SERVER}/auth/signup/google`;
            const data = {
              name,
              lastName: backUpLastName,
              email,
            };

            await fetchPostRequest({ url, data })
              .catch((error) => {
                if (
                  error?.response?.data?.message?.includes(
                    "user entities failed 'create' check, result is not allowed to be read back",
                  )
                )
                  return true;
              })
              .finally(async () => {
                const createdUser = await getUser(email);
                user.id = createdUser.id;
                user.roles = createdUser.roles;
                user.image = picture;
                user.google = createdUser.google;
                user.shoppingCart = createdUser.shoppingCart;
                user.status = createdUser.status;
              });
          }
        } catch (error: any) {
          if (
            error?.response?.data?.message?.includes(
              "user entities failed 'create' check, result is not allowed to be read back",
            )
          ) {
            return true;
          }
          //console.error(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
  pages: {
    signOut: "/login",
  },
});
