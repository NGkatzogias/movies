import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css'

export default function SearchBar({stopSearch, handleSearch, searchText}) {
  return (
    <div className='search--wrap'>  
        <FontAwesomeIcon className='search--close' icon={faClose} onClick={stopSearch}/>
        <input type="text" placeholder="Search for Movie"
        className="search--input" onChange={handleSearch} value={searchText}/>
    </div>
  )
}
