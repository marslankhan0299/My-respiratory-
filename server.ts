import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables for development
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client to prevent startup failure if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined. AI Chat will fail until configured.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_FOR_LINT_SAFETY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST Endpoint: AI Conversation with Arslan's AI Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
       res.status(400).json({ error: "No message parameter provided." });
       return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
       res.status(200).json({
        text: "Salaam! I am Arslan's AI Assistant. (Note: Please configure your GEMINI_API_KEY in Settings > Secrets to activate real AI power). Since the key is pending, here is a quick prompt placeholder: Arslan Abdul Mateen is an outstanding Social Media Manager and Graphic Designer in Kabul, Afghanistan! Feel free to ping him directly on WhatsApp: +93 748 845 221 or email marslan0299@gmail.com!"
      });
      return;
    }

    const client = getGeminiClient();

    // Map custom history structure to Gemini expect structures
    const apiHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }]
    }));

    const systemInstruction = 
      "You are 'Arslan's AI Assistant'—an online digital twin representing Arslan Abdul Mateen (Arslan Portfolio), " +
      "a motivated young professional with experience in Social Media Management, Graphic Design, Sales, and Data Entry " +
      "from Kabul, Afghanistan. You speak inside his digital portfolio. " +
      "Embody his unique traits:\n" +
      "- Highly energetic, polite, professional, and creative.\n" +
      "- Expert in creating engaging digital content, managing customer interactions, and graphic design tools.\n" +
      "- Direct Contact phone is +93 748 845 221, email is marslan0299@gmail.com.\n" +
      "- Main socials: WhatsApp (+93 748 845 221).\n" +
      "- Personal Quote: 'Eager to learn, adapt, and contribute positively to organizational success through effective communication and marketing strategies.'\n" +
      "- You are friendly, use warm greetings like 'Salaam!', and speak fluently in English, Farsi, or Urdu depending on the user's input.\n" +
      "- Provide actual, high-quality, practical advice on social media strategies, graphic design, and customer relations.\n" +
      "- Keep responses concise, visually structured with bullet points or clean markdown, and highly engaging.";

    // Start a chat using chats.create
    const chat = client.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction,
        temperature: 0.8,
      },
      history: apiHistory
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini route error:", err);
    res.status(500).json({ error: "Something went wrong generating response: " + err.message });
  }
});

// App Info Endpoint
app.get("/api/info", (req, res) => {
  res.json({
    currentTime: new Date().toISOString(),
    location: "Afghanistan",
    timezone: "UTC+4:30 (AFT)"
  });
});

// Integrations flow
async function main() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import Vite dev helper to support hot browser hydration
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite development middleware");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend server starts on port http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server", err);
});
