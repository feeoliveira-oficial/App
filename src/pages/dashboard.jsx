import "../App.css";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SummaryCard from "../components/summaryCard";
import ReminderList from "../components/reminderList";
import MaterialsAlert from "../components/materialsAlert";

const Dashboard = () => {
  const { t } = useTranslation();

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalReceived: 0,
  });
  
  const [hideProfit, setHideProfit] = useState(true);

  const totalCost = 4200;
  

  const fetchSummary = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard-summary");
      const data = await response.json();
      setSummary (data);
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const profit = summary.totalRevenue - totalCost;

  const tasks = [
    "Finish bathroom renovation",
    "Call client Maria",
    "Buy electrical wires"
  ];

  return (
    <>
      <SummaryCard
        title={t("totalRevenue")}
        value={`$CAD ${summary.totalRevenue}`}
      />

      <SummaryCard
        title={t("totalReceived")}
        value={`$CAD ${summary.totalReceived}`}
      />

      <SummaryCard
        title={t("Profit")}
        value={`$CAD ${profit} `}
        isHidden={hideProfit}
        toggleHidden={() => setHideProfit(!hideProfit)}
        showToggle={true}
      />

      <ReminderList tasks={tasks} />
      <MaterialsAlert />

      <div className="card ad-card">
        <h3>{t("Advertisement")}</h3>
        <p>🏠 Home Depot - 20% OFF Tools</p>
      </div>
    </>
  );
};

export default Dashboard;
