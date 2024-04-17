import react, { useContext, useEffect, useState } from "react";
import { PageBackGround } from "../../components/PageBackGround/PageBackGround";
import { Content } from "../../components/Content/Content";
import {
  intro,
  Stories,
  segments,
  choicesArr,
} from "../../paragraphSets/paragraph";
import { ButtonSelect } from "../../components/ButtonSelect/ButtonSelect";
import { useLocation, useNavigate } from "react-router";
import "./StoryPart.css";
import { UserContext } from "../../App";
import { useGif } from "../../Hooks/useGif";
export const StoryPart = ({}) => {
  const { userName, setUserHistory } = useContext(UserContext);

  const [segment, setSegment] = useState();
  const [Stories, setStories] = useState();
  const [choices, setchoices] = useState();
  const { getGif } = useGif();

  const { state } = useLocation();
  const nav = useNavigate();

  //?convert to catagory
  const idToCatagory = (id) => {
    const obje = { 1: "adventure", 2: "romance" };
    return obje[id];
  };

  const handleChoiceClick = (choice) => {
    //בודק אם יש היסטוריה
    if (!Array.isArray(state?.prevArr)) {
      //אם לא מאתחל מערך ריק
      state.prevArr = [];
    }
    //בכל מקרה עוברים לעמוד הבא
    nav("/StoryPart", {
      state: {
        //עובר לתוכן של הבחירה שלחצו עליה
        id: choice.destination_segment_id,
        //מעדכנים היסטוריה להכיל את העמוד הנוכחי
        prevArr: [...state.prevArr, state.id],
      },
    });
  };

  const movePrev = () => {
    //שומר את דף האחרון בהיסטוריה ומוציא אותו מהמערך
    const stetPrev = state.prevArr.pop();
    nav("/StoryPart", {
      state: {
        //בעזרת הסטייט עוברים לעמוד האחרון הנוכחי
        id: stetPrev,
        prevArr: state.prevArr,
      },
    });
  };
  useEffect(() => {
    //כאשר הסטייט נטען אפשר להשתמש בתוכן
    const { id } = state;
    //מעדכן היסטוריית משתמש
    setUserHistory(userName, id, state.prevArr);
    //שולפים את הסגמנט למשתנה[מקבלים מערך]
    const par = segments.filter((seg) => {
      if (seg._id == id) {
        return true;
      }
      return false;
    });
    // יודע שבמערך תמיד יהיה רק איבר אחד ורק אליו ניגש(יכול להיות שאין שם כלום)
    setSegment(par[0]);

    //שומרים את כל מי שיש לו סגמנט איידי זהה במערך
    const choicestemp = choicesArr.filter((choice) => {
      if (choice.origin_segment_id == id) {
        return true;
      }
      return false;
    });
    // כאן מעדכן את הבחירות במסך על פי use state
    setchoices(choicestemp);
  }, [state]);

  return (
    <PageBackGround>
      <div className="homepageBtn">
        <ButtonSelect
          text={"Home page"}
          onclick={() => {
            nav("/");
          }}
        ></ButtonSelect>
      </div>

      <div className="gifs">
        {/*  בהוק שיכול להביא לי כתובת של תמונה לפי קטגוריה */}

        <img src={getGif(idToCatagory(segment?.story_id))} alt="book" />
        <img src={getGif(idToCatagory(segment?.story_id))} alt="book" />
      </div>

      <Content content={segment?.content} title={segment?.title}></Content>
      <div className="buttonsPlacement">
        {choices?.map((choice) => {
          return (
            <ButtonSelect
              text={choice.content}
              onclick={() => {
                handleChoiceClick(choice);
              }}
            ></ButtonSelect>
          );
        })}
        {/* מוודא שיש מערך של היסטוריה ושגודלו אינו 0 */}
        {Array.isArray(state?.prevArr) && state?.prevArr.length != 0 && (
          <ButtonSelect
            text={"prev"}
            onclick={() => {
              movePrev();
            }}
          ></ButtonSelect>
        )}
      </div>
    </PageBackGround>
  );
};
