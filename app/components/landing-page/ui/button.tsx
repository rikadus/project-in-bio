// app/components/landing-page/ui/button.tsx

import { cn } from "@/app/lib/utils";

/**
 * Componente de botão reutilizável.
 * Suporta variantes de estilo (primary, secondary, ghost) e props de botão HTML padrão.
 * @param children - Conteúdo do botão.
 * @param variant - Estilo visual do botão (default: 'primary').
 */
export default function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "p-3 text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70",
        variant === "primary" && "bg-accent-purple",
        variant === "secondary" && "bg-background-tertiary",
        variant === "ghost" && "border-border-primary",
        props.className
      )}
    >
      {children}
    </button>
  );
}
