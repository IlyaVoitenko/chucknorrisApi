import React from "react";
import CardJoke from "./CardJoke";
import style from "./css/FavoriteJokes.module.css";
const ListFavoriteJoke = ({
  favoritesJokes = [],
  dispatch,
  addOrDeleteJoke,
}) => {
  return (
    <div className={style.containerFavoritesJokes}>
      <h3>Favorites</h3>
      {favoritesJokes.map((joke) => {
        return (
          <div key={joke.id}>
            <CardJoke
              favoritesJokes={favoritesJokes}
              joke={joke}
              dispatch={dispatch}
            ></CardJoke>
          </div>
        );
      })}
    </div>
  );
};
export default ListFavoriteJoke;
