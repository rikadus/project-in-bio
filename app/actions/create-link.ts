// app/actions/create-link.ts
"use server"

import { Timestamp } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/auth";

/**
 * Cria um novo link/perfil para o usuário atual.
 * @param link - Slug/caminho personalizado para o link (usado como ID do documento).
 * @returns true se criado com sucesso, false caso contrário.
 */
export async function createLink(link: string) {
 //return false;

  const session = await auth();

  if (!session?.user?.id) return;

  try {

    await db.collection("profiles").doc(link).set({
      userId: session?.user?.id,
      totalVisits: 0,
      createdAt: Timestamp.now().toMillis()
    });
    return true;
} catch (error) {    
    return false;
}    
}