import React, { useRef, useCallback } from 'react'
import { useOutletContext, Link } from 'react-router-dom';
import useMoviesRecent from '../../hooks/useMoviesRecent'
import './Movies.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import noImg from '../../images/no-image.jpg'

export default function Recent() {
    const [pageNumber, setPageNumber, searchText, setSearchText, selectedMovieId, setSelectedMovieId] = useOutletContext();
    const{movies, hasMore, loading, error} = useMoviesRecent(pageNumber);
    const imgPath = "https://image.tmdb.org/t/p/w300";
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
                    <Link to={`SingleMovie/${movie.title}`} onClick={() => setSelectedMovieId(movie.id)}><img src={showPoster(movie.poster_path)} alt={movie.title} className="movie--img" /></Link>
                    <div className="movie--info">
                        <div className="movie--rating"><FontAwesomeIcon icon={faStar} />{movie.vote_average} / 10</div>
                        <Link to={`SingleMovie/${movie.title}`} className="movie--title" onClick={() => setSelectedMovieId(movie.id)} >{movie.title}</Link>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="movie" key={movie.id}>
                    <Link to={`SingleMovie/${movie.title}`} onClick={() => setSelectedMovieId(movie.id)}><img src={showPoster(movie.poster_path)} alt={movie.title} className="movie--img" /></Link>
                    <div className="movie--info">
                        <div className="movie--rating"><FontAwesomeIcon icon={faStar} />{movie.vote_average} / 10</div>
                        <Link to={`SingleMovie/${movie.title}`} className="movie--title" onClick={() => setSelectedMovieId(movie.id)} >{movie.title}</Link>
                    </div>
                </div>
            )
        }
    })
    return (
        <>
                <div className="flex-box-md">
                    <h2 className="title">Recent Movies</h2>
                </div>
                <div className="movie-grid">
                    {allMovies}
                </div>
                <div>{loading && 'loading'}</div>
                <div>{error && 'Error'}</div>
        </>
        
    )
}
