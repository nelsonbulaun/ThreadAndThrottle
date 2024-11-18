import { useContext, createContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDarkMode: null,
  setIsDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "customDark");
      document.body.setAttribute("data-theme", storedTheme);
      console.log(storedTheme);
    } else {
      console.log(storedTheme);
      document.body.setAttribute(
        "data-theme",
        prefersDarkMode ? "customDark" : "light"
      );
    }
  }, [prefersDarkMode]); 

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    const newTheme = newMode ? "customDark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
