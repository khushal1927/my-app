type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat", // points to your API route
  });

  return (
    <div className="p-4 border rounded max-w-md">
      <div className="mb-4 h-60 overflow-y-auto border p-2 space-y-2">
       {messages.map((m: ChatMessage, i: number) => (
  <div key={i} className={m.role === "user" ? "text-blue-600" : "text-green-600"}>
    <b>{m.role}:</b> {m.content}
  </div>
))}


      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border px-2 py-1"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me something..."
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

