import React, { useState } from "react";
import style from "./css/CardJoke.module.css";
const CardJoke = ({ joke, dispatch, selectedCategorie, stateDispatch }) => {
  const { id, value, updated_at } = joke;
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
                //"addFavoriteJoke"
                console.log("type:::", stateDispatch);
                dispatch({
                  type: stateDispatch,
                  payload: joke,
                });
              }}
            >
              &#10084;
            </button>
          </div>
          <p>{value}</p>
          <p className={style.dataOfMessage}>last update: {updated_at}</p>

          {selectedCategorie !== "random" && selectedCategorie !== "search" ? (
            <button className={style.btnCategorie}>{selectedCategorie}</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default CardJoke;
