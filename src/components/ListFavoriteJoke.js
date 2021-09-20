import React from "react";
import CardJoke from "./CardJoke";
import styleListFavorite from "./css/FavoriteJokes.module.css";
const ListFavoriteJoke = ({
  favoritesJokes = [],
  dispatch,
  btnFavoriteJokeClicked,
  CardJokeDiv,
  styleBtnCardFavorite,
}) => {
  return (
    <div className={styleListFavorite.containerFavoritesJokes}>
      <div>
        <h3>Favorites</h3>
      </div>
      <div>
        {favoritesJokes.map((joke) => {
          return (
            <div key={joke.id} className="favotiteJoke">
              <CardJoke
                CardJokeDiv={CardJokeDiv}
                btnFavoriteJokeClicked={btnFavoriteJokeClicked}
                styleBtnCardFavorite={styleBtnCardFavorite}
                favoritesJokes={favoritesJokes}
                joke={joke}
                dispatch={dispatch}
              ></CardJoke>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ListFavoriteJoke;
