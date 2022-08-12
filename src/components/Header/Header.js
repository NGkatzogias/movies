import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function Header({setPageNumber, searchText, setSearchText}) {
  const [isSearching, setIsSearching] = useState(false);

  let navigate = useNavigate();

  const startSearch = () => {
    setIsSearching(true);
  };

  const stopSearch = () => {
    setIsSearching(false);
  };

  const handleSearch = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchText(lowerCase);
    setPageNumber(1);
    if (searchText !== ""){
      navigate('/SearchResults')
    }
  }

  return (
    <header>
      <Link to='/' onClick={() => setPageNumber(1)} className="logo">Movies Api</Link>
      <button className="search" onClick={startSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      {isSearching && <div className="search--wrap">
        <FontAwesomeIcon
          className="search--close"
          icon={faClose}
          onClick={stopSearch}
        />
        <input
          type="text"
          placeholder="Search for Movie"
          className="search--input"
          onChange={handleSearch}
          value={searchText}
        />
      </div>}
    </header>
  );
}
