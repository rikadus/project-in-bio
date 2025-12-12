// app/actions/verify-link.ts

"use server"
import { db } from "../lib/firebase"

/**
 * Verifica se um link (slug de perfil) já existe no banco de dados.
 * @param link - O link a ser verificado.
 * @returns true se existe, false se não.
 */
export async function verifyLink(link: string) {
    const snapshot = await db.collection("profiles").doc(link).get();
    return snapshot.exists;
}
