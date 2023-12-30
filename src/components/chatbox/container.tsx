"use client";

import React, { useCallback, useEffect } from "react";

// components
import Chatbox from "./chatbox";

// dummy data
import { messages } from "./data";

// store
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { chatDrawerAtom, conferenceModalAtom, userAtom } from "@/store/atoms";
import { useSocket } from "@/hooks";

const ChatboxContainer = () => {
  const [showChatBox, setShowChatBox] = useRecoilState(chatDrawerAtom);
  const setModalState = useSetRecoilState(conferenceModalAtom);
  const {socket} = useSocket();

  const user = useRecoilValue(userAtom);

  console.log({user})

  useEffect(() => {
    if (socket) {
      socket?.on("message", (message: string) => {
        console.log(`Message recieved: ${message}`);
      });
    }

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  const handleSubmitMessage = useCallback((message: string) => {
      try {
        socket?.emit("message", message);
      } catch (error) {
        console.log(error);
      }
    }, [socket]);

  const dockSidebar = () => {
    setShowChatBox(true);
  };

  return (
    <Chatbox
      open={showChatBox}
      onDock={dockSidebar}
      messages={messages}
      title="Chats"
      openConferenceModal={() => setModalState(prev => ({ ...prev, open: true }))}
      handleSubmitMessage={handleSubmitMessage}
    />
  );
};

export default ChatboxContainer;
