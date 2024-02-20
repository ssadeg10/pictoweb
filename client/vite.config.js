import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   headers: ["ngrok-skip-browser-warning"],
  //   cors: ["https://b5fa-24-130-190-236.ngrok-free.app"],
  // },
});
