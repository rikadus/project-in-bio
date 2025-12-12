// app/actions/create-social-links.ts
"use server";

import { Timestamp } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import { auth } from "@/app/lib/auth";

/**
 * Cria ou atualiza links de redes sociais para um perfil.
 * @param params - Objeto contendo profileId e URLs das redes sociais.
 * @returns true se sucesso, false caso contrário ou se usuário não autenticado.
 */
export async function createSocialLinks ({
  profileId,
  github,
  linkedin,
  instagram,
  twitter,
}: {
  profileId: string;
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
}) {
  const session = await auth();

  if (!session) return;

  try {
    await db.collection("profiles").doc(profileId).update({
      socialMedias: {
        github,
        linkedin,
        instagram,
        twitter,
      },
      updatedAt: Timestamp.now().toMillis(),
      
    });
    return true
  } catch (error) {
   
    return false
  }
}

