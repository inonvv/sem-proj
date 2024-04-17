import react from "react";
import { TextField } from "@mui/material";

import "./CustomInput.css";
export const CustomInput = ({ input, setInput, label, variant }) => {
  return (
    <div className="CustomInputContainer">
      <TextField
        id="outlined-basic"
        variant={variant}
        label={label}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </div>
  );
};
