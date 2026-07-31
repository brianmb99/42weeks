"use client";

import type { ReactNode } from "react";

export default function ScrollToSectionButton({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className?: string;
  children: ReactNode;
}) {
  function scrollToTarget() {
    const target = document.getElementById(targetId);
    if (!target) return;

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <button
      className={className}
      type="button"
      onClick={scrollToTarget}
      aria-label={`Scroll to ${targetId}`}
    >
      {children}
    </button>
  );
}
