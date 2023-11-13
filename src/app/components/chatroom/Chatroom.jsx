import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  Group,
} from "@mantine/core";
import "./Chatroom.css";
import DrawCanvas from "../draw-canvas/DrawCanvas";
import User from "../../models/User.js";
import { useRef } from "react";

function Chatroom() {
  const user = new User("John Smith", "blue");

  // Hooks to store child functions
  const clearRef = useRef(null);
  const drawEraseRef = useRef(null);

  // onClick handlers
  const handleButtonDrawErase = (eraseEnable) => {
    if (typeof drawEraseRef.current === "function") {
      drawEraseRef.current(eraseEnable);
    } else {
      console.error(
        `${
          eraseEnable ? "Erase" : "Draw"
        } button event: Erase function is not defined`
      );
    }
  };

  const handleButtonClear = () => {
    if (typeof clearRef.current === "function") {
      clearRef.current();
    } else {
      console.error("Clear function is not defined");
    }
  };

  const handleButtonLineWidth = (lineWidth) => {
    lineWidth();
  };

  return (
    <>
      <AppShell header={{ height: 60 }} footer={{ height: 200 }}>
        <AppShellHeader>
          <Group className="header">
            <img className="logo" src="/assets/picto.svg" alt="logo" />
          </Group>
        </AppShellHeader>
        <AppShellMain>
          <div className="messagesPanel"></div>
        </AppShellMain>
        <AppShellFooter>
          <div className="canvasPanel">
            <div id="containerUserElements">
              <div id="containerTools">
                <button
                  className="btn toolbarButton toolFunction disableSelect"
                  id="draw"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-trigger="hover"
                  title="Draw"
                  onClick={() => handleButtonDrawErase(false)}
                ></button>
                <button
                  className="btn toolbarButton toolFunction disableSelect"
                  id="erase"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-trigger="hover"
                  title="Erase"
                  onClick={() => handleButtonDrawErase(true)}
                ></button>
              </div>
              <div id="containerSizes">
                <button
                  className="btn toolbarButton lineWidth disableSelect"
                  id="lg"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-trigger="hover"
                  title="Large Tip"
                ></button>
                <button
                  className="btn toolbarButton lineWidth disableSelect"
                  id="md"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-trigger="hover"
                  title="Medium Tip"
                ></button>
                <button
                  className="btn toolbarButton lineWidth disableSelect"
                  id="sm"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-trigger="hover"
                  title="Small Tip"
                ></button>
              </div>
              <div>
                <DrawCanvas
                  username={user.username}
                  onSetClearRef={(clearFunc) => (clearRef.current = clearFunc)} // set hook to child function
                  onSetDrawRef={(eraseFunc) =>
                    (drawEraseRef.current = eraseFunc)
                  }
                  onSetEraseRef={(eraseFunc) =>
                    (drawEraseRef.current = eraseFunc)
                  }
                />
              </div>
              <div id="containerMssgPanel">
                <button
                  className="btn mssgButton disableSelect"
                  id="send"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-trigger="hover"
                  title="Send"
                ></button>
                <button
                  className="btn mssgButton disableSelect"
                  id="clone"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-trigger="hover"
                  title="Clone"
                ></button>
              </div>
              <div id="containerClear">
                <button
                  className="btn mssgButton disableSelect"
                  id="clear"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-trigger="hover"
                  title="Clear"
                  onClick={handleButtonClear}
                ></button>
              </div>
            </div>
          </div>
        </AppShellFooter>
      </AppShell>
    </>
  );
}

export default Chatroom;
