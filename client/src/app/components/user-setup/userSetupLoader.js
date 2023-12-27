import { verifyRoomCode } from "../../api/verifyRoomCode";

export async function userSetupLoader(roomCode) {
  const response = await verifyRoomCode(roomCode);
  // console.log(response);
  // if (typeof response === "string") {
  //   throw response;
  // }

  if (response?.status && response?.status !== 200) {
    throw new Response("", {
      status: response.status,
      statusText: response.statusText,
    });
  }
  // if (!response) {
  //   throw new Error("Bad response");
  // }
  return response;
}
