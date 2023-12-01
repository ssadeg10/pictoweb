import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Landing from "./components/landing/Landing";
import Chatroom from "./components/chatroom/Chatroom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingActionSelect from "./components/landing-action-select/LandingActionSelect";
import UserSetup from "./components/user-setup/UserSetup";
import JoinRoom from "./components/join-room/JoinRoom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      children: [
        {
          path: "/",
          element: <LandingActionSelect />,
        },
        {
          path: "/create",
          element: <UserSetup />,
        },
        {
          path: "/join",
          element: <JoinRoom />,
        },
        { path: "/join/:roomCode", element: <UserSetup /> },
      ],
    },
    {
      path: "/chat",
      element: <Chatroom />,
    },
  ]);

  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
