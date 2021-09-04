import React from "react";
import "./css/FavoriteJokes.css";

const ListFavoriteJoke = ({ favoritesJokes, dispatch }) => {
  let link = "https://api.chucknorris.io/jokes/";
  return (
    <div className="containerFavoritesJokes">
      <h3>Favorites</h3>
      {favoritesJokes.map((joke) => {
        return (
          <div className="FavoriteJokeContainer" key={joke.id}>
            <div className="iconDiv">
              <div className="containerIconMessage">
                <img
                  className="iconMessage"
                  src="https://img.icons8.com/windows/50/000000/chat-message.png"
                  alt="icon"
                />
              </div>
            </div>
            <div className="Joke">
              <div>
                <span>
                  id:
                  <a href={link + joke.id} className="linkID">
                    {joke.id}
                  </a>
                </span>
                <span
                  className="iconFavoriteJoke"
                  onClick={() => {
                    dispatch({
                      type: "deleteFavoriteJoke",
                      payload: joke.id,
                    });
                  }}
                >
                  &#10084;
                </span>
              </div>
              <p className="jokeValue">{joke.value}</p>
              <p className="lastUpdate">last update: {joke.updated_at}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ListFavoriteJoke;
