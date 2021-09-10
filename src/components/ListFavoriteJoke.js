import React from "react";
import style from "./css/FavoriteJokes.module.css";
import Consts from "./useConsts";
const ListFavoriteJoke = ({ favoritesJokes, dispatch }) => {
  let baseURL = "https://api.chucknorris.io/jokes/";
  console.log("favoritesJokes ", favoritesJokes);
  return (
    <div className={style.containerFavoritesJokes}>
      <h3>Favorites</h3>
      {favoritesJokes.map((joke) => {
        return (
          <div className={style.FavoriteJokeContainer} key={joke.id}>
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
                <span>
                  id:
                  <a href={(baseURL, joke.id)} className="linkID">
                    {joke.id}
                  </a>
                </span>
                <span
                  className={style.iconFavoriteJoke}
                  onClick={() => {
                    dispatch({
                      type: Consts.DELETE_FAVORITE_JOKE,
                      payload: joke.id,
                    });
                  }}
                >
                  &#10084;
                </span>
              </div>
              <p className={style.jokeValue}>{joke.value}</p>
              <p className={style.lastUpdate}>last update: {joke.updated_at}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ListFavoriteJoke;
