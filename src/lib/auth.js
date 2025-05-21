import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/lib/db';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
            });
            if (!newUser) {
              console.error('Failed to create new user');
              return false;
            }
          }
          return true;
        } catch (error) {
          console.error('Error during sign in:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      try {
        await connectDB();
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = user._id.toString();
        }
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXT_AUTH_SECRET,
}; 