import EstimateTable from "@/components/EstimateTable";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-[var(--background)] text-[var(--foreground)] p-8`}
    >
      <main className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-center text-3xl font-bold">EstimateX</h1>
        <EstimateTable />
      </main>
    </div>
  );
}
