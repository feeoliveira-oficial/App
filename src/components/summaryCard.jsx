import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SummaryCard = ({
  title,
  value,
  isHidden,
  toggleHidden,
  showToggle = false
}) => {
  return (
    <div className="card revenue-card">
      <h3>{title}</h3>

      <div className="summary-value">
        {isHidden ? "•••••" : value}

        {showToggle && (
          <button onClick={toggleHidden} className="eye-btn">
            {isHidden ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
