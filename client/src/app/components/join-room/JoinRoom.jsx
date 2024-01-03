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
import { Link, useNavigate, useNavigation } from "react-router-dom";

function JoinRoom() {
  const [visible, visibilityHandler] = useDisclosure(false);
  const [roomId, setRoomId] = useState("");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const navigation = useNavigation();

  function formSubmitHandler(e) {
    e.preventDefault();
    if (roomId == "" || roomId == undefined) return;
    if (!isValidString(roomId)) {
      setErrorText("Code contains invalid characters");
      return;
    }
    visibilityHandler.open();
    navigate(`/join/${roomId}`);

    // if redirected from /join/{roomId}, roomId is invalid
    if (navigation.state != "loading") {
      setTimeout(() => {
        setErrorText("Invalid room code");
        visibilityHandler.close();
        return;
      }, 100);
    }
  }

  function isValidString(inputString) {
    // allowed characters
    var pattern = /^[0-9a-fA-F]+$/;

    return pattern.test(inputString);
  }

  return (
    <>
      <Box>
        <LoadingOverlay visible={visible} zIndex={1000} />
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
