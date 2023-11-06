import { useState } from "react";
import logo from "/assets/picto.svg";
import "./Landing.css";
import { Box, ColorPicker, Popover, TextInput, Tooltip } from "@mantine/core";

function Landing() {
  const [username, setUsername] = useState("");
  const [colorValue, setColorValue] = useState("#fff");
  const [isTooltipVisible, setisTooltipVisible] = useState(true);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target["username"].value);
  };

  return (
    <>
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
                  console.log("click!");
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
            <button type="submit">Join</button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Landing;

function ColorSelect({ colorValue, setColorValue }) {
  const userColors = [
    ["#B8B8F0", "#121592"], //ppl
    ["#FEA1A1", "#AF2121"], //red
    ["#8CF1BA", "#0d793d"], //grn
    ["#feb588", "#e34400"], //org
    ["#76dff2", "#086e9a"], //blu
  ];

  return (
    <Box maw={200} mx="auto">
      <p>Select a user color:</p>
      <ColorPicker
        format="hex"
        value={colorValue}
        classNames={{ swatches: "swatches", swatch: "swatch" }}
        withPicker={false}
        swatches={userColors.map((array) => {
          return array[1];
        })}
        onChange={(color) => {
          setColorValue(color);
        }}
      />
    </Box>
  );
}
