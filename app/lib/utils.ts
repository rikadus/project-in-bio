// app/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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