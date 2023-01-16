import axios from "axios";
import { useEffect, useState } from "react";

function useGetGenreList() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list?api_key=dbcafb737de5a05b646685f222cf8caa",
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, []);

  return { genres };
}

export default useGetGenreList;
