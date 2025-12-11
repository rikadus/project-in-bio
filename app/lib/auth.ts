import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./firebase"; // Importamos o db que já está inicializado
import { Timestamp } from "firebase-admin/firestore";
import { TRIAL_DAYS } from  "@/app/lib/config";
import { DefaultSession } from "next-auth";
import type { Adapter } from "next-auth/adapters";



declare module "next-auth" {
  interface Session {
    user: {
     createdAt: number;
      isTrial: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    createdAt: number;
    isTrial?: boolean;
    isSubscribed?: boolean;
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  // AQUI É A MUDANÇA:
  // Em vez de passar configuração de credencial, passamos a instância do banco direta.
  adapter: FirestoreAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  events:{
    createUser: async ({user}) => {
      if (!user.id) return;

      await db.collection("users").doc(user.id).update({
        createdAt: Timestamp.now().toMillis(),
      });
      
    },   
    
  },
  callbacks:{  
    session:({session, user}) => {
      return {
        ...session,
        user:{
          ...session.user,
          isTrial: 
          new Date(user.createdAt).getTime()>        
          new Date().getTime() - 1000 * 60 * 60 * 24 * TRIAL_DAYS || false,
        }
      }
    }
  }
});