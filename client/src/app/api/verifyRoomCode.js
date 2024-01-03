import GenericResponse from "../models/GenericResponse";

export async function verifyRoomCode(roomCode) {
  const baseUrl = "http://localhost:8080/validate";
  const queryParams = {
    roomId: `${roomCode}`,
  };
  const url = new URL(baseUrl);
  url.search = new URLSearchParams(queryParams).toString();

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

    const json = await response.json();
    return new GenericResponse(undefined, undefined, undefined, json); // success
  } catch (error) {
    console.error("Error verifying room code:", error.message);
    let returnMessage = "Unable to verify room code";

    if (
      `${error.message}`.includes("NetworkError") ||
      error.name === "TimeoutError"
    ) {
      returnMessage = "Cannot verify room code, unable to reach server";
    }

    return new GenericResponse(true, null, returnMessage);
  } finally {
    clearTimeout(timeoutId);
  }
}
