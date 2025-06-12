import { atom } from "nanostores";

export const $agents = atom([
  { title: "Agent Name", role: "This is a brief description of the agent's role and capabilities.", emoji: "🤖" },
  { title: "CACA", role: "This is a brief description of the agent's role and capabilities.", emoji: "💩" },
  { title: "Prout", role: "This is a brief description of the agent's role and capabilities.", emoji: "💨" },
]);

export const addAgent = (agent) => {
  $agents.set([...$agents.get(), agent]);
};

export const updateAgent = (index, updatedAgent) => {
  const agents = $agents.get();
  agents[index] = { ...agents[index], ...updatedAgent };
  $agents.set([...agents]);
};

export const deleteAgent = (index) => {
  const agents = $agents.get();
  agents.splice(index, 1);
  $agents.set([...agents]);
};