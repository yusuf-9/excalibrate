'use client'

import React from "react";

// components
import Board from "./board";
import { ChatboxTrigger } from "@/components/chatbox";

// constants
import { THEME } from "@excalidraw/excalidraw";

// store
import { useStore } from "@/hooks/index";
import { useRecoilValue } from "recoil";
import { ExcalidrawProps } from "@excalidraw/excalidraw/types/types";

const BoardContainer = () => {
  const {themeAtom} = useStore();
  const activeTheme = useRecoilValue(themeAtom)

  // child props
  const excalidrawProps : ExcalidrawProps = {
    initialData: {
      appState: {
        theme : activeTheme === "dark" ? THEME.DARK : THEME.LIGHT,
        defaultSidebarDockedPreference: false,
      },
    },
    gridModeEnabled: true,
    // dockedSidebarBreakpoint: 0,
    renderTopRightUI: () => <ChatboxTrigger />
  }

  return (
    <main className="h-screen w-screen">
      <Board {...excalidrawProps} />
    </main>
  );
};

export default BoardContainer;
