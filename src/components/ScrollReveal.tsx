"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
  scrollEffect?: "expand" | "parallax" | "fade" | "scale" | "none";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 30,
  once = true,
  scrollEffect = "none",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
  };

  const offset = directionMap[direction];

  // Scroll effect transforms
  const expandScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.02]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-2, 0]);

  const effectVariants = {
    expand: { scale: expandScale },
    parallax: { y: parallaxY },
    scale: { scale: scaleTransform, rotateZ },
    fade: {},
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.05 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={scrollEffect !== "none" ? effectVariants[scrollEffect] : {}}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
