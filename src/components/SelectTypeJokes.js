import React from "react";
import style from "./css/SelectTypeJokes.module.css";
import ListFavoriteJoke from "./ListFavoriteJoke";
import CardJoke from "./CardJoke";
import useJoke from "./useAppState";
import useConstsTypeJokes from "./useConstsTypeJokes";
const SelectTypeJokes = () => {
  const ConstsTypeJokes = useConstsTypeJokes();
  const jokeLogik = useJoke();
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
                onClick={() => {
                  jokeLogik.getJokes("random", "setRandomJoke", " ");
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
                onClick={jokeLogik.fetchCategories}
              />
              From categories
            </label>

            <select
              onChange={(event) =>
                jokeLogik.getJokes(
                  "random?category=",
                  "setjokeByCategorie",
                  event
                )
              }
              className={style.select}
            >
              {jokeLogik.state.categories.map((categorie) => {
                return (
                  <option key={categorie} value={categorie} className="option">
                    {categorie}
                  </option>
                );
              })}
            </select>
            <div>
              <p></p>
              <label htmlFor="search">
                <input type="radio" name="down" id="search" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search a joke"
                onChange={(event) =>
                  jokeLogik.getJokes("search?query=", "setSearchJoke", event)
                }
              ></input>
            </div>
          </form>
        </div>
      </div>
      <p></p>
      {jokeLogik.state.typeOfJoke === ConstsTypeJokes.SEARCH_JOKES &&
      jokeLogik.state.searchJokes !== undefined ? (
        jokeLogik.state.searchJokes.map((searchJoke) => {
          return (
            <CardJoke
              joke={searchJoke}
              dispatch={jokeLogik.dispatch}
            ></CardJoke>
          );
        })
      ) : (
        <CardJoke
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
