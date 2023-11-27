import {
  Box,
  Button,
  Center,
  Group,
  LoadingOverlay,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Link } from "react-router-dom";

function JoinRoom() {
  const [visible, visibilityHandler] = useDisclosure(false);
  const [roomId, setRoomId] = useState(undefined);

  function verifyRoomCode(e) {
    e.preventDefault();
    if (roomId == undefined || roomId == "") return;
    visibilityHandler.open();
  }
  return (
    <>
      <Box>
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          // overlayProps={{
          //   backgroundOpacity: 1,
          //   color: document.body.style.background,
          // }}
        />
        <form onSubmit={verifyRoomCode}>
          <Group justify="center">
            <TextInput
              className="formGroup text-input"
              placeholder="Enter a room code..."
              maxLength="18"
              autoComplete="off"
              radius={0}
              required={true}
              value={roomId}
              onChange={(e) => {
                setRoomId(e.currentTarget.value);
              }}
            />
            <Button type="submit">Submit</Button>
          </Group>
        </form>
        <br />
        <Center>
          <Link to=".." className="link disableSelect" draggable="false">
            <Text>Back</Text>
          </Link>
        </Center>
      </Box>
    </>
  );
}
export default JoinRoom;
