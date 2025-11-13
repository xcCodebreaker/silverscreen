import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [movie, setMovie] = useState({});
    let { id } = useParams();

    useEffect( () => {
        let myMovie = {
                id: 1,
                title: "Thunderbolts",
                release_date: "2025-04-07",
                runtime: 124,
                mpaa_rating: "PG-13",
                description: "Testing description section by writing the words Testing description section",
            }
            setMovie(myMovie);
    }, [id])
    return(
        <div>
            <h2>Movie: {movie.title}</h2>
            <small><em>{movie.release_date}, {movie.runtime} minutes, Rated {movie.mpaa_rating}</em></small>
            <hr />
            <p>{movie.description}</p>
        </div>
    )
}

export default Movie;