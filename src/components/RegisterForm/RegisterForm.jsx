import react, { useContext, useState } from "react";
import { CustomInput } from "../CustomInput/CustomInput";
import "./RegisterForm.css";
import { ButtonSelect } from "../ButtonSelect/ButtonSelect";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
export const RegisterForm = ({}) => {
  let nav = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userName, setUserName } = useContext(UserContext);

  const validation = (username, email, password, confirmPassword) => {
    // console.log(username, email, password, confirmPassword);
    if (!username || !email || !password || !confirmPassword) {
      return false;
    }
    if (password !== confirmPassword) {
      return false;
    }
    if (localStorage.getItem("users")) {
      let users = JSON.parse(localStorage.getItem("users"));
      const existingUser = users.find(
        (user) => user.username === username || user.email === email
      );
      if (existingUser) {
        return false;
      }
    }
    return true;
  };

  const handleRegister = (username, email, password, confirmPassword) => {
    if (validation(username, email, password, confirmPassword)) {
      let users = [];
      let user = { username: username, email: email, password: password };
      if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"));
      }
      users = [
        ...users,
        { username: username, email: email, password: password },
      ];
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("CurrentUser", JSON.stringify(user));
      setUserName(username);

      nav("/");
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };
  return (
    <div>
      {showAlert && (
        <Stack>
          <Alert severity="error">incorrect Password or user name exist!</Alert>
        </Stack>
      )}

      <div className="RegisterFormContainer">
        <CustomInput
          input={username}
          setInput={setUsername}
          label="Username"
          variant="outlined"
        ></CustomInput>

        <CustomInput
          input={email}
          setInput={setEmail}
          label="email"
          variant="outlined"
        ></CustomInput>

        <CustomInput
          input={password}
          setInput={setPassword}
          label="Password"
          variant="outlined"
        ></CustomInput>

        <CustomInput
          input={confirmPassword}
          setInput={setConfirmPassword}
          label="Confirm Password"
          variant="outlined"
        ></CustomInput>

        <ButtonSelect
          text={"Register"}
          onclick={() => {
            handleRegister(username, email, password, confirmPassword);
          }}
        ></ButtonSelect>
        <Link
          to="/Login"
          style={{
            textDecoration: "none",
            color: "saddlebrown",
            fontSize: "16px",
          }}
        >
          Allready with Acount? Click Here
        </Link>
      </div>
    </div>
  );
};
