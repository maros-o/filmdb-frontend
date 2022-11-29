import React, { useState, useRef, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieReview from "../components/MovieReview";
import AuthContext from "../context/AuthContext";

const getMovie = async (setMovie, slug) => {
  let response = await fetch(
    process.env.REACT_APP_BACKEND_URL + `/api/movie/all/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await response.json();
  console.log("movie:", data);
  if (response.ok) {
    setMovie(data);
  }
};

const MovieDetail = () => {
  const { user_info } = useContext(AuthContext);
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const firstLoad = useRef(true);

  if (firstLoad.current === true) {
    getMovie(setMovie, params.filmSlug);
    firstLoad.current = false;
  }

  useEffect(() => {
    if (movie) document.title = `${movie.title} - FilmDB.cz`;
  });

  if (movie)
    return (
      <div className="p-2 mx-1">
        <div className="flex justify-between">
          <div className="flex">
            <img
              src={movie.image_url}
              className="border my-2 ml-2 rounded-sm"
              alt={movie.title}
            />
            <div className="ml-2 mt-1">
              <div className="text-3xl font-semibold p-1">{movie.title}</div>
              <div className="text-lg p-1 font-medium">
                {movie.country}, {movie.release_year}, {movie.length} min
              </div>
              <div className="flex items-center p-1 font-medium">
                Režie:
                {movie.directors.map((dir, idx) => (
                  <a href={`../lide/${dir.slug}`} className="flex" key={idx}>
                    {idx > 0 ? <div>,</div> : null}
                    <div className="pl-1 text-[#ba0305]"> {dir.name} </div>
                  </a>
                ))}
              </div>
              <div className="flex items-center p-1 font-medium">
                Hrají:
                {movie.actors.map((act, idx) => (
                  <a href={`../lide/${act.slug}`} className="flex" key={idx}>
                    {idx > 0 ? <div>,</div> : null}
                    <div className="pl-1 text-[#ba0305]"> {act.name} </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mr-5 mt-3 text-white">
            <div className="flex justify-center items-center bg-[#ba0305] w-[180px] h-[80px] font-bold text-4xl rounded-t">
              {movie.average_rating}%
            </div>
            <div className="flex justify-center items-center bg-[#8c0406] w-[180px] h-[40px] rounded-b">
              <span className="font-semibold px-1">{movie.reviews_count}</span>
              recenze
            </div>
            {user_info ? (
              <div className="flex justify-center items-center">
                <a
                  href={`/hodnoceni/film/${movie.id}?filmname=${movie.title}&filmslug=${movie.slug}`}
                >
                  <button className="mt-4 p-1.5 px-2 bg-[#b84b4d] rounded-md hover:bg-[#ba0305] transition-all">
                    Recenzovat
                  </button>
                </a>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <a href={`/prihlaseni`}>
                  <button className="mt-4 p-1.5 px-2 bg-[#b84b4d] rounded-md hover:bg-[#ba0305] transition-all text-sm">
                    Recenzovat <br /> (přihlásit se)
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="border bg-white rounded-md mt-3">
          <div className="p-2 px-3 text-lg font-semibold flex items-center bg-[#dadada]">
            Obsah
          </div>
          <div className="p-2">{movie.description}</div>
        </div>
        <div className="border bg-white rounded-md mt-3">
          <div className="p-2 px-3 text-lg font-semibold flex items-center bg-[#dadada]">
            Recenze
            <div className="px-1 text-base text-slate-600">
              ({movie.reviews_count})
            </div>
          </div>
          <div className="p-1">
            {movie.reviews.map((review, idx) => (
              <MovieReview key={idx} review={review} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default MovieDetail;
