export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: "Creative Design" | "AI Generation" | "Digital Visuals" | "Cinematic Arts" | "Tech Innovation" | "Partner Showcase";
  description: string;
  tags: string[];
}

export const USER_INFO = {
  fullName: "Arslan Abdul Mateen",
  brandName: "Arslan Portfolio",
  age: "Professional",
  profession: "Social Media Manager | Graphic Designer",
  location: "Kabul, Afghanistan",
  phone: "+93 748 845 221",
  email: "marslan0299@gmail.com",
  quote: "Eager to learn, adapt, and contribute positively to organizational success through effective communication and marketing strategies.",
  profileImages: [
    "https://i.ibb.co/Y4shkLW4/image.png",
    "https://i.ibb.co/GQrYPYXm/image.png"
  ],
  socials: {
    whatsapp: "https://wa.me/93748845221",
    facebook: "#",
    facebookAlt: "#",
    tiktok: "#",
    instagram: "#",
    snapchat: "#"
  },
  websites: {
    portfolio: "#",
    main: "#"
  },
  skills: [
    { name: "Social Media Management", level: 95, icon: "Megaphone", color: "from-cyan-400 to-blue-500" },
    { name: "Graphic Design", level: 90, icon: "Palette", color: "from-indigo-400 to-purple-500" },
    { name: "Content Creation", level: 92, icon: "Video", color: "from-red-400 to-pink-500" },
    { name: "Customer Service", level: 98, icon: "MessageCircle", color: "from-emerald-400 to-teal-500" },
    { name: "Data Entry", level: 95, icon: "FileText", color: "from-amber-400 to-rose-500" },
    { name: "Microsoft Office", level: 90, icon: "Terminal", color: "from-orange-400 to-amber-500" },
    { name: "Basic Web Design", level: 75, icon: "Code", color: "from-violet-400 to-fuchsia-500" },
    { name: "Communication", level: 95, icon: "Phone", color: "from-lime-400 to-emerald-500" }
  ],
  interests: [
    "Digital Marketing",
    "Graphic Design",
    "Technology",
    "Business Development",
    "Continuous Learning",
    "Professional Growth"
  ],
  experience: [
    { year: "2024-2025", title: "Social Media Manager", desc: "Regal Immigration & Travel Advisories Pvt. Ltd. - Managed Instagram/Facebook, designed promotional posts, scheduled content, and monitored performance." },
    { year: "Past", title: "Salesman", desc: "City Paint - Assisted customers, consistently achieved monthly sales targets, managed inventory." },
    { year: "Past", title: "Data Entry Operator", desc: "Waster 77 - Entered data with high accuracy, organized records, assisted with administrative tasks." }
  ]
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "img-1",
    url: "https://i.ibb.co/Y4shkLW4/image.png",
    title: "Arslan Portfolio Identity",
    category: "Digital Visuals",
    description: "Signature branding portrait showcasing creative developer aesthetics.",
    tags: ["Identity", "Aesthetics", "Brand"]
  },
  {
    id: "img-2",
    url: "https://i.ibb.co/GQrYPYXm/image.png",
    title: "Tech Enthusiast Persona",
    category: "Tech Innovation",
    description: "Creative portrait showing Arslan in dynamic professional setups.",
    tags: ["Tech", "Enthusiast", "Developer"]
  }
];
