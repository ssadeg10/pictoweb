import { useEffect, useState } from "react";
import BaseCanvasMessage from "../base-canvas-message/BaseCanvasMessage";

function MessagesPanel(params) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // load previous chatroom messages
    setLoading(false);
  });

  return (
    <>
      <div className="messages">
        <BaseCanvasMessage
          username="test-username"
          color="#1098ad"
        ></BaseCanvasMessage>
      </div>
    </>
  );
}

export default MessagesPanel;
