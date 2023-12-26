import { THEME_OPTIONS } from "@/constants";
import { atom } from "recoil";

export const themeAtom = atom({
  key: "activeTheme",
  default: THEME_OPTIONS.DARK,
});

export const chatDrawerAtom = atom({  
  key: "chatDrawerDocked",
  default: false,
}); 

export const conferenceModalAtom = atom({  
  key: "conferenceModal",
  default: {
    open: false,
    docked: false,
  },
});