import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { orderByNewest } from "../pages/Movies";

const getPerson = async (setPerson, slug) => {
  let response = await fetch(
    process.env.REACT_APP_BACKEND_URL + `/api/person/all/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await response.json();
  console.log("person:", data);
  if (response.ok) {
    setPerson(data);
  }
};

const PersonDetail = () => {
  const params = useParams();
  const [person, setPerson] = useState(null);
  const firstLoad = useRef(true);

  if (firstLoad.current === true) {
    getPerson(setPerson, params.personSlug);
    firstLoad.current = false;
  }

  useEffect(() => {
    if (person) document.title = `${person.name} - FilmDB.cz`;
  });

  if (person)
    return (
      <div className="p-2 mx-1">
        <div className="flex gap-4">
          <div className="w-3/4">
            <div className="flex">
              <img
                src={person.image_url}
                className="border my-2 ml-2 rounded-md h-48"
                alt={person.name}
              />
              <div className="ml-2 mt-1">
                <div className="text-3xl font-semibold p-1">{person.name}</div>
                <div className="text-lg p-1 font-medium">
                  {person.country}, {person.birth_year}
                </div>
              </div>
            </div>
            <div className="border bg-white rounded-md mt-3">
              <div className="p-2 px-3 text-lg font-semibold flex items-center bg-[#dadada]">
                Biografie
              </div>
              <div className="p-2">{person.description}</div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="border bg-white rounded-md mt-3">
              <div className="p-2 px-3 text-lg font-semibold flex items-center bg-[#dadada]">
                Filmy ({person.movies.length})
              </div>
              {orderByNewest(person.movies).map((movie, idx) => (
                <div className="flex m-2" key={idx}>
                  <div>{movie.release_year}</div>
                  <div className="text-slate-400 mx-2">–</div>
                  <a href={`../filmy/${movie.slug}`} className="flex">
                    <div className=" link">
                      {movie.title}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default PersonDetail;
