import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Materials = () => {
  const { t } = useTranslation();
  const [materials, setMaterials] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    stock: "",
    unitCost: ""
  });

  const fetchMaterials = async () => {
    const response = await fetch("http://localhost:5000/materials");
    const data = await response.json();
    setMaterials(data);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleAddMaterial = async () => {
    const response = await fetch("http://localhost:5000/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMaterial)
    });

    if (response.ok) {
      setShowAdd(false);
      setNewMaterial({ name: "", stock: "", unitCost: "" });
      fetchMaterials();
    }
  };

  const isLowStock = (stock) => {
    return Number(stock) <= 5;
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Materials</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAdd(!showAdd)}
        >
          + Add Material
        </button>
      </div>

      {showAdd && (
        <div className="card p-3 mb-4">
          <input
            type="text"
            placeholder="Material Name"
            className="form-control mb-2"
            value={newMaterial.name}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Stock"
            className="form-control mb-2"
            value={newMaterial.stock}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, stock: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Unit Cost"
            className="form-control mb-2"
            value={newMaterial.unitCost}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, unitCost: e.target.value })
            }
          />

          <button
            className="btn btn-success"
            onClick={handleAddMaterial}
          >
            {t("Save")}
          </button>
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>{t("materialName")}</th>
            <th>{t("materialQuantity")}</th>
            <th>{t("unitCost")}</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr
              key={material.id}
              style={{
                backgroundColor: isLowStock(material.stock)
                  ? "#f8d7da"
                  : "transparent"
              }}
            >
              <td>{material.name}</td>
              <td>{material.stock}</td>
              <td>${material.unitCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Materials;
