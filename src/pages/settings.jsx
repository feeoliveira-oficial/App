import React from "react";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h2>{t("Settings")}</h2>

      <button onClick={() => changeLanguage("en")}>🇺🇸</button>
      <button onClick={() => changeLanguage("pt")}>🇧🇷</button>
      <button onClick={() => changeLanguage("fr")}>🇫🇷</button>
      <button onClick={() => changeLanguage("es")}>🇪🇸</button>
    </div>
  );
};

export default Settings;
