import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Landing from "./components/landing/Landing";

function App() {
  return (
    <MantineProvider>
      <div>
        <Landing />
        <br />
        <p className="version">version {import.meta.env.VITE_APP_VERSION}</p>
      </div>
    </MantineProvider>
  );
}

export default App;
