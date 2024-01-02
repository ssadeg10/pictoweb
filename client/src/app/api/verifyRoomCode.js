import GenericResponse from "../models/GenericResponse";

export async function verifyRoomCode(roomCode) {
  const url = "http://localhost:8080/test";
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("HTTP error:", response.status);
      return new GenericResponse(true, response.status, response.statusText);
    }

    const plainText = response.text();
    // const json = response.json();

    //   return new GenericResponse(undefined, undefined, undefined, json);
    return new GenericResponse(undefined, undefined, undefined, plainText);
  } catch (error) {
    console.error("Error verifying room code:", error.message);
    let returnMessage = "Unable to verify room code";

    if (
      `${error.message}`.includes("NetworkError") ||
      error.name === "TimeoutError"
    ) {
      returnMessage = "Cannot verify room code, unable to reach server";
    }

    return new GenericResponse(true, 500, returnMessage);
  } finally {
    clearTimeout(timeoutId);
  }
}
