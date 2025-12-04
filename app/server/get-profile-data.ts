import "server-only";
import { db } from "../lib/firebase";

export type ProfileData = {
  userId: string;
  totalVisits: number;
  description: string;
  createdAt: number;
}

export type ProjectData = {
  id: string;
  userId: string;
  projectName: string;
  projectUrl: string;
  projectDescription: string;
  imagePath: string;
  createdAt: number;
  totalVisits?: number;
};

export async function getProfileData(profileId: string) {
  const snapshot = await db.collection("profiles").doc(profileId).get();
  
  if (!snapshot.exists) return null;

  return snapshot.data() as ProfileData;
}

export async function getProfileProjects(profileId: string) {
  const snapshot = await db
    .collection("projects")
    .doc(profileId)
    .collection("projects")
    .get();

  if (snapshot.empty) {
    console.log("❌ NENHUM PROJETO ENCONTRADO PARA:", profileId);
    return [];
  }

  const projects = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id, // <--- IMPORTANTE: Garante que o ID do documento vai para o front-end
      userId: data.userId,
      projectName: data.projectName,
      projectUrl: data.projectUrl || "", // <--- CORREÇÃO: Garante string vazia se undefined
      projectDescription: data.projectDescription,
      imagePath: data.imagePath,
      createdAt: data.createdAt,
      totalVisits: data.totalVisits,
    } as ProjectData;
  });

  console.log("✅ PROJETOS CARREGADOS:", projects);

  return projects;
}