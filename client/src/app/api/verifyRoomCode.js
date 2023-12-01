export async function verifyRoomCode(roomCode) {
  const url = "http://localhost:8080/test";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error([response.status, response.statusText]);
    }
  } catch (error) {
    console.error(`${error[0]} Error: ${error[1]}`);
    return false;
  }
  return true;
}
