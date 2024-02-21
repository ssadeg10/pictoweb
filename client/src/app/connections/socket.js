import { io } from "socket.io-client";

// const ngrokURL = "https://eb1a-24-130-190-236.ngrok-free.app";
const localURL = "http://localhost:4000";

// export const socket = io(ngrokURL, {
//   autoConnect: false,
//   withCredentials: true,
//   extraHeaders: {
//     "ngrok-skip-browser-warning": "true",
//   },
// });

export const socket = io(localURL, {
  autoConnect: false,
  // withCredentials: true,
  // extraHeaders: {
  //   "ngrok-skip-browser-warning": "true",
  // },
});
