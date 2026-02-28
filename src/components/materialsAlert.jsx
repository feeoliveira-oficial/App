import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MaterialsAlert = () => {
  const { t } = useTranslation();
  const [lowStockMaterials, setLowStockMaterials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/materials")
      .then(res => res.json())
      .then(data => {
        const low = data.filter(
          material => Number(material.stock) <= 20
        );
        setLowStockMaterials(low);
      });
  }, []);

  return (
    <div className="card">
      <h3>{t("lowStock")}</h3>
      <ul>
        {lowStockMaterials.map((item) => (
          <li key={item.id}>
            {item.name} ({item.stock})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialsAlert;