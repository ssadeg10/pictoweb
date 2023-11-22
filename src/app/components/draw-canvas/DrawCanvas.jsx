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

      pushLineBlob(); // start canvas undo history
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

    function recordedClear() {
      clear();
      pushLineBlob();
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

    function pushLineBlob() {
      if (undoStack.length > 9) {
        // deletes oldest blob and revokes it
        URL.revokeObjectURL(...undoStack.splice(0, 1));
      }
      canvas.toBlob((blob) => {
        undoStack.push(URL.createObjectURL(blob));
      });
    }

    function undo() {
      if (undoStack.length < 2) {
        return;
      }

      // important that execution of these 2 lines to be flipped from redo()
      redoStack.push(undoStack.pop());
      const blobURL = undoStack.at(-1);

      loadBlobToCanvas(blobURL);
    }

    function redo() {
      if (redoStack.length < 1) {
        return;
      }

      // important that execution of these 2 lines to be flipped from undo()
      const blobURL = redoStack.at(-1);
      undoStack.push(redoStack.pop());

      loadBlobToCanvas(blobURL);
    }

    function loadBlobToCanvas(blobURL) {
      // set to draw and restore state after drawing
      let currentEraseMode = drawVars.erase;
      erase(false);

      let img = new Image();
      img.onload = (e) => {
        clear();
        context.drawImage(e.target, 0, 0);
        erase(currentEraseMode);
      };

      img.src = blobURL;
    }

    // Passes the child function to the parent which assigns to a hook
    props.onSetClearRef(recordedClear);
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
        ["mod+shift+Z", redo],
        ["ctrl+Y", redo],
      ])
    );

    return () => {
      // Cleanup on unmount
      undoStack.forEach((blob) => {
        URL.revokeObjectURL(blob);
      });
      redoStack.forEach((blob) => {
        URL.revokeObjectURL(blob);
      });

      canvas.removeEventListener("mousedown", setPosition);
      canvas.removeEventListener("mousemove", drawOnMouseMove);
      canvas.removeEventListener("mouseenter", setPosition);
      canvas.removeEventListener("click", dot);
      canvas.removeEventListener("mouseup", pushLineBlob);
      document.body.removeEventListener(
        "keydown",
        getHotkeyHandler([
          ["mod+Z", undo],
          ["mod+shift+Z", redo],
          ["ctrl+Y", redo],
        ])
      );
    };
  }, [canvasShellRef, props]);

  return <BaseCanvasMessage username={props.username} ref={canvasShellRef} />;
}
export default DrawCanvas;
