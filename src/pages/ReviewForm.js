import React, { useState, useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ReviewForm = () => {
  const [comment, setComment] = useState("");
  const [commentPlaceHolder, setCommentPlaceHolder] = useState("Dalo se");
  const [rating, setRating] = useState(5);

  const { user_info } = useContext(AuthContext);

  const navigate = useNavigate();
  const params = useParams();
  const searchParams = new URLSearchParams(document.location.search);

  document.title = "Recenze - FilmDB.cz";
  console.log(searchParams.get("filmname"));

  const handleComment = (e) => {
    e.preventDefault();

    if (e.target.value.length > 500) return;

    setComment(e.target.value);
  };

  const handleRating = (num) => {
    if (num >= 0) setCommentPlaceHolder("Absolutní odpad!");
    if (num >= 2) setCommentPlaceHolder("Hodně špatný film..");
    if (num >= 4) setCommentPlaceHolder("Jsou i horší filmy..");
    if (num >= 6) setCommentPlaceHolder("Dobrý film.");
    if (num >= 8) setCommentPlaceHolder("Skvělý film.");
    if (num >= 10) setCommentPlaceHolder("Masterpiece!");
    setRating(num);
  };

  const addReview = async () => {
    let response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/review/create_movie_review",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users_id: user_info.id,
          movie_id: params.filmId,
          username: user_info.username,
          comment: comment,
          rating: rating,
        }),
      }
    );
    let data = await response.json();
    console.log("add review:", data);
    if (response.ok) {
      navigate(`/filmy/${searchParams.get("filmslug")}`);
    }
  };

  return (
    <div>
      <div className="flex justify-center text-xl font-bold mt-5">
        Recenze - {searchParams.get("filmname")}
      </div>
      <div className="flex justify-center mt-3">
        <div className="flex justify-center border border-slate-400/50 max-w-screen-sm rounded-md text-sm py-5 px-8">
          <div>
            <form className="form-text-wrapper">
              <div className="form-title">Hodnocení (0 - 10):</div>
              <div className="flex items-center m-2 mt-3 relative right-[20px]">
                <AiFillStar
                  size="24"
                  color="#f7f7f7"
                  onMouseEnter={() => {
                    handleRating(0);
                  }}
                />
                {Array.apply(null, { length: rating }).map((e, i) => (
                  <AiFillStar
                    size="24"
                    color="#ba0305"
                    key={i}
                    onMouseEnter={() => {
                      let num = i + 1;
                      handleRating(num);
                    }}
                  />
                ))}
                {Array.apply(null, { length: 10 - rating }).map((e, i) => (
                  <AiOutlineStar
                    size="24"
                    color="#ba0305"
                    key={i}
                    onMouseEnter={() => {
                      let num = i + 1 + rating;
                      handleRating(num);
                    }}
                  />
                ))}
              </div>
            </form>
            <form className="form-text-wrapper">
              <div className="form-title">Komentář:</div>
              <textarea
                value={comment}
                onChange={handleComment}
                placeholder={commentPlaceHolder}
                className="min-w-[300px] min-h-[400px] rounded-md"
              />
            </form>
            <div className="flex justify-center mt-1">
              <button
                className="m-2 p-1 px-1.5 rounded text-white bg-[#ba0305] hover:bg-red-800 transition-all"
                onClick={() => {
                  addReview();
                }}
              >
                POKRAČOVAT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
