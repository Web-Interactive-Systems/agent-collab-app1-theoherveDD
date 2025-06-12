import { Resizable } from "@/components/Resizable";
import { Flex } from "@radix-ui/themes";
import Chat from "@/features/Chat"; 
import AgentList from "@/features/AgentList"; 

function Home() {
  return (
    <Flex gap="8" width="100%" height="100%">
      <AgentList />
      <Resizable
        className="resizable"
        style={{
          background: "var(--focus-a3)",
          borderLeft: "1px solid var(--gray-9)",
          marginLeft: "auto",
        }}
        enable={{
          top: false,
          right: false,
          bottom: false,
          left: true,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }} >
        <Chat />
      </Resizable>
    </Flex>
  );
}

export default Home;