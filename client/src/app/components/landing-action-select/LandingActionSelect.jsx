import { Button, Group, Paper, Text } from "@mantine/core";
import { useLinkClickHandler } from "react-router-dom";

function LandingActionSelect() {
  return (
    <>
      <Group justify="center">
        <Paper
          disabled
          component="button"
          radius={0}
          shadow="md"
          className="createRoom"
          withBorder
          onClick={useLinkClickHandler("/create")}
        >
          <Text>Create a room</Text>
          <a href="/create" />
        </Paper>
        <Paper
          disabled
          component="button"
          radius={0}
          shadow="md"
          className="joinRoom"
          withBorder
          onClick={useLinkClickHandler("/join")}
        >
          <Text>Join a room</Text>
          <a href="/join" />
        </Paper>
      </Group>
      <br />
      <Button className="testRoom" onClick={useLinkClickHandler("/test")}>
        Join test room
      </Button>
    </>
  );
}
export default LandingActionSelect;
