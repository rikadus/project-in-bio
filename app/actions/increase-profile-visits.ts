// app/actions/increase-profile-visits.ts
"use server"

import { db } from "@/app/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Incrementa o contador de visitas de um perfil atomicamente.
 * Usa transação do Firebase para garantir consistência.
 * @param profileId - ID do perfil a ser incrementado.
 */
export async function increaseProfileVisits(profileId: string){
  const profileRef = db.collection("profiles").doc(profileId);

  await db.runTransaction(async (transaction) => {
    const profile = await transaction.get(profileRef);

    if (!profile.exists) return;

    transaction.update(profileRef, {
      totalVisits: FieldValue.increment(1),
    })
  });

}