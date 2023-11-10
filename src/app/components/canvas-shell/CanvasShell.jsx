import { forwardRef } from "react";
import "./CanvasShell.css";

const CanvasShell = forwardRef(function CanvasShell(props, ref) {
  const username = props.username;
  // recieve ref hook from parent component

  return (
    <div id="containerCanvas">
      <p className="h6 disableSelect" id="name">
        {username ? username : "none"}
      </p>
      <div id="containerDraw">
        <canvas ref={ref} className="canvas" id="drawLayer">
          Your browser does not support HTML5 Canvas
        </canvas>
      </div>
      <div id="containerText">
        <canvas className="canvas" id="textLayer">
          Your browser does not support HTML5 Canvas
        </canvas>
      </div>
    </div>
  );
});

export default CanvasShell;
