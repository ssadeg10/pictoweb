import {
  Box,
  Button,
  Center,
  SegmentedControl,
  Slider,
  Text,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import { socket } from "../../connections/socket.js";
import { userMessage } from "../../models/UserMessage.js";
import {
  ClearIconComponent,
  DownIconComponent,
  EraserIconComponent,
  PencilIconComponent,
  UpIconComponent,
} from "../_icons/IconComponents.jsx";
import DrawCanvas from "../draw-canvas/DrawCanvas.jsx";

export function UserToolsContainer({ user }) {
  const userMessageObj = userMessage;
  userMessageObj.user = user;

  // Hooks to store child functions
  const clearRef = useRef(null);
  const drawEraseRef = useRef(null);
  const lineWidthRef = useRef(null);
  const getDataURLRef = useRef(null);

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

  const handleButtonLineWidth = (width) => {
    if (typeof lineWidthRef.current === "function") {
      lineWidthRef.current(width);
    } else {
      console.error("Line width function is not defined");
    }
  };

  const handleButtonClear = () => {
    if (typeof clearRef.current === "function") {
      clearRef.current();
    } else {
      console.error("Clear function is not defined");
    }
  };

  const handleButtonClone = () => {};

  const handleButtonSend = () => {
    userMessageObj.message.image = getDataURLRef.current(); // base64
    socket.emit("sendMessage", userMessageObj);
  };

  return (
    <div id="containerUserElements">
      <div id="containerTools">
        <SegmentedControl
          className="drawErase"
          orientation="vertical"
          color={user.userColor}
          onChange={(newValue) => {
            handleButtonDrawErase(newValue);
          }}
          data={[
            {
              value: "false",
              label: (
                <Center>
                  <PencilIconComponent width={25} />
                  <Box ml={10}>Draw</Box>
                </Center>
              ),
            },
            {
              value: "true",
              label: (
                <Center>
                  <EraserIconComponent width={25} />
                  <Box ml={10}>Erase</Box>
                </Center>
              ),
            },
          ]}
        />
        <div id="sliderContainer">
          <LineWidthSlider
            width={handleButtonLineWidth}
            color={user.userColor}
          />
        </div>
      </div>
      <div>
        <DrawCanvas
          username={user.username}
          // set hooks to child functions
          onSetClearRef={(clearFunc) => (clearRef.current = clearFunc)}
          onSetDrawEraseRef={(eraseFunc) => (drawEraseRef.current = eraseFunc)}
          onSetLineWidthRef={(lineWidthFunc) =>
            (lineWidthRef.current = lineWidthFunc)
          }
          onGetDataURLRef={(dataURLFunc) =>
            (getDataURLRef.current = dataURLFunc)
          }
        />
      </div>
      <div id="containerMssgPanel">
        <Button.Group orientation="vertical">
          <Button
            id="send"
            title="Send"
            variant="light"
            color={user.userColor}
            onClick={handleButtonSend}
          >
            <UpIconComponent width={25} />
          </Button>
          <Button
            id="clone"
            title="Clone"
            variant="light"
            color={user.userColor}
            onClick={handleButtonClone}
          >
            <DownIconComponent width={25} />
          </Button>
        </Button.Group>
      </div>
      <div id="containerClear">
        <Button
          id="clear"
          title="Clear"
          variant="light"
          color={user.userColor}
          onClick={handleButtonClear}
        >
          <ClearIconComponent width={25} />
        </Button>
      </div>
    </div>
  );
}
export const MemoizedUserTools = React.memo(
  UserToolsContainer,
  (prevProps, nextProps) => {
    return (
      prevProps.user.username === nextProps.user.username &&
      prevProps.user.userColor === nextProps.user.userColor
    );
  }
);

const LineWidthSlider = (props) => {
  const [lineWidthValue, setLineWidthValue] = useState(5);

  const handleSliderChange = (newValue) => {
    setLineWidthValue(newValue);
    props.width(newValue);
  };

  return (
    <>
      <Slider
        value={lineWidthValue}
        thumbSize={(lineWidthValue + 30) / 2}
        color={props.color ? props.color : "gray"}
        onChange={setLineWidthValue}
        onChangeEnd={handleSliderChange}
        min={1}
        max={20}
      />
      <Text size="xs" styles={{ root: { userSelect: "none" } }}>
        Line Size
      </Text>
    </>
  );
};
LineWidthSlider.displayName = "LineWidthSlider";
