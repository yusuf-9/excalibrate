import React from "react";
import { useRecoilState } from "recoil";

// hooks
import { useStore } from "@/hooks";

// icons
import { IoSunny } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";

// constants
import { THEME_OPTIONS } from "@/constants";

const ThemeToggle = () => {
  const {themeAtom} =  useStore();
  const [theme, setTheme] = useRecoilState(themeAtom);

  const toggleTheme = () => {
    setTheme(theme === THEME_OPTIONS.LIGHT ? "dark" : "light");
  }

  const themeIcon = theme === THEME_OPTIONS.LIGHT ? <IoSunny className="h-5 w-5" /> : <MdDarkMode className="h-5 w-5" />;

  return (
    <button className="p-2 rounded-lg mr-2 text-black bg-accent" onClick={toggleTheme}>
     {themeIcon}
    </button>
  );
};

export default ThemeToggle;
