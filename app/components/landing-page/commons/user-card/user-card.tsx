// app/components/landing-page/commons/user-card/user-card.tsx

import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import Button from "../../ui/button";
import EditSocialLinks from "../edit-socil-links";
import Link from "next/link";
import { ProfileData } from "@/app/server/get-profile-data";
import AddCustomLink from "./add-custom-link";
import { formatUrl } from "@/app/lib/utils";
import EditUserCard from "./edit-user-card";
import { getDownloadURLFromPath } from "@/app/lib/firebase";


//Redes Sociais 
/**
 * Componente UserCard
 * Exibe o cartão principal do usuário com foto, nome, descrição e links sociais.
 * 
 * @param profileData - Dados do perfil do usuário carregados do Firebase.
 * @param isOwner - Booleano indicando se o usuário atual é o dono do perfil (para habilitar edições).
 */
export default async function UserCard({
  profileData,
  isOwner,
}: {
  profileData?: ProfileData;
  isOwner?: boolean;
}) {


  
  
  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48">
        <img
          src={await getDownloadURLFromPath(profileData?.imagePath) || "/kadu.png"}
          alt={profileData?.name || "Ricardo Vieira"}
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            {profileData?.name || "Ricardo Vieira"}
          </h3>
          {isOwner && profileData && <EditUserCard profileData={profileData} />}
        </div>
        <p className="opacity-40">
          {profileData?.description || "Desenvolvedor Full Stack | Apaixonado por tecnologia e inovação."}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">Links</span>
        <div className="flex gap-3">
          {
            profileData?.socialMedias?.github && (
              <Link 
                href={profileData?.socialMedias?.github}
                target="_blank" 
                className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
              <Github/>
              </Link>
            )
          }     
          {
            profileData?.socialMedias?.linkedin && (
              <Link 
                href={profileData?.socialMedias?.linkedin}
                target="_blank" 
                className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
              <Linkedin/>
              </Link>
            )
          }
          {
            profileData?.socialMedias?.instagram && (
              <Link 
                href={profileData?.socialMedias?.instagram}
                target="_blank" 
                className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
              <Instagram/>
              </Link>
            )
          }
          {
            profileData?.socialMedias?.twitter && (
              <Link 
                href={profileData?.socialMedias?.twitter}
                target="_blank" 
                className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
              <Twitter/>
              </Link>
            )}    
          
          {

          }     
         
         {isOwner && <EditSocialLinks socialMedias={profileData?.socialMedias} />}
          {/*<EditSocialLinks />*/}
        </div>      
      </div>
      <div className="flex flex-col gap-3 w-full min-h-[172px]">
        <div className="w-full flex flex-col items-center gap-3">
          {profileData?.link1 && profileData.link1.url && (
            <Link href={formatUrl(profileData?.link1.url)} target="_blank" className="w-full">
            <Button className="w-full">{profileData?.link1.title}</Button>
            </Link>
          )}
            {profileData?.link2 && profileData.link2.url && (
            <Link href={formatUrl(profileData?.link2.url)} target="_blank" className="w-full">
            <Button className="w-full">{profileData?.link2.title}</Button>
            </Link>
          )}
          {profileData?.link3 && profileData.link3.url && (
            <Link href={formatUrl(profileData?.link3.url)} target="_blank" className="w-full">
            <Button className="w-full">{profileData?.link3.title}</Button>
            </Link>
          )}
          {!profileData &&(
          <button 
          className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
            <Plus />
          </button>
          )}
          {isOwner && <AddCustomLink/>}
        </div>
      </div>      
    </div>
  );
}
