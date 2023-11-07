import { AppShell, AppShellHeader, Group } from "@mantine/core";
import "./Chatroom.css";

function Chatroom() {
  return (
    <>
      <AppShell header={{ height: 60 }}>
        <AppShellHeader>
          <Group className="header">
            <img className="logo" src="/assets/picto.svg" alt="logo" />
          </Group>
        </AppShellHeader>
      </AppShell>
    </>
  );
}

export default Chatroom;
