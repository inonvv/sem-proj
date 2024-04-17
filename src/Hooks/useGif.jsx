import torch from "../assets/gif_torch.gif";
import book from "../assets/giphy_book.gif";
import heart from "../assets/giphy_heart.gif";

//עשיתי זאת בשביל להפריד בלוגיקה ולפשט את הקומפוננטה
export const useGif = () => {
  const gifs = { homepage: book, adventure: torch, romance: heart };

  const getGif = (refrence) => {
    return gifs[refrence];
  };

  return { getGif };
};
