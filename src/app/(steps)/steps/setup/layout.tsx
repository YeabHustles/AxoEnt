"use client";

import { useState, useEffect } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import styles from "./globals.module.css";

export default function StoreSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <BackgroundBeamsWithCollision>
      {children}
    </BackgroundBeamsWithCollision>
  );
}