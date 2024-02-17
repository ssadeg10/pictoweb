package rooms

import "slices"

/*
	TODO: will need to cache room codes on creation and validation.
	create cache.go
	use mutex to prevent concurrency error
	check cache, then check DB
*/

var mockRooms = [2]string{"aab", "aac"}

func ValidateRoomId(roomId string) bool {
	return slices.Contains(mockRooms[:], roomId)
}

func CreateRoom() {

}
