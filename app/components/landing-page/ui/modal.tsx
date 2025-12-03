"use client";

import useOnClickOutside from "@/app/hooks/useOnClickOutside";
import {useRef } from "react";

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