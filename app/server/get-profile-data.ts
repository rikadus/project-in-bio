import "server-only";
import { db } from "../lib/firebase";
import { Link } from "../actions/add.custom-links";

export type ProfileData = {
  userId: string;
  name: string; 
  imagePath: string;
  description: string;
  totalVisits: number;
  createdAt: number;
  socialMedias?: {
    github: string;
    linkedin: string;
    instagram: string;
    twitter: string;
  };
  
    link1?: Link;
    link2?: Link;
    link3?: Link;

  updatedAt?: number;
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
    .collection("profiles")
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
      id: doc.id, // Garante que o ID do documento vai para o front-end
      userId: data.userId,
      projectName: data.projectName,
      projectUrl: data.projectUrl || "", //Garante string vazia se undefined
      projectDescription: data.projectDescription,
      imagePath: data.imagePath,
      createdAt: data.createdAt,
      totalVisits: data.totalVisits,
    } as ProjectData;
  });

  console.log("✅ PROJETOS CARREGADOS:", projects);

  return projects;
}

export async function getProfileId(userId: string) {
  const snapshot = await db.collection("profiles").where("userId", "==", userId).get();

  return snapshot.docs[0].id;
}