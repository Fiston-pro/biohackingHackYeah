import { useState } from "react";

export const ChatWindow = () => {
  const [messages, setMessages] = useState([{ from: "ai", text: "Hi! How can I help?" }]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    // TODO: Add AI response logic
  };

  return (
    <div className="flex flex-col h-full">
      {/* Avatar / Animation */}
      <div className="mb-4">
        <img src="/avatar.png" className="h-24 w-24 animate-bounce" alt="Assistant Avatar" />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 bg-white p-4 rounded shadow">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              msg.from === "ai" ? "bg-blue-100 self-start" : "bg-green-100 self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4 flex items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border p-2 rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};
