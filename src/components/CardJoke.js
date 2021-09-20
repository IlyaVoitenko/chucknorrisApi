import React from "react";
import style from "./css/CardJoke.module.css";
import consts from "./consts";
const { baseURL } = consts;
const CardJoke = ({
  joke,
  dispatch,
  stateSelectedRadio,
  styleBtnCardFavorite,
  btnFavoriteJokeClicked,
  CardJokeDiv,
  favoritesJokes = [],
}) => {
  const { id, value, updated_at } = joke;
  const isFavourite = !!favoritesJokes.find((favoritesJoke) => {
    return favoritesJoke.id === id;
  });
  function filterAddOrDeleteJoke(isFavourite) {
    if (isFavourite) {
      dispatch({
        type: "deleteFavoriteJoke",
        payload: joke,
      });
    } else {
      dispatch({
        type: "addFavoriteJoke",
        payload: joke,
      });
    }
  }
  if (joke.id === undefined) return null;
  return (
    <div className={style.container}>
      <div className={CardJokeDiv}>
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
              className={btnFavoriteJokeClicked}
              onClick={() => {
                filterAddOrDeleteJoke(isFavourite);
              }}
            >
              &#10084;
            </button>
          </div>
          <p>{value}</p>
          <p className={style.dataOfMessage}>last update: {updated_at}</p>

          {stateSelectedRadio !== "random" &&
          stateSelectedRadio !== "search" &&
          stateSelectedRadio !== "categories" ? (
            <button className={styleBtnCardFavorite}>
              {stateSelectedRadio}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default CardJoke;
