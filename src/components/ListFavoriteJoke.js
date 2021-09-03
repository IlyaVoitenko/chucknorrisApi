import React from "react";
import "./css/CardJoke.css";

const ListFavoriteJoke = ({ favoritesJokes, dispatch }) => {
  return (
    <div className="container">
      <h3>Favorites</h3>
      {favoritesJokes.map((joke) => {
        return (
          <div className="message" key={joke.id}>
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
                <span>id:{joke.id}</span>
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
              <p>{joke.value}</p>
              <p className="dataOfMessage">last update: {joke.updated_at}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ListFavoriteJoke;
