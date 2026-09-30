"use client";

import { AnimatePresence, Transition, motion } from "framer-motion";
import React, { Children, cloneElement, useEffect, useState, useId } from "react";

export type AnimatedBackgroundProps = {
  children: React.ReactNode[];
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition = {
    type: "spring",
    bounce: 0.2,
    duration: 0.3,
  },
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultValue ?? null);
  const uniqueId = useId();

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue]);

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    if (onValueChange) {
      onValueChange(id);
    }
  };

  return (
    <div className="relative flex items-center">
      {Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const childProps = child.props as Record<string, unknown>;
        const id = childProps["data-id"] as string | undefined;

        if (!id) {
          return child;
        }

        const interactionProps = enableHover
          ? {
              onMouseEnter: () => handleSetActiveId(id),
              onFocus: () => handleSetActiveId(id),
            }
          : {
              onClick: () => handleSetActiveId(id),
            };

        const clonedProps = {
          ...interactionProps,
        } as unknown as React.HTMLAttributes<HTMLElement>;

        return cloneElement(
          child,
          clonedProps,
          <>
            <AnimatePresence initial={false}>
              {activeId === id && (
                <motion.div
                  layoutId={`animated-bg-${uniqueId}`}
                  className={`absolute inset-0 -z-10 ${className || ""}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{(childProps.children as React.ReactNode)}</span>
          </>
        );
      })}
    </div>
  );
}
