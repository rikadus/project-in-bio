"use client"

// app/components/landing-page/ui/create-now.tsx

import TextInput from "../ui/text-input";
import Button from "../ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";

/**
 * Componente de entrada para criação rápida de link no Hero.
 * Permite ao usuário digitar um link desejado e iniciar o sign-in.
 */
export default function CreateNow() {

    const [link, setLink] = useState("");
  
    return (
        <div className="flex items-center gap-2 w-full mt-[10vh]">
            <span className="text-white text-xl">projectinbio.com/</span>
            <TextInput 
              placeholder="Seu link" 
              value={link} 
              onChange={(e) => setLink(e.target.value)} 
            />
            <Button
              onClick={() => {
                signIn("google", {
                  redirectTo: '/criar?link=${link}', 
                });
              }} 
              >
                Criar agora
            </Button>
        </div>
    );
}

