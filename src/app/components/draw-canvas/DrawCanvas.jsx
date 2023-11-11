import { useEffect, useRef } from "react";
import CanvasShell from "../canvas-shell/CanvasShell";

function DrawCanvas(props) {
  const childCanvasRef = useRef(null);
  const drawVars = {
    paint: false,
    width: 5,
    color: "#000000",
    pos: {
      x: 0,
      y: 0,
    },
  };

  useEffect(() => {
    const canvas = childCanvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      resize();
      context.imageSmoothingEnabled = false;
      console.log(context);
      context.filter = "url(#remove-alpha)";
    } else {
      console.error("Cannot load canvas context");
    }

    function resize() {
      let w = canvas.getBoundingClientRect().width - canvas.offsetWidth;
      let h = canvas.getBoundingClientRect().height - canvas.offsetHeight;
      canvas.width = canvas.getBoundingClientRect().width - w;
      canvas.height = canvas.getBoundingClientRect().height - h;
    }

    function drawNew(e) {
      // mouse left button must be pressed
      if (e.buttons !== 1) return;

      context.beginPath(); // begin

      context.lineWidth = drawVars.width;
      context.strokeWidth = drawVars.width;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = drawVars.color;

      context.moveTo(drawVars.pos.x, drawVars.pos.y);
      setPosition(e);
      context.lineTo(drawVars.pos.x, drawVars.pos.y);

      context.stroke();
    }

    function dot() {
      context.beginPath();
      context.fillStyle = drawVars.color;
      context.arc(
        drawVars.pos.x,
        drawVars.pos.y,
        drawVars.width / 2,
        0,
        2 * Math.PI
      );
      context.fill();
    }

    function setPosition(e) {
      const rect = canvas.getBoundingClientRect();
      drawVars.pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    // Canvas desktop mouse event listeners
    canvas.addEventListener("mousedown", setPosition, false);
    canvas.addEventListener("mousemove", drawNew, false);
    canvas.addEventListener("mouseenter", setPosition, false);
    canvas.addEventListener("click", {}, false);

    return function cleanupEventListeners() {
      canvas.removeEventListener("mousedown", setPosition, false);
      canvas.removeEventListener("mousemove", drawNew, false);
      canvas.removeEventListener("mouseenter", setPosition, false);
      canvas.removeEventListener("click", {}, false);
    };
  });

  return <CanvasShell username={props.username} ref={childCanvasRef} />;
}
export default DrawCanvas;
