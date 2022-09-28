import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import "./Header/Header.css";
import Footer from "./Footer/Footer";
import "./Footer/Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

export default function Layout() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState();
  const [showTopBtn, setShowTopBtn] = useState(false);

  let navigate = useNavigate();

  useEffect(() =>{
    const data = window.localStorage.getItem('MY_SELECTED_MOVIE');
    if (data !== null) {
      setSelectedMovieId(JSON.parse(data));
    }else{
      navigate("/");
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('MY_SELECTED_MOVIE', JSON.stringify(selectedMovieId));
  }, [selectedMovieId])

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
    <>
      <Header
        setPageNumber={setPageNumber}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="container">
        <Outlet
          context={[
            pageNumber,
            setPageNumber,
            searchText,
            setSearchText,
            selectedMovieId,
            setSelectedMovieId,
          ]}
        />
      </div>
      <Footer />
      {showTopBtn &&
        <button className="back-to-top" onClick={backToTop} aria-label="back to top">
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
      }
    </>
  );
}
