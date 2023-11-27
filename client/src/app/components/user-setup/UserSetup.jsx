import {
  Box,
  ColorPicker,
  DEFAULT_THEME,
  Group,
  Popover,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";

function UserSetup() {
  const [username, setUsername] = useState("");
  const [colorValue, setColorValue] = useState("#fff");
  const [isTooltipVisible, setisTooltipVisible] = useState(true);

  return (
    <Group justify="center">
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
          <ColorSelect colorValue={colorValue} setColorValue={setColorValue} />
        </Popover.Dropdown>
      </Popover>
      <input
        readOnly
        value={colorValue}
        style={{ display: "none", visibility: "hidden" }}
      />
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
          required={true}
        />
      </div>
    </Group>
  );
}
export default UserSetup;

function ColorSelect({ colorValue, setColorValue }) {
  // const userColors = [
  //   ["#B8B8F0", "#121592"], //ppl
  //   ["#FEA1A1", "#AF2121"], //red
  //   ["#8CF1BA", "#0d793d"], //grn
  //   ["#feb588", "#e34400"], //org
  //   ["#76dff2", "#086e9a"], //blu
  // ];
  const hueValue = 6;
  const userColors = [
    DEFAULT_THEME.colors.red[hueValue],
    DEFAULT_THEME.colors.pink[hueValue],
    DEFAULT_THEME.colors.grape[hueValue],
    DEFAULT_THEME.colors.violet[hueValue],
    DEFAULT_THEME.colors.indigo[hueValue],
    DEFAULT_THEME.colors.blue[hueValue],
    DEFAULT_THEME.colors.cyan[hueValue],
    DEFAULT_THEME.colors.teal[hueValue],
    DEFAULT_THEME.colors.green[hueValue],
    DEFAULT_THEME.colors.lime[hueValue],
    DEFAULT_THEME.colors.yellow[hueValue],
    DEFAULT_THEME.colors.orange[hueValue],
  ];

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
        }}
        swatchesPerRow={6}
      />
    </Box>
  );
}