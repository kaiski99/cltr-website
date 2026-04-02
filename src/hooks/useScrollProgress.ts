"use client";

import { useEffect, useCallback, useRef } from "react";
import { useCLTRStore } from "@/stores/cltr";

export function useScrollProgress() {
  const setScrollProgress = useCLTRStore((s) => s.setScrollProgress);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    setScrollProgress(progress);
  }, [setScrollProgress]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return containerRef;
}
