import { useReducer } from "react";
const RANDOM = "random";
const RANDOM_BY_CATEGORIE = "randombycategorie";
const SEARCH_JOKES = "search";
const initialState = {
  favoriteJokes: [],
  randomJoke: {},
  categories: [],
  jokeByCategorie: {},
  searchJokes: [],
  typeOfJoke: RANDOM,
};
const useJoke = () => {
  function searchJokes({ target }) {
    if (!searchJokes.result && target.value.length > 2) {
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
      case "deleteFavoriteJoke":
        let newFavoriteJoke = state.favoriteJokes.filter(
          (joke) => joke.id !== action.payload
        );
        return {
          ...state,
          favoriteJokes: newFavoriteJoke,
        };
      case "addFavoriteJoke":
        return {
          ...state,
          favoriteJokes: [...state.favoriteJokes, { ...action.payload }],
        };
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
  return {
    dispatch,
    state,
    randomJoke,
    fetchCategories,
    selectedOption,
    searchJokes,
    currentJoke,
    SEARCH_JOKES,
    RANDOM,
    RANDOM_BY_CATEGORIE,
  };
};
export default useJoke;
