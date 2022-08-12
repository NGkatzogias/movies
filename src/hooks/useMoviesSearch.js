import { useEffect, useState } from "react";
import axios from "axios";

export default function useMovieSearch(searchText, pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setMovies([]);
    },[searchText])
    
    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie?api_key=dbcafb737de5a05b646685f222cf8caa',
            params: {query: searchText, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel =c)
        }).then(res => {
            setMovies(prevMovies => {
                return [...new Set([...prevMovies, ...res.data.results])]
            })
            setHasMore(res.data.results.length > 0);
            setLoading(false);
        }).catch(e => {
            if(axios.isCancel(e)) return 
            setError(true);
        })
        return () => cancel();
    },[searchText, pageNumber])
    return { loading, error, movies, hasMore};
}

