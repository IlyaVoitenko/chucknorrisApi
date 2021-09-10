import React, { useState, useEffect } from "react";
import style from "./css/SelectTypeJokes.module.css";
import ListFavoriteJoke from "./ListFavoriteJoke";
import CardJoke from "./CardJoke";
import useJoke from "./useAppState";
import useConstsTypeJokes from "./useConsts";

const SelectTypeJokes = () => {
  const ConstsTypeJokes = useConstsTypeJokes();
  const jokeLogik = useJoke();
  const [dataFetch, setDataFetch] = useState({});
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [stateSearch, setStateSearch] = useState(null);
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
                  setSelectedCategorie(null);
                  setStateSearch(null);
                  setDataFetch({
                    link: "random",
                    typeCase: "setRandomJoke",
                    value: "",
                  });
                }}
              />
              random
            </label>
            <p></p>
            <label htmlFor={style.fromCategories}>
              <input
                name="down"
                type="radio"
                id={style.fromCategories}
                onChange={(event) => {
                  setSelectedCategorie(true);
                }}
              />
              From categories
            </label>
            {selectedCategorie !== null ? (
              <div>
                {jokeLogik.state.categories.map((categorie) => {
                  return (
                    <button
                      className={style.btnСategories}
                      key={categorie}
                      value={categorie}
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedCategorie(categorie);
                        setDataFetch({
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
            ) : (
              console.log(selectedCategorie)
            )}

            <div>
              <p></p>
              <label htmlFor="labelSearch">
                <input
                  type="radio"
                  name="down"
                  id="labelSearch"
                  onChange={() => {
                    setStateSearch(true);
                    setSelectedCategorie(null);
                  }}
                />
                Search
              </label>
              {stateSearch !== null ? (
                <input
                  type="text"
                  placeholder="Free text search..."
                  onChange={(event) => {
                    setDataFetch({
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
            jokeLogik.getJokes(
              dataFetch.link,
              dataFetch.typeCase,
              dataFetch.value
            );
          }}
        >
          Get a joke
        </button>
      </p>
      {jokeLogik.state.typeOfJoke === ConstsTypeJokes.SEARCH_JOKES &&
      jokeLogik.state.searchJokes !== undefined ? (
        jokeLogik.state.searchJokes.map((searchJoke) => {
          return (
            <CardJoke
              selectedCategorie={selectedCategorie}
              joke={searchJoke}
              dispatch={jokeLogik.dispatch}
            ></CardJoke>
          );
        })
      ) : (
        <CardJoke
          selectedCategorie={selectedCategorie}
          joke={jokeLogik.currentJoke}
          dispatch={jokeLogik.dispatch}
        ></CardJoke>
      )}
      <ListFavoriteJoke
        favoritesJokes={jokeLogik.state.favoriteJokes}
        dispatch={jokeLogik.dispatch}
      />
    </div>
  );
};
export default SelectTypeJokes;
