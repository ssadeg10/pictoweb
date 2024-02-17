import {
  Alert,
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Group,
  LoadingOverlay,
  SegmentedControl,
  Slider,
  Text,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../../connections/socket.js";
import User from "../../models/User.js";
import { userMessage } from "../../models/UserMessage.js";
import {
  ClearIconComponent,
  DownIconComponent,
  EraserIconComponent,
  PencilIconComponent,
  PictoLogoComponent,
  UpIconComponent,
} from "../_icons/IconComponents.jsx";
import DrawCanvas from "../draw-canvas/DrawCanvas";
import MessagesPanel from "../messages-panel/MessagesPanel.jsx";
import "./Chatroom.css";

function Chatroom() {
  const [messageData, setMessageData] = useState([]); // chat messages
  const [isConnected, setIsConnected] = useState(socket.connected); // connection badge
  const [visible, visibilityHandler] = useDisclosure(true); // spinner visibility
  const [visibleNowEntering, setVisibleNowEntering] = useState(false);
  const [visibleNowLeaving, setVisibleNowLeaving] = useState(false);
  const [nowEnteringUsername, setNowEnteringUsername] = useState("");
  const [nowLeavingUsername, setNowLeavingUsername] = useState("");

  const location = useLocation();

  // Create user, assign user to message object model
  const user = new User(location.state?.username, location.state?.color);
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

  const handleButtonClone = () => {
    setVisibleNowEntering.toggle();
  };

  const handleButtonSend = () => {
    userMessageObj.message.image = getDataURLRef.current(); // base64
    socket.emit("sendMessage", userMessageObj);
  };

  useEffect(() => {
    // start websocket connection
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("userNowEntering", (username) => onNowEntering(username));
    socket.on("userNowLeaving", (username) => onNowLeaving(username));
    socket.on("receiveMessage", (data) => onReceiveMessage(data));

    async function onConnect() {
      setIsConnected(true);
      await loadMessagesState();
      visibilityHandler.close();

      setTimeout(() => {
        socket.emit("nowEntering", user.username);
      }, 500);
    }

    function onDisconnect() {
      setIsConnected(false);

      setTimeout(() => {
        socket.emit("nowLeaving", user.username);
      }, 500);
    }

    function onNowEntering(username) {
      setNowEnteringUsername(username);
      setVisibleNowEntering(true);
      setTimeout(() => {
        setVisibleNowEntering(false);
      }, 5000);
    }

    function onNowLeaving(username) {
      setNowLeavingUsername(username);
      setVisibleNowLeaving(true);
      setTimeout(() => {
        setVisibleNowLeaving(false);
      }, 5000);
    }

    function onReceiveMessage(data) {
      console.log(...messageData);
      setMessageData([...messageData, data]);
    }

    async function loadMessagesState() {
      // TODO: check for MessagesPanel state to finish loading
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("nowEntering", (username) => onNowEntering(username));
      socket.off("nowLeaving", (username) => onNowLeaving(username));
      socket.off("receiveMessage", (data) => onReceiveMessage(data));
    };
  }, [messageData, user.username, visibilityHandler]);

  return (
    <>
      <LoadingOverlay
        visible={visible}
        transitionProps={{ transition: "fade", duration: 400 }}
        overlayProps={{ blur: 2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      />
      <AppShell header={{ height: 60 }} footer={{ height: 200 }}>
        <AppShellHeader>
          <Group justify="space-between" className="header-group">
            <div className="header-logo">
              <a
                href="/"
                style={{
                  paddingTop: "5px",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <PictoLogoComponent className="logo" />
              </a>
            </div>
            <Group justify="flex-end">
              {isConnected ? (
                <Badge color="green">Connected</Badge>
              ) : (
                <Badge color="red">Disconnected</Badge>
              )}
              <Avatar src={null} alt="connected users" size="md"></Avatar>
            </Group>
          </Group>
        </AppShellHeader>
        <AppShellMain>
          <div className="alertDiv">
            <Transition
              mounted={visibleNowEntering}
              transition="slide-right"
              duration={400}
              timingFunction="ease"
            >
              {(transitionStyle) => (
                <Alert
                  className="alert-entering"
                  variant="filled"
                  color="black"
                  title="Now Entering"
                  style={transitionStyle}
                >
                  {nowEnteringUsername ? nowEnteringUsername : "Username"}
                </Alert>
              )}
            </Transition>
            <Transition
              mounted={visibleNowLeaving}
              transition="slide-right"
              duration={400}
              timingFunction="ease"
            >
              {(transitionStyle) => (
                <Alert
                  className="alert-leaving"
                  variant="filled"
                  color="black"
                  title="Now Leaving"
                  style={transitionStyle}
                >
                  {nowLeavingUsername ? nowLeavingUsername : "Username"}
                </Alert>
              )}
            </Transition>
          </div>
          <Center>
            <div className="messagesPanel">
              <MessagesPanel messageData={messageData}></MessagesPanel>
            </div>
          </Center>
        </AppShellMain>
        <AppShellFooter>
          <div className="canvasPanel">
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
                  onSetDrawEraseRef={(eraseFunc) =>
                    (drawEraseRef.current = eraseFunc)
                  }
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
          </div>
        </AppShellFooter>
      </AppShell>
    </>
  );
}
export default Chatroom;

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
