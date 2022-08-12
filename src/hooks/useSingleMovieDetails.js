import { useEffect, useState } from 'react';
import axios from 'axios'

export default function useSingleMovieDetails(id) {
    const [movieDetails,  setMovieDetails] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    
    useEffect(() =>{
        let cancel
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}?api_key=dbcafb737de5a05b646685f222cf8caa`,
            cancelToken: new axios.CancelToken(c => cancel =c)
        }).then(res => {
            setMovieDetails(res.data) 
            setAllGenres(res.data.genres.map(g => <span key={g.id}>{g.name}</span>))
        }).catch(e => {
            if(axios.isCancel(e)) return 
        })
        return () => cancel();
    },[id])

    return { movieDetails, allGenres }
}
