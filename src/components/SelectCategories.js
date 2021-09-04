import React from 'react';
import  styles from './css/SelectCategories.module.css';
import ListFavoriteJoke from './ListFavoriteJoke';
import CardJoke from './CardJoke';
import useJoke from './useAppState';

//TODO: use buttons got send requests for jokes
const SelectCategories = () => {
  // use Destructuring
  const jokeLogik = useJoke();
  return (
    <div>
      <header>
        <h3>MSI 2020</h3>
      </header>
      <div className={styles.main}>
        <h2>Hey!</h2>
        <h3>Let's try to find a joke for you:</h3>

        <div>
          <form>
            <label htmlFor="random">
              <input
                name="down"
                type="radio"
                // remove values from radios
                value="random"
                id="random"
                onClick={jokeLogik.randomJoke}
              />
              random
            </label>
            <p></p>
            <label htmlFor="from categories">
              <input
                name="down"
                type="radio"
                value="from categories"
                id="from categories"
                onClick={jokeLogik.fetchCategories}
              />
              From categories
            </label>

            <select onChange={(event) => jokeLogik.selectedOption(event)}>
              {jokeLogik.state.categories.map((categorie) => {
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
                onChange={(event) => jokeLogik.searchJokes(event)}
              ></input>
            </div>
          </form>
        </div>
      </div>
      <p></p>

      {jokeLogik.state.typeOfJoke === jokeLogik.SEARCH_JOKES &&
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
export default SelectCategories;
