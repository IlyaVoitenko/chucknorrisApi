import React, { useEffect, useState } from "react";
import Message from "./message";
const List = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div>
      <header>
        <h3>MSI 2020</h3>
      </header>
      <div className="main">
        <h2>Hey!</h2>
        <h3>Let's try to find a joke for you:</h3>
        <div>
          <input type="radio" value="random" id="random"></input>
          Random
        </div>

        <div>
          <input
            type="radio"
            value="from categories"
            id="from categories"
          ></input>
          From categories
        </div>

        <div>
          <input type="radio" value="search" id="search"></input>
          Search
        </div>
      </div>
      <button>Get a joke</button>
      <p></p>
      <Message list={data}></Message>
    </div>
  );
};
export default List;
