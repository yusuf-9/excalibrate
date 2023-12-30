import dynamic from "next/dynamic";

// components
import ConferenceModal from "@/components/conference-modal";
const Board = dynamic(() => import("@/components/board"), { ssr: false });

export default function DrawingPage() {
  return (
    <>
      <Board />
      <ConferenceModal />
    </>
  );
}
