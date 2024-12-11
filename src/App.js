import './App.css';
import Row from './Row';
import requests from './requests';

function App() {
  return (
    <div className="App">
      Netflix Clone frontend build today
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals}/>
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
    </div>
  );
}

export default App;
