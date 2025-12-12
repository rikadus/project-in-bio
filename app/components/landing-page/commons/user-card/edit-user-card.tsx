// app/components/landing-page/commons/user-card/edit-user-card.tsx

"use client"

import { ArrowUpFromLine, UserPen } from "lucide-react"
import { useState } from "react"
import Modal from "../../ui/modal";
import TextInput from "../../ui/text-input";
import TextArea from "../../ui/text-area";
import Button from "../../ui/button";
import { triggerImageInput , handleImageInput, compressFiles} from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useParams } from "next/navigation";
import { saveProfile } from "@/app/actions/save-profile";
import {ProfileData} from "@/app/server/get-profile-data";

export default function EditUserCard({
  profileData
}: {
  profileData: ProfileData;
}) {

  const router = useRouter();
  const {profileId} = useParams();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);


  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [yourName, setYourName] = useState(profileData.name);
  const [yourDescription, setYourDescription] = useState(profileData.description);

  async function handleSaveProfile() {
    setIsSavingProfile(true);
    
    const imagesInput = document.getElementById("profile-pic-input") as HTMLInputElement;

    if(!imagesInput.files) return
//Comprimir Imagem
    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    if(!profileId) return

    const formData = new FormData();
    formData.append("profileId", profileId as string);
    formData.append("profilePic", compressedFile[0]);  
    formData.append("yourName", yourName);
    formData.append("yourDescription", yourDescription);

    await saveProfile(formData);
  

    startTransition(() =>{
      setIsModalOpen(false);
      setIsSavingProfile(false);
      router.refresh();
    })

  }
 console.log(profilePic);
    return (
      <>
        <button onClick={() => setIsModalOpen(true)}>
          <UserPen/>
        </button>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
            <p className="text-white text-xl font-bold">Editar Perfil</p>
            <div className="flex gap-10 ">
              <div className="flex flex-col items-center gap-3 text-xs">
                <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                  {profilePic ? (
                     <img 
                    src={profilePic} 
                    alt="Profile Picture" 
                    className="object-cover object-center" 
                    />
                  ) : (
                    <button 
                  onClick={() => triggerImageInput("profile-pic-input")} 
                  className="w-full h-full"
                  >
                    100x10
                  </button>
                   
                  )}                  
                </div>
                <button onClick={() => triggerImageInput("profile-pic-input")} className="text-white text-items-center gap-2">
                  <ArrowUpFromLine className="size-4"/>
                  <span>Adicionar Imagem</span>
                </button>
                <input 
                  id="profile-pic-input" 
                  type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => setProfilePic(handleImageInput(e))} />
              </div>
              <div className="flex flex-col - gap-4 w-[293px]">
                <div className="flex flex-col gap-1">
                  <label htmlFor="your-name" className="text-white font-bold">
                    Seu nome
                    </label>
                  <TextInput 
                  id="your-name" 
                  placeholder="Seu nome"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="your-description">Descrição</label>
                  
                  <TextArea 
                   id="your-description" 
                  placeholder="Fale um pouco sobre você" 
                  className="h-36"  
                  value={yourDescription}
                  onChange={(e) => setYourDescription(e.target.value)}
                  />  
                </div>           
                </div>                 
            </div>
            <div className="flex gap-4 justify-end">
              <button onClick={() => setIsModalOpen(false)} className="font-bold text-white">Voltar</button>
              <Button onClick={handleSaveProfile} disabled={isSavingProfile}>Salvar</Button>
            </div>
          </div>
        </Modal>
      </>
    )
}
