import React from "react";
import style from "./css/CardJoke.module.css";
import Consts from "./useConsts";
const CardJoke = ({ joke, dispatch, selectedCategorie }) => {
  const { id, value, updated_at } = joke;
  console.log("CardJoke:", selectedCategorie);
  let baseURL = "https://api.chucknorris.io/jokes/";
  return (
    <div className={style.container}>
      <div className={style.message}>
        <div className={style.iconDiv}>
          <div className={style.containerIconMessage}>
            <img
              className={style.iconMessage}
              src="https://img.icons8.com/windows/50/000000/chat-message.png"
              alt="icon"
            />
          </div>
        </div>
        <div className={style.Joke}>
          <div>
            <span className={style.linkID}>
              ID:<a href={(baseURL, id)}>{id}</a>
            </span>
            <button
              className={style.btnFavoriteJoke}
              onClick={() => {
                dispatch({
                  type: Consts.ADD_FAVORITE_JOKE,
                  payload: joke,
                });
              }}
            >
              &#10084;
            </button>
          </div>
          <p>{value}</p>
          <p className={style.dataOfMessage}>last update: {updated_at}</p>
          {selectedCategorie !== null ? (
            <button className={style.btnCategorie}>{selectedCategorie}</button>
          ) : (
            console.log()
          )}
        </div>
      </div>
    </div>
  );
};
export default CardJoke;
