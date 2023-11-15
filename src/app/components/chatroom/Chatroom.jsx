import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  Box,
  Button,
  Center,
  Group,
  SegmentedControl,
  Slider,
} from "@mantine/core";
import "./Chatroom.css";
import DrawCanvas from "../draw-canvas/DrawCanvas";
import User from "../../models/User.js";
import { memo, useRef, useState } from "react";

function Chatroom() {
  const user = new User("John Smith", "blue");

  // Hooks to store child functions
  const clearRef = useRef(null);
  const drawEraseRef = useRef(null);
  const lineWidthRef = useRef(null);

  // onClick handlers
  const handleButtonDrawErase = (eraseEnable) => {
    var eraseEnableBool = String(eraseEnable).toLowerCase() === "true";

    if (typeof drawEraseRef.current === "function") {
      drawEraseRef.current(eraseEnableBool);
    } else {
      console.error(
        `${
          eraseEnableBool ? "Erase" : "Draw"
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

  const handleButtonLineWidth = (width) => {
    if (typeof lineWidthRef.current === "function") {
      lineWidthRef.current(width);
    } else {
      console.error("Line width function is not defined");
    }
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
                <SegmentedControl
                  className="drawErase"
                  orientation="vertical"
                  onChange={(newValue) => {
                    handleButtonDrawErase(newValue);
                  }}
                  data={[
                    {
                      value: "false",
                      label: (
                        <Center>
                          <img
                            src="/assets/pencil.svg"
                            alt="pencil icon"
                            width={25}
                          />
                          <Box ml={10}>Draw</Box>
                        </Center>
                      ),
                    },
                    {
                      value: "true",
                      label: (
                        <Center>
                          <img
                            src="/assets/eraser.svg"
                            alt="pencil icon"
                            width={25}
                          />
                          <Box ml={10}>Erase</Box>
                        </Center>
                      ),
                    },
                  ]}
                />
                <div id="sliderContainer">
                  <LineWidthSlider width={handleButtonLineWidth} />
                </div>
              </div>
              <div>
                <DrawCanvas
                  username={user.username}
                  // set hooks to child functions
                  onSetClearRef={(clearFunc) => (clearRef.current = clearFunc)}
                  onSetDrawEraseRef={(eraseFunc) =>
                    (drawEraseRef.current = eraseFunc)
                  }
                  onSetLineWidthRef={(lineWidthFunc) =>
                    (lineWidthRef.current = lineWidthFunc)
                  }
                />
              </div>
              <div id="containerMssgPanel">
                <Button.Group orientation="vertical">
                  <Button id="send" title="Send" variant="light" color="grey">
                    <img src="/assets/up.svg" alt="send message" width={25} />
                  </Button>
                  <Button id="clone" title="Clone" variant="light" color="grey">
                    <img
                      src="/assets/down.svg"
                      alt="clone last chatroom message"
                      width={25}
                    />
                  </Button>
                </Button.Group>
              </div>
              <div id="containerClear">
                <Button
                  id="clear"
                  title="Clear"
                  variant="light"
                  color="grey"
                  onClick={handleButtonClear}
                >
                  <img src="/assets/clear.svg" alt="clear canvas" width={25} />
                </Button>
              </div>
            </div>
          </div>
        </AppShellFooter>
      </AppShell>
    </>
  );
}
export default Chatroom;

const LineWidthSlider = (props) => {
  const [lineWidthValue, setLineWidthValue] = useState(5);
  // const [lineWidthEndValue, setLineWidthEndValue] = useState(5);

  const handleSliderChange = (newValue) => {
    setLineWidthValue(newValue);
    props.width(newValue);
  };

  return (
    <Slider
      value={lineWidthValue}
      thumbSize={(lineWidthValue + 25) / 2}
      onChange={setLineWidthValue}
      onChangeEnd={handleSliderChange}
      min={1}
      max={20}
    />
  );
};
LineWidthSlider.displayName = "LineWidthSlider";
