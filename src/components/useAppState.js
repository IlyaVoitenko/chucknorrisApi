import { useEffect, useReducer } from "react";
import ConstsTypeJokes from "./useConsts";
const Consts = ConstsTypeJokes();

const initialState = {
  favoriteJokes: [],
  randomJoke: {},
  categories: [],
  jokeByCategorie: {},
  searchJokes: [],
  typeOfJoke: Consts.RANDOM,
  queryString: "",
};
const useJoke = () => {
  function getJokes(queryString, typeReducer, { target }) {
    
    //fix all to consts
    // typeReducer !== "setRandomJoke" ? (query = target.value) : console.log();

    const query = typeReducer !== "setRandomJoke" ? target.value : ''

    // string templates
    //IDEA currentJokes, showingJokes state where will be all types of jokes(random, byCategorie, bySearch)

    fetch(Consts.BASE_URL + queryString + query)
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
      case Consts.DELETE_FAVORITE_JOKE:
        // use const where it's possible always
        let newFavoriteJoke = state.favoriteJokes.filter(
          (joke) => joke.id !== action.payload
        );
        return {
          ...state,
          favoriteJokes: newFavoriteJoke,
        };
      case Consts.ADD_FAVORITE_JOKE:
        return {
          ...state,
          favoriteJokes: [...state.favoriteJokes, { ...action.payload }],
        };
      case Consts.SET_RANDOM_JOKE:
        return {
          ...state,
          randomJoke: action.payload,
          typeOfJoke: Consts.RANDOM,
        };
      case Consts.SET_CATEGORIES_OF_JOKES:
        return { ...state, categories: action.payload };
      case Consts.SET_JOKE_BY_CATEGORIE:
        // typeOfCurrentJoke
        return {
          ...state,
          jokeByCategorie: action.payload,
          typeOfJoke: Consts.RANDOM_BY_CATEGORIE,
        };
      case Consts.SET_SEARCH_JOKE:
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

