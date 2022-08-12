import React, { useCallback, useRef } from 'react'
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import useMoviesSearch from '../../hooks/useMoviesSearch';
import './Movies.css'
import noImg from '../../images/no-image.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';


export default function SearchResults() {
    const [pageNumber, setPageNumber, searchText, setSearchText, selectedMovieId, setSelectedMovieId] = useOutletContext();
    const{movies, hasMore, loading, error} = useMoviesSearch(searchText, pageNumber);
    const imgPath = "https://image.tmdb.org/t/p/w300";
    let navigate = useNavigate();
    const observer = useRef();
    const lastBookElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        })
        if (node) observer.current.observe(node);
    },[loading, hasMore, setPageNumber]);

    const showRecent = () => {
        navigate('/')
        setPageNumber(1)
        setSearchText("")
    }

    if(searchText === "") {
        showRecent();
    }

    const showPoster = (poster) => {
        if (poster !== null) {
            return `${imgPath}${poster}`
        }
        else {
            return noImg
        }
    }

    const allMovies = movies.map((movie,index) => {
        if (movies.length === index + 1) {
            return(
                <div className="movie" key={movie.id} ref={lastBookElementRef}>
                    <Link to={`../SingleMovie/${movie.title}`} onClick={() => setSelectedMovieId(movie.id)}><img src={showPoster(movie.poster_path)} alt={movie.title} className="movie--img" /></Link>
                    <div className="movie--info">
                        <div className="movie--rating"> <FontAwesomeIcon icon={faStar}/> {movie.vote_average} / 10 </div>
                        <Link to={`../SingleMovie/${movie.title}`} className="movie--title" onClick={() => setSelectedMovieId(movie.id)} >{movie.title}</Link>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="movie" key={movie.id}>
                    <Link to={`../SingleMovie/${movie.title}`} onClick={() => setSelectedMovieId(movie.id)}><img src={showPoster(movie.poster_path)} alt={movie.title} className="movie--img" /></Link>
                    <div className="movie--info">
                    <div className="movie--rating"> <FontAwesomeIcon icon={faStar}/> {movie.vote_average} / 10 </div>
                    <Link to={`../SingleMovie/${movie.title}`} className="movie--title" onClick={() => setSelectedMovieId(movie.id)} >{movie.title}</Link>
                    </div>
                </div>
            )
        }
    })
    return (
        <>
            <div className="flex-box-md">
                <h2 className="title">You searched for <span>"{searchText}"</span></h2>
                <button className='back' onClick={showRecent}>Back to Recent <FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
            <div className="movie-grid">
                {allMovies}
            </div>
            <div>{loading && 'loading'}</div>
            <div>{error && 'Error'}</div>
        </>
    )
}
