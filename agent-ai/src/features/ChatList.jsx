import { Markdown } from "@/components/Markdown";
import { FaceIcon, PersonIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { useStore } from "@nanostores/react";
import { $messages } from "@/store/messages";
import { styled } from "@/lib/stitches";

// Style pour chaque bulle de message
const MessageBubble = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.75rem 1rem",
  borderRadius: "16px",
  maxWidth: "70%",
  marginBottom: "0.2rem",
  fontSize: "1rem",
  backgroundColor: "var(--bubble-bg, #23272f)",
  color: "var(--bubble-text, #fff)",
  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
  variants: {
    role: {
      user: {
        alignSelf: "flex-end",
        backgroundColor: "#F26DAB",
        color: "#fff",
      },
      assistant: {
        alignSelf: "flex-start",
        backgroundColor: "#23272f",
        color: "#fff",
      },
    },
  },
});

const IconBox = styled("span", {
  marginTop: "2px",
  display: "flex",
  alignItems: "center",
  fontSize: "1.2em",
});

function ChatList() {
  
  const storeMessages = useStore($messages);
  
  return (
    <Flex direction="column" gap="2" css={{ width: "100%" }}>
      {storeMessages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role}>
          <IconBox>
            {msg.role === "user" ? <PersonIcon /> : <FaceIcon />}
          </IconBox>
          <Markdown>{msg.content}</Markdown>
        </MessageBubble>
      ))}
    </Flex>
  );
}

export default ChatList;