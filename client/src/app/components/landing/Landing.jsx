import { useState } from "react";
import logo from "/assets/picto.svg";
import "./Landing.css";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { Outlet } from "react-router-dom";

function Landing() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <>
      <div id="containerMain">
        <div>
          <img id="logo" src={logo} />
        </div>
        <br />
        <br />
        <main id="mainJoin">
          <Outlet />
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
