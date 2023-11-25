package routes

import (
	"fmt"
	"net/http"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux();

	mux.HandleFunc("/test", testHandler)
	mux.HandleFunc("/error", errStatusHandler)
	return mux
}

func testHandler(w http.ResponseWriter, r *http.Request)  {
	fmt.Fprintln(w, "testing...")
}

func errStatusHandler(w http.ResponseWriter, r *http.Request)  {
	w.WriteHeader(http.StatusInternalServerError);
}