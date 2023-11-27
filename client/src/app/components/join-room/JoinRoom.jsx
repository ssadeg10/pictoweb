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
import { Link } from "react-router-dom";

function JoinRoom() {
  const [visible, visibilityHandler] = useDisclosure(false);

  function verifyRoomCode(e) {
    e.preventDefault();
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
            />
            <Button type="submit">Submit</Button>
          </Group>
        </form>
        <br />
        <Link to="..">
          <Center>
            <Text>Back</Text>
          </Center>
        </Link>
      </Box>
    </>
  );
}
export default JoinRoom;
