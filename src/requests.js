const API_KEY = '716d1ebb990f1148f13420d8df8eb484';

const requests = {
    fetchTrending: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&withNetworks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en_US`,
    fetchComedyMovies: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    fetchRomanceMovies: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
    fetchPopular: `popular?api_key=${API_KEY}&language=en-US&page=1`
}

export default requests;
