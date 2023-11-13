import { useEffect, useRef } from "react";
import CanvasShell from "../canvas-shell/CanvasShell";

function DrawCanvas(props) {
  const canvasShellRef = useRef(null);
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
    const canvas = canvasShellRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      resize();
      context.imageSmoothingEnabled = false;
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

    // function dot() {
    //   context.beginPath();
    //   context.fillStyle = drawVars.color;
    //   context.arc(
    //     drawVars.pos.x,
    //     drawVars.pos.y,
    //     drawVars.width / 2,
    //     0,
    //     2 * Math.PI
    //   );
    //   context.fill();
    // }

    function setPosition(e) {
      const rect = canvas.getBoundingClientRect();
      drawVars.pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function lineWidth(width) {
      if (width > 1 && width < 15) {
        drawVars.width = width;
      }
    }
    function clear() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function erase(toggle) {
      if (toggle) {
        context.globalCompositeOperation = "destination-out";
        drawVars.color = "#ffffff";
      } else {
        context.globalCompositeOperation = "source-over";
        drawVars.color = "#000000";
      }
    }

    // Passes the child function to the parent which assigns to a hook
    props.onSetClearRef(clear);

    // Canvas desktop mouse event listeners
    canvas.addEventListener("mousedown", setPosition);
    canvas.addEventListener("mousemove", drawNew);
    canvas.addEventListener("mouseenter", setPosition);
    // canvas.addEventListener("click", {}, false);

    return () => {
      // Cleanup on unmount
      canvas.removeEventListener("mousedown", setPosition);
      canvas.removeEventListener("mousemove", drawNew);
      canvas.removeEventListener("mouseenter", setPosition);
      // canvas.removeEventListener("click", {}, false);
    };
  }, [canvasShellRef, drawVars, props]);

  return <CanvasShell username={props.username} ref={canvasShellRef} />;
}
export default DrawCanvas;
