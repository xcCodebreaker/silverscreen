import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect( () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`http://localhost:8080/movies`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    return(
        <div>
            <h2>Movies</h2>
            <p className="text-secondary">Browse our collection of {movies.length} movies</p>
            
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
        </div>
    )
}

export default Movies;