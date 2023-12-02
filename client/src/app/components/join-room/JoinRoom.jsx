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
import { Link, useNavigate } from "react-router-dom";
import { verifyRoomCode } from "../../api/verifyRoomCode";

function JoinRoom() {
  const [visible, visibilityHandler] = useDisclosure(false);
  const [roomId, setRoomId] = useState("");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  function formSubmitHandler(e) {
    e.preventDefault();
    if (roomId == "" || roomId == undefined) return;
    if (!isValidString(roomId)) {
      setErrorText("Code contains invalid characters");
      return;
    }
    visibilityHandler.open();
    verifyRoomCode(roomId).then((error) => {
      if (error && error.status == 404) {
        setErrorText("Invalid room code");
        visibilityHandler.close();
        return;
      }

      // TODO: use redirect() and have server deliver new location with data
      // https://stackoverflow.com/a/76049219
      navigate(`/join/${roomId}`);
    });
  }

  function isValidString(inputString) {
    // allowed characters
    var pattern = /^[0-9a-fA-F]+$/;

    return pattern.test(inputString);
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
        <form onSubmit={formSubmitHandler}>
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
                setErrorText("");
              }}
              error={errorText !== "" ? errorText : false}
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
