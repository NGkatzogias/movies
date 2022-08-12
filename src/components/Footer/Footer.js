import React from 'react'
import './Footer.css'

import tmdb from '../../images/tmdb-logo.svg'

export default function Footer() {
  return (
    <footer>
      <div className="tmdb">
        <img className='tmdb' src={tmdb} alt="the movie database logo"/>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </div>
      <p className='copyrights'>All Right Reserved Nikos Gkatzogias 2022</p>
    </footer>
  )
}
