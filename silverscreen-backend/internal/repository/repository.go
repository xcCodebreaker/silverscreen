package repository

import (
	"database/sql"

	"github.com/xcCodebreaker/silverscreen/internal/models"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	AllMovies() ([]*models.Movie, error)
}
