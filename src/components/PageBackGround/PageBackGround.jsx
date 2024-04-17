import react, { Children } from "react";
import React from "react";

import "./PageBackGround.css";
export const PageBackGround = React.forwardRef(({ children }, ref) => {
  return (
    <div className="PageBackGroundContainer" ref={ref}>
      {children}
    </div>
  );
});
