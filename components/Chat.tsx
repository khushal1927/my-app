"use client";
import { useChat, Message } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      <div>
        {messages.map((m: Message, i: number) => (
          <div key={i}><b>{m.role}:</b> {m.content}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

