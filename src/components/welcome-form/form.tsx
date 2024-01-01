"use client";

import { useSocket, useUser } from "@/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const WelcomeForm = ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  
  const roomId = searchParams?.roomId?.toString();
  
  const [name, setName] = useState<string>("");
  const { handleJoinRoom } = useUser();

  const handleProceed = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    handleJoinRoom({ name, roomId });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-primary-light text-contrast-dark gap-10">
      <section className="flex flex-col items-center justify-center gap-5">
        <Image src="/logo.png" alt="Excalidraw draw Logo" className="rounded-full border border-accent" width={100} height={24} priority />
        <h1 className="text-2xl font-bold mb-4 capitalize md:w-3/4 xl:w-1/2 text-center">
          Welcome to Excalibrate — A wrapper for Excalidraw with live video and chat collaboration features!
        </h1>
      </section>
      <form className="flex flex-col items-center justify-normal gap-5" onSubmit={handleProceed}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border border-contrast-light focus-visible:outline-accent rounded-2xl p-2 mb-4 text-center text-black"
          placeholder="Enter your name"
        />
        <button
          disabled={name?.length < 3}
          type="submit"
          className="bg-accent-dark disabled:bg-accent hover:bg-accent-darker p-2 rounded-lg text-white uppercase tracking-widest">
          Continue
        </button>
      </form>
    </div>
  );
};

export default WelcomeForm;
