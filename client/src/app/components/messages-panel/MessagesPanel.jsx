import { Box, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import BaseCanvasMessage from "../base-canvas-message/BaseCanvasMessage";

function MessagesPanel(params) {
  // TODO: visibility needs to be true to load stuff first
  const [visible, visibilityHandler] = useDisclosure(false);

  useEffect(() => {
    // load previous chatroom messages
  });

  return (
    <>
      <Box>
        <LoadingOverlay visible={visible} zIndex={99} />
      </Box>
      <div className="messages">
        <BaseCanvasMessage></BaseCanvasMessage>
        <BaseCanvasMessage></BaseCanvasMessage>
      </div>
    </>
  );
}

export default MessagesPanel;
