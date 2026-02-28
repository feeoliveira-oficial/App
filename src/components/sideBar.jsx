import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen }) {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/clients", label: "Clients" },
    { path: "/services", label: "Services" },
    { path: "/materials", label: "Materials" },
    { path: "/settings", label: "Settings" }
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <ul className="nav flex-column p-3">
          {menuItems.map((item) => (
            <li className="nav-item mb-2" key={item.path}>
              <Link
                to={item.path}
                className={`nav-link sidebar-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                {t(item.label)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
