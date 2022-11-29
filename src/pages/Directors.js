import React, { useRef, useState } from "react";
import { MdElderly, MdChildFriendly } from "react-icons/md";
import PersonItem from "../components/PersonItem";

const getDirectors = async (setDirectors) => {
  let response = await fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/person/directors",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await response.json();
  console.log("directors:", data);
  if (response.ok) {
    setDirectors(orderByOldest(data));
  }
};

const orderByNewest = (directors) => {
  const temp = [...directors];
  temp.sort((a, b) => b.birth_year - a.birth_year);
  return temp;
};

const orderByOldest = (directors) => {
  const temp = [...directors];
  temp.sort((a, b) => a.birth_year - b.birth_year);
  return temp;
};

const Directors = () => {
  const [directors, setDirectors] = useState(null);
  const [ordering, setOrdering] = useState(0);
  const firstLoad = useRef(true);

  if (firstLoad.current === true) {
    getDirectors(setDirectors);
    document.title = "Režiséři - FilmDB.cz";
    firstLoad.current = false;
  }

  const handleOrderingButton = (num) => {
    setOrdering(num);
    if (num === 0) setDirectors(orderByNewest(directors));
    else if (num === 1) setDirectors(orderByOldest(directors));
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
              ordering === 2 ? "font-bold underline" : null
            } `}
          >
            <MdChildFriendly className="mx-0.5" />
            Nejmladší
          </button>
          <button
            onClick={() => {
              handleOrderingButton(1);
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
          {directors
            ? directors.map((director, idx) => (
                <PersonItem key={idx} person={director} idx={idx} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Directors;
