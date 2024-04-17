import react, { useContext, useEffect } from "react";
import { PageBackGround } from "../../components/PageBackGround/PageBackGround";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { UserContext } from "../../App";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";

export const Register = ({}) => {
  let nav = useNavigate();

  const { userName, setUserName } = useContext(UserContext);
  useEffect(() => {
    // console.log(userName);
    if (userName) {
      nav("/");
    }
  });
  return (
    <PageBackGround>
      <Typography
        variant="h3"
        color="saddlebrown"
        style={{ fontFamily: "Georgia, sans-serif" }}
      >
        Register
      </Typography>
      <RegisterForm></RegisterForm>
    </PageBackGround>
  );
};
