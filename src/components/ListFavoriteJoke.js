import React, { useState } from "react";
import CardJoke from "./CardJoke";
import style from "./css/FavoriteJokes.module.css";
const ListFavoriteJoke = ({ favoritesJokes, dispatch }) => {
  
  return (
    <div className={style.containerFavoritesJokes}>
      <h3>Favorites</h3>
      {favoritesJokes.map((joke) => {
        return (
          <div>
            <CardJoke
              joke={joke}
              dispatch={dispatch}
              deleteOrAddActionType={'addFavorite'}
            ></CardJoke>
          </div>
        );
      })}
    </div>
  );
};
export default ListFavoriteJoke;
