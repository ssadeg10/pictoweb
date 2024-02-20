import { io } from "socket.io-client";

// const URL = "https://b5fa-24-130-190-236.ngrok-free.app";
const URL = "http://localhost:4000";

export const socket = io(URL, {
  autoConnect: false,
  // withCredentials: true,
  // extraHeaders: {
  //   "ngrok-skip-browser-warning": "true",
  // },
});
