import "./LoginForm.css";
import { CustomLabel } from "../CustomLabel/CustomLabel";
import { CustomInput } from "../CustomInput/CustomInput";
import { ButtonSelect } from "../ButtonSelect/ButtonSelect";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const LoginForm = ({}) => {
  const [showAlert, setShowAlert] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { bringUser, setUserName } = useContext(UserContext);

  let nav = useNavigate();

  const handleLogIn = () => {
    let cu = bringUser(username, password);
    //? error if its just a string!
    if (typeof cu == "string") {
      setShowAlert(cu);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      //?here is an object and all ok
    } else if (cu) {
      localStorage.setItem("CurrentUser", JSON.stringify(cu));

      setUserName(cu.username);
      nav("/");
    } else {
      //todo whaat if need different msg?
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };
  return (
    <div>
      {showAlert === true ? (
        <Stack>
          <Alert severity="error">Incorrect inputs try again!</Alert>
        </Stack>
      ) : (
        typeof showAlert == "string" && (
          <Stack>
            <Alert severity="error">{showAlert}</Alert>
          </Stack>
        )
      )}
      <div className="LoginFormContainer">
        <CustomInput
          input={username}
          setInput={setUsername}
          label="Username"
          variant="outlined"
        ></CustomInput>
        <CustomInput
          input={password}
          setInput={setPassword}
          label="Password"
          variant="outlined"
        ></CustomInput>
        <ButtonSelect
          text={"Log"}
          onclick={() => {
            handleLogIn();
          }}
        ></ButtonSelect>
        <Link
          to="/Register"
          style={{
            textDecoration: "none",
            color: "saddlebrown",
            fontSize: "16px",
          }}
        >
          Need To Register? Click Here
        </Link>
      </div>
    </div>
  );
};
