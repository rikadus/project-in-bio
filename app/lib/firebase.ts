// app/lib/firebase.ts

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import "server-only";

// Tenta pegar a variável BASE64
const encodedKey = process.env.FIREBASE_PRIVATE_KEY_BASE64;
let privateKey;

if (encodedKey) {

  // Se existir Base64, decodifica
  const decoded = Buffer.from(encodedKey, "base64").toString("utf-8");

  // Faz o replace, garantindo que as quebras de linha funcionem
  privateKey = decoded.replace(/\\n/g, '\n'); 
} else {

  // Fallback para caso você use a chave normal (sem ser base64)
  privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
}

const credential = cert({
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: privateKey,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

if (!getApps().length) {
  if (process.env.FIREBASE_PROJECT_ID && privateKey && process.env.FIREBASE_CLIENT_EMAIL) {
    initializeApp({
      credential,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  }
}

export const db = getFirestore();
export const storage = getStorage().bucket();

export async function getDownloadURLFromPath(path?: string) {
    if (!path) return;

    const file = storage.file(path);

    const [url] = await file.getSignedUrl({
        action: "read",
        expires: "03-01-2400",//Não deixa expirar
    });

    return url;
}