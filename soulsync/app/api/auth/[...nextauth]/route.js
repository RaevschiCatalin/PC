import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { config } from 'dotenv';
config({ path: '../../../../.env' });

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId:  process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
        ],
    async session({session}) {
        return session;
    },
    async signIn({profile}) {
        try{

        }catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
});

export { handler as GET, handler as POST }