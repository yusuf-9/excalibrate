import React from "react";

// components
import { FaPaperPlane } from "react-icons/fa";
import { Sidebar } from "@excalidraw/excalidraw";

type chatboxProps = {
  open: boolean;
  onClose: () => void;
  messages: any[];
  title: string;
};

const Chatbox = (props: chatboxProps) => {
  const { open, onClose, title } = props;
  return (
      <Sidebar name="chat" docked={open} onDock={onClose} className="xl:!w-[20vw]">
        <Sidebar.Header className="flex justify-center">
          <h3 className="text-lg font-bold">{title}</h3>
        </Sidebar.Header>
        <ChatMessages {...props} />
        <ChatInput {...props} />
      </Sidebar>
  );
};

const ChatMessages = ({ messages }: chatboxProps) => (
  <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-5 border-b border-contrast-light">
    {messages.map((message, index) => (
      <ChatMessage key={index} {...message} />
    ))}
  </div>
);

const ChatMessage = ({ author, message }: any) => (
  <div className={`flex items-start ${author === "You" ? "justify-end" : "justify-start"}`}>
    <div className={`border border-accent text-primary-dark px-3 py-2 rounded-2xl text-sm ${author === "You" ? "rounded-br-none translate-x-2" : "rounded-bl-none -translate-x-2"}`}>
      <p className="mb-0">{message + message + message + message}</p>
      <p className={`${author === "You" ? "text-right" : "text-right"} text-xs mt-2`}>{author}</p>
    </div>
  </div>
);

const ChatInput = (props: chatboxProps) => (
  <form className="p-3 pt-5 m-2 rounded-2xl flex gap-2">
    <input className="flex-grow p-2 px-4 rounded-3xl text-contrast-dark" placeholder="Say Hi..." />
    <button className="text-contrast bg-accent hover:text-contrast-light transition duration-300 active:outline active:outline-primary rounded-full p-2 px-3">
      <FaPaperPlane className="h-4 w-4" />
    </button>
  </form>
);

export default Chatbox;
