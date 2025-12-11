import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">Experience Cinema</h1>
      <p className="hero-subtitle">
        Your ultimate guide to the silver screen. Discover, rate, and explore thousands of movies in our curated catalog.
      </p>
      <Link to="/movies" className="modern-btn modern-btn-primary">
        Start Browsing
      </Link>
    </div>
  );
};

export default Home;
