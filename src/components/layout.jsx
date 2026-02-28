import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";
import TopBar from "./topBar";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <TopBar toggle={() => setIsOpen(!isOpen)} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
