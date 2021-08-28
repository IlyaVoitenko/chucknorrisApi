import React, { useReducer } from "react";
import CardJoke from "./CardJoke";
const RANDOM = "random";
const RANDOM_BY_CATEGORIE = "randombycategorie";
const SEARCH_JOKES = "search";
const SelectCategories = ({
  initialState = {
    randomJoke: {},
    categories: [],
    jokeByCategorie: {},
    searchJokes: [],
    typeOfJoke: RANDOM,
  },
}) => {
  function searchJokes({ target }) {
    fetch(`https://api.chucknorris.io/jokes/search?query=${target.value}`)
      .then((data) => data.json())
      .then((searchJoke) => {
        return dispatch({
          payload: searchJoke.result,
          type: "setSearchJoke",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
  function randomJoke() {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((data) => data.json())
      .then((data) => {
        dispatch({ payload: data, type: "setRandomJoke" });
        return;
      });
  }
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
      case "setSearchJoke":
        return {
          ...state,
          searchJokes: action.payload,
          typeOfJoke: SEARCH_JOKES,
        };
      default:
        throw "Bad action type";
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const currentJoke =
    state.typeOfJoke === RANDOM ? state.randomJoke : state.jokeByCategorie;
  if (state.searchJokes !== undefined) {
  }
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
            <label htmlFor="random">
              <input
                name="down"
                type="radio"
                value="random"
                id="random"
                onClick={randomJoke}
              ></input>
              random
            </label>
            <p></p>
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
              <p></p>
              <label htmlFor="search">
                <input
                  type="radio"
                  value="search"
                  id="search"
                  name="down"
                ></input>
                Search
              </label>
              <input
                type="text"
                placeholder="Search a joke"
                onChange={(event) => searchJokes(event)}
              ></input>
            </div>
          </form>
        </div>
      </div>
      <p></p>
      {state.typeOfJoke === SEARCH_JOKES && state.searchJokes !== undefined ? (
        state.searchJokes.map((searchJoke) => {
          console.log(searchJoke);
          return <CardJoke joke={searchJoke}></CardJoke>;
        })
      ) : (
        <CardJoke joke={currentJoke}></CardJoke>
      )}
    </div>
  );
};
export default SelectCategories;
