import dynamic from "next/dynamic";

// components
import StoreProvider from "@/components/store/provider";
import ConferenceModal from "@/components/conference-modal";
const Board = dynamic(() => import("@/components/board"), { ssr: false });

export default function Home() {
  return (
    <StoreProvider>
      <Board />
      <ConferenceModal />
     </StoreProvider>
  );
}
