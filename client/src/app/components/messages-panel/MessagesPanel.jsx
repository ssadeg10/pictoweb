import { useEffect, useState } from "react";
import BaseCanvasMessage from "../base-canvas-message/BaseCanvasMessage";

function MessagesPanel({ messageData }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // load previous chatroom messages
    setLoading(false);
  });

  return (
    <>
      <div className="messages">
        {messageData.map((data, index) => {
          return (
            <BaseCanvasMessage
              key={index}
              username={data.user.username}
              color={data.user.userColor}
              image={data.message.image}
              text={data.message.text}
            ></BaseCanvasMessage>
          );
        })}
        {/* <BaseCanvasMessage
          username="test-username"
          color="#1098ad"
        ></BaseCanvasMessage> */}
      </div>
    </>
  );
}

export default MessagesPanel;
