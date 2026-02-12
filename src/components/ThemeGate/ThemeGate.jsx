import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";

export default function ThemeGate({ children }) {
  const [theme] = useLocalStorage("taskorbit_theme", "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return children;
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage("taskorbit_theme", "dark");
  return { theme, setTheme };
}
