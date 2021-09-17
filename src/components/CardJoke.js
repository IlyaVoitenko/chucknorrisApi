import React from "react";
import style from "./css/CardJoke.module.css";
import consts from "./consts";
const { baseURL } = consts;
const CardJoke = ({
  joke,
  dispatch,
  selectedCategorie,
  favoritesJokes = [],
}) => {
  const { id, value, updated_at } = joke;
  // when you need to show favorite by heart check if joke in favorites massive
  const isFavourite = !!favoritesJokes.find((favoritesJoke) => {
    console.log(favoritesJoke);
    return favoritesJoke.id === joke.id;
  });
  function filterAddOrDeleteJoke(isFavourite) {
    if (isFavourite) {
      console.log("isFavorite :", isFavourite);
      dispatch({
        type: "deleteFavoriteJoke",
        payload: joke,
      });
    } else {
      console.log("isFavorite :", isFavourite);
      dispatch({
        type: "addFavoriteJoke",
        payload: joke,
      });
    }
  }
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
                filterAddOrDeleteJoke(isFavourite);
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
