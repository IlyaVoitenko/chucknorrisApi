import React from "react";

const CardJoke = ({ joke }) => {
  const { id, value, updated_at } = joke;
  console.log(joke);
  return (
    <div className="message">
      <div>
        <div className="containerIconMessage">
          <img
            className="iconMessage"
            src="https://img.icons8.com/windows/50/000000/chat-message.png"
            alt="icon"
          />
        </div>
      </div>
      <div className="containerText">
        <span>id:{id}</span>
        <p>{value}</p>
        <p className="dataOfMessage">{updated_at}</p>
        <button className="selectedCategorie">Categorie</button>
      </div>
    </div>
  );
};
export default CardJoke;
