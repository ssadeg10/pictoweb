import { useEffect, useRef, useState } from "react";
import BaseCanvasMessage from "../base-canvas-message/BaseCanvasMessage";

function MessagesPanel({ messageData }) {
  const [isLoading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // load previous chatroom messages
    setLoading(false);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageData]);

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
        <div ref={messagesEndRef} />
      </div>
    </>
  );
}

export default MessagesPanel;
