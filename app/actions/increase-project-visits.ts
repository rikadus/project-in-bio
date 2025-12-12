// app/actions/increase-project-visits.ts
"use server"

import { db } from "@/app/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Incrementa o visualizações de um projeto específico.
 * Usa transação para garantir atomicidade.
 * @param profileId - ID do perfil dono do projeto.
 * @param projectId - ID do projeto a ser incrementado.
 */
export async function increaseProjectVisits(profileId: string, projectId: string){
  const projectRef = db
  .collection("profiles")
  .doc(profileId)
  .collection("projects")
  .doc(projectId);

  await db.runTransaction(async (transaction) => {
    const projectDoc = await transaction.get(projectRef);

    if (!projectDoc.exists) return;

    transaction.update(projectRef, {
      totalVisits: FieldValue.increment(1),
    })
  });

}