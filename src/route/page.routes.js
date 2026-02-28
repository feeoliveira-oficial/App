import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import Dashboard from "../pages/dashboard";
import Clients from "../pages/clients";
import AddClient from "../pages/addClient";
import Services from "../pages/services";
import Materials from "../pages/materials";
import Settings from "../pages/settings";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="add-client" element={<AddClient />} />
        <Route path="services" element={<Services />} />
        <Route path="materials" element={<Materials />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default PageRoutes;
