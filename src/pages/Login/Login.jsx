import { PageBackGround } from "../../components/PageBackGround/PageBackGround";
import { LoginForm } from "../../components/LoginFrom/LoginForm";
import Typography from "@mui/material/Typography";

export const Login = ({}) => {
  return (
    <PageBackGround>
      <Typography
        variant="h3"
        color="saddlebrown"
        style={{ fontFamily: "Georgia, sans-serif" }}
      >
        Login
      </Typography>
      <LoginForm></LoginForm>
    </PageBackGround>
  );
};
