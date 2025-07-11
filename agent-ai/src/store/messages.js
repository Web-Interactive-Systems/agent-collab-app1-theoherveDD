import { atom } from "nanostores";


export const $messages = atom([
  { role: "user", content: "bonjour ! comment çava ?", id: "1" },
  {
    role: "assistant",
    content: "bonjour !! je vais bien.. merci.  Je suis là pour aider",
    id: "2",
  },
  { role: "user", content: "aide moi à apprendre react", id: "3" },
]);


export const addMessage = (msg) => {
  const all = $messages.get();
  $messages.set([...all, msg]);
};


export const updateMessages = (msgs) => {
  $messages.set(msgs);
};