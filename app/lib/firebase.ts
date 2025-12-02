import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import "server-only";

// Certificado
const decodeKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY!, "base64").toString("utf-8");

export const firebaseCert = cert ({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: decodeKey,
    projectId: process.env.FIREBASE_PROJECT_ID,
});

// Instancia do app
if (!getApps().length) {
   initializeApp({
       credential: firebaseCert,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET, 
   });
} 

export const db = getFirestore();

db.collection("profiles").doc("123").get();

export const storage = getStorage().bucket();


