import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./firebase"; // Importamos o db que já está inicializado

export const { handlers, signIn, signOut, auth } = NextAuth({
  // AQUI É A MUDANÇA:
  // Em vez de passar configuração de credencial, passamos a instância do banco direta.
  adapter: FirestoreAdapter(db), 
  
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});