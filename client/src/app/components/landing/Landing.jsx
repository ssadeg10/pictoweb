import { useState } from "react";
import logo from "/assets/picto.svg";
import "./Landing.css";
import {
  Paper,
  Text,
  Group,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  TextInput,
  Button,
  Center,
} from "@mantine/core";
import UserSetup from "../user-setup/UserSetup";

function Landing() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  // const formSubmitHandler = (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  // };

  return (
    <>
      <div id="containerMain">
        <div>
          <img id="logo" src={logo} />
        </div>
        <br />
        <br />
        <main id="mainJoin">
          <LandingActionSelect />
          {/* <JoinRoomInput /> */}
          {/* <UserSetup /> */}
        </main>
        <br />
        <p className="version">version {import.meta.env.VITE_APP_VERSION}</p>
      </div>
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      ></ActionIcon>
    </>
  );
}
export default Landing;

function LandingActionSelect() {
  return (
    <Group justify="center">
      <Paper // TODO: onclick -> toggle loadingOverlay, route to /createRoom
        component="button"
        radius={0}
        shadow="md"
        className="createRoom"
        withBorder
      >
        <Text>Create a room</Text>
      </Paper>
      <Paper // TODO: onclick -> toggle loadingOverlay, route to /joinRoom
        component="button"
        radius={0}
        shadow="md"
        className="joinRoom"
        withBorder
      >
        <Text>Join a room</Text>
      </Paper>
    </Group>
  );
}

function JoinRoomInput() {
  const verifyRoomCode = () => {};
  return (
    <form action={verifyRoomCode}>
      <Group justify="center">
        <TextInput
          className="formGroup text-input"
          placeholder="Enter a room code..."
          maxLength="18"
          autoComplete="off"
          radius={0}
          required={true}
        />
        <Button>Submit</Button>
      </Group>
    </form>
  );
}
