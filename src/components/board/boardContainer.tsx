"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

// components
import Board from "./board";
import { ChatboxTrigger } from "@/components/chatbox";
import { ThemeToggle } from "@/components/theme";

// constants
import { LiveCollaborationTrigger, THEME } from "@excalidraw/excalidraw";

// store
import { useStore } from "@/hooks/index";

//types
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

const BoardContainer = () => {
  const { themeAtom } = useStore();
  const activeTheme = useRecoilValue(themeAtom);
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();

  // Effect to update the theme of the board
  useEffect(() => {
    if (!excalidrawAPI) return;
    excalidrawAPI.updateScene({
      appState: {
        theme: activeTheme === "dark" ? THEME.DARK : THEME.LIGHT,
      },
    });
  }, [activeTheme, excalidrawAPI]);

  // Function to render the top right UI
  const getTopRightUI = useCallback(() => {
    return (
      <div className="flex gap-2">
         <LiveCollaborationTrigger
            isCollaborating={true}
            onSelect={() => {
              window.alert("You clicked on collab button");
            }}
          />
        <ThemeToggle />
        <ChatboxTrigger />
      </div>
    );
  }, []);

  return (
    <main className="h-screen w-screen">
      <Board
        initialData={{
          appState: {
            theme: activeTheme === "dark" ? THEME.DARK : THEME.LIGHT,
            defaultSidebarDockedPreference: false,
          },
        }}
        renderTopRightUI={getTopRightUI}
        excalidrawAPI={setExcalidrawAPI}
      />
    </main>
  );
};

export default BoardContainer;
