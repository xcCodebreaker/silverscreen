import Ticket from './../images/movie_tickets.jpg'
const Home = () => {

    return(
        <>
        <div className="text-center">
            <h2>Find a movie to watch!</h2>
            <hr />
            <img src={Ticket} alt="movie_tickets"></img>
        </div>
        </>
    )
}

export default Home;