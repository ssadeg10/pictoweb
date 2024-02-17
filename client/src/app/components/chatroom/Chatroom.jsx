import {
  Alert,
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  Avatar,
  Badge,
  Center,
  Group,
  LoadingOverlay,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../../connections/socket.js";
import User from "../../models/User.js";
import { PictoLogoComponent } from "../_icons/IconComponents.jsx";
import MessagesPanel from "../messages-panel/MessagesPanel.jsx";
import { MemoizedUserTools } from "../user-tools-container/UserToolsContainer.jsx";
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
          <Center>
            <div className="messagesPanel">
              <MessagesPanel messageData={messageData}></MessagesPanel>
            </div>
          </Center>
        </AppShellMain>
        <AppShellFooter>
          <div className="canvasPanel">
            <MemoizedUserTools user={user} />
          </div>
        </AppShellFooter>
      </AppShell>
    </>
  );
}
export default Chatroom;
