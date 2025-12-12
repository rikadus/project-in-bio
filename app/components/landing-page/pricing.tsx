// app/components/landing-page/pricing.tsx

import { TRIAL_DAYS } from "@/app/lib/config";
import Button from "./ui/button";

/**
 * Seção de Preços.
 * Exibe planos de assinatura (Mensal e Vitalício).
 */
export default function Pricing() {
  return (
    <div className="my-[150px] flex flex-col items-center gap-14">
      {/* Cabeçalho de Texto */}
      <div className="flex flex-col items-center gap-6 text-center">
        <h3 className="text-4xl font-bold text-white">
          Um valor acessível para todos
        </h3>
        <p className="text-content-body text-xl text-center">
          Junte-se à comunidade de criadores profissionais que já estão elevando
          sua
          <br />
          presença online. Teste gratuitamente por{" "}
          <strong className="text-accent-pink">{TRIAL_DAYS} dias</strong>, sem
          compromisso!
        </p>
      </div>

      {/* Container dos Cards (Flex Row para ficar lado a lado) */}
      <div className="flex items-end gap-9">
        {/* Card 1: Mensal */}
        <div className="w-[304px] p-8 flex flex-col gap-7 rounded-2xl border border-[#1E1E1E]">
          <div className="flex flex-col">
            <span className="text-white font-bold text-2xl">Mensal</span>
            <span className="text-content-body">Apenas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-[48px]">R$ 9,90</span>
            <span className="text-content-headline text-2xl">/mês</span>
          </div>
          <Button variant="secondary">Assinar</Button>
        </div>

        {/* Card 2: Vitalício (Recomendado) */}
        <div className="flex flex-col w-[304px]">
          {/* Faixa do Recomendado */}
          <div className="flex justify-center items-center rounded-t-2xl p-2 bg-[linear-gradient(90deg,#4B2DBB_0%,#B5446B_100%)]">
            <span className="uppercase text-xs font-bold text-white">
              Recomendado
            </span>
          </div>

          {/* Conteúdo com Borda Gradiente */}
          <div className="p-[1.6px] bg-[linear-gradient(90deg,#4B2DBB_0%,#B5446B_100%)] rounded-b-2xl">
            <div className="w-full bg-background-secondary p-8 flex flex-col gap-7 rounded-b-2xl">
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl">Vitalício</span>
                <span className="text-content-body">Economize por</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-[48px]">
                  R$ 99,90
                </span>
              </div>
              <Button>Assinar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
