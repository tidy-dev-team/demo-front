import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export type PopoverChildrenRender = (opts: { close: () => void; open: boolean }) => React.ReactNode;

export type PopoverProps = {
  trigger?: React.ReactNode;
  children: React.ReactNode | PopoverChildrenRender;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
  className?: string;
};

export default function Popover({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  align = "start",
  className,
}: PopoverProps): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const isControlled = controlledOpen !== undefined;
  const actualOpen = isControlled ? controlledOpen : open;

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocumentDown(e: MouseEvent) {
      const target = e.target as Node;
      if (!rootRef.current) return;
      if (!rootRef.current.contains(target)) {
        if (!isControlled) setOpen(false);
        onOpenChange?.(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (!isControlled) setOpen(false);
        onOpenChange?.(false);
      }
    }

    document.addEventListener("mousedown", onDocumentDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocumentDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isControlled, onOpenChange]);

  const toggle = () => {
    if (isControlled) {
      onOpenChange?.(!controlledOpen);
    } else {
      setOpen((v) => {
        const next = !v;
        onOpenChange?.(next);
        return next;
      });
    }
  };

  const alignmentClass =
    align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";

  const close = () => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setOpen(false);
      onOpenChange?.(false);
    }
  };

  const renderChildren = () => {
    if (typeof children === "function") {
      try {
        return (children as PopoverChildrenRender)({ close, open: actualOpen });
      } catch (e) {
        return null;
      }
    }
    return children;
  };

  return (
    <div className={`relative inline-block ${className ?? ""}`} ref={rootRef}>
      <div onClick={toggle} className="inline-block">
        {trigger ?? <Button size="sm">Open</Button>}
      </div>

      {actualOpen && (
        <div className={`absolute z-50 mt-2 ${alignmentClass}`} style={{ minWidth: 200 }}>
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3">
            {renderChildren()}
          </div>
        </div>
      )}
    </div>
  );
}
