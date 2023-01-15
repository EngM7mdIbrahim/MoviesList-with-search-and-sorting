import React, { useState } from "react";

const INIT_STATE = {
  name: "",
  rating: "",
  duration: "",
  validationMessage: "",
};
const minRegex = /^-?\d+(\.\d+)?m$/;
const hourRegex = /^-?\d+(\.\d+)?h$/;

function Movieform({
  onConfirmMovie = (movie) => {
    console.log("Movie submitted is:", movie);
  },
}) {
  const [newMovie, setMovie] = useState(INIT_STATE);
  const { name, rating, duration, validationMessage } = newMovie;

  const validateMovie = (movie) => {
    const { name, rating, duration } = movie;

    // Checking if all of the fields are entered!
    if (name === undefined || name === "") {
      return "You should enter the name for the movie!";
    }
    if (rating === undefined || rating === "") {
      return "You should enter the rating for the movie!";
    }
    if (duration === undefined || duration === "") {
      return "You should enter the duration for the movie!";
    }

    //Check if the rating is between 0 and 100
    if (rating < 0 || rating > 100) {
      return "The rating of a movie should be between 0 and 100!";
    }

    //Check if the duration is written in this format
    if (!(minRegex.test(duration) || hourRegex.test(duration))) {
      return "Please specify time in hours or minutes (e.g. 2.5h or 150m)";
    }

    return undefined;
  };

  const translateDuration = (duration) => {
    //Check if it was submitted in hours
    if (minRegex.test(duration)) {
      const hourArr = duration.split("");
      hourArr.pop();
      return Math.round((Number(hourArr.join("")) * 10) / 60) / 10 + "h";
    }
    return duration;
  };

  const handleAddMovie = (movie) => {
    const validationMessage = validateMovie(movie);

    if (validationMessage) {
      setMovie((_) => ({ ...INIT_STATE, validationMessage }));
      return;
    }

    let submitMovie = { ...movie, duration: translateDuration(movie.duration) };
    delete submitMovie.validationMessage;

    onConfirmMovie(submitMovie);
    setMovie((_) => INIT_STATE);
  };
  return (
    <section>
      <div className="card pa-30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMovie(newMovie);
          }}
        >
          <div className="layout-column mb-15">
            <label htmlFor="name" className="mb-3">
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setMovie({
                  ...newMovie,
                  name: e.target.value,
                  validationMessage: undefined,
                });
              }}
              placeholder="Enter Movie Name"
              data-testid="nameInput"
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="ratings" className="mb-3">
              Ratings
            </label>
            <input
              type="number"
              id="ratings"
              value={rating}
              onChange={(e) => {
                setMovie({
                  ...newMovie,
                  rating: e.target.value,
                  validationMessage: undefined,
                });
              }}
              placeholder="Enter Rating on a scale of 1 to 100"
              data-testid="ratingsInput"
            />
          </div>
          <div className="layout-column mb-30">
            <label htmlFor="duration" className="mb-3">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => {
                setMovie({
                  ...newMovie,
                  duration: e.target.value,
                  validationMessage: undefined,
                });
              }}
              placeholder="Enter duration in hours or minutes"
              data-testid="durationInput"
            />
          </div>
          {/* Use this div when time format is invalid */}
          {validationMessage && (
            <div className="alert error mb-30" data-testid="alert">
              {validationMessage}
            </div>
          )}
          <div className="layout-row justify-content-end">
            <button type="submit" className="mx-0" data-testid="addButton">
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Movieform;
