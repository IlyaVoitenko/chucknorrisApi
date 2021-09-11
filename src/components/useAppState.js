import { useEffect, useReducer } from "react";
import ConstsTypeJokes from "./const";
import consts  from "./const"

const {RANDOM, BASE_URL, DELETE_FAVORITE_JOKE} = consts

const initialState = {
  favoriteJokes: [],
  randomJoke: {},
  categories: [],
  jokeByCategorie: {},
  searchJokes: [],
  typeOfJoke: RANDOM,
  jokes: [],
  queryString: "",
};
const useJoke = () => {
  function getJokes(queryString, typeReducer, { target }) {
    let query = "";
    typeReducer !== "setRandomJoke" ? (query = target.value) : console.log();

    fetch(BASE_URL + queryString + query)
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
      })
      .catch((err) => {
        console.log(err);
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
      case DELETE_FAVORITE_JOKE:
        let newFavoriteJoke = state.favoriteJokes.filter(
          (joke) => joke.id !== action.payload
        );
        return {
          ...state,
          favoriteJokes: newFavoriteJoke,
        };
      case ADD_FAVORITE_JOKE:
        return {
          ...state,
          favoriteJokes: [...state.favoriteJokes, { ...action.payload }],
        };
      case SET_RANDOM_JOKE:
        return {
          ...state,
          randomJoke: action.payload,
          typeOfJoke: RANDOM,
        };
      case SET_CATEGORIES_OF_JOKES:
        return { ...state, categories: action.payload };
      case SET_JOKE_BY_CATEGORIE:
        return {
          ...state,
          jokeByCategorie: action.payload,
          typeOfJoke: RANDOM_BY_CATEGORIE,
        };
      case SET_SEARCH_JOKE:
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
    state.typeOfJoke === RANDOM
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
