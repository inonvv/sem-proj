import react from "react";
import "./CustomLabel.css";
export const CustomLabel = ({ text }) => {
  return (
    <div className="CustomLabelContainer">
      <label>{text}</label>
    </div>
  );
};
