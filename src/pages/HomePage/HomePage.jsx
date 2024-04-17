import { PageBackGround } from "../../components/PageBackGround/PageBackGround";
import { Content } from "../../components/Content/Content";
import { intro } from "../../paragraphSets/paragraph";
import { ButtonSelect } from "../../components/ButtonSelect/ButtonSelect";
import { useNavigate } from "react-router-dom";
import { useGif } from "../../Hooks/useGif";
import "./HomePage.css";
import { useContext, useEffect, useState } from "react";
import { CustomLabel } from "../../components/CustomLabel/CustomLabel";
import { UserContext } from "../../App";
import Typography from "@mui/material/Typography";

export const HomePage = ({}) => {
  const { userName, setUserName } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [connctedEmail, setConnctedEmail] = useState("");
  const { getGif } = useGif();
  let nav = useNavigate();

  const onNavi = (id) => {
    //מביא אותי לתחילת הסיפור
    let dataObj = { id };
    nav("/StoryPart", { state: dataObj });
  };

  useEffect(() => {
    //בודקים אם יש משתמש ואם הוא  מחובר
    if (userName) {
      setConnctedEmail(userName);
      let users = JSON.parse(localStorage.getItem("users"));
      users = users.filter((user) => {
        if (user.username == userName) {
          return true;
        } else {
          return false;
        }
      });
      // console.log(users);

      if (users.length != 0 && users[0]?.history) {
        setUser(users[0]);
      }
    }
  }, [userName]);

  return (
    <PageBackGround>
      {connctedEmail == "" ? (
        <div className="headers">
          <ButtonSelect
            text={"Login"}
            onclick={() => {
              nav("/Login");
            }}
          ></ButtonSelect>
          <ButtonSelect
            text={"Register"}
            onclick={() => {
              nav("/Register");
            }}
          ></ButtonSelect>
        </div>
      ) : (
        <div className="headers">
          <ButtonSelect
            text={"Log Out"}
            onclick={() => {
              localStorage.removeItem("CurrentUser");
              setUserName("");
              nav("/Login");
            }}
          ></ButtonSelect>

          <CustomLabel text={connctedEmail}></CustomLabel>
        </div>
      )}

      <div className="gifs">
        <img src={getGif("homepage")} alt="book" />
        <img src={getGif("homepage")} alt="book" />
      </div>
      <Typography
        variant="h3"
        color="rgba(255, 140, 0, 1)"
        style={{
          fontFamily: "Georgia, sans-serif",
          background: "saddlebrown",
          margin: "1rem",
          padding: "0.3rem",
          borderRadius: "20px",
        }}
      >
        Welcome To Interactive StoryTelling
      </Typography>

      <Content content={intro}></Content>
      <div className="buttonsPlacement">
        <ButtonSelect
          text={"Comic"}
          onclick={() => {
            if (!connctedEmail) {
              nav("/Login");
            } else {
              onNavi(3);
            }
          }}
        />
        <ButtonSelect
          text={"Romance"}
          onclick={() => {
            if (!connctedEmail) {
              nav("/Login");
            } else {
              onNavi(10);
            }
          }}
        />
        <ButtonSelect
          text={"Adventure"}
          onclick={() => {
            if (!connctedEmail) {
              nav("/Login");
            } else {
              onNavi(1);
            }
          }}
        />
        {connctedEmail != "" && user.history && (
          <ButtonSelect
            text={"Continue"}
            onclick={() => {
              nav("/StoryPart", {
                state: { id: user.history, prevArr: user.prevArr },
              });
            }}
          />
        )}
      </div>
    </PageBackGround>
  );
};
