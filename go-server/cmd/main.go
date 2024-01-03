package main

import (
	"fmt"
	"net/http"

	"github.com/rs/cors"
	"github.com/ssadeg10/pictoweb/internal/routes"
)

func main() {
	router := routes.NewRouter();

	port := 8080
	addr := fmt.Sprintf(":%d", port)
	fmt.Printf("Listening on http://localhost%s\n", addr)
	handler := cors.Default().Handler(router)
	err := http.ListenAndServe(addr, handler)
	if err != nil {
		panic(err)
	}
}