// app/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";


/**
 * Utilitário para combinar classes Tailwind de forma condicional e livre de conflitos.
 * Usa `clsx` para lógica condicional e `tailwind-merge` para resolver conflitos de classes.
 */
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

/**
 * Comprime uma lista de arquivos de imagem.
 * @param files - Array de objetos File.
 * @returns Array de arquivos comprimidos.
 */
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

/**
 * Comprime uma única imagem usando configurações pré-definidas.
 * @param file - Arquivo de imagem original.
 * @returns Promise com o arquivo comprimido.
 */
export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {

    const options = {
      maxSizeMB: 0.2, // Limite de 200KB
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: "image/png",
    }
    imageCompression(file, options).then(compressedFile => {
      resolve(compressedFile);
    })
  } )
};

/**
 * Formata uma string para ser uma URL válida.
 * Se a URL estiver vazia, retorna ela mesma.
 * Se não começar com http/https, adiciona https://.
 * @param url - String da URL.
 */
export function formatUrl(url: string) {
  if (!url) return url;
  const formattedUrl = url.startsWith("http")
  ? url 
  : `https://${url}`;
  return formattedUrl;
}

/**
 * Dispara o clique em um input de arquivo oculto via ID.
 */
export function triggerImageInput (id: string){
    document.getElementById(id)?.click();
   }

   /**
    * Manipula a mudança de input de imagem e gera uma URL de pré-visualização.
    * @param e - Evento de mudança do input.
    * @returns URL temporária para a imagem ou null.
    */
   export function handleImageInput (e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]?? null;
    if (file) {
      const imageURL = URL.createObjectURL(file);
      return imageURL;
        }
     return null;
   }