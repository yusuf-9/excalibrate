import { THEME_OPTIONS } from "@/constants";
import { atom } from "recoil";

export const themeAtom = atom({
  key: "activeTheme",
  default: THEME_OPTIONS.LIGHT,
});

export const chatDrawerAtom = atom({  
  key: "chatDrawerOpen",
  default: false,
}); 
