// app/components/landing-page/ui/text-input.tsx

import { cn } from "@/app/lib/utils";

/**
 * Input de texto estilizado reutilizável.
 * Herda todas as propriedades padrão de HTMLInputElement.
 */
export default function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={cn(
        `w-full p-3 bg-background-secondary text-white placeholder:text-content-placeholder 
        rounded-xl border border-transparent hover:border-border-secondary hover:text-content-body
         active:border-border-tertiary`,
        props.className
      )}
    />
  );
}
