import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import brazilFlag from '../assets/brazil.png';
import franceFlag from '../assets/france.png';
import spainFlag from '../assets/spain.png';
import USAFlag from '../assets/usa.png';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">{t("Settings")}</h2>

        {/* LANGUAGE */}
        <div className="mb-4">
          <h5>{t("SelectLanguage")}</h5>
          <div className="d-flex align-items-center mt-2">
            <img
              src={brazilFlag}
              alt="PT"
              onClick={() => changeLanguage("pt")}
              className="flag-icon"
            />
            <img
              src={USAFlag}
              alt="EN"
              onClick={() => changeLanguage("en")}
              className="flag-icon"
            />
            <img
              src={franceFlag}
              alt="FR"
              onClick={() => changeLanguage("fr")}
              className="flag-icon"
            />
            <img
              src={spainFlag}
              alt="ES"
              onClick={() => changeLanguage("es")}
              className="flag-icon"
            />
          </div>
        </div>

        {/* THEME */}
        <div>
          <h5>{t("Theme")}</h5>
          <button
            className={`btn ${darkMode ? "btn-dark" : "btn-outline-dark"}`}
            onClick={toggleTheme}
          >
            {darkMode ? t("DarkModeOn") : t("LightModeOn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
