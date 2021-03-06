import React from "react";
import "./css/CardJoke.css";

//TODO: add favorite state for cards in the main part(not aside)
const CardJoke = ({ joke, dispatch }) => {

  const { id, value, updated_at } = joke;
  //look for full link in th joke object
  let link = "https://api.chucknorris.io/jokes/";
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
            <span>
            {/* don't use + with string */}
              ID:<a href={link + id}>{id}</a>
            </span>
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
