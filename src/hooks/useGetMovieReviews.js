import { useState, useEffect} from 'react'
import axios from 'axios'

export default function useMovieTrailers(id) {
    const [reviews, setReviews] = useState([]);
    
    useEffect(() =>{
        let cancel
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=dbcafb737de5a05b646685f222cf8caa`,
            cancelToken: new axios.CancelToken(c => cancel =c)
        }).then(res => {
            setReviews(res.data.results)
        }).catch(e => {
            if(axios.isCancel(e)) return 
        })
        return () => cancel();
    },[id])
    return { reviews }
}
