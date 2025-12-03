"use server"

import { Timestamp } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/auth";

export async function createLink(link: string) {
 //return false;

  const session = await auth();

  if (!session?.user?.id) return;

  try {

    await db.collection("profiles").doc(link).set({
      userId: session?.user?.id,
      totalVisits: 0,
      createdAt: Timestamp.now().toMillis()
    });
    return true;
} catch (error) {    
    return false;
}    
}