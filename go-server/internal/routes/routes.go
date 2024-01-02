package routes

import (
	"encoding/json"
	"net/http"

	"github.com/ssadeg10/pictoweb/internal/rooms"
)

type genericResponse struct {
	Error   bool            `json:"error"`
	Message string          `json:"message"`
	Data    json.RawMessage `json:"data"`
}

func NewRouter() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/test", testHandler)
	mux.HandleFunc("/error", errStatusHandler)
	mux.HandleFunc("/validate", validateRoomHandler)
	return mux
}

func testHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("testing..."))
}

func errStatusHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusInternalServerError)
}

func validateRoomHandler(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()
	roomId := queryParams.Get("roomId")

	var response genericResponse
	if rooms.ValidateRoomId(roomId) {
		response = genericResponse{
			Error:   false,
			Message: roomId,
		}
		w.WriteHeader(http.StatusOK)
	} else {
		response = genericResponse{
			Error:   true,
			Message: "Invalid roomId",
		}
		w.WriteHeader(http.StatusBadRequest)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
