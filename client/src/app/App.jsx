import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Landing from "./components/landing/Landing";
import Chatroom from "./components/chatroom/Chatroom";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LandingActionSelect from "./components/landing-action-select/LandingActionSelect";
import UserSetup from "./components/user-setup/UserSetup";
import JoinRoom from "./components/join-room/JoinRoom";
import ErrorPage from "./components/error-page/errorPage";
import { verifyRoomCode } from "./api/verifyRoomCode";

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
            // TODO: will need to pass room code to server and check existance
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
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
