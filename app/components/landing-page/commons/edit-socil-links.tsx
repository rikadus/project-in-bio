"use client";

import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import { startTransition, useState } from "react";
import Modal from "../ui/modal";
import Button from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { createSocialLinks } from "@/app/actions/create-social-links";
import TextInput from "../ui/text-input";

export default function EditSocialLinks({
  socialMedias,
}: {
  socialMedias?: {
    github: string;
    linkedin: string;
    instagram: string;
    twitter: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false);

  // Inicializa os estados com os dados existentes ou string vazia
  const [github, setGithub] = useState(socialMedias?.github || "");
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || "");
  const [instagram, setInstagram] = useState(socialMedias?.instagram || "");
  const [twitter, setTwitter] = useState(socialMedias?.twitter || "");

  const { profileId } = useParams();
  const router = useRouter();

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true);

    if (!profileId) return;

    try {
      await createSocialLinks({
        profileId: profileId as string,
        github,
        linkedin,
        instagram,
        twitter,
      });

      startTransition(() => {
        setIsModalOpen(false);
        router.refresh();
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSavingSocialLinks(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
      >
        <Plus className="text-white" />
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          
          <p className="text-white font-bold text-xl">
            Adicionar redes sociais
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full">
              <Github className="text-white" />
              <TextInput
                type="text"
                placeholder="Link Github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Linkedin className="text-white" />
              <TextInput
                type="text"
                placeholder="Link Linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Instagram className="text-white" />
              <TextInput
                type="text"
                placeholder="Link Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Twitter className="text-white" />
              <TextInput
                type="text"
                placeholder="Link Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-bold text-white hover:underline"
            >
              Voltar
            </button>
            <Button
              onClick={handleAddSocialLinks}
              disabled={isSavingSocialLinks}
            >
              {isSavingSocialLinks ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

