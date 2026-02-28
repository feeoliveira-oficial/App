import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  const totalServices = services.length;
  const completed = services.filter(s => s.status === t("serviceCompleted")).length;
  const inProgress = services.filter(s => s.status === t("serviceInProgress")).length;
  const late = services.filter(s => s.status === t("serviceLate")).length;
  const pendingPayment = services.filter(
    s => Number(s.totalReceived) < Number(s.totalCharged)
  ).length;

  return (
    <div className="container mt-4">

      {/* SUMMARY */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h6>{t("total")}</h6>
            <h4>{totalServices}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h6>{t("completed")}</h6>
            <h4>{completed}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h6>{t("inProgress")}</h6>
            <h4>{inProgress}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h6>{t("pendingPayment")}</h6>
            <h4>{pendingPayment}</h4>
          </div>
        </div>
      </div>

      {/* LIST */}
      {!selectedService && (
        <ul className="list-group">
          {services.map(service => (
            <li
              key={service.id}
              className="list-group-item"
              onClick={() => setSelectedService(service)}
              style={{ cursor: "pointer" }}
            >
              <strong>{service.description}</strong>
              <br />
              Charged: ${service.totalCharged} | 
              Received: ${service.totalReceived}
            </li>
          ))}
        </ul>
      )}

      {/* DETAIL */}
      {selectedService && (
        <div className="card p-4">
          <h4>{selectedService.description}</h4>

          <p><strong>Charged:</strong> ${selectedService.totalCharged}</p>
          <p><strong>Received:</strong> ${selectedService.totalReceived}</p>
          <p><strong>Status:</strong> {selectedService.status}</p>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-outline-primary"
              onClick={() =>
                navigate("/clients", {
                  state: { clientId: selectedService.clientId }
                })
              }
            >
              View Client
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setSelectedService(null)}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;