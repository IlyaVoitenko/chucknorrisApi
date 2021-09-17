import React, { useState } from "react";
import style from "./css/GetJokesByType.module.css";
import ListFavoriteJoke from "./ListFavoriteJoke";
import CardJoke from "./CardJoke";
import useJoke from "./useAppState";
import consts from "./consts";
const { state, getJokes, dispatch, currentJoke } = useJoke;
const { SEARCH_JOKES } = consts;
const GetJokesByType = () => {
  const [stateSelectedRadio, setStateSelectedRadio] = useState("");
  const [parametersGetJokes, setParametersGetJokes] = useState({});
  return (
    <div>
      <header>
        <h3>MSI 2020</h3>
      </header>
      <div className={style.main}>
        <h2>Hey!</h2>
        <h3>Let's try to find a joke for you:</h3>
        <div>
          <form>
            <label htmlFor={style.random}>
              <input
                name="down"
                type="radio"
                id={style.random}
                onChange={() => {
                  setStateSelectedRadio("random");
                  setParametersGetJokes({
                    link: "random",
                    typeCase: "setRandomJoke",
                    value: "",
                  });
                }}
              />
              random
            </label>
            <p></p>
            <label htmlFor="fromCategories">
              <input
                name="down"
                type="radio"
                id="fromCategories"
                onChange={() => {
                  setStateSelectedRadio("categories");
                }}
              />
              From categories
            </label>

            {stateSelectedRadio === "categories" ? (
              <div>
                {state.categories.map((categorie) => {
                  return (
                    <button
                      className={style.btnСategories}
                      key={categorie}
                      value={categorie}
                      onClick={(event) => {
                        event.preventDefault();
                        setStateSelectedRadio(categorie);
                        setParametersGetJokes({
                          link: "random?category=",
                          typeCase: "setjokeByCategorie",
                          value: event,
                        });
                      }}
                    >
                      {categorie}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div>
              <p></p>
              <label htmlFor="labelSearch">
                <input
                  type="radio"
                  name="down"
                  id="labelSearch"
                  onChange={() => {
                    setStateSelectedRadio("search");
                  }}
                />
                Search
              </label>
              {stateSelectedRadio === "search" ? (
                <input
                  type="text"
                  placeholder="Free text search..."
                  onChange={(event) => {
                    setParametersGetJokes({
                      link: "search?query=",
                      typeCase: "setSearchJoke",
                      value: event,
                    });
                  }}
                  className={style.inputSearch}
                ></input>
              ) : null}
            </div>
          </form>
        </div>
      </div>
      <p>
        <button
          onClick={() => {
            getJokes(
              parametersGetJokes.link,
              parametersGetJokes.typeCase,
              parametersGetJokes.value
            );
          }}
        >
          Get a joke
        </button>
      </p>
      {state.typeOfJoke === SEARCH_JOKES ? (
        state.searchJokes.map((searchJoke) => {
          return (
            <CardJoke
              favoritesJokes={state.favoriteJokes}
              selectedCategorie={stateSelectedRadio}
              joke={searchJoke}
              dispatch={dispatch}
            ></CardJoke>
          );
        })
      ) : (
        <CardJoke
          favoritesJokes={state.favoriteJokes}
          selectedCategorie={stateSelectedRadio}
          joke={currentJoke}
          dispatch={dispatch}
        ></CardJoke>
      )}
      <ListFavoriteJoke
        favoritesJokes={state.favoriteJokes}
        dispatch={dispatch}
      />
    </div>
  );
};
export default GetJokesByType;
