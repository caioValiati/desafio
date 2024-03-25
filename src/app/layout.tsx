import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./store.provider";

export const metadata: Metadata = {
  title: "Desafio COMIGO",
  description: "Developed by Caio Geraldo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
