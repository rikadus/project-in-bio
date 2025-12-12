// app/components/landing-page/video-explanation.tsx

import { Play } from "lucide-react";

/**
 * Seção reservada para vídeo explicativo.
 * Atualmente exibe um placeholder com ícone de play.
 */
export default function VideoExplanation() {
  return (
    <div
      className="border rounded-2xl border-border-primary aspect-video 
    flex items-center justify-center my-20"
    >
      <Play className="text-accent-purple size-16" />
    </div>
  );
}
