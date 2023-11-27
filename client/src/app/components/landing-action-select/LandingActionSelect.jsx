import { Group, Paper, Text } from "@mantine/core";
import { Link, useLinkClickHandler } from "react-router-dom";

function LandingActionSelect() {
  return (
    <Group justify="center">
      <Paper
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
  );
}
export default LandingActionSelect;
