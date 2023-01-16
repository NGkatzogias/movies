import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Recent from "./components/Movies/Recent";
import SearchResults from "./components/Movies/SearchResults";
import SingleMovie from "./components/Movies/SingleMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import MoviesByGenre from "./components/Movies/MoviesByGenre";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <HashRouter>
      <Header
        setPageNumber={setPageNumber}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Recent pageNumber={pageNumber} setPageNumber={setPageNumber} />
            }
          />
          <Route
            path="SearchResults"
            element={
              <SearchResults
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                searchText={searchText}
                setSearchText={setSearchText}
              />
            }
          />
          <Route path="SingleMovie/:id" element={<SingleMovie />} />
          <Route
            path="MoviesByGenre/:id"
            element={
              <MoviesByGenre
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
      {showTopBtn && (
        <button
          className="back-to-top"
          onClick={backToTop}
          aria-label="back to top"
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
      )}
    </HashRouter>
  );
}

export default App;
