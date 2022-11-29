import React from "react";

const MovieItem = ({ idx, movie }) => {
  return (
    <div
      key={idx}
      className={`flex justify-between items-center p-2 border-t border-slate-300 ${
        idx % 2 === 1 ? "bg-white/60" : "bg-gray-200/40"
      }`}
    >
      <div className="flex">
        <a href={`../filmy/${movie.slug}`}>
          <img
            src={movie.image_url}
            style={{ maxHeight: 124 }}
            className="rounded"
            alt={movie.title}
          />
        </a>
        <div>
          <div className="flex items-center px-1 py-0.5">
            <div className="font-semibold px-1">{idx + 1}.</div>
            <a
              href={`../filmy/${movie.slug}`}
              className="font-semibold text-[#ba0305] text-lg hover:text-black transition-all"
            >
              {movie.title}
            </a>
            <div className="px-1 text-sm">({movie.release_year})</div>
          </div>
          <div className="flex items-center ml-2">
            <div className="font-semibold">{movie.country}</div>
          </div>
          <div className="flex items-center ml-2">
            <div className="flex items-center">
              Režie:
              {movie.directors.map((dir, idx) => (
                <a href={`../lide/${dir.slug}`} className="flex" key={idx}>
                  {idx > 0 ? <div>,</div> : null}
                  <div className="pl-1 link">
                    {" "}
                    {dir.name}{" "}
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center ml-2">
            <div className="flex items-center">
              Hrají:
              {movie.actors.map((act, idx) => (
                <a href={`../lide/${act.slug}`} className="flex" key={idx}>
                  {idx > 0 ? <div>,</div> : null}
                  <div className="pl-1 link">
                    {" "}
                    {act.name}{" "}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mr-5">
        <div className="flex justify-center items-center bg-[#658db4] w-[128px] h-[40px] text-white font-bold text-xl rounded-t">
          {movie.average_rating}%
        </div>
        <div className="flex justify-center items-center bg-[#cfcfcf] w-[128px] h-[40px] text-sm rounded-b">
          <span className="font-semibold px-1">{movie.reviews_count}</span>{" "}
          hodnocení
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
