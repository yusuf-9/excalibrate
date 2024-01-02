"use client";

import React, { useCallback, useEffect, useState } from "react";

// components
import Chatbox from "./chatbox";

// store
import { useRecoilState, useSetRecoilState } from "recoil";

// hooks
import { useSocket, useStore, useUser } from "@/hooks";

// types
import { messageType } from "@/types";

const ChatboxContainer = () => {
  const {chatDrawerAtom, conferenceModalAtom} = useStore();
  const [isChatDrawerDocked, setIsChatDrawerDocked] = useRecoilState(chatDrawerAtom);
  const setModalState = useSetRecoilState(conferenceModalAtom);
  const {user} = useUser();

  const {socket} = useSocket();
  const [messages, setMessages] = useState<messageType[]>([]);

  useEffect(() => {
      socket?.on("message-recieved", (message: messageType) => {
        setMessages(prev => [...prev, message]);
      });

    return () => {
      socket?.off("message-recieved");
    };
  }, [socket]);

  const handleSubmitMessage = useCallback((message: string) => {
      try {
        const messagePayload = {
          message,
        }
        socket?.emit("message", messagePayload);
      } catch (error) {
        console.log(error);
      }
    }, [socket]);

  const dockSidebar = () => {
    setIsChatDrawerDocked(prev => !prev);
  };

  console.log({messages, user})

  return (
    <Chatbox
      open={isChatDrawerDocked}
      onDock={dockSidebar}
      messages={messages}
      userId={user?.socketId}
      title="Chats"
      openConferenceModal={() => setModalState(prev => ({ ...prev, open: true }))}
      handleSubmitMessage={handleSubmitMessage}
    />
  );
};

export default ChatboxContainer;
