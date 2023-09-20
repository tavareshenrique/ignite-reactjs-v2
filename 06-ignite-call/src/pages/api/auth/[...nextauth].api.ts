import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
  throw new Error('Missing Google ENV Variables');

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        return '/register/connect-calendar/?error=permissions';
      }

      return true;
    },
  },
};

export default NextAuth(authOptions);
