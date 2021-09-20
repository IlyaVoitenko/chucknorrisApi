import React, { useState } from "react";
import style from "./css/SelectTypeJokes.module.css";
import ListFavoriteJoke from "./ListFavoriteJoke";
import CardJoke from "./CardJoke";
import useJoke from "./useAppState";
import useConstsTypeJokes from "./consts";
import styleCardJoke from "./css/CardJoke.module.css";
const { SEARCH_JOKES } = useConstsTypeJokes;
const SelectTypeJokes = () => {
  const jokeLogik = useJoke();
  const { dispatch, currentJoke, state, getJokes } = jokeLogik;
  const [stateSelectedRadio, setStateSelectedRadio] = useState("");
  const [parametersGetJokesFun, setParametersGetJokesFun] = useState({});
  return (
    <div>
      <header>
        <h3 className={style.marginLeft}>MSI 2020</h3>
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
                  setParametersGetJokesFun({
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
                onChange={() => {
                  setStateSelectedRadio("categories");
                }}
              />
              From categories
            </label>
            {stateSelectedRadio === "categories" ? (
              <div>
                {jokeLogik.state.categories.map((categorie) => {
                  return (
                    <button
                      className={style.btnСategories}
                      key={categorie}
                      value={categorie}
                      onClick={(event) => {
                        event.preventDefault();
                        setStateSelectedRadio(categorie);
                        setParametersGetJokesFun({
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
                    setParametersGetJokesFun({
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
          className={style.marginLeft}
          onClick={() => {
            getJokes(
              parametersGetJokesFun.link,
              parametersGetJokesFun.typeCase,
              parametersGetJokesFun.value
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
              CardJokeDiv={styleCardJoke.cardJoke}
              btnFavoriteJokeClicked={styleCardJoke.btnFavoriteJoke}
              styleBtnCardFavorite={styleCardJoke.btnCategorie}
              stateSelectedRadio={stateSelectedRadio}
              favoritesJokes={state.favoriteJokes}
              joke={searchJoke}
              dispatch={dispatch}
            ></CardJoke>
          );
        })
      ) : (
        <CardJoke
          CardJokeDiv={styleCardJoke.cardJoke}
          btnFavoriteJokeClicked={styleCardJoke.btnFavoriteJoke}
          styleBtnCardFavorite={styleCardJoke.btnCategorie}
          stateSelectedRadio={stateSelectedRadio}
          favoritesJokes={state.favoriteJokes}
          joke={currentJoke}
          dispatch={dispatch}
        ></CardJoke>
      )}
      <ListFavoriteJoke
        CardJokeDiv={styleCardJoke.cardJokeShadow}
        btnFavoriteJokeClicked={styleCardJoke.btnFavoriteJokeClicked}
        styleBtnCardFavorite={styleCardJoke.btnCategorieHidden}
        stateSelectedRadio={stateSelectedRadio}
        favoritesJokes={state.favoriteJokes}
        dispatch={dispatch}
      />
    </div>
  );
};
export default SelectTypeJokes;
