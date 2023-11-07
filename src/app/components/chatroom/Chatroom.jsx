import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  Group,
} from "@mantine/core";
import "./Chatroom.css";
import { useEffect } from "react";

function Chatroom() {
  useEffect(() => {
    let messagesPanel = document.querySelector(".messagesPanel");
    let canvasPanel = document.querySelector(".canvasPanel");
    messagesPanel.setAttribute(
      "height",
      visualViewport.height - canvasPanel.getAttribute("height")
    );
  }, []);

  return (
    <>
      <AppShell header={{ height: 60 }} footer={{ height: 200 }}>
        <AppShellHeader>
          <Group className="header">
            <img className="logo" src="/assets/picto.svg" alt="logo" />
          </Group>
        </AppShellHeader>
        <AppShellMain>
          <div className="messagesPanel"></div>
        </AppShellMain>
        <AppShellFooter>
          <div className="canvasPanel">
            <div id="containerUserElements">
              <div id="containerTools">
                <button
                  className="btn toolbarButton toolFunction disableSelect"
                  id="draw"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-trigger="hover"
                  title="Draw"
                ></button>
                <button
                  className="btn toolbarButton toolFunction disableSelect"
                  id="erase"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-trigger="hover"
                  title="Erase"
                ></button>
              </div>
              <div id="containerSizes">
                <button
                  className="btn toolbarButton lineWidth disableSelect"
                  id="lg"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-trigger="hover"
                  title="Large Tip"
                ></button>
                <button
                  className="btn toolbarButton lineWidth disableSelect"
                  id="md"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-trigger="hover"
                  title="Medium Tip"
                ></button>
                <button
                  className="btn toolbarButton lineWidth disableSelect"
                  id="sm"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-trigger="hover"
                  title="Small Tip"
                ></button>
              </div>
              <div id="containerCanvas">
                <p className="h6 disableSelect" id="name">
                  username
                </p>
                {/* <svg
                  width="0"
                  height="0"
                  style="position:absolute;z-index:-1;"
                ></svg> */}
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
              <div id="containerMssgPanel">
                <button
                  className="btn mssgButton disableSelect"
                  id="send"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-trigger="hover"
                  title="Send"
                ></button>
                <button
                  className="btn mssgButton disableSelect"
                  id="clone"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-trigger="hover"
                  title="Clone"
                ></button>
              </div>
              <div id="containerClear">
                <button
                  className="btn mssgButton disableSelect"
                  id="clear"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-trigger="hover"
                  title="Clear"
                ></button>
              </div>
            </div>
          </div>
        </AppShellFooter>
      </AppShell>
    </>
  );
}

export default Chatroom;
