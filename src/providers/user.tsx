"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// Hooks
import { useSocket, useStore } from "@/hooks";

// Types
import { UserType } from "@/types";
import { useRouter } from "next/navigation";

// Create the context
interface UserContextProps {
  user: UserType | null;
  collaboraters: UserType[];
  handleJoinRoom: (data: { name: string; roomId?: string }) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  collaboraters: [],
  handleJoinRoom: () => {},
});

type UserProviderProps = { children: React.ReactNode };

// Create the provider component
const UserProvider = ({ children }: UserProviderProps) => {
  // Store
  const { userAtom, collaboratersAtom } = useStore();
  const [user, setUser] = useRecoilState(userAtom);
  const [collaboraters, setCollaboraters] = useRecoilState(collaboratersAtom);

  // Socket
  const { socket } = useSocket();
  const router = useRouter();

  useEffect(() => {
    socket?.on("new-user-joined-room", (data: UserType) => {
      console.log("new-user-joined-room", { data });
      setCollaboraters(prev => [...prev, data]);
    });

    socket?.on("user-joined-room", (data: UserType) => {
      setUser(data);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket?.off("new-user-joined-room");
      socket?.off("user-joined-room");
    };
  }, [setCollaboraters, setUser, socket]);

  useEffect(() => {
    if (!user) return;
    router.push(`/${user?.roomId}`);
  }, [user, router]);

  const handleJoinRoom = useCallback(
    (data: { name: string; roomId?: string }) => {
      socket?.emit("join-room", data);
    },
    [socket]
  );

  return <UserContext.Provider value={{ user, collaboraters, handleJoinRoom }}>{children}</UserContext.Provider>;
};

export default UserProvider;
