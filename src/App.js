import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Home from "./pages/Home";
import ReviewForm from "./pages/ReviewForm";
import Actors from "./pages/Actors";
import Directors from "./pages/Directors";
import PersonDetail from "./pages/PersonDetail";

function App() {
  document.title = "FilmDB.cz";

  return (
    <Router>
      <AuthProvider>
        <div className="flex justify-center">
          <div className="max-w-screen-lg w-full bg-[#f7f7f7] h-screen">
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/registrace" element={<Register />} />
              <Route path="/prihlaseni" element={<Login />} />
              <Route path="/zebricky/filmy" element={<Movies />} />
              <Route path="/zebricky/herci" element={<Actors />} />
              <Route path="/zebricky/reziseri" element={<Directors />} />
              <Route path="/filmy/:filmSlug" element={<MovieDetail />} />
              <Route path="/lide/:personSlug" element={<PersonDetail />} />
              <Route path="/hodnoceni/film/:filmId" element={<ReviewForm />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

/*
<Route path="/filmy" element={<SignupPage />} />
        <Route path="/herci" element={<SigninPage />} />
        <Route path="/reziseri" element={<SignupPage />} />
        <Route exact path="/" element={<HomePage />} />
*/
