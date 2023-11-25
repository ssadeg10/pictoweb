package main

import (
	"fmt"
	"net/http"

	"github.com/ssadeg10/pictoweb/internal/routes"
)

func main() {
	router := routes.NewRouter();

	port := 8080
	addr := fmt.Sprintf(":%d", port)
	fmt.Printf("Listening on http://localhost%s\n", addr)
	err := http.ListenAndServe(addr, router)
	if err != nil {
		panic(err)
	}
}