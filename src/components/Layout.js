import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import "./Header/Header.css";
import Footer from "./Footer/Footer";
import "./Footer/Footer.css";
export default function Layout() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedMovieId,  setSelectedMovieId] =  useState()

  return (
    <>
      <Header 
        setPageNumber={setPageNumber} 
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="container">
        <Outlet context={[pageNumber, setPageNumber, searchText, setSearchText, selectedMovieId, setSelectedMovieId]}
        />
      </div>
      <Footer />
    </>
  );
}
