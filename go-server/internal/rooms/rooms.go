package rooms

import "slices"

var mockRooms = [2]string{"aab", "aac"}

func ValidateRoomId(roomId string) bool {
	return slices.Contains(mockRooms[:], roomId)
}

func CreateRoom() {

}
