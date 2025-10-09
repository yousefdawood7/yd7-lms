import { type ReactNode } from "react";
import Header from "@/app/(public)/_component/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="container mx-auto flex flex-col items-center justify-center gap-25 px-3.5 py-20">
        {children}
      </main>
    </div>
  );
}
