import React, { useState, useContext } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const MenuLink = ({ title, slug }) => {
  const path = useLocation().pathname;
  return (
    <div
      className={`hover:text-[#ba0305] h-full flex justify-center items-center px-6 rounded-t-lg ${
        path.includes(slug) ? "bg-[#f7f7f7]" : null
      }`}
    >
      <a href={`/${slug}`}>{title}</a>
    </div>
  );
};

const Header = () => {
  const { user_info, logoutUser } = useContext(AuthContext);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const GetProfileMenu = () => {
    if (user_info)
      return (
        <div className="absolute bg-[#f7f7f7] top-[50px] w-[104px] text-blue-600 shadow-lg text-sm rounded-b-md">
          <div className="my-1 py-1.5 px-3 hover:text-[#ba0305]">
            <button onClick={logoutUser}>Odhlásit se</button>
          </div>
        </div>
      );

    return (
      <div className="absolute bg-[#f7f7f7] top-[50px] w-[104px] text-blue-600 shadow-lg text-sm rounded-b-md">
        <div className="mt-1 py-1.5 px-3 hover:text-[#ba0305]">
          <a href="/prihlaseni">Přihlášení</a>
        </div>

        <div className="mb-1 py-1.5 px-3 hover:text-[#ba0305]">
          <a href="/registrace">Registrace</a>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full lg:px-0.5">
      <div className="flex justify-between items-center w-full bg-[#ba0305] h-[50px] text-white lg:rounded-t-md">
        <div className="font-bold text-3xl mx-3.5 italic">
          <a href="/">FilmDB.cz</a>
        </div>
        <div
          className="flex items-center border-l h-full border-slate-600/50 hover:bg-[#e3e3e3] hover:text-black hover:cursor-pointer transition-all"
          onMouseEnter={() => {
            setTimeout(() => {
              setShowProfileMenu(true);
            }, 200);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setShowProfileMenu(false);
            }, 100);
          }}
        >
          <BsPersonCircle size="20" className="m-2.5" />
          {user_info ? (
            <div className="mr-2.5 text-sm">{user_info.username}</div>
          ) : (
            <div className="mr-2.5 text-sm">Můj účet</div>
          )}
          {showProfileMenu ? GetProfileMenu() : null}
        </div>
      </div>
      <div className="flex items-center w-full gap-1 bg-[#e3e3e3] h-[32px] text-black text-sm font-semibold">
        <MenuLink title="Filmy" slug="zebricky/filmy" />
        <MenuLink title="Herci" slug="zebricky/herci" />
        <MenuLink title="Režiséři" slug="zebricky/reziseri" />
      </div>
    </div>
  );
};

export default Header;
