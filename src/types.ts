export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  content: string;
  timestamp: string;
}

export interface StickyNote {
  id: string;
  author: string;
  text: string;
  category: "Hire Arslan" | "Collab Request" | "Fan Message" | "General Direct";
  color: string;
  timestamp: string;
  emoji: string;
}

export interface GalleryFilter {
  category: string;
  search: string;
  tag: string;
  imagePreset: "normal" | "grayscale" | "retro" | "liquid" | "cyber" | "sunset";
}
