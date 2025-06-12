// Agent form component
import React, { useState } from "react";
import { styled } from "@/lib/stitches";
import { useStore } from "@nanostores/react";
import { $agents, addAgent } from "../store/agents";
// Ajoute l'import du picker
import EmojiPicker from "emoji-picker-react";


// Importing the styled components from stitches
const FormContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  backgroundColor: "#222",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "400px",
});

const FormField = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const FormLabel = styled("label", {
  color: "#fff",
  fontSize: "0.875rem",
});



const AgentForm = () => {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");
  const [role, setRole] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const storeAgents = useStore($agents);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && emoji && role) {
      addAgent({ title, emoji, role });
      setTitle("");
      setEmoji("");
      setRole("");
    }
  };

  const handleEmojiClick = (emojiData) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormField>
          <FormLabel htmlFor="title">Title</FormLabel>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter agent title"
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #444", background: "#333", color: "#fff" }}
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="emoji">Emoji</FormLabel>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id="emoji"
              type="text"
              value={emoji}
              readOnly
              placeholder="Ex: 🤖"
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #444",
                background: "#333",
                color: "#fff",
                fontSize: "1.5rem",
                width: "3.5rem",
                textAlign: "center",
                cursor: "pointer"
              }}
              onClick={() => setShowEmojiPicker((v) => !v)}
              aria-label="Emoji"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker((v) => !v)}
              style={{
                background: "#444",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.5rem",
                cursor: "pointer",
                fontSize: "1.2rem"
              }}
              aria-label="Ouvrir le sélecteur d'emoji"
            >
              😊
            </button>
          </div>
          {showEmojiPicker && (
            <div style={{ position: "absolute", zIndex: 10 }}>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme="dark"
                autoFocusSearch={false}
              />
            </div>
          )}
        </FormField>
        <FormField>
          <FormLabel htmlFor="role">Role</FormLabel>
          <textarea
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Describe the agent's role"
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #444", background: "#333", color: "#fff", minHeight: "60px" }}
          />
        </FormField>
        <button
          type="submit"
          disabled={!title || !emoji || !role}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            background: "#F26DAB",
            color: "#fff",
            cursor: "pointer",
            opacity: !title || !emoji || !role ? 0.5 : 1,
            marginTop: "0.5rem"
          }}
        >
          Add Agent
        </button>
      </form>
    </FormContainer>
  );
};

// Rien à changer ici si addAgent est bien exportée dans agents.js

export default AgentForm;
