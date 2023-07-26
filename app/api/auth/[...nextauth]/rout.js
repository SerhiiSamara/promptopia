import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const { GOOGLE_ID, GOOGLE_CLIENT_SECRET } = process.env;

console.log({
  clientId: GOOGLE_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    session.user.id = sessionUser._id.toString();
    return session;
  },
  async signIn({ profile }) {
    try {
      await connectToDB();

      const userExists = await User.findOne({
        email: profile.email,
      });

      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  },
});

export { handler as GET, handler as POST };
