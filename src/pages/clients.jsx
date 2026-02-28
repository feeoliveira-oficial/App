import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleDeleteClient = async () => 
  {
    if (!selectedClient) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmDelete) return;

    try {
    const response = await fetch(
      `http://localhost:5000/clients/${selectedClient.id}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {
      alert("Client deleted");
      setSelectedClient(null);
      fetchClients();
    }
    } catch (error) {
    console.error(error);
    }
  };
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [services, setServices] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    description: "",
    totalCharged: "",
    totalReceived: "",
  });

  /* ===============================
     FETCH CLIENTS
  =============================== */

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:5000/clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  /* ===============================
     FETCH SERVICES WHEN CLIENT SELECTED
  =============================== */

  useEffect(() => {
    if (selectedClient) {
      fetch(
        `http://localhost:5000/services/client/${selectedClient.id}`
      )
        .then((res) => res.json())
        .then((data) => setServices(data))
        .catch((err) => console.error(err));
    }
  }, [selectedClient]);

  /* ===============================
     STATUS COLOR
  =============================== */

  const getStatusColor = (status) => {
    if (!status) return "gray";
    const cleanStatus = status.trim().toLowerCase();

    switch (cleanStatus) {
      case "pending":
        return "#dc3545";
      case "paid":
        return "#198754";
      case "attention":
        return "#0d6efd";
      case "premium":
        return "#6f42c1";
      default:
        return "gray";
    }
  };

  /* ===============================
     UPDATE CLIENT
  =============================== */

  const handleUpdate = (field, value) => {
    setSelectedClient({
      ...selectedClient,
      [field]: value,
    });
  };

  const saveClientChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/clients/${selectedClient.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: selectedClient.address,
            phone: selectedClient.phone,
            email: selectedClient.email,
            status: selectedClient.status,
          }),
        }
      );

      if (response.ok) {
        alert("Client updated!");
        setSelectedClient(null);
        fetchClients();
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  /* ===============================
     ADD SERVICE
  =============================== */

  const handleAddService = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/services",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId: selectedClient.id,
            description: newService.description,
            totalCharged: newService.totalCharged,
            totalReceived: newService.totalReceived,
          }),
        }
      );

      if (response.ok) {
        setShowAddService(false);
        setNewService({
          description: "",
          totalCharged: "",
          totalReceived: "",
        });

        const updated = await fetch(
          `http://localhost:5000/services/client/${selectedClient.id}`
        );
        const data = await updated.json();
        setServices(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ===============================
     RENDER
  =============================== */

  return (
    <div className="dashboard-main">

      {/* HEADER */}
      <div className="clients-header d-flex justify-content-between align-items-center mb-4">
        <h2>{t("Clients")}</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-client")}
        >
          + {t("AddClient")}
        </button>
      </div>

      {/* CLIENT LIST */}
      {!selectedClient && (
        <ul className="list-group">
          {clients.map((client) => (
            <li
              key={client.id}
              className="list-group-item d-flex align-items-center"
              onClick={() => setSelectedClient(client)}
              style={{ cursor: "pointer" }}
            >
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: getStatusColor(client.status),
                  marginRight: "10px",
                  display: "inline-block",
                }}
              ></span>

              {client.name}
            </li>
          ))}
        </ul>
      )}

      {/* CLIENT DETAIL */}
      {selectedClient && (
        <div className="card p-4">
          <h3>{selectedClient.name}</h3>

          <label className="mt-3">{t("Address")}</label>
          <input
            type="text"
            className="form-control mb-3"
            value={selectedClient.address || ""}
            onChange={(e) =>
              handleUpdate("address", e.target.value)
            }
          />

          <label>{t("Phone")}</label>
          <input
            type="text"
            className="form-control mb-3"
            value={selectedClient.phone || ""}
            onChange={(e) =>
              handleUpdate("phone", e.target.value)
            }
          />

          <label>{t("Email")}</label>
          <input
            type="email"
            className="form-control mb-3"
            value={selectedClient.email || ""}
            onChange={(e) =>
              handleUpdate("email", e.target.value)
            }
          />

          <label>{t("Status")}</label>
          <select
            className="form-select mb-3"
            value={selectedClient.status || ""}
            onChange={(e) =>
              handleUpdate("status", e.target.value)
            }
          >
            <option value="pending">{t("Pending")}</option>
            <option value="paid">{t("Paid")}</option>
            <option value="attention">{t("NeedsAttention")}</option>
            <option value="premium">{t("Premium")}</option>
          </select>

          <div className="d-flex gap-2 mb-4">
            <button
              className="btn btn-success"
              onClick={saveClientChanges}
            >
              {t("Save")}
            </button>

            <button
              className="btn btn-danger"
              onClick={handleDeleteClient}
              >
              {t("Delete")}
              </button>

            <button
              className="btn btn-secondary"
              onClick={() => setSelectedClient(null)}
            >
              {t("Back")}
            </button>
          </div>

          <hr />

          <h4>{t("servicesTitle")}</h4>

          <ul className="list-group mb-3">
            {services.map((service) => (
              <li key={service.id} className="list-group-item">
                <strong>{service.description}</strong><br />
                Charged: ${service.totalCharged} | 
                Received: ${service.totalReceived}
              </li>
            ))}
          </ul>

          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowAddService(!showAddService)}
          >
            {t("addService")}
          </button>

          {showAddService && (
            <div className="card p-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className="form-control mb-2"
                placeholder="Total Charged"
                value={newService.totalCharged}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    totalCharged: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className="form-control mb-2"
                placeholder="Total Received"
                value={newService.totalReceived}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    totalReceived: e.target.value,
                  })
                }
              />

              <button
                className="btn btn-success"
                onClick={handleAddService}
              >
                {t("saveService")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Clients;