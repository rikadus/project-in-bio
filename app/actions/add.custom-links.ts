// app/actions/add.custom-links.ts
"use server"
import { auth } from "firebase-admin";
import { db } from "../lib/firebase";

export type Link = {
    title: string;
    url: string;
}

/**
 * Atualiza os links personalizados de um perfil.
 * @param link1 - Primeiro link personalizado.
 * @param link2 - Segundo link personalizado.
 * @param link3 - Terceiro link personalizado.
 * @param profileId - ID do documento do perfil.
 */
export default async function addCustomLinks({
  link1,
  link2,
  link3,
  profileId
}: {
    link1 : Link;
    link2 : Link;
    link3 : Link;
    profileId: string;
}) {
   const session = await auth();
  
    if (!session) return;
    try {
      await db.collection("profiles").doc(profileId).update({
        link1,
        link2,
        link3,

      });
    } catch (error) {
      console.error(error);
    }
}