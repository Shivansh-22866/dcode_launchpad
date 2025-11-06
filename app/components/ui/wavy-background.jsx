"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  let w, h, nt, i, x, ctx, canvas;
  const canvasRef = useRef(null);

  // 🖱️ Track mouse position
  const mouse = useRef({ x: 0, y: 0, active: false });

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;

    // Handle resize
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    // Track mouse
    window.onmousemove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    window.onmouseleave = () => (mouse.current.active = false);

    render();
  };

  const waveColors = colors ?? [
    "#C5F32C",
    "#6A2D9C",
    "#4A90E2",
    "#2A9D8F",
    "#C5F32C",
  ];

  const drawWave = (n) => {
    nt += getSpeed();
    const baseFrequency = 0.01;
    const baseAmplitude = 80;

    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];

      for (x = 0; x < w; x += 5) {
        // Calculate base sine wave
        let y = baseAmplitude * Math.sin(baseFrequency * x * 2 + nt + i);

        // Add cursor interaction
        if (mouse.current.active) {
          const distX = Math.abs(mouse.current.x - x);
          const influence = Math.max(0, 1 - distX / 400); // range of effect
          y += influence * 50 * Math.sin(nt * 5 + i); // subtle vertical "pull"
        }

        ctx.lineTo(x, y + h * 0.5);
      }

      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId;
  const render = () => {
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center overflow-hidden",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 -translate-y-1/2 top-1/2 z-0 opacity-40"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
