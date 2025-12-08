"use server";

import { Timestamp } from "firebase-admin/firestore";
import { db, storage } from "@/app/lib/firebase"; // Certifique-se que exporta 'storage' de lá
import { auth } from "@/app/lib/auth"; // Import correto do Auth.js
import { randomUUID } from "crypto";

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
  // Adicionei a barra '/' para organizar melhor: projects-images/ID_PERFIL/ID_PROJETO
  const storageRef = storage.file(`projects-images/${profileId}/${generatedId}`);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Define o tipo do arquivo (opcional, mas bom para o navegador abrir a imagem direto)
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
        imagePath: imagePath, // Corrigido erro de sintaxe
        createdAt: Timestamp.now().toMillis(), // Adicionado ()
      });

    return true;
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return false;
  }
}