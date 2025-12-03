"use client"

import Modal from "@/app/components/landing-page/ui/modal";
import  { Plus } from "lucide-react";
import { useState } from "react";

export default function NewProject({profileId}: {profileId: string}) {
  const [isOpen, setIsOpen] = useState(false);  

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
         <div className="border p-10">Hello world</div>
        </Modal>
     </>
    );
} 