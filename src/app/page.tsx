import dynamic from "next/dynamic";

// components
import StoreProvider from "@/components/store/provider";
const Board = dynamic(() => import("@/components/board"), { ssr: false });

export default function Home() {
  return (
    <StoreProvider>
      <Board />
     </StoreProvider>
  );
}
