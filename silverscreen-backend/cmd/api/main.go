package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type application struct {
	Domain string
}

func main() {
	// set app config
	var app application

	// read from cmd

	// connect to db
	app.Domain = "example.com"

	log.Println("Starting app on port", port)

	http.HandleFunc("/", Hello)
	// start web server
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}
