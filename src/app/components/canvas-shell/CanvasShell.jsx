import "./CanvasShell.css";

function CanvasShell(props) {
  const { username } = props;
  return (
    <div id="containerCanvas">
      <p className="h6 disableSelect" id="name">
        {username}
      </p>
      <div id="containerDraw">
        <canvas className="canvas" id="drawLayer">
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
}

export default CanvasShell;
