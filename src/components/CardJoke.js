import React from "react";
import "./css/CardJoke.css";
const CardJoke = ({ joke, dispatch }) => {
  const { id, value, updated_at } = joke;
  return (
    <div className="container">
      <div className="message">
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
            <span>id:{id}</span>
            <button
              className="btnFavoriteJoke"
              onClick={() => {
                dispatch({
                  type: "addFavoriteJoke",
                  payload: joke,
                });
              }}
            >
              &#10084;
            </button>
          </div>
          <p>{value}</p>
          <p className="dataOfMessage">last update: {updated_at}</p>
          <button className="selectedCategorie">Categorie</button>
        </div>
      </div>
    </div>
  );
};
export default CardJoke;
