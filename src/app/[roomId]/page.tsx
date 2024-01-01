import dynamic from "next/dynamic";

// components
import ProtectedRoute from "@/providers/protected-route";
import ConferenceModal from "@/components/conference-modal";
const Board = dynamic(() => import("@/components/board"), { ssr: false });

export default function DrawingPage({
  params,
  searchParams,
}: {
  params: { roomId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  return (
    <ProtectedRoute params={params} searchParams={searchParams}>
      <Board />
      <ConferenceModal />
    </ProtectedRoute>
  );
}
