import React, { useState } from "react";
import "./App.css";
import "h8k-components";

import { Movieform, Movieslist, Search } from "./components";

const title = "Favorite Movie Directory";

function App() {
  const [state, setState] = useState({
    movies: [],
    queryMovies: undefined,
    query: "",
  });

  const { movies, queryMovies, query } = state;

  const sortingComparator = (movieA, movieB) => {
    console.log('Number:', movieB.duration.substring(0, movieA.duration.length - 2))
    return (
      Number(movieA.duration.substring(0, movieA.duration.length - 2)) -
      Number(movieB.duration.substring(0, movieB.duration.length - 2))
    );
  };
  const handleQueryMovies = (query, movies) => {
    if (query.length < 2) {
      return movies.sort(sortingComparator);
    }
    const updatedQuery = query.toLowerCase();
    return movies
      .reduce((newArr, movie) => {
        if (movie.name.trim().toLowerCase().startsWith(updatedQuery)) {
          newArr.push(movie);
        }
        return newArr;
      }, [])
      .sort(sortingComparator);
  };

  const handleAddMovie = (movie) => {
    console.log("Movie is", movie);
    const queryMovies = handleQueryMovies(query, [...movies, movie]);
    setState((state) => ({
      ...state,
      movies: [...movies, movie],
      queryMovies,
    }));
  };
  const handleQueryChange = (newQuery) => {
    const queryMovies = handleQueryMovies(newQuery, movies);
    setState((state) => ({ ...state, query: newQuery, queryMovies }));
  };

  return (
    <div>
      <h8k-navbar header={title} />
      <div className="layout-row justify-content-center mt-100">
        <div className="w-30 mr-75">
          <Movieform onConfirmMovie={handleAddMovie} />
        </div>
        <div className="layout-column w-30">
          <Search query={query} onQueryChange={handleQueryChange} />
          <Movieslist movies={queryMovies} />
          {queryMovies && queryMovies.length === 0 && (
            <div data-testid="noResult">
              <h3 className="text-center">No Results Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
