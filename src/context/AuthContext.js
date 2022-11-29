import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const navigate = useNavigate();

  const registerUser = async (username, password, email, setServerError) => {
    let response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/user/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }
    );
    let data = await response.json();
    console.log("register:", data);
    if (response.ok) {
      navigate("./prihlaseni");
    } else setServerError("Registrace proběhla neúspěšně");
  };

  const loginUser = async (username, password, setServerError) => {
    let response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/user/login?username=${username}&password=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    console.log("login:", data);
    if (response.ok) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setServerError("");
      navigate("/");
    } else setServerError("Účet s těmito údaji neexistuje");
  };

  const logoutUser = async () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  let contextData = {
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,

    user_info: user,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
