import { useState } from "react";
import logo from "/assets/picto.svg";
import "./Landing.css";
import {
  Box,
  ColorPicker,
  Popover,
  TextInput,
  Tooltip,
  Paper,
  Text,
  Group,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  SegmentedControl,
  DEFAULT_THEME,
} from "@mantine/core";

function Landing() {
  const [username, setUsername] = useState("");
  const [colorValue, setColorValue] = useState("#fff");
  const [isTooltipVisible, setisTooltipVisible] = useState(true);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target["username"].value);
  };

  return (
    <>
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      ></ActionIcon>
      <div id="containerMain">
        <div>
          <img id="logo" src={logo} />
        </div>
        <br />
        <br />
        <main id="mainJoin">
          <form onSubmit={formSubmitHandler}>
            <div>
              <Popover
                onOpen={() => {
                  setisTooltipVisible(false);
                }}
                position="left"
                trapFocus
                withArrow
              >
                <Tooltip label="Click me!" withArrow opened={isTooltipVisible}>
                  <Popover.Target>
                    <div
                      className="user-color-picker"
                      style={{ backgroundColor: colorValue, cursor: "pointer" }}
                    ></div>
                  </Popover.Target>
                </Tooltip>
                <Popover.Dropdown>
                  <ColorSelect
                    colorValue={colorValue}
                    setColorValue={setColorValue}
                  />
                </Popover.Dropdown>
              </Popover>
              <div className="formGroup username">
                <TextInput
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  id="username"
                  placeholder="Enter your username..."
                  maxLength="18"
                  autoComplete="off"
                  radius={0}
                  required
                />
              </div>
            </div>
            <br />
            <Group justify="center">
              <Paper
                component="button"
                radius={0}
                shadow="md"
                className="createRoom"
                withBorder
              >
                <Text>Create a room</Text>
              </Paper>
              <Paper
                component="button"
                radius={0}
                shadow="md"
                className="joinRoom"
                withBorder
              >
                <Text>Join a room</Text>
              </Paper>
            </Group>
          </form>
        </main>
        <br />
        <p className="version">version {import.meta.env.VITE_APP_VERSION}</p>
      </div>
    </>
  );
}

export default Landing;

function ColorSelect({ colorValue, setColorValue }) {
  // const userColors = [
  //   ["#B8B8F0", "#121592"], //ppl
  //   ["#FEA1A1", "#AF2121"], //red
  //   ["#8CF1BA", "#0d793d"], //grn
  //   ["#feb588", "#e34400"], //org
  //   ["#76dff2", "#086e9a"], //blu
  // ];

  const userColors = [
    DEFAULT_THEME.colors.red[5],
    DEFAULT_THEME.colors.pink[5],
    DEFAULT_THEME.colors.grape[5],
    DEFAULT_THEME.colors.violet[5],
    DEFAULT_THEME.colors.indigo[5],
    DEFAULT_THEME.colors.blue[5],
    DEFAULT_THEME.colors.cyan[5],
    DEFAULT_THEME.colors.teal[5],
    DEFAULT_THEME.colors.green[5],
    DEFAULT_THEME.colors.lime[5],
    DEFAULT_THEME.colors.yellow[5],
    DEFAULT_THEME.colors.orange[5],
  ];

  /*
    TODO: need to disable --cp-swatch-size variable in
    wrapper so swatches are even
  */

  return (
    <Box maw={200} mx="auto">
      <p>Select a user color:</p>
      <ColorPicker
        format="hex"
        value={colorValue}
        classNames={{ swatches: "swatches", swatch: "swatch" }}
        withPicker={false}
        swatches={userColors}
        onChange={(color) => {
          setColorValue(color);
        }}
        styles={{
          swatches: { justifyContent: "space-evenly" },
          swatch: { width: "1.8em", height: "1.8em" },
          wrapper: { "--cp-swatch-size": "20px" },
        }}
      />
    </Box>
  );
}
