
"use server"
import { Timestamp } from "firebase-admin/firestore";
import { db, storage } from "../lib/firebase";
import { randomUUID } from "crypto";
import { auth } from "../lib/auth";

export async function saveProfile(formData: FormData) {
  const session = await auth();

  if (!session) return;

    
  try {
    const profileId = formData.get("profileId") as string;
    const file = formData.get("profilePic") as File;
    const yourName = formData.get("yourName") as string;
    const yourDescription = formData.get("yourDescription") as string;

    let imagePath = null;

    const hasFile = file && file.size > 0;

    if (hasFile) {
      const currentProfile = await db
      .collection("profiles")
      .doc(profileId)
      .get();

      const currentImagePath = currentProfile?.data()?.imagePath;

      if (currentImagePath){
        const currentStorageRef = storage.file(currentImagePath);
        const [exists] = await currentStorageRef.exists();

        if (exists){
          await currentStorageRef.delete();
        }
      } 
       const storageRef = storage.file(`profiles-images/${profileId}/${randomUUID()}`); 
       const arrayBuffer = await file.arrayBuffer();
       const buffer = Buffer.from(arrayBuffer);  
       
       await storageRef.save(buffer);
       imagePath = storageRef.name;
    }

    await db
    .collection("profiles")
    .doc(profileId)
    .update({    
      name: yourName,
      description: yourDescription,
      ...(hasFile && { imagePath }),
      updatedAt: Timestamp.now().toMillis(),
    });
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}