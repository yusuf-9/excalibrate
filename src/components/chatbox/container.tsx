"use client";

import React, { useCallback, useEffect, useState } from "react";

// components
import Chatbox from "./chatbox";

// dummy data
import { messages as dummyMessages} from "./data";

// store
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { chatDrawerAtom, conferenceModalAtom, userAtom } from "@/store/atoms";
import { useSocket } from "@/hooks";

const ChatboxContainer = () => {
  const [showChatBox, setShowChatBox] = useRecoilState(chatDrawerAtom);
  const setModalState = useSetRecoilState(conferenceModalAtom);
  const user = useRecoilValue(userAtom);

  const {socket} = useSocket();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
      socket?.on("message-recieved", (message) => {
        console.log(`Message recieved`, message);
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
