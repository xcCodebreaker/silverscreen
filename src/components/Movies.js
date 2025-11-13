import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect( () => {
        let moviesList = [
            {
                id: 1,
                title: "Thunderbolts",
                release_date: "2025-04-07",
                runtime: 124,
                mpaa_rating: "PG-13",
                description: "Testing description section by writing the words Testing description section",
            },
            {
                id: 2,
                title: "Whiplash",
                release_date: "2015-11-01",
                runtime: 160,
                mpaa_rating: "R",
                description: "Testing description section by writing the words Testing description section",
            },
        ];
        setMovies(moviesList)
    }, []);

    return(
        <div>
            <h2>Movies</h2>
            <hr />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m) => (
                        <tr key={m.id}>
                            <td>
                                <Link to={`/movies/${m.id}`}>
                                    {m.title}
                                </Link>
                            </td>
                            <td>{m.release_date}</td>
                            <td>{m.mpaa_rating}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Movies;