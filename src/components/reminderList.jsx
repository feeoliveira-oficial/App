import React from "react";
import { useTranslation } from "react-i18next";

const ReminderList = ({ tasks }) => {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h3>{t("todayTasks")}</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;
