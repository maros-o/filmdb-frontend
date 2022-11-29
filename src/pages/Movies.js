import React, { useRef, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { MdElderly, MdChildFriendly } from "react-icons/md";
import MovieItem from "../components/MovieItem";

const getMovies = async (setMovies) => {
  let response = await fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/movie/all",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await response.json();
  console.log("movies:", data);
  if (response.ok) {
    setMovies(orderByBest(data));
  }
};

const orderByBest = (movies) => {
  const temp = [...movies];
  temp.sort((a, b) => b.average_rating - a.average_rating);
  return temp;
};

const orderByWorst = (movies) => {
  const temp = [...movies];
  temp.sort((a, b) => a.average_rating - b.average_rating);
  return temp;
};

export const orderByNewest = (movies) => {
  const temp = [...movies];
  temp.sort((a, b) => b.release_year - a.release_year);
  return temp;
};

const orderByOldest = (movies) => {
  const temp = [...movies];
  temp.sort((a, b) => a.release_year - b.release_year);
  return temp;
};

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [ordering, setOrdering] = useState(0);
  const firstLoad = useRef(true);

  if (firstLoad.current === true) {
    getMovies(setMovies);
    document.title = "Filmy - FilmDB.cz";
    firstLoad.current = false;
  }

  const handleOrderingButton = (num) => {
    setOrdering(num);
    if (num === 0) setMovies(orderByBest(movies));
    else if (num === 1) setMovies(orderByWorst(movies));
    else if (num === 2) setMovies(orderByNewest(movies));
    else if (num === 3) setMovies(orderByOldest(movies));
  };

  return (
    <div>
      <div className="border m-2 border-slate-800/20 rounded">
        <div className="flex justify-center gap-8 border border-slate-800/40 rounded-t">
          <button
            onClick={() => {
              handleOrderingButton(0);
            }}
            className={`movie-ordering ${
              ordering === 0 ? "font-bold underline" : null
            } `}
          >
            <AiFillLike className="mx-0.5" />
            Nejlepší
          </button>
          <button
            onClick={() => {
              handleOrderingButton(1);
            }}
            className={`movie-ordering ${
              ordering === 1 ? "font-bold underline" : null
            } `}
          >
            <AiFillDislike className="mx-0.5" />
            Nejhorší
          </button>
          <button
            onClick={() => {
              handleOrderingButton(2);
            }}
            className={`movie-ordering ${
              ordering === 2 ? "font-bold underline" : null
            } `}
          >
            <MdChildFriendly className="mx-0.5" />
            Nejnovětší
          </button>
          <button
            onClick={() => {
              handleOrderingButton(3);
            }}
            className={`movie-ordering ${
              ordering === 3 ? "font-bold underline" : null
            } `}
          >
            <MdElderly className="mx-0.5" />
            Nejstarší
          </button>
        </div>
        <div>
          {movies
            ? movies.map((movie, idx) => (
                <MovieItem key={idx} movie={movie} idx={idx} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Movies;
