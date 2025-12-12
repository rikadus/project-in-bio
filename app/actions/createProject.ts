// app/actions/createProject.ts
"use server";

import { Timestamp } from "firebase-admin/firestore";
import { db, storage } from "@/app/lib/firebase"; // Certifique-se que exporta 'storage' de lá
import { auth } from "@/app/lib/auth"; // Import correto do Auth.js
import { randomUUID } from "crypto";

/**
 * Cria um novo projeto associado a um perfil, com upload de imagem.
 * @param formData - Dados do formulário incluindo imagem e textos.
 * @returns true se sucesso, false caso contrário.
 */
export async function createProject(formData: FormData) {
  const session = await auth();
  
  if (!session) return false;

  const profileId = formData.get("profileId") as string;
  const projectName = formData.get("projectName") as string;
  const projectDescription = formData.get("projectDescription") as string;
  const projectUrl = formData.get("projectUrl") as string;
  const file = formData.get("file") as File;
  
  const generatedId = randomUUID();

  // 1. Upload da Imagem
  const storageRef = storage.file(`projects-images/${profileId}/${generatedId}`);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Define o tipo do arquivo 
  await storageRef.save(buffer, {
    metadata: {
      contentType: file.type,
    },
  });

  const imagePath = storageRef.name;

  // 2. Salvar no Firestore
  try {
    await db
      .collection("profiles")
      .doc(profileId)
      .collection("projects")
      .doc(generatedId)
      .set({
        id: generatedId,
        userId: session.user?.id,
        projectName,
        projectDescription,
        projectUrl,
        imagePath: imagePath, 
        createdAt: Timestamp.now().toMillis(), 
      });

    return true;
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return false;
  }
}