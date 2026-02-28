import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function AddClient() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    totalCharged: "",
    totalReceived: "",
    status: "pending"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Client added successfully!");

        setForm({
          name: "",
          address: "",
          phone: "",
          email: "",
          totalCharged: "",
          totalReceived: "",
          status: "pending"
        });

        navigate("/clients");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h3 className="mb-4">{t("AddClient")}</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">{t("Name")}</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("Address")}</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("Phone")}</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("Email")}</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">{t("TotalCharged")}</label>
              <input
                type="number"
                name="totalCharged"
                className="form-control"
                value={form.totalCharged}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">{t("TotalReceived")}</label>
              <input
                type="number"
                name="totalReceived"
                className="form-control"
                value={form.totalReceived}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">{t("Status")}</label>
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
            >
              <option value="pending">{t("Pending")}</option>
              <option value="paid">{t("Paid")}</option>
              <option value="attention">{t("NeedsAttention")}</option>
              <option value="premium">{t("Premium")}</option>
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/clients")}
            >
              {t("Cancel")}
            </button>

            <button type="submit" className="btn btn-primary">
              {t("Save")}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddClient;