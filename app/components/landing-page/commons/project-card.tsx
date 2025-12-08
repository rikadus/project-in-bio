"use client"

import { ProjectData } from "@/app/server/get-profile-data";
import Link from "next/link";
import { formatUrl } from "@/app/lib/utils";
import { useParams } from "next/navigation";
import { increaseProjectVisits } from "@/app/actions/increase-project-visits";

export default function ProjectCard({
  project,
  isOwner,
  img
}: {
  project?: ProjectData;
  isOwner?: boolean;
  img?: string;
}) {
  const { profileId } = useParams();

  // 1. FORMATAÇÃO SEGURA DA URL (CORREÇÃO DO ERRO)
  // Tenta formatar. Se o resultado for vazio/null/undefined, usa "#" para não quebrar o Link.
  const rawUrl = project?.projectUrl || "";
  const formattedUrl = formatUrl(rawUrl);
  const projectUrl = formattedUrl || "#"; 

  // 2. DADOS PADRÃO (FALLBACKS)
  const projectName = project?.projectName || "Projeto Exemplo";
  const projectDescription = project?.projectDescription || "Descrição do projeto...";
  const projectVisits = project?.totalVisits || 0;
  const imageSrc = img || "/project-placeholder.png";

  async function handleClick() {
    console.log("Clicou no projeto");

    // 3. CORREÇÃO DA LÓGICA DE CONTAGEM
    // Se não tiver ID do perfil, nem ID do projeto, OU se for o dono clicando, CANCELA.
    // Antes estava "!isOwner", o que impedia visitantes de contar. Agora está "isOwner".
    if (!profileId || !project?.id || isOwner) return;

    await increaseProjectVisits(profileId as string, project.id);
  }

  return (
    <Link href={projectUrl} target="_blank" onClick={handleClick}>
      <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={imageSrc}
            alt="Projeto"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 w-full overflow-hidden">
          {isOwner && (
            <span className="uppercase text-xs font-bold text-accent-green">
              {projectVisits} Cliques
            </span>
          )}

          <div className="flex flex-col">
            <span className="text-white font-bold truncate">
              {projectName}
            </span>
            <span className="text-content-body text-sm line-clamp-2">
              {projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}