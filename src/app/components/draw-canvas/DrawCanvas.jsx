import { useEffect, useRef } from "react";
import BaseCanvasMessage from "../base-canvas-message/BaseCanvasMessage";
import { getHotkeyHandler } from "@mantine/hooks";

function DrawCanvas(props) {
  const canvasShellRef = useRef(null);

  useEffect(() => {
    const drawVars = {
      erase: false,
      width: 5,
      color: "#000000",
      pos: {
        x: 0,
        y: 0,
      },
    };
    let pos = {
      x: 0,
      y: 0,
    };
    let undoStack = [];
    let redoStack = [];

    const canvas = canvasShellRef.current;
    const context = canvas.getContext("2d");

    // canvas.style.cursor = "crosshair";

    if (context) {
      resize();
      context.imageSmoothingEnabled = false;
      context.filter =
        'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="f" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer></filter></svg>#f\')';
      context.lineWidth = drawVars.width;
      context.strokeWidth = drawVars.width;
      context.strokeStyle = drawVars.color;
      context.lineCap = "round";
      context.lineJoin = "round";
    } else {
      console.error("Cannot load canvas context");
    }

    function resize() {
      let w = canvas.getBoundingClientRect().width - canvas.offsetWidth;
      let h = canvas.getBoundingClientRect().height - canvas.offsetHeight;
      canvas.width = canvas.getBoundingClientRect().width - w;
      canvas.height = canvas.getBoundingClientRect().height - h;
    }

    function drawOnMouseMove(e) {
      // mouse left button must be pressed
      if (e.buttons !== 1) return;

      context.beginPath(); // begin

      context.moveTo(pos.x, pos.y);
      setPosition(e);
      context.lineTo(pos.x, pos.y);

      context.stroke();
    }

    function dot() {
      context.beginPath();
      context.fillStyle = drawVars.color;
      context.arc(pos.x, pos.y, drawVars.width / 2, 0, 2 * Math.PI);
      context.fill();
    }

    function setPosition(e) {
      const rect = canvas.getBoundingClientRect();
      pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function lineWidth(width) {
      if (width > 0) {
        drawVars.width = width;
        context.lineWidth = width;
        context.strokeWidth = width;
      }
    }
    function clear() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function erase(enable) {
      if (enable) {
        context.globalCompositeOperation = "destination-out";
        drawVars.erase = true;
        drawVars.color = "#ffffff";
      } else {
        context.globalCompositeOperation = "source-over";
        drawVars.erase = false;
        drawVars.color = "#000000";
      }
    }

    function pushLineBlob() {}

    function undo() {}

    function redo() {}

    // Passes the child function to the parent which assigns to a hook
    props.onSetClearRef(clear);
    props.onSetDrawEraseRef(erase);
    props.onSetLineWidthRef(lineWidth);

    // Canvas desktop mouse event listeners
    canvas.addEventListener("mousedown", setPosition);
    canvas.addEventListener("mousemove", drawOnMouseMove);
    canvas.addEventListener("mouseenter", setPosition);
    canvas.addEventListener("click", dot);
    canvas.addEventListener("mouseup", pushLineBlob);

    document.body.addEventListener(
      "keydown",
      getHotkeyHandler([
        ["mod+Z", undo],
        ["mod+shift+Z", () => console.log("redo")],
        ["ctrl+Y", () => console.log("redo")],
      ])
    );

    return () => {
      // Cleanup on unmount
      canvas.removeEventListener("mousedown", setPosition);
      canvas.removeEventListener("mousemove", drawOnMouseMove);
      canvas.removeEventListener("mouseenter", setPosition);
      canvas.removeEventListener("click", dot);
    };
  }, [canvasShellRef, props]);

  return <BaseCanvasMessage username={props.username} ref={canvasShellRef} />;
}
export default DrawCanvas;
