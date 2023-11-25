package routes

import (
	"net/http"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux();

	mux.HandleFunc("/test", testHandler)
	mux.HandleFunc("/error", errStatusHandler)
	return mux
}

func testHandler(w http.ResponseWriter, r *http.Request)  {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("testing..."))
}

func errStatusHandler(w http.ResponseWriter, r *http.Request)  {
	w.WriteHeader(http.StatusInternalServerError);
}