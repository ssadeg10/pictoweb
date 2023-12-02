export async function verifyRoomCode(roomCode) {
  const url = "http://localhost:8080/test";
  const response = await fetch(url);
  if (!response.ok) {
    return {
      status: response.status,
      statusText: response.statusText,
    };
  }
}
