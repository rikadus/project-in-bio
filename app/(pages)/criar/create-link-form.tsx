// app/(pages)/criar/create-link-form.tsx
"use client";

import Button from "@/app/components/landing-page/ui/button";
import TextInput from "@/app/components/landing-page/ui/text-input";

import { sanitizeLink } from "@/app/lib/utils"; 
import { ChangeEvent, FormEvent, useState } from "react";

import { verifyLink } from "@/app/actions/verify-link";
import { createLink } from "@/app/actions/create-link";
import { useRouter, useSearchParams } from "next/navigation";



export default function CreateLinkForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [link, setLink] = useState(sanitizeLink(searchParams.get("link") || ""));
  const [error, setError] = useState("");

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
   
    setLink(sanitizeLink(e.target.value));
    setError("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //Quando um usuário não escolhe um link
    if (link.length === 0) return setError("Escolha um link primeiro.");
    
    //Quando um usuário escolhe um link que já existe
    const isLinkTaken = await verifyLink(link);

    if (isLinkTaken) return setError("Desculpe, esse link já está em uso.");
   
    //Criar perfil
    const insLinkCreated = await createLink(link);

    if (!insLinkCreated) return setError("Erro ao criar o perfil. Tente novamente");

    router.push(`/${link}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
        <span className="text-white">projectinbio.com/</span>
        
        <TextInput 
          value={link} 
          onChange={handleLinkChange} 
        />
        
        <Button className="w-[126px]">Criar</Button>
      </form>
      
      <div className="mt-2">
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </>
  );
}

