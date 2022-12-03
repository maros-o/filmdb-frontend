import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const [usern, setUsern] = useState("");
  const [passwd, setPasswd] = useState("");

  const [usernError, setUsernError] = useState(false);
  const [passwdError, setPasswdError] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    document.title = "Přihlášení - FilmDB.cz";
  }, []);

  const handleUsern = (e) => {
    e.preventDefault();

    const validChars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_ěščřžýáíéóůúňĚŠČŘŽÝÁÍÉÓŮÚŇ";

    const text = e.target.value;

    let areValid = true;
    text.split("").forEach((char) => {
      if (!validChars.includes(char)) {
        console.log(char);
        areValid = false;
      }
    });

    if (!areValid) return;

    if (e.target.value[0] >= "0" && e.target.value[0] <= "9") return;
    if (e.target.value[e.target.value.length - 1] === " ") return;
    if (e.target.value.length > 16) return;

    if (e.target.value.length <= 4) setUsernError(true);
    else setUsernError(false);

    setUsern(e.target.value);
  };

  const handlePasswd = (e) => {
    e.preventDefault();

    if (e.target.value[e.target.value.length - 1] === " ") return;
    if (e.target.value.length > 30) return;

    if (e.target.value.length < 8) setPasswdError(true);
    else setPasswdError(false);

    setPasswd(e.target.value);
  };

  const handleButton = (e) => {
    e.preventDefault();

    if (usernError || passwdError) return;

    if (usern === "") {
      setUsernError(true);
      return;
    }

    if (passwd === "") {
      setPasswdError(true);
      return;
    }

    loginUser(usern, passwd, setServerError);
  };

  return (
    <div>
      <div className="flex justify-center text-xl font-bold mt-5">
        Přihlášení
      </div>
      <div className="flex justify-center mt-3">
        <div className="flex justify-center border border-slate-400/50 max-w-screen-sm rounded-md text-sm py-5 px-8">
          <form onSubmit={handleButton}>
            <div className="form-text-wrapper">
              <div className="form-title">Přezdívka:</div>
              <input
                type="username"
                value={usern}
                className={`form-text-input ${
                  usernError ? "border-rose-800" : null
                }`}
                placeholder="Pepa420CZ"
                onChange={handleUsern}
              />
              {usernError ? (
                <div className="form-error">
                  Uživatelské jméno musí být delší než 4 znaky
                </div>
              ) : null}
            </div>
            <div className="form-text-wrapper">
              <div className="form-title">Heslo:</div>
              <input
                value={passwd}
                type="password"
                placeholder="••••••••"
                className={`form-text-input ${
                  passwdError ? "border-rose-800" : null
                }`}
                onChange={handlePasswd}
              />
              {passwdError ? (
                <div className="form-error">
                  Heslo musí být nejméně 8 znaků dlouhé
                </div>
              ) : null}
            </div>
            <div className="flex justify-center mt-1">
              <button
                className="m-2 p-1 px-1.5 rounded text-white bg-[#ba0305] hover:bg-red-800 transition-all"
                type="submit"
              >
                POKRAČOVAT
              </button>
            </div>
            {serverError !== "" ? (
              <div className="text-rose-500 text-center font-semibold py-1">
                {serverError}
              </div>
            ) : null}
            <div className="p-2">
              Nemáte účet?
              <a href={`/registrace`}>
                <button className="px-1 text-[#ba0305] hover:text-blue-900 transition-all">
                  zeregistrovat se
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
