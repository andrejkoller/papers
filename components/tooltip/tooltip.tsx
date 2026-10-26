"use client";

import * as React from "react";
import { cn } from "@/lib/merge-classes";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export const Tooltip = ({
  content,
  children,
  side = "top",
  delay = 200,
}: TooltipProps) => {
  const [open, setOpen] = React.useState(false);
  const [canHover, setCanHover] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const id = React.useId();

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanHover(mq.matches);

    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const show = () => {
    if (!canHover) return;
    timeoutRef.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-(--foreground)",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-(--foreground)",
    left: "left-full top-1/2 -translate-y-1/2 border-l-(--foreground)",
    right: "right-full top-1/2 -translate-y-1/2 border-r-(--foreground)",
  };

  const animationClasses = {
    top: "animate-[tooltip-in-top_150ms_ease-out_forwards]",
    bottom: "animate-[tooltip-in-bottom_150ms_ease-out_forwards]",
    left: "animate-[tooltip-in-left_150ms_ease-out_forwards]",
    right: "animate-[tooltip-in-right_150ms_ease-out_forwards]",
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={canHover ? show : undefined}
      onBlur={hide}
    >
      <span aria-describedby={open ? id : undefined} className="inline-flex">
        {children}
      </span>

      {open && canHover && (
        <span
          id={id}
          role="tooltip"
          className={cn(
            "absolute z-50 pointer-events-none",
            positionClasses[side],
          )}
        >
          <span
            className={cn(
              "relative block whitespace-nowrap rounded-md px-2 py-1 text-xs",
              "font-(--font-geist-mono)",
              "bg-(--foreground) text-(--background)",
              animationClasses[side],
            )}
          >
            {content}
            <span
              className={cn(
                "absolute border-4 border-transparent",
                arrowClasses[side],
              )}
            />
          </span>
        </span>
      )}
    </span>
  );
};
