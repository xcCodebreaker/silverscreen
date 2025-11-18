package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/xcCodebreaker/silverscreen/internal/models"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "Movies are active",
		Version: "1.0.0",
	}

	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Contentt-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}

func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	var movies []models.Movie

	rd, _ := time.Parse("2006-01-02", "2025-03-12")

	thunderbolts := models.Movie{
		ID:          1,
		Title:       "Thunderbolts",
		ReleaseDate: rd,
		MPAARating:  "PG-13",
		RunTime:     124,
		Description: "A marvel movie",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, thunderbolts)

	rd, _ = time.Parse("2006-01-02", "2014-06-10=")

	whiplash := models.Movie{
		ID:          2,
		Title:       "Whiplash",
		ReleaseDate: rd,
		MPAARating:  "R",
		RunTime:     182,
		Description: "An intense movie",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, whiplash)

	out, err := json.Marshal(movies)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Contentt-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}
