import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { ObjectId } from 'mongodb';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  database: process.env.MONGODB_URI,

  callbacks: {
    session(session, user) {
      if (user.id != null) {
        session.userId = user.id as ObjectId;
      }

      return session;
    },
  },
});
