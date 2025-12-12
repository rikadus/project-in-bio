"use client";

// app/components/landing-page/ui/modal.tsx

import useOnClickOutside from "@/app/hooks/useOnClickOutside";
import {useRef } from "react";

/**
 * Modal genérico com fundo borrado (backdrop blur).
 * Fecha ao clicar fora do conteúdo.
 * @param children - Conteúdo do modal.
 * @param isOpen - Estado de visibilidade.
 * @param setIsOpen - Função para alterar a visibilidade.
 */
export default function Modal({
   children,
   isOpen,
   setIsOpen,
}: {
   children: React.ReactNode;
   isOpen: boolean;
   setIsOpen: (open: boolean) => void;
}) {

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  if (!isOpen) return null;

   return (
      <div className="fixed  inset-0 bg-[#787878]/10 flex items-center justify-center backdrop-blur-md z-50">
         <div ref={ref}>{children}</div>
      </div>
   );
}