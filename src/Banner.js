import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(()=> {
        async function fetchMovieData() {
            const request = await axios.get(requests.fetchTrending);
            console.log(request)
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ])
            return request;
        }
        fetchMovieData()
    }, [])

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + '...' : str; 
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
      };

    const handleClick = () => {
        if(trailerUrl) {
            setTrailerUrl('');
        } else {
                movieTrailer(movie?.title || movie?.name || movie?.original_name || '')
                  .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                  }).catch((error) => console.log(error));
              }
    }

    return (
        <>
            <header 
                className='banner'
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(
                        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                    )`,
                    backgroundPosition: "cover center",
                }}>
                <div className='banner-contents'>
                    <h1 className='banner-title'>
                        { movie?.title || movie?.name || movie?.original_name }
                    </h1>
                    <div className='banner-buttons'>
                        <button onClick={()=> handleClick()} className='banner-button'>Play</button>
                        <button className='banner-button'>My List</button>
                    </div>
                    <h1 className="banner-description">
                        {truncate(movie?.overview, 150)}
                    </h1>
                    
                </div>
                <div className="banner-fadebottom">

                </div>
            </header>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </>
        
    )
}

export default Banner;
