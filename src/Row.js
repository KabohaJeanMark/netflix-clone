import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios';
import './Row.css';

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
      async function fetchData() {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    }, [fetchUrl]);

    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
    };

    const handleClick = (movie) => {
      console.log('movie details', movie)
      if(trailerUrl) {
        setTrailerUrl('');
      } else {
        movieTrailer(movie?.name || movie?.original_name || '')
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
            console.log("The set trailer url", trailerUrl)
          }).catch((error) => console.log(error));
      }
    };

    return (
    <div className='row'>
        <h2>{title}</h2>
        <div className='row-posters'>
          {movies.map(movie => (
            <img
              key={movie.id}
              onClick={()=> handleClick(movie)}
              className={`row-poster ${isLargeRow && "row-poster-large"}`} 
              src={`${base_url}${isLargeRow? movie?.poster_path: movie?.backdrop_path }`} 
              alt={movie?.name}
            />
          ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}

export default Row;
