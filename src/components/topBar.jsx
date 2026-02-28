import { FaBars } from "react-icons/fa";

function TopBar({ toggle }) {
  return (
    <div className="topbar">
      <FaBars className="menu-icon" onClick={toggle} />
    </div>
  );
};

export default TopBar;