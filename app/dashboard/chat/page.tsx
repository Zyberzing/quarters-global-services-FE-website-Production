"use client";

import { useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, User, Headset } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatPage() {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // ✅ Start chat + auto first message
  const startConversation = () => {
    setStarted(true);
    setMessages([
      {
        id: Date.now(),
        text: "Hi 👋 I need some help.",
        sender: "user",
      },
      {
        id: Date.now() + 1,
        text: "Hello! 👋 How can I assist you today?",
        sender: "bot",
      },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "user" },
      {
        id: Date.now() + 1,
        text: "Thanks for your message. Our team will respond shortly 😊",
        sender: "bot",
      },
    ]);

    setInput("");
  };

  return (
    <DashboardLayout>
      <Card className="h-[75vh]">
        <CardContent className="h-full flex flex-col">
          {/* ===== EMPTY STATE ===== */}
          {!started ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center gap-4">
              <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center">
                <MessageCircle className="h-7 w-7 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Start a Conversation
              </h2>
              <p className="text-sm text-gray-500 max-w-sm">
                Chat with our support team for any assistance.
              </p>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-6"
                onClick={startConversation}
              >
                Start Conversation
              </Button>
            </div>
          ) : (
            <>
              {/* ===== CHAT MESSAGES ===== */}
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {/* Admin Avatar */}
                    {msg.sender === "bot" && (
                      <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <Headset className="h-5 w-5 text-gray-600" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-sm px-4 py-2 rounded-xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-red-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* User Avatar */}
                    {msg.sender === "user" && (
                      <div className="h-9 w-9 rounded-full bg-red-600 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ===== INPUT ===== */}
              <div className="pt-4 border-t flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button
                  onClick={handleSend}
                  className="bg-red-600 hover:bg-red-700 text-white px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
