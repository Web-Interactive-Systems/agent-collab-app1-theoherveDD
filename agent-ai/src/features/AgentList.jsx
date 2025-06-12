import React, { useState } from "react";
import { Flex } from "@radix-ui/themes";
import { styled } from "@/lib/stitches";
import { $agents, updateAgent, deleteAgent } from "../store/agents";
import { useStore } from "@nanostores/react";
import AgentForm from "./AgentForm";

// La carte de l’agent contient : title, emoji, et le role de l’agent
// Création de la card 

const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: "var(--card-bg, #222)",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "200px",
  height: "200px",
  margin: "20px",
  marginBottom: "0",
});

function AgentList() {
  const storeAgents = useStore($agents);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ title: "", emoji: "", role: "" });

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setEditData({ ...storeAgents[idx] });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = (idx) => {
    updateAgent(idx, editData);
    setEditIndex(null);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  return (
    <>
      <Flex direction="row" gap="20" width="100%"  p="1" style={{ overflowY: "auto", flexWrap: "wrap" }}>
        {storeAgents.map((agent, idx) => (
          <Card key={agent.title + agent.emoji}>
            {editIndex === idx ? (
              <>
                <input
                  name="emoji"
                  value={editData.emoji}
                  onChange={handleEditChange}
                  style={{ fontSize: "1.5rem", width: "3.5rem", textAlign: "center", marginBottom: "0.5rem", borderRadius: "4px", border: "1px solid #444", background: "#333", color: "#fff" }}
                  placeholder="Emoji"
                />
                <input
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  style={{ fontSize: "1.1rem", margin: "0.5rem 0", borderRadius: "4px", border: "1px solid #444", background: "#333", color: "#fff" }}
                  placeholder="Title"
                />
                <textarea
                  name="role"
                  value={editData.role}
                  onChange={handleEditChange}
                  style={{ color: "#fff", background: "#333", border: "1px solid #444", borderRadius: "4px", width: "100%", marginBottom: "0.5rem" }}
                  placeholder="Role"
                />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleEditSave(idx)}
                    style={{ background: "#F26DAB", color: "#fff", border: "none", borderRadius: "4px", padding: "0.3rem 0.7rem", cursor: "pointer" }}
                  >
                    Sauver
                  </button>
                  <button
                    onClick={handleEditCancel}
                    style={{ background: "#444", color: "#fff", border: "none", borderRadius: "4px", padding: "0.3rem 0.7rem", cursor: "pointer" }}
                  >
                    Annuler
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  <span role="img" aria-label={agent.title}>
                    {agent.emoji}
                  </span>
                </div>
                <h2 style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>{agent.title}</h2>
                <p style={{ color: "#666", textAlign: "center" }}>
                  {agent.role}
                </p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                  <button
                    onClick={() => handleEdit(idx)}
                    style={{ background: "#F26DAB", color: "#fff", border: "none", borderRadius: "4px", padding: "0.3rem 0.7rem", cursor: "pointer" }}
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => deleteAgent(idx)}
                    style={{ background: "#444", color: "#fff", border: "none", borderRadius: "4px", padding: "0.3rem 0.7rem", cursor: "pointer" }}
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </Card>
        ))}
        <Card
          className="add-agent-card"
          style={{ cursor: "pointer", opacity: 0.8 }}
          onClick={() => setShowForm(true)}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span role="img" aria-label="Add Agent">➕</span>
          </div>
        </Card>
      </Flex>
      {showForm && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "none" }}>
            <AgentForm />
            <button
              onClick={() => setShowForm(false)}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                border: "none",
                background: "#444",
                color: "#fff",
                cursor: "pointer",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AgentList;