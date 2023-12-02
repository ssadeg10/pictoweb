import { verifyRoomCode } from "../../api/verifyRoomCode";

export function userSetupLoader(roomCode) {
  return verifyRoomCode(roomCode).then((response) => {
    if (!response) {
      return null;
    }
    if (!response.ok && response.status !== 404) {
      throw new Response("", {
        status: response.status,
        statusText: response.statusText,
      });
    }
    return null;
  });
}
