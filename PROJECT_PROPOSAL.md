# Project Proposal: SilverScreen - Theatre Movie Catalog Management System

**Student Name:** Abdullah  
**Student ID:** 231-134-022  
**Course Name:** Project on Web App Development  
**Instructor Name:** Wadia Iqbal Chowdhury  

---

## 1. Introduction

SilverScreen is a web-based movie catalog and management system designed for theatres to showcase and manage their movie offerings efficiently. The application provides a comprehensive platform where users can browse available movies, explore genres, and view detailed movie information, while administrators have full control over the movie database through a secure admin panel.

This system serves as a foundational base for commercial theatre operations, offering core functionality for movie catalog management that can be extended with booking capabilities, payment integration, and additional features in the future. The modular architecture ensures scalability and easy integration of future enhancements.

## 2. Objectives

- **Provide users with an intuitive interface** to browse movies, view details, and explore content by genre.
- **Enable administrators** to efficiently manage movie listings, including adding, editing, and removing movies from the catalog.
- **Implement secure authentication** using JWT tokens with refresh token mechanism for enhanced security.
- **Integrate external movie data** by automatically fetching movie posters from TheMovieDB API to enrich the catalog.
- **Build a scalable architecture** using modern web technologies that can be extended with booking functionality and other features.
- **Maintain data integrity** through proper database design and validation.
- **Provide flexible API access** through both RESTful endpoints and GraphQL interface for different integration needs.

## 3. Features

### 3.1 User-Facing Features

- **Home Page** – Welcome page with application overview and navigation.
- **Movie Catalog** – Comprehensive display of all available movies with posters, titles, ratings, and release dates.
- **Movie Details** – Detailed view for each movie including description, runtime, MPAA rating, genres, and poster image.
- **Genre Browsing** – Browse movies organized by genre categories.
- **Genre Filtering** – Filter and view movies by specific genre selections.

### 3.2 Administrative Features

- **Secure Login System** – JWT-based authentication with refresh tokens stored in HTTP-only cookies.
- **Movie Management Panel** – Complete CRUD (Create, Read, Update, Delete) operations for movies.
- **Add Movies** – Form-based interface to add new movies with automatic poster retrieval from TheMovieDB API.
- **Edit Movies** – Update movie information including title, description, release date, runtime, rating, and genre associations.
- **Delete Movies** – Remove movies from the catalog with proper confirmation.
- **Catalogue Management** – Centralized interface to view and manage all movies.
- **GraphQL Interface** – Advanced query interface for flexible movie data retrieval.

### 3.3 Technical Features

- **Automatic Poster Integration** – Fetches movie poster images from TheMovieDB API based on movie title.
- **Multi-Genre Support** – Movies can be associated with multiple genres.
- **Token Refresh Mechanism** – Automatic token renewal to maintain user sessions securely.
- **CORS Support** – Properly configured for cross-origin requests.
- **Error Handling** – Comprehensive error handling and user feedback throughout the application.

## 4. Tech Stack / Tools

### Frontend
- **React.js 19.2.0** – Modern UI library for building interactive user interfaces
- **React Router 7.9.5** – Client-side routing for single-page application navigation
- **Bootstrap CSS** – Responsive styling framework
- **SweetAlert2 11.26.3** – Enhanced alert dialogs and notifications
- **React Scripts 5.0.1** – Build tooling and development server

### Backend
- **Go (Golang) 1.25.3** – High-performance server-side programming language
- **Chi Router v5.2.3** – Lightweight, fast HTTP router for building RESTful APIs
- **golang-jwt/jwt/v4 4.5.2** – JWT authentication and token management
- **graphql-go/graphql v0.8.1** – GraphQL implementation for flexible API queries
- **jackc/pgx/v4 4.18.3** – PostgreSQL database driver
- **golang.org/x/crypto** – Cryptographic functions for password hashing (bcrypt)

### Database
- **PostgreSQL 14.5+** – Robust, open-source relational database management system
- **Database Schema:**
  - Users table (authentication)
  - Movies table (catalog data)
  - Genres table (categorization)
  - Movies_Genres junction table (many-to-many relationship)

### External Services
- **TheMovieDB API** – External service for movie poster image retrieval

### Development Tools
- **Git** – Version control system
- **Docker** (future consideration) – Containerization for deployment
- **React Testing Library** – Testing framework for React components

## 5. System Architecture

The application follows a clean separation of concerns:

- **Frontend:** React-based single-page application (SPA) running on port 3000
- **Backend:** Go HTTP server providing RESTful and GraphQL APIs on port 8080
- **Database:** PostgreSQL database for persistent data storage
- **Communication:** JSON over HTTP/HTTPS with CORS support

The architecture is modular and can be easily extended with:
- Booking system integration
- Payment gateway integration
- User profile management
- Showtime scheduling
- Seat selection functionality
- Analytics and reporting

## 6. Expected Outcome

- **A fully functional movie catalog system** with separate user and admin roles.
- **Smooth user experience** for browsing movies, viewing details, and exploring by genre.
- **Reliable backend** with secure authentication, data storage, and retrieval.
- **RESTful and GraphQL APIs** for flexible integration and future enhancements.
- **Automatic movie poster integration** to enhance catalog visual appeal.
- **Modular and extendable codebase** that serves as a solid foundation for commercial theatre operations.
- **Secure authentication system** using industry-standard JWT tokens with refresh mechanism.
- **Production-ready architecture** that can be deployed and scaled as needed.

## 7. Future Enhancements

The current system is designed as a base platform that can be extended with:

- **Booking System** – Ticket reservation and booking functionality for users
- **Showtime Management** – Schedule and manage movie showtimes for theatres
- **User Profiles** – User account management with booking history
- **Payment Integration** – Secure payment processing for ticket purchases
- **Seat Selection** – Visual seat map and selection interface
- **Email Notifications** – Booking confirmations and reminders
- **Analytics Dashboard** – Reports on movie popularity, booking trends, and revenue
- **Multi-theatre Support** – Support for managing multiple theatre locations
- **Mobile Applications** – Native iOS and Android apps
- **Advanced Search** – Filter by multiple criteria (rating, year, duration, etc.)
- **User Ratings and Reviews** – Customer feedback system
- **Recommendation Engine** – Personalized movie recommendations

## 8. Project Status

The core movie catalog and management system has been successfully implemented with all primary features functional. The system is ready for use by theatres as a catalog management platform and provides a solid foundation for future enhancements such as booking functionality.


