"use client"
import { ProjectData } from "@/app/server/get-profile-data";
import Link from "next/link";
import { formatUrl } from "@/app/lib/utils";

export default function ProjectCard({
  project,
  isOwner,
  img
}: {
  project?: ProjectData; // <--- O "?" torna o projeto opcional
  isOwner?: boolean;     // <--- O "?" torna o isOwner opcional
  img?: string;          // <--- O "?" torna a imagem opcional
}) {
  
  // LÓGICA DE PROTEÇÃO (FALLBACKS)
  // Se "project" existir, usa o dado dele. Se não, usa um texto padrão.
  const projectName = project?.projectName || "Projeto Exemplo";
  const projectDescription = project?.projectDescription || "Descrição do projeto...";
  const projectVisits = project?.totalVisits || 0;
  const projectUrl = project?.projectUrl ? formatUrl(project.projectUrl) : "#";
  const imageSrc = img || "/project-placeholder.png"; // Use uma imagem padrão se não vier nada

  const handleClick = () => {
    console.log("Projeto clicado");
  }

  return (
    <Link href={projectUrl} target="_blank" onClick={handleClick}>
      <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={imageSrc} // Usa a variável tratada
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
              {projectName} {/* Usa a variável tratada */}
            </span>
            <span className="text-content-body text-sm line-clamp-2">
              {projectDescription} {/* Usa a variável tratada */}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}