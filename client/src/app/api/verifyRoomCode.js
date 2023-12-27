export async function verifyRoomCode(roomCode) {
  const url = "http://localhost:8080/test";
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
      // return {
      //   error: true,
      //   status: response.status,
      //   statusText: response.statusText,
      // };
    }
    return await response.text();
  } catch (error) {
    console.error("Error verifying room code:", error.message);
    let returnValue = "Unable to verify room code";

    if (
      `${error.message}`.includes("NetworkError") ||
      error.name === "TimeoutError"
    ) {
      returnValue = "Cannot verify room code, unable to reach server";
    }
    // return returnValue;
    throw (returnValue, error);
  } finally {
    clearTimeout(timeoutId);
  }
}
