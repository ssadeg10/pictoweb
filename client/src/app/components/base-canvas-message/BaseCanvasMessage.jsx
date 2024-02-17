import { DEFAULT_THEME } from "@mantine/core";
import { forwardRef } from "react";
import getColorArrayFromHex from "../../util/colorLookup";
import "./BaseCanvasMessage.css";

const BaseCanvasMessage = forwardRef(function CanvasShell(props, ref) {
  const username = props.username ? props.username : "none";

  const colorArray = getColorArrayFromHex(props.color);
  const color = colorArray ? colorArray : DEFAULT_THEME.colors.gray;

  console.log(props.image);

  return (
    <div id="containerCanvas">
      <p
        className="h6 disableSelect"
        id="name"
        style={{
          borderColor: color[7],
          borderStyle: "solid",
          backgroundColor: color[0],
          color: color[9],
        }}
      >
        {username ? username : "none"}
      </p>
      {props.image ? (
        <img
          src={props.image}
          className="canvas"
          style={{ borderColor: color[7] }}
        ></img>
      ) : (
        <div id="containerDraw">
          <canvas
            ref={ref}
            className="canvas"
            id="drawLayer"
            style={{ borderColor: color[7] }}
          >
            Your browser does not support HTML5 Canvas
          </canvas>
        </div>
      )}
      {/* <div id="containerText">
        <canvas className="canvas" id="textLayer">
          Your browser does not support HTML5 Canvas
        </canvas>
      </div> */}
    </div>
  );
});

export default BaseCanvasMessage;
