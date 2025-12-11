import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [movie, setMovie] = useState({});
    let { id } = useParams();

    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`/movies/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id])

    if (movie.genres) {
        movie.genres = Object.values(movie.genres);
    } else {
        movie.genres = [];
    }

    return (
        <div className="movie-detail-container">
            <div className="movie-detail-header">
                {movie.image !== "" && (
                    <div>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
                            alt={movie.title}
                            className="movie-poster"
                        />
                    </div>
                )}

                <div className="movie-info">
                    <h1 className="movie-title">{movie.title}</h1>
                    <p className="movie-meta">
                        {movie.release_date && movie.release_date.split("T")[0]} • {movie.runtime} minutes • Rated {movie.mpaa_rating}
                    </p>

                    <div className="mb-3">
                        {movie.genres.map((g) => (
                            <span key={g.genre} className="modern-badge">{g.genre}</span>
                        ))}
                    </div>

                    <p className="movie-description">{movie.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Movie;