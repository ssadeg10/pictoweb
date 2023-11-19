import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Landing from "./components/landing/Landing";
import Chatroom from "./components/chatroom/Chatroom";

function App() {
  return (
    <MantineProvider>
      {/* <Landing /> */}
      <Chatroom />
    </MantineProvider>
  );
}

export default App;
