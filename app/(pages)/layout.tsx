import "./globals.css";
/*Font imports Google*/
import { Red_Hat_Display } from "next/font/google";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    /*Todo body da aplicação vai ter o redHatDisplay*/
    <html lang="pt-BR">
      <body
      suppressHydrationWarning={true}
        className={`${redHatDisplay.className} bg-background-primary text-content-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
