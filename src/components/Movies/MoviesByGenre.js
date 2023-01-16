import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faX, faSliders } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGetGenreList from "../../hooks/useGetGenreList";
import useGetMoviesByGenre from "../../hooks/useGetMoviesByGenre";
import noImg from "../../images/no-image.jpg";

function MoviesByGenre({ pageNumber, setPageNumber }) {
  const [showGenres, setShowGenres] = useState(false);
  const { id } = useParams();
  console.log(id);
  const { movies, hasMore, loading, error } = useGetMoviesByGenre(
    id,
    pageNumber
  );
  console.log(pageNumber);
  const { genres } = useGetGenreList();
  const imgPath = "https://image.tmdb.org/t/p/w300";
  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPageNumber]
  );

  const showPoster = (poster) => {
    if (poster !== null) {
      return `${imgPath}${poster}`;
    } else {
      return noImg;
    }
  };

  let allMovies = movies.map((movie, index) => {
    if (movies.length === index + 1) {
      return (
        <div className="movie" key={movie.id} ref={lastMovieElementRef}>
          <Link to={`/SingleMovie/${movie.id}`}>
            <img
              src={showPoster(movie.poster_path)}
              alt={movie.title}
              className="movie--img"
            />
          </Link>
          <div className="movie--info">
            <div className="movie--rating">
              <FontAwesomeIcon icon={faStar} />
              {movie.vote_average} / 10
            </div>
            <Link to={`/SingleMovie/${movie.id}`} className="movie--title">
              {movie.title}
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="movie" key={movie.id}>
          <Link to={`/SingleMovie/${movie.id}`}>
            <img
              src={showPoster(movie.poster_path)}
              alt={movie.title}
              className="movie--img"
            />
          </Link>
          <div className="movie--info">
            <div className="movie--rating">
              <FontAwesomeIcon icon={faStar} />
              {movie.vote_average} / 10
            </div>
            <Link to={`/SingleMovie/${movie.id}`} className="movie--title">
              {movie.title}
            </Link>
          </div>
        </div>
      );
    }
  });

  const allGenres = genres.map((genre) => {
    return (
      <li key={genre.id}>
        <Link
          onClick={() => setPageNumber(1)}
          to={`/MoviesByGenre/${genre.id}`}
        >
          {genre.name}
        </Link>
      </li>
    );
  });

  return (
    <>
      <div className="flex-box-md">
        <h2 className="title">Recent Movies</h2>
        <button
          className="show-genres"
          onClick={() => setShowGenres(!showGenres)}
        >
          <FontAwesomeIcon icon={faSliders} />
          Genres
        </button>
      </div>
      {showGenres && (
        <div className="genre-wrapper">
          <button className="close-genres" onClick={() => setShowGenres(false)}>
            <FontAwesomeIcon icon={faX} />
          </button>
          <ul>{allGenres}</ul>
        </div>
      )}

      <div className="movie-grid">{allMovies}</div>
      <div>{loading && "loading"}</div>
      <div>{error && "Error"}</div>
    </>
  );
}

export default MoviesByGenre;
