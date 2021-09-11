import React, { useState } from "react";
import style from "./css/GetJoke.module.css";
import ListFavoriteJoke from "./ListFavoriteJoke";
import CardJoke from "./CardJoke";
import useJoke from "./useAppState";
import useConstsTypeJokes from "./useConsts";

const GetJoke = () => {
  const [addOrDeleteDispatchType, setaddOrDeleteDispatchType] = useState("addFavoriteJoke");
  const ConstsTypeJokes = useConstsTypeJokes();
  const jokeLogik = useJoke();
  const [stateSelectedRadio, setStateSelectedRadio] = useState("");
  const [dataFetch, setDataFetch] = useState({});
  return (
    <div>
      <header>
        <h3>MSI 2020</h3>
      </header>
      <div className={style.main}>
        <h2>Hey!</h2>
        <h3>Let's try to find a joke for you:</h3>
       
          <form>
            <label htmlFor={style.random}>
              <input
                name="down"
                type="radio"
                id={style.random}
                onChange={() => {
                  setStateSelectedRadio("random");
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
              addOrDeleteDispatchType={addOrDeleteDispatchType}
              selectedCategorie={stateSelectedRadio}
              joke={searchJoke}
              dispatch={jokeLogik.dispatch}
            ></CardJoke>
          );
        })
      ) : (
        <CardJoke
          addOrDeleteDispatchType={addOrDeleteDispatchType}
          selectedCategorie={stateSelectedRadio}
          joke={jokeLogik.currentJoke}
          dispatch={jokeLogik.dispatch}
        ></CardJoke>
      )}
      <ListFavoriteJoke
        stateDispatch={addOrDeleteDispatchType}
        favoritesJokes={jokeLogik.state.favoriteJokes}
        dispatch={jokeLogik.dispatch}
      />
    </div>
  );
};
export default GetJoke;
