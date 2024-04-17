import react from "react";
import "./Content.css";
export const Content = ({ content, title }) => {
  return (
    <div className="ContentContainer">
      <h3>{title}</h3>
      {content}
    </div>
  );
};
