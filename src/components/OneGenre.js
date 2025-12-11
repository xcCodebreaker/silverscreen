import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const OneGenre = () => {
  // we need to get the "prop" passed to this component
  const location = useLocation();
  const { genreName } = location.state;

  // set stateful variables
  const [movies, setMovies] = useState([]);

  // get the id from the url
  let { id } = useParams();

  // useEffect to get list of movies
  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`/movies/genres/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.message);
        } else {
          setMovies(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // return jsx
  return (
    <div>
      <h2>Genre: {genreName}</h2>
      <p className="text-secondary">{movies.length} movies in this genre</p>

      {movies && movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((m) => (
            <Link 
              to={`/movies/${m.id}`} 
              key={m.id} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="movie-card">
                {m.image ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${m.image}`} 
                    alt={m.title}
                    className="movie-card-image"
                  />
                ) : (
                  <div className="movie-card-image" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    fontWeight: '800',
                    color: 'white'
                  }}>
                    🎬
                  </div>
                )}
                <div className="movie-card-content">
                  <h3 className="movie-card-title">{m.title}</h3>
                  <p className="movie-card-meta">
                    {new Date(m.release_date).getFullYear()} • {m.mpaa_rating}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="modern-card text-center">
          <p className="text-secondary">No movies in this genre yet!</p>
        </div>
      )}
    </div>
  );
};

export default OneGenre;
