"use client"


import Button from "@/app/components/landing-page/ui/button";
import Modal from "@/app/components/landing-page/ui/modal";
import TextInput from "@/app/components/landing-page/ui/text-input";
import TextArea from "@/app/components/landing-page/ui/text-area";
import  { ArrowUpFromLine, Plus } from "lucide-react";
import { useState } from "react";


export default function NewProject({profileId}: {profileId: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] =useState(""); 
  const [projectDescription, setProjectDescription] =useState("");  
  const [projectUrl, setProjectUrl] =useState("");  
  const [projectImage, setProjectImage] =useState<string | null>(null);  
     



  const handleOpenModal = () => {
    setIsOpen(true);
  }
    return (
      <>
        <button onClick={handleOpenModal} 
        className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gao-2 justify-center hover:border border-dashed">
          <Plus className="size-10 text-accent-green" />
          <span>Novo projeto</span>
        </button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
         <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
           <p className="text-white font-bold text-xl">Novo projeto</p>
           <div className="flex gap-10">
            <div className="flex flex col items-center gap-3 text-xs" >
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                <button className="w-full h-full">100x100</button>
              </div>
              <button className="text-white flex items-center gap-2">
                <ArrowUpFromLine className="size-4"/>
                <span>Adicionar imagem</span>
                </button>
                <input type="file" id="imageInput" accept="image/*" className="hidden"/>
            </div>
              <div className="flex flex-col gap-4 w-[293px]">
                 <div className="flex flex-col gap-1">
                   <label htmlFor="project-name" className="text-white font-bold" >Titulo do projeto</label>
                   <TextInput id="project-name" placeholder="Digite o nome do projeto"/>
                 </div>
                 <div className="flex flex-col gap-1">
                   <label htmlFor="project-description" className="text-white font-bold" >Descrição do projeto</label>
                   <TextArea id="project-description" placeholder="Digite a descrição do projeto" className="h-36"/>
                 </div>
                 <div className="flex flex-col gap-1">
                  <label htmlFor="project-url" className="text-white font-bold" >URL do projeto</label>
                  <TextInput type="url" id="project-url" placeholder="Digite a URL do Projeto" />
                 </div>
              </div>
           </div>
           <div className="flex gap-4 justify-end">
            <button className="font-bold text-white">
              Voltar
            </button>
            <Button >
              Salvar
            </Button>
           </div>
         </div>
        </Modal>
     </>
    );
} 