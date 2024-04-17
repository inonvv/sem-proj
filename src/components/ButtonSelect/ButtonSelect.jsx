import react from "react";
import "./ButtonSelect.css";

export const ButtonSelect = ({ text, onclick }) => {
  return (
    <div className="ButtonSelectContainer">
      <button
        onClick={() => {
          onclick();
        }}
      >
        {text}
      </button>
    </div>
  );
};
