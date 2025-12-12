// app/components/landing-page/commons/project-card.tsx
"use client"

import { ProjectData } from "@/app/server/get-profile-data";
import Link from "next/link";
import { formatUrl } from "@/app/lib/utils";
import { useParams } from "next/navigation";
import { increaseProjectVisits } from "@/app/actions/increase-project-visits";

/**
 * Exibe um card individual de projeto com imagem, título e descrição.
 * Incrementa contador de visitas ao clicar (se não for o dono).
 * @param project - Objeto ProjectData com detalhes do projeto.
 * @param isOwner - Se true, não contabiliza clique e permite edição (futura/visual).
 */
export default function ProjectCard({
  project,
  isOwner,
  img,
  name,
  description,
}: {
  project?: ProjectData;
  isOwner?: boolean;
  img?: string;
  name?: string;
  description?: string;
}) {
  const { profileId } = useParams();

  // Se o resultado for vazio/null/undefined, usa "#" para não quebrar o Link.
  const rawUrl = project?.projectUrl;
  const projectUrl = (rawUrl && rawUrl.trim() !== "") ? formatUrl(rawUrl) : "#";

  // Dados do projeto
  const projectName = project?.projectName || "Projeto Exemplo";
  const projectDescription = project?.projectDescription || "Descrição do projeto...";
  const projectVisits = project?.totalVisits || 0;
  const imageSrc = img || "/project-placeholder.png";

  async function handleClick() {
 
    // Se não tiver ID do perfil, nem ID do projeto, OU se for o dono clicando, CANCELA.
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
              {name || projectName}
            </span>
            <span className="text-content-body text-sm line-clamp-2">
              {description || projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}