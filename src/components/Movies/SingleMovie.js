import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import useSingleMovieDetails from '../../hooks/useSingleMovieDetails';
import useMovieTrailers from '../../hooks/useMovieTrailers';
import useGetMovieReviews from '../../hooks/useGetMovieReviews'
import './Movies.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import noImg from '../../images/no-image.jpg'

export default function SingleMovie() {
    const [showAllTrailers, setShowAllTrailers] = useState(false);
    const [posterHeight, setPosterHeight] = useState();
    const [pageNumber, setPageNumber, searchText, setSearchText, selectedMovieId, setSelectedMovieId] = useOutletContext();
    const { movieDetails, allGenres } = useSingleMovieDetails(selectedMovieId);
    const { allTrailers, firstTrailer } = useMovieTrailers(selectedMovieId);
    const { reviews } = useGetMovieReviews(selectedMovieId)
    const imgPath = "https://image.tmdb.org/t/p/w300";
    const poster = document.querySelector('.movie-details--image');
    
    const showMoreVideos = () => {
        setShowAllTrailers(prevShowAllTrailers => !prevShowAllTrailers);
    }

    const reviewerAvatar = (imgLink) => {
        if (imgLink !== null) {
            if (imgLink.startsWith('/https')) {
                return noImg
            } else {
                return `${imgPath}${imgLink}`
            }
        } else {
            return noImg
        }
    }
    window.addEventListener('resize', (event) => {
        if (poster !== null) {
            setPosterHeight(poster.height)
        }
    })


    return (
        <div className='movie-details'>
            <div className='movie-details--title-rating'>
                <h2 className='movie-details--title'>{movieDetails.title}</h2>
                <div className='movie-details--rating'><FontAwesomeIcon icon={faStar} />{movieDetails.vote_average} / 10</div>
            </div>
            <img onLoad={() => setPosterHeight(poster.height)} className='movie-details--image' src={`${imgPath}${movieDetails.poster_path}`} alt={`${movieDetails.title} poster`} />
            <div className="movie-details--trailer">
                <iframe height={posterHeight} src={`https://www.youtube.com/embed/${firstTrailer.key}`} title={firstTrailer.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <button className='movie-details--more-videos' onClick={showMoreVideos}>{allTrailers.length} Videos</button>
            {showAllTrailers &&
                <div className="movie-details--all-trailers">
                    {allTrailers.map(trailer => {
                        return (
                            <iframe key={trailer.id} src={`https://www.youtube.com/embed/${trailer.key}`} title={trailer.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        )
                    })}
                </div>}
            <p className='movie-details--genres'>{allGenres}</p>
            <p className='movie-details--overview'>{movieDetails.overview}</p>
            {reviews.length > 0 &&
                <div className="reviews-container">
                    <h3 className='reviews--title'>Reviews</h3>
                    {reviews.map(review => {
                        return (
                            <div className="review" key={review.id}>
                                <img src={reviewerAvatar(review.author_details.avatar_path)} alt={`${review.author} avatar`} className="review--user-image" />
                                <div className='review--name-rating'>
                                    <h4 className="review--user-name">{review.author}</h4>
                                    <div className="review--user-rating"><FontAwesomeIcon icon={faStar} /> {review.author_details.rating} / 10</div>
                                </div>
                                <p className="review--user-comment">
                                    {review.content}
                                </p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}
