// app/components/landing-page/commons/total-visits.tsx

import { TrendingUp } from "lucide-react";
import { auth } from "@/app/lib/auth";
import { manageAuth } from "@/app/actions/manager-auth";
import PortalButton from "./portal-button";

/**
 * Exibe o total de visitas acumuladas no perfil ou projetos.
 * Opcionalmente exibe a barra de ações com botão de Portal e Logout.
 * @param totalVisits - Número de visitas para exibir.
 * @param showBar - Se true, renderiza botões extras (PortalButton, Sair).
 */
export async function TotalVisits({
  totalVisits = 0,
  showBar = false
}: {
  totalVisits?: number;
  showBar?: boolean;
}) {
  
  const session = await auth();
  
  return (
    <div
      className="w-min whitespace-nowrap flex items-center gap-5
     bg-background-secondary border border-x-border-primary px-8 py-3 rounded-xl shadow-lg"
    >
      <span className="font-bold text-white">Total de visitas</span>
      <div className="flex items-center gap-2 text-accent-green">
        <span className="text-3xl font-bold">{totalVisits}</span>
        <TrendingUp />
      </div>

      {showBar && (
        <div className="flex items-center gap-2">
      <PortalButton />   
      <form action={manageAuth}> 
      <button className="text-white hover:underline hover:text-accent-green transition-colors" >Sair</button> 
      </form>     
      </div>
      )}
    </div>
  );
}
