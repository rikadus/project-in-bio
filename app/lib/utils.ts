// app/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeLink(link: string) {
  return link
    .normalize("NFD")               // 1. Separa os acentos (ex: 'ã' vira 'a' + '~')
    .replace(/[\u0300-\u036f]/g, "") // 2. Remove os acentos
    .toLowerCase()                  // 3. Tudo minúsculo
    .replace(/\s+/g, "")            // 4. Remove espaços
    .replace(/[^a-z0-9-]/g, "");    // 5. O SEGREDO: Remove TUDO que NÃO for letra, número ou hífen. A flag 'g' garante que remove tudo.
}

export async function compressFiles(files: File[]){
  const compressPromises = files.map(async(file) =>{
  try {
    return await compressImage(file);
  }catch (error){
    console.error(error);
    return null;
  }
});

return (await Promise.all(compressPromises)).filter((file) => file !== null);
}

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: "image/png",
    }
    imageCompression(file, options).then(compressedFile => {
      resolve(compressedFile);
    })
  } )
};

export function formatUrl(url: string) {
  const formattedUrl = url.startsWith("http")
  ? url 
  : `https://${url}`;
  return formattedUrl;
}
