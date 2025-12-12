// server/get-profile-data.ts

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

/**
 * Busca os dados públicos do perfil de um usuário pelo ID do documento (profileId).
 * @param profileId - ID do documento na coleção 'profiles'.
 * @returns Dados do perfil ou null se não existir.
 */
export async function getProfileData(profileId: string) {
  const snapshot = await db.collection("profiles").doc(profileId).get();
  
  if (!snapshot.exists) return null;

  return snapshot.data() as ProfileData;
}

/**
 * Busca todos os projetos associados a um perfil.
 * @param profileId - ID do documento do perfil.
 * @returns Lista de projetos (ProjectData[]).
 */
export async function getProfileProjects(profileId: string) {
  const snapshot = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .get();

  if (snapshot.empty) {
   
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


  return projects;
}

/**
 * Busca o profileId (ID do documento) baseado no userId (ID da autenticação).
 * @param userId - ID do usuário autenticado.
 * @returns profileId (string) ou null se não encontrado.
 */
export async function getProfileId(userId?: string ) {
  // Proteção: Se não tiver ID, nem tenta buscar no banco
  if (!userId) return null;

  try {
    const snapshot = await db
      .collection("profiles")
      .where("userId", "==", userId)
      .get();

    // Proteção: Verifica se encontrou algum documento antes de tentar acessar
    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs.map((doc) => doc.id)[0];

  } catch (error) {
    console.error("Erro ao buscar profileId:", error);
    return null;
  }
}