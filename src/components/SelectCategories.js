import React, { useEffect, useReducer } from "react";
import CardJoke from "./CardJoke";
const RANDOM = "random";
const RANDOM_BY_CATEGORIE = "randombycategorie";

const SelectCategories = ({
  initialState = {
    randomJoke: {},
    categories: [],
    jokeByCategorie: {},
    typeOfJoke: RANDOM,
  },
}) => {
  function selectedOption({ target }) {
    fetch(`https://api.chucknorris.io/jokes/random?category=${target.value}`)
      .then((data) => data.json())
      .then((jokeByCategorie) => {
        return dispatch({
          payload: jokeByCategorie,
          type: "setjokeByCategorie",
        });
      });
  }
  function fetchCategories() {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((dataOfCategories) => dataOfCategories.json())
      .then((dataOfCategories) => {
        return dispatch({
          payload: dataOfCategories,
          type: "setCategoriesOfJokes",
        });
      });
  }
  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((data) => data.json())
      .then((data) => {
        dispatch({ payload: data, type: "setRandomJoke" });
        return;
      });
  }, []);
  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "setRandomJoke":
        return { ...state, randomJoke: action.payload, typeOfJoke: RANDOM };
      case "setCategoriesOfJokes":
        return { ...state, categories: action.payload };
      case "setjokeByCategorie":
        return {
          ...state,
          jokeByCategorie: action.payload,
          typeOfJoke: RANDOM_BY_CATEGORIE,
        };
      default:
        throw "Bad action type";
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const currentJoke =
    state.typeOfJoke === RANDOM ? state.randomJoke : state.jokeByCategorie;
  return (
    <div>
      <header>
        <h3>MSI 2020</h3>
      </header>
      <div className="main">
        <h2>Hey!</h2>
        <h3>Let's try to find a joke for you:</h3>

        <div>
          <form>
            <label htmlFor="from categories">
              <input
                name="down"
                type="radio"
                value="from categories"
                id="from categories"
                onClick={fetchCategories}
              ></input>
              From categories
            </label>

            <select onChange={(event) => selectedOption(event)}>
              {state.categories.map((categorie) => {
                return (
                  <option key={categorie} value={categorie}>
                    {categorie}
                  </option>
                );
              })}
            </select>
            <div>
              <input
                type="radio"
                value="search"
                id="search"
                name="down"
              ></input>
              Search
            </div>
            <button>Get a joke</button>
          </form>
        </div>
      </div>
      <p></p>
      Random
      <CardJoke joke={currentJoke}></CardJoke>
    </div>
  );
};
export default SelectCategories;
