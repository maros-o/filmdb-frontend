import React from "react";
import { orderByNewest } from "../pages/Movies";

const PersonItem = ({ idx, person }) => {
  return (
    <div
      key={idx}
      className={`flex justify-between items-center p-2 border-t border-slate-300 ${
        idx % 2 === 1 ? "bg-white/60" : "bg-gray-200/40"
      }`}
    >
      <div className="flex">
        <a href={`../lide/${person.slug}`}>
          <img
            src={person.image_url}
            style={{ maxHeight: 124 }}
            className="rounded"
            alt={person.title}
          />
        </a>
        <div>
          <div className="flex items-center px-1 py-0.5">
            <div className="font-semibold px-1">{idx + 1}.</div>
            <a
              href={`../lide/${person.slug}`}
              className="font-semibold text-[#ba0305] text-lg hover:text-black transition-all"
            >
              {person.name}
            </a>
          </div>
          <div className="flex items-center ml-2">
            <div className="font-semibold">
              {person.birth_year}, {person.country}
            </div>
          </div>
          <div className="flex items-center ml-2">
            <div className="flex items-center font-semibold">
              Filmy:
              {orderByNewest(person.movies).map((movie, idx) => (
                <a href={`../filmy/${movie.slug}`} className="flex" key={idx}>
                  {idx > 0 ? <div>,</div> : null}
                  <div className="pl-1 link">
                    {movie.title}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonItem;
