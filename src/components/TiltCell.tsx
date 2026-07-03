import React, { useRef, useState, useEffect } from "react";
import { motion, Variants } from "motion/react";

interface TiltCellProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  onClick?: () => void;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } },
};

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
}

const SparkleIcon = ({ color, size }: { color: string; size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
  >
    <path
      d="M12 0C12 6.627 6.627 12 0 12C6.619 12 12 17.373 12 24C12 17.381 17.373 12 24 12C17.381 12 12 6.619 12 0Z"
      fill={color}
    />
  </svg>
);

export function TiltCell({ children, className = "", style = {}, variants = defaultVariants, onClick }: TiltCellProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const lastSpawnRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const checkIsMobile = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window;
      setIsMobile(hasTouch);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const spawnSparkle = (x: number, y: number) => {
    // Keep sparkles counts and memory allocations much lower on mobile devices
    const colors = ["#c5f547", "#ffffff", "#d9f99d", "#a3e635"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomSize = Math.floor(Math.random() * 8) + 8; // 8px to 16px for crispness
    const randomAngle = Math.floor(Math.random() * 360);
    const id = `${Date.now()}-${Math.random()}`;

    setSparkles((prev) => [
      ...prev.slice(isMobile ? -6 : -15), // much lower cap on mobile to stay performant
      {
        id,
        x,
        y,
        size: randomSize,
        color: randomColor,
        angle: randomAngle,
      },
    ]);
  };

  const removeSparkle = (id: string) => {
    setSparkles((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Width and height of card
    const width = rect.width;
    const height = rect.height;
    
    // Mouse position relative to center of card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max tilt angle (subtle 3D feel, e.g. 5 degrees)
    const maxTilt = 6;
    
    // Calculate tilt values based on cursor position relative to the middle
    const rotateY = (mouseX / (width / 2)) * maxTilt;
    const rotateX = -(mouseY / (height / 2)) * maxTilt;
    
    setCoords({ rotateX, rotateY });

    // Spawn sparkles along mouse path
    const now = Date.now();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    const dist = Math.hypot(currentX - lastSpawnRef.current.x, currentY - lastSpawnRef.current.y);
    if (dist > 35 && now - lastSpawnRef.current.time > 80) {
      spawnSparkle(currentX, currentY);
      lastSpawnRef.current = { x: currentX, y: currentY, time: now };
    }
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
    // Burst response on mouse enter
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      for (let i = 0; i < 4; i++) {
        const rx = Math.random() * rect.width;
        const ry = Math.random() * rect.height;
        setTimeout(() => {
          spawnSparkle(rx, ry);
        }, i * 90);
      }
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    setCoords({ rotateX: 0, rotateY: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile || !cardRef.current) return;
    setIsHovered(true);
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const tx = touch.clientX - rect.left;
    const ty = touch.clientY - rect.top;
    
    // Quick premium feedback burst on mobile tap!
    for (let i = 0; i < 3; i++) {
      spawnSparkle(tx + (Math.random() - 0.5) * 30, ty + (Math.random() - 0.5) * 30);
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    setIsHovered(false);
  };

  // Combine custom hardware-accelerated 3D transitions or light 2D scales based on device
  const activeStyles: React.CSSProperties = {
    transform: isHovered 
      ? isMobile
        ? "scale3d(0.985, 0.985, 0.985)" // Elegant click feedback scale on mobile instead of heavy 3D tilt
        : `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.015, 1.015, 1.015)` 
      : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: isHovered 
      ? "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)" 
      : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
    willChange: "transform",
    transformStyle: isMobile ? "flat" as any : "preserve-3d",
    position: "relative",
    overflow: "hidden",
    ...style,
  };

  return (
    <motion.div
      ref={cardRef as any}
      variants={variants}
      onMouseMove={handleMouseMove as any}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      className={className}
      style={activeStyles}
    >
      {/* Absolute Dynamic Sparkles overlay */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none z-10"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ scale: 0, opacity: 0, rotate: sparkle.angle }}
          animate={{
            scale: [0, 1.3, 0.9, 0],
            opacity: [0, 1, 0.8, 0],
            y: [0, -35 - Math.random() * 25],
            x: [0, (Math.random() - 0.5) * 25],
            rotate: sparkle.angle + 120,
          }}
          transition={{ duration: 0.9 + Math.random() * 0.3, ease: "easeOut" }}
          onAnimationComplete={() => removeSparkle(sparkle.id)}
        >
          <SparkleIcon color={sparkle.color} size={sparkle.size} />
        </motion.div>
      ))}

      {/* Sub-container representing a preserve-3d child with translation */}
      <div 
        style={{ 
          transform: isHovered ? "translateZ(8px)" : "translateZ(0px)", 
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "inherit",
          width: "100%",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
