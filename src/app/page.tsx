import dynamic from "next/dynamic";

// components
import StoreProvider from "@/components/store/provider";
import ConferenceModal from "@/components/conference-modal";
import SocketProvider from "@/contexts/socket";
const Board = dynamic(() => import("@/components/board"), { ssr: false });

export default function Home() {
  return (
    <StoreProvider>
      <SocketProvider>
        <Board />
        <ConferenceModal />
      </SocketProvider>
    </StoreProvider>
  );
}
