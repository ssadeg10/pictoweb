import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Chatroom from "./components/chatroom/Chatroom";
import ErrorPage from "./components/error-page/errorPage";
import JoinRoom from "./components/join-room/JoinRoom";
import LandingActionSelect from "./components/landing-action-select/LandingActionSelect";
import Landing from "./components/landing/Landing";
import UserSetup from "./components/user-setup/UserSetup";
import { verifyRoomCode } from "./connections/verifyRoomCode";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <LandingActionSelect />,
        },
        {
          path: "/test",
          element: <UserSetup />,
        },
        {
          path: "/create",
          element: <UserSetup />,
        },
        {
          path: "/join",
          element: <JoinRoom />,
        },
        {
          path: "/join/:roomCode",
          loader: async ({ params }) => {
            const roomCode = params.roomCode;
            const response = await verifyRoomCode(roomCode);

            if (response.error) {
              throw response.status
                ? new Response("", {
                    status: response.status,
                    statusText: response.message,
                  })
                : `${response.message}`;
            }

            const data = response.data;
            if (data.error) {
              return redirect("/join");
            }

            return response;
          },
          element: <UserSetup />,
        },
      ],
    },
    {
      path: "/chat",
      element: <Chatroom />,
    },
  ]);

  return (
    <MantineProvider>
      <Notifications
        position="top-left"
        styles={{
          root: { marginTop: "60px", maxWidth: "fit-content" },
          notification: { margin: "0 10px 10px 10px" },
        }}
      />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
