import { useEffect, useReducer } from "react";
import ConstsTypeJokes from "./useConstsTypeJokes";
const Consts = ConstsTypeJokes();
const baseURL = "https://api.chucknorris.io/jokes/";
const initialState = {
  favoriteJokes: [],
  randomJoke: {},
  categories: [],
  jokeByCategorie: {},
  searchJokes: [],
  typeOfJoke: Consts.RANDOM,
  jokes: [],
  queryString: "",
};
const useJoke = () => {
  function getJokes(queryString, typeReducer, { target }) {
    let query = "";
    typeReducer !== "setRandomJoke" ? (query = target.value) : console.log();
    fetch(baseURL + queryString + query)
      .then((data) => data.json())
      .then((joke) => {
        typeReducer === "setSearchJoke"
          ? dispatch({
              payload: joke.result,
              type: typeReducer,
            })
          : dispatch({
              payload: joke,
              type: typeReducer,
            });
      });
  }
  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((dataOfCategories) => dataOfCategories.json())
      .then((dataOfCategories) => {
        return dispatch({
          payload: dataOfCategories,
          type: "setCategoriesOfJokes",
        });
      });
  }, []);
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
        return {
          ...state,
          randomJoke: action.payload,
          typeOfJoke: Consts.RANDOM,
        };
      case "setCategoriesOfJokes":
        return { ...state, categories: action.payload };
      case "setjokeByCategorie":
        return {
          ...state,
          jokeByCategorie: action.payload,
          typeOfJoke: Consts.RANDOM_BY_CATEGORIE,
        };
      case "setSearchJoke":
        return {
          ...state,
          searchJokes: action.payload,
          typeOfJoke: Consts.SEARCH_JOKES,
        };
      default:
        throw "Bad action type";
    }
  };
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const currentJoke =
    state.typeOfJoke === Consts.RANDOM
      ? state.randomJoke
      : state.jokeByCategorie;

  return {
    dispatch,
    state,
    currentJoke,
    getJokes,
  };
};
export default useJoke;
