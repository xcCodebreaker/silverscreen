# Software Requirements Specification (SRS)

## SilverScreen - Movie Catalog and Management Platform

**Version:** 1.0  

**Date:** December 2, 2024  

**Project ID:** silverscreen-movie-catalog

---

## 1. Introduction

### 1.1 Purpose

This document specifies the functional and non-functional requirements for SilverScreen, a web-based movie catalog and management platform. The application enables users to browse movies, filter by genres, and provides administrators with tools to manage the movie database.

### 1.2 Scope

SilverScreen is a full-stack web application that provides:

- User authentication and authorization
- Movie catalog browsing and viewing
- Genre-based movie filtering
- Movie management (create, read, update, delete) for authenticated users
- Automatic movie poster retrieval from external API
- GraphQL API for flexible movie queries
- RESTful API endpoints for all operations

### 1.3 Definitions and Acronyms

- **JWT**: JSON Web Token - used for authentication
- **Refresh Token**: Long-lived token stored in HTTP-only cookie for token renewal
- **Access Token**: Short-lived JWT token for API authorization
- **TheMovieDB**: External API service for movie poster images
- **SRS**: Software Requirements Specification
- **UI**: User Interface
- **REST**: Representational State Transfer
- **GraphQL**: Query language for APIs

### 1.4 References

- React Documentation: https://react.dev
- Go Documentation: https://go.dev/doc/
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- TheMovieDB API: https://developers.themoviedb.org/
- JWT Specification: https://jwt.io/

---

## 2. Overall Description

### 2.1 Product Perspective

SilverScreen is a standalone web application built with:

- **Frontend**: React 19.2.0, React Router 7.9.5, Bootstrap CSS
- **Backend**: Go 1.25.3, Chi Router v5.2.3
- **Database**: PostgreSQL 14.5+
- **Authentication**: JWT (golang-jwt/jwt/v4)
- **External Services**: TheMovieDB API (for poster images)
- **GraphQL**: graphql-go/graphql v0.8.1

### 2.2 Product Functions

1. User authentication (login/logout/refresh tokens)
2. Movie catalog browsing
3. Individual movie detail viewing
4. Genre listing and filtering
5. Movie management (CRUD operations) for authenticated users
6. Automatic movie poster image fetching
7. GraphQL query interface
8. RESTful API for all operations

### 2.3 User Classes and Characteristics

#### Guest User (Unauthenticated)

- Can view list of all movies
- Can view individual movie details
- Can browse genres
- Can view movies filtered by genre
- Cannot add, edit, or delete movies
- Cannot access admin features

#### Authenticated User (Admin)

- Has all guest user capabilities
- Can add new movies to the catalog
- Can edit existing movie information
- Can delete movies from the catalog
- Can access movie management interface
- Can use GraphQL interface
- Can access all admin-protected endpoints

### 2.4 Operating Environment

- **Client**: Modern web browsers (Chrome, Firefox, Safari, Edge)
- **Server**: Go HTTP server (port 8080)
- **Database**: PostgreSQL database server
- **Development**: React development server (port 3000, proxied to backend)

### 2.5 Design and Implementation Constraints

- Backend must use Go programming language
- Frontend must use React framework
- Database must be PostgreSQL
- Authentication must use JWT tokens
- Refresh tokens must be stored in HTTP-only cookies
- Must integrate with TheMovieDB API for poster images
- CORS must be properly configured for frontend-backend communication
- All API responses must be JSON format

### 2.6 Assumptions and Dependencies

- Users have stable internet connection
- Users have modern web browsers with JavaScript enabled
- PostgreSQL database server is running and accessible
- TheMovieDB API key is available and valid
- Backend server is accessible on configured port
- Users provide valid email addresses for authentication

---

## 3. Functional Requirements

### 3.1 User Authentication

#### 3.1.1 User Login

**Priority**: High  

**Description**: Registered users can log in using their email and password.

**Requirements**:

- FR-1.1: System shall provide a login form with email and password fields
- FR-1.2: System shall validate email format
- FR-1.3: System shall authenticate users against database
- FR-1.4: System shall validate password using bcrypt hashing
- FR-1.5: System shall generate JWT access token upon successful login
- FR-1.6: System shall generate refresh token and store in HTTP-only cookie
- FR-1.7: System shall display error messages for invalid credentials
- FR-1.8: System shall redirect authenticated users to home page
- FR-1.9: System shall maintain user session via refresh token

#### 3.1.2 Token Refresh

**Priority**: High  

**Description**: System automatically refreshes access tokens using refresh token.

**Requirements**:

- FR-2.1: System shall check for refresh token cookie on page load
- FR-2.2: System shall validate refresh token if present
- FR-2.3: System shall generate new access token from valid refresh token
- FR-2.4: System shall automatically refresh tokens at configured intervals (10 minutes)
- FR-2.5: System shall return error if refresh token is invalid or expired
- FR-2.6: System shall handle token refresh failures gracefully

#### 3.1.3 User Logout

**Priority**: High  

**Description**: Authenticated users can log out of the application.

**Requirements**:

- FR-3.1: System shall provide a logout button in navigation
- FR-3.2: System shall clear refresh token cookie upon logout
- FR-3.3: System shall clear access token from frontend state
- FR-3.4: System shall stop token refresh interval
- FR-3.5: System shall redirect to login page after logout

### 3.2 Movie Catalog Browsing

#### 3.2.1 View All Movies

**Priority**: High  

**Description**: Users can view a list of all movies in the catalog.

**Requirements**:

- FR-4.1: System shall display all movies from database
- FR-4.2: System shall show movie title, poster, release date, and rating
- FR-4.3: System shall display movies in a grid or list format
- FR-4.4: System shall allow users to click on movies to view details
- FR-4.5: System shall handle empty catalog gracefully

#### 3.2.2 View Movie Details

**Priority**: High  

**Description**: Users can view detailed information about a specific movie.

**Requirements**:

- FR-5.1: System shall display movie title, description, release date
- FR-5.2: System shall display movie runtime, MPAA rating
- FR-5.3: System shall display movie poster image
- FR-5.4: System shall display associated genres
- FR-5.5: System shall handle movie not found errors
- FR-5.6: System shall provide navigation back to movie list

### 3.3 Genre Management

#### 3.3.1 View All Genres

**Priority**: High  

**Description**: Users can view a list of all available genres.

**Requirements**:

- FR-6.1: System shall display all genres from database
- FR-6.2: System shall allow users to click on genres to filter movies
- FR-6.3: System shall display genres in a list format
- FR-6.4: System shall show genre names clearly

#### 3.3.2 View Movies by Genre

**Priority**: High  

**Description**: Users can filter and view movies by genre.

**Requirements**:

- FR-7.1: System shall filter movies by selected genre
- FR-7.2: System shall display genre name in page header
- FR-7.3: System shall show all movies matching the genre
- FR-7.4: System shall handle genres with no movies gracefully
- FR-7.5: System shall allow navigation back to all genres

### 3.4 Movie Management (Admin Only)

#### 3.4.1 Add Movie

**Priority**: High  

**Description**: Authenticated users can add new movies to the catalog.

**Requirements**:

- FR-8.1: System shall provide "Add Movie" link in navigation (authenticated users only)
- FR-8.2: System shall display movie creation form
- FR-8.3: System shall require movie title, release date, runtime, MPAA rating, description
- FR-8.4: System shall allow selection of multiple genres
- FR-8.5: System shall automatically fetch poster image from TheMovieDB API
- FR-8.6: System shall validate all required fields
- FR-8.7: System shall save movie to database
- FR-8.8: System shall associate selected genres with movie
- FR-8.9: System shall display success message upon creation
- FR-8.10: System shall redirect to movie management page after creation

#### 3.4.2 Edit Movie

**Priority**: High  

**Description**: Authenticated users can edit existing movie information.

**Requirements**:

- FR-9.1: System shall provide edit functionality for existing movies
- FR-9.2: System shall pre-populate form with existing movie data
- FR-9.3: System shall allow editing of title, release date, runtime, rating, description
- FR-9.4: System shall allow modification of genre associations
- FR-9.5: System shall validate all required fields
- FR-9.6: System shall update movie in database
- FR-9.7: System shall update genre associations
- FR-9.8: System shall update timestamp fields
- FR-9.9: System shall display success message upon update

#### 3.4.3 Delete Movie

**Priority**: Medium  

**Description**: Authenticated users can delete movies from the catalog.

**Requirements**:

- FR-10.1: System shall provide delete functionality in movie management interface
- FR-10.2: System shall display confirmation dialog before deletion
- FR-10.3: System shall delete movie from database
- FR-10.4: System shall remove genre associations (cascade delete)
- FR-10.5: System shall display success message upon deletion
- FR-10.6: System shall refresh movie list after deletion

#### 3.4.4 Manage Movie Catalogue

**Priority**: Medium  

**Description**: Authenticated users can view and manage all movies in one interface.

**Requirements**:

- FR-11.1: System shall provide "Manage Catalogue" page
- FR-11.2: System shall display list of all movies with actions
- FR-11.3: System shall provide edit and delete buttons for each movie
- FR-11.4: System shall allow navigation to add new movie
- FR-11.5: System shall display movie count

### 3.5 Movie Poster Integration

#### 3.5.1 Automatic Poster Fetching

**Priority**: Medium  

**Description**: System automatically fetches movie posters from TheMovieDB API.

**Requirements**:

- FR-12.1: System shall search TheMovieDB API when movie is created
- FR-12.2: System shall use movie title for search query
- FR-12.3: System shall retrieve poster path from first search result
- FR-12.4: System shall store poster path in database
- FR-12.5: System shall handle API errors gracefully
- FR-12.6: System shall allow movies without posters if API fails

### 3.6 GraphQL Interface

#### 3.6.1 GraphQL Query Support

**Priority**: Low  

**Description**: System provides GraphQL endpoint for flexible movie queries.

**Requirements**:

- FR-13.1: System shall provide GraphQL endpoint at `/graph`
- FR-13.2: System shall support "list" query to get all movies
- FR-13.3: System shall support "search" query to filter by title
- FR-13.4: System shall support "get" query to retrieve single movie by ID
- FR-13.5: System shall return movie data in requested format
- FR-13.6: System shall handle GraphQL errors appropriately
- FR-13.7: System shall provide GraphQL interface UI for authenticated users

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements

- NFR-1: System shall load movie list within 2 seconds
- NFR-2: System shall display movie details within 1 second
- NFR-3: System shall handle up to 1000 movies efficiently
- NFR-4: System shall respond to API requests within 500ms (95th percentile)
- NFR-5: System shall handle concurrent user requests efficiently

### 4.2 Security Requirements

- NFR-6: System shall encrypt all data in transit using HTTPS (production)
- NFR-7: System shall hash passwords using bcrypt with appropriate cost
- NFR-8: System shall validate all user inputs
- NFR-9: System shall prevent SQL injection attacks
- NFR-10: System shall enforce authentication for admin endpoints
- NFR-11: System shall use HTTP-only cookies for refresh tokens
- NFR-12: System shall expire access tokens after 15 minutes
- NFR-13: System shall expire refresh tokens after 24 hours
- NFR-14: System shall validate JWT tokens on each protected request
- NFR-15: System shall sanitize user inputs to prevent XSS attacks

### 4.3 Usability Requirements

- NFR-16: System shall provide intuitive navigation
- NFR-17: System shall display clear error messages for user actions
- NFR-18: System shall provide visual feedback for all interactions
- NFR-19: System shall use responsive design for different screen sizes
- NFR-20: System shall maintain consistent UI/UX throughout application

### 4.4 Reliability Requirements

- NFR-21: System shall handle database connection errors gracefully
- NFR-22: System shall handle external API failures gracefully
- NFR-23: System shall maintain data integrity
- NFR-24: System shall log errors for debugging
- NFR-25: System shall validate data before database operations

### 4.5 Maintainability Requirements

- NFR-26: System shall use modular component architecture
- NFR-27: System shall follow Go best practices
- NFR-28: System shall follow React best practices
- NFR-29: System shall include error logging
- NFR-30: System shall use consistent code formatting
- NFR-31: System shall separate concerns (handlers, models, database)

### 4.6 Scalability Requirements

- NFR-32: System shall support adding new features without major refactoring
- NFR-33: System shall optimize database queries
- NFR-34: System shall handle increasing number of movies
- NFR-35: System shall be deployable to cloud infrastructure

---

## 5. System Features and Use Cases

### 5.1 User Authentication Flow

```
1. User visits application
2. System checks for refresh token cookie
3. If valid token exists, system auto-authenticates user
4. If no token, user sees login page
5. User enters credentials
6. System validates credentials
7. System generates access token and refresh token
8. System stores refresh token in HTTP-only cookie
9. System redirects user to home page
```

### 5.2 Movie Browsing Flow

```
1. User navigates to Movies page
2. System fetches all movies from database
3. System displays movies in grid/list format
4. User clicks on movie
5. System fetches movie details from database
6. System displays movie details with poster and genres
```

### 5.3 Movie Management Flow

```
1. Authenticated user navigates to Add Movie
2. User fills in movie form
3. User selects genres
4. User submits form
5. System validates input
6. System searches TheMovieDB for poster
7. System saves movie to database
8. System associates genres with movie
9. System displays success message
10. System redirects to manage catalogue
```

### 5.4 Genre Filtering Flow

```
1. User navigates to Genres page
2. System displays all genres
3. User clicks on genre
4. System filters movies by selected genre
5. System displays filtered movies
```

---

## 6. Data Requirements

### 6.1 Database Schema

#### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255), -- bcrypt hashed
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### Movies Table

```sql
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(512),
    release_date DATE,
    runtime INTEGER,
    mpaa_rating VARCHAR(10),
    description TEXT,
    image VARCHAR(255), -- poster path
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### Genres Table

```sql
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    genre VARCHAR(255) UNIQUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### Movies_Genres Table (Junction)

```sql
CREATE TABLE movies_genres (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE
);
```

### 6.2 Data Models

#### User Model

```go
type User struct {
    ID        int
    FirstName string
    LastName  string
    Email     string
    Password  string
    CreatedAt time.Time
    UpdatedAt time.Time
}
```

#### Movie Model

```go
type Movie struct {
    ID          int
    Title       string
    ReleaseDate time.Time
    RunTime     int
    MPAARating  string
    Description string
    Image       string
    CreatedAt   time.Time
    UpdatedAt   time.Time
    Genres      []*Genre
    GenresArray []int
}
```

#### Genre Model

```go
type Genre struct {
    ID        int
    Genre     string
    Checked   bool
    CreatedAt time.Time
    UpdatedAt time.Time
}
```

### 6.3 Data Validation Rules

- Email addresses must be valid format and unique
- Movie titles must be 1-512 characters
- Movie descriptions must be text format
- Release dates must be valid dates
- Runtime must be positive integer
- MPAA ratings must be valid (G, PG, PG-13, R, NC-17, 18A, etc.)
- Genre names must be 1-255 characters and unique
- Passwords must be hashed using bcrypt

---

## 7. External Interface Requirements

### 7.1 User Interfaces

- **Home Page**: Welcome page with application information
- **Movies Page**: Grid/list view of all movies
- **Movie Detail Page**: Individual movie information with poster
- **Genres Page**: List of all genres
- **Genre Movies Page**: Filtered movies by genre
- **Login Page**: Authentication form
- **Add Movie Page**: Form to create new movie (admin only)
- **Edit Movie Page**: Form to update existing movie (admin only)
- **Manage Catalogue Page**: List of movies with management actions (admin only)
- **GraphQL Interface**: GraphQL query interface (admin only)

### 7.2 Hardware Interfaces

- Standard web browser on desktop or mobile device
- Internet connection (minimum 1 Mbps recommended)
- Server hardware capable of running Go application and PostgreSQL

### 7.3 Software Interfaces

#### Backend API Endpoints

**Public Endpoints:**
- `GET /` - Home/status endpoint
- `POST /authenticate` - User login
- `GET /refresh` - Token refresh
- `GET /logout` - User logout
- `GET /movies` - Get all movies
- `GET /movies/{id}` - Get single movie
- `GET /genres` - Get all genres
- `GET /movies/genres/{id}` - Get movies by genre
- `POST /graph` - GraphQL endpoint

**Protected Endpoints (Require Authentication):**
- `GET /admin/movies` - Get movie catalog (admin)
- `GET /admin/movies/{id}` - Get movie for edit (admin)
- `PUT /admin/movies/0` - Create new movie (admin)
- `PATCH /admin/movies/{id}` - Update movie (admin)
- `DELETE /admin/movies/{id}` - Delete movie (admin)

#### External API Integration

**TheMovieDB API:**
- Base URL: `https://api.themoviedb.org/3`
- Endpoint: `/search/movie`
- Method: GET
- Parameters: `api_key`, `query` (movie title)
- Response: JSON with movie search results including poster paths

### 7.4 Communication Interfaces

- HTTP/HTTPS for all client-server communication
- JSON format for all API requests and responses
- RESTful API design principles
- CORS enabled for cross-origin requests
- JWT tokens in Authorization header for authenticated requests
- HTTP-only cookies for refresh tokens

---

## 8. API Specifications

### 8.1 Authentication Endpoints

#### POST /authenticate

**Request:**
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response (Success):**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error):**
```json
{
    "error": true,
    "message": "invalid credentials"
}
```

#### GET /refresh

**Request:** None (uses refresh token from cookie)

**Response (Success):**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error):**
```json
{
    "error": true,
    "message": "unauthorized"
}
```

### 8.2 Movie Endpoints

#### GET /movies

**Response:**
```json
[
    {
        "id": 1,
        "title": "Highlander",
        "release_date": "1986-03-07T00:00:00Z",
        "runtime": 116,
        "mpaa_rating": "R",
        "description": "Movie description...",
        "image": "/8Z8dptJEypuLoOQro1WugD855YE.jpg",
        "genres": [
            {"id": 5, "genre": "Action"},
            {"id": 12, "genre": "Fantasy"}
        ]
    }
]
```

#### GET /movies/{id}

**Response:**
```json
{
    "id": 1,
    "title": "Highlander",
    "release_date": "1986-03-07T00:00:00Z",
    "runtime": 116,
    "mpaa_rating": "R",
    "description": "Movie description...",
    "image": "/8Z8dptJEypuLoOQro1WugD855YE.jpg",
    "genres": [...]
}
```

#### PUT /admin/movies/0 (Create Movie)

**Request Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
    "title": "New Movie",
    "release_date": "2024-01-01T00:00:00Z",
    "runtime": 120,
    "mpaa_rating": "PG-13",
    "description": "Movie description",
    "genres_array": [1, 2, 3]
}
```

**Response:**
```json
{
    "error": false,
    "message": "movie updated"
}
```

#### PATCH /admin/movies/{id} (Update Movie)

**Request Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
    "id": 1,
    "title": "Updated Title",
    "release_date": "1986-03-07T00:00:00Z",
    "runtime": 116,
    "mpaa_rating": "R",
    "description": "Updated description",
    "genres_array": [5, 12]
}
```

**Response:**
```json
{
    "error": false,
    "message": "movie updated"
}
```

#### DELETE /admin/movies/{id}

**Request Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "error": false,
    "message": "movie deleted"
}
```

### 8.3 Genre Endpoints

#### GET /genres

**Response:**
```json
[
    {"id": 1, "genre": "Comedy"},
    {"id": 2, "genre": "Sci-Fi"},
    {"id": 3, "genre": "Horror"}
]
```

#### GET /movies/genres/{id}

**Response:**
```json
[
    {
        "id": 1,
        "title": "Movie Title",
        ...
    }
]
```

### 8.4 GraphQL Endpoint

#### POST /graph

**Request Body:**
```graphql
{
    list {
        id
        title
        description
        release_date
        runtime
        mpaa_rating
        image
    }
}
```

**Response:**
```json
{
    "data": {
        "list": [...]
    }
}
```

---

## 9. Appendices

### 9.1 Technology Stack

- **Frontend Framework**: React 19.2.0
- **Routing**: React Router 7.9.5
- **Build Tool**: React Scripts 5.0.1
- **Styling**: Bootstrap CSS
- **Backend Language**: Go 1.25.3
- **Web Framework**: Chi Router v5.2.3
- **Database**: PostgreSQL 14.5+
- **Authentication**: golang-jwt/jwt/v4
- **GraphQL**: graphql-go/graphql v0.8.1
- **Database Driver**: jackc/pgx/v4
- **Password Hashing**: golang.org/x/crypto (bcrypt)

### 9.2 Database Configuration

- **Database Name**: movies
- **Default Port**: 5432
- **Connection String**: Configurable via command-line flag
- **SSL Mode**: disable (development), require (production)
- **Timezone**: UTC

### 9.3 Application Configuration

- **Backend Port**: 8080
- **Frontend Port**: 3000 (development)
- **JWT Access Token Expiry**: 15 minutes
- **JWT Refresh Token Expiry**: 24 hours
- **Cookie Name**: `__Host-refresh_token`
- **Cookie Domain**: localhost (development), configurable (production)
- **CORS Origin**: http://localhost:3000 (development)

### 9.4 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 9.5 Security Considerations

- Passwords are hashed using bcrypt
- Refresh tokens stored in HTTP-only cookies (prevents XSS)
- Access tokens have short expiration (15 minutes)
- All admin endpoints require authentication
- CORS configured for specific origin
- Input validation on all user inputs
- SQL injection prevention via parameterized queries

### 9.6 Deployment Considerations

- Backend server can be deployed as standalone binary
- Frontend can be built and served as static files
- PostgreSQL database must be accessible
- Environment variables for sensitive configuration
- HTTPS required for production
- Secure cookie settings for production

### 9.7 Future Enhancements (Out of Scope)
- User registration functionality
- User profile management
- User movie booking features
- Movie ratings and reviews
- Advanced search and filtering
- Movie recommendations
- Mobile applications (iOS/Android)
- Admin user management
- Role-based access control
- Movie import from external sources
- Bulk movie operations
- Image upload functionality
- Movie trailers integration
- Email notifications
- Export functionality (CSV, PDF)

---

## 10. Approval

**Document Prepared By**: Abdullah  

**Date**: December 2, 2024  

**Version**: 1.0

This document represents the complete software requirements specification for SilverScreen as of the date above.

