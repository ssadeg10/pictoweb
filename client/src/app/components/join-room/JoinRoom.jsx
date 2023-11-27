import { Button, Center, Group, Text, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";

function JoinRoom() {
  const verifyRoomCode = () => {};
  return (
    <>
      <form action={verifyRoomCode}>
        <Group justify="center">
          <TextInput
            className="formGroup text-input"
            placeholder="Enter a room code..."
            maxLength="18"
            autoComplete="off"
            radius={0}
            required={true}
          />
          <Button>Submit</Button>
        </Group>
      </form>
      <br />
      <Link to="..">
        <Center>
          <Text>Back</Text>
        </Center>
      </Link>
    </>
  );
}
export default JoinRoom;
