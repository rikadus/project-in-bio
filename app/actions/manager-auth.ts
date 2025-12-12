// app/actions/manager-auth.ts

"use server"

import { auth, signIn, signOut } from "@/app/lib/auth";

/**
 * Gerencia a autenticação do usuário (Login/Logout).
 * Se não tiver sessão, redireciona para login Google.
 * Se tiver sessão, faz logout.
 */
export async function manageAuth() {
  const session = await auth();

  if (!session) {
    return await signIn("google",{
      redirectTo: "/criar",
    });
  }

  return signOut({
    redirectTo: "/",
  });
  
}

