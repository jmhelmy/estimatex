import EstimateTable from "@/components/EstimateTable";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} p-6`}>
      <h1 className="mb-4 text-2xl font-bold">EstimateX</h1>
      <EstimateTable />
    </div>
  );
}
