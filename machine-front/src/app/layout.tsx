import type { Metadata } from "next";
import { QueryProvider } from "./providers/query-provider"

import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema de Gerenciamento de Máquinas",
  description: "Sistema para gerenciar máquinas de forma eficiente criado com Next.js e React Query.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
