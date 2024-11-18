import React, { useState, useEffect } from "react";

const DarkMode = () => {
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);
  const bgColor = getComputedStyle(document.body).getPropertyValue(
    "--background-color"
  );

  const toggleState = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    const newTheme = newMode ? "customDark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "customDark");
      document.body.setAttribute("data-theme", storedTheme);
    } else {
      document.body.setAttribute(
        "data-theme",
        prefersDarkMode ? "customDark" : "light"
      );
    }
  }, []);

  return (
    <div>
      <input
        type="checkbox"
        className={
          isDarkMode
            ? `toggle [--tglbg:#242424] bg-[#ffffff] border-[#ffffff]`
            : `toggle [--tglbg:#ffffff] bg-[#242424] border-[#242424]`
        }
        onClick={toggleState}
        checked={isDarkMode}
      />
    </div>
  );
};

export default DarkMode;
