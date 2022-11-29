import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const MovieReview = ({ review, idx }) => {
  return (
    <div className="border rounded-md m-1.5 p-2 bg-[#f3f3f3]">
      <div className="flex justify-between">
        <div className="flex items-center font-semibold">
          {review.username}
          <div className="text-xs text-slate-500 px-1.5">
            ({review.create_date.substring(0, 10)})
          </div>
        </div>
        <div className="flex items-center mx-2">
          {Array.apply(null, { length: review.rating }).map((e, i) => (
            <AiFillStar size="18" color="#ba0305" key={i} />
          ))}
          {Array.apply(null, { length: 10 - review.rating }).map((e, i) => (
            <AiOutlineStar size="18" color="#ba0305" key={i} />
          ))}
        </div>
      </div>
      <div className="text-sm">{review.comment}</div>
    </div>
  );
};

export default MovieReview;
