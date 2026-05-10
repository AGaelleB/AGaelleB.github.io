"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      dot.style.width = "12px";
      dot.style.height = "12px";
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.opacity = "0.8";
    };

    const onMouseLeaveLink = () => {
      dot.style.width = "8px";
      dot.style.height = "8px";
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.opacity = "0.5";
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    // Hover on interactive elements
    const links = document.querySelectorAll("a, button, [data-cursor]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    // Hide on mobile
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      dot.style.display = "none";
      ring.style.display = "none";
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} id="cursor" />
      <div ref={ringRef} id="cursor-ring" />
    </>
  );
}
