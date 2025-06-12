import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextArea } from "@radix-ui/themes";
import { useState } from "react";
import { addMessage, updateMessages, $messages } from "@/store/messages";
import { onDummyAgent } from "@/actions/agent";
import { useStore } from "@nanostores/react";
import { styled } from "@/lib/stitches";

const TextNew = styled(TextArea, {
    width: "100%",
    maxWidth: "600px",
    minHeight: "50px",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "16px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    "&:focus": {
        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)", // Blue shadow on focus
        outline: "none",
    },
    "&::placeholder": {
        color: "#9ca3af", // Gray placeholder text
    },
    "&:disabled": {
        backgroundColor: "#f3f4f6", // Light gray background when disabled
        color: "#6b7280", // Darker gray text when disabled
        cursor: "not-allowed",
    },
    variants: {
        size: {
            small: {
                fontSize: "14px",
                padding: "8px",
            },
            medium: {
                fontSize: "16px",
                padding: "10px",
            },
            large: {
                fontSize: "18px",
                padding: "12px",
            },
        },
    },
    defaultVariants: {
        size: "medium", // Default size
    },
});


function ChatPrompt() {
  const [prompt, setPrompt] = useState("");

  console.log("rendered", prompt);

  const messages = useStore($messages);

  const onTextChange = (e) => {
    setPrompt(e.target.value);
  };

  const onSendPrompt = async () => {

    addMessage({
      role: "user",
      content: prompt,
      id: 1,
    });
    setPrompt("");

    const assistantId = Math.random().toString();

    updateMessages([
      ...$messages.get(),
      { role: "assistant", content: "", id: assistantId },
    ]);

    const messages = $messages.get();

    let streamed = "";
    for await (const token of onDummyAgent()) {
      streamed += token;
      const updated = $messages.get().map((msg) =>
        msg.id === assistantId ? { ...msg, content: streamed } : msg
      );
      updateMessages(updated);
    }
  };

  return (
    <Flex justify="center" mt="auto" width="100%">
      <Flex align="center" direction="column" width="100%">
        <TextNew placeholder="Comment puis-je aider..."
          onChange={onTextChange}
          value={prompt}/>

        <Flex justify="s" width="100%">
          <Button onClick={onSendPrompt} disabled={!prompt.trim()}>
            <PaperPlaneIcon />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ChatPrompt;