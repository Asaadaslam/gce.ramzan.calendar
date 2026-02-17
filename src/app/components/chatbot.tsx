import React, { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Assalam o Alaikum! I am GCE bot. How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Fake bot reply (replace later with API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks for your message! I will get back to you shortly.",
          sender: "bot",
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 text-white w-14 h-14 shadow-lg flex items-center justify-center text-2xl"
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-[90vw] max-w-sm h-[70vh] max-h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white p-3 text-sm font-semibold">
            GCE bot
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] px-3 py-2 rounded-lg text-sm break-words ${
                  msg.sender === "user"
                    ? "ml-auto bg-blue-100 text-right"
                    : "mr-auto bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-4 text-sm font-medium bg-blue-600 text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
