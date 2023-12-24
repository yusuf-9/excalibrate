import { chatDrawerAtom } from "@/store/atoms";
import { Sidebar } from "@excalidraw/excalidraw";
import React from "react";
import { BiMessageDetail } from "react-icons/bi";
import { useRecoilState } from "recoil";

export const ChatboxTrigger = () => {
  const [showChatBox, setShowChatBox] = useRecoilState(chatDrawerAtom);

  return (
    <Sidebar.Trigger
      name="chat"
      className="flex gap-2 items-center bg-accent text-contrast-dark rounded-lg p-3"
      title={"Open Chat"}
      icon={<BiMessageDetail />}
      style={{ backgroundColor: "rgb(168, 165, 255)", color: "black" }}
      onToggle={() => setShowChatBox(!showChatBox)}>
      Chats
    </Sidebar.Trigger>
  );
};
