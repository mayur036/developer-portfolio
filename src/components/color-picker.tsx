'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAccentColor, ACCENT_PRESETS } from '@/src/hooks/use-accent-color';

const PANEL_ANIMATION = {
  initial: { opacity: 0, scale: 0.92, y: -4 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.92, y: -4 },
} as const;

const PANEL_TRANSITION = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const;

const GRID_COLUMNS = 4;

export function ColorPicker(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { accentColor, setAccentColor } = useAccentColor();
  const { resolvedTheme } = useTheme();

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent): void {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSwatchClick = useCallback(
    (id: string): void => {
      setAccentColor(id);
      setIsOpen(false);
    },
    [setAccentColor],
  );

  const toggleOpen = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Change accent color"
              aria-expanded={isOpen}
              aria-haspopup="true"
              onClick={toggleOpen}
            >
              <Palette className="size-5 text-accent transition-transform duration-300" />
            </Button>
          }
        />
        <TooltipContent side="bottom" sideOffset={8}>
          <p>Accent color</p>
        </TooltipContent>
      </Tooltip>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full z-50 mt-2 rounded-xl border border-border-color bg-surface/95 p-3 shadow-lg backdrop-blur-xl"
            role="listbox"
            aria-label="Accent color options"
            {...PANEL_ANIMATION}
            transition={PANEL_TRANSITION}
          >
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
              }}
            >
              <TooltipProvider delay={300}>
                {ACCENT_PRESETS.map((preset) => {
                  const isSelected = accentColor === preset.id;

                  return (
                    <Tooltip key={preset.id}>
                      <TooltipTrigger
                        render={
                          <button
                            type="button"
                            role="option"
                            aria-label={preset.name}
                            aria-selected={isSelected}
                            className="relative flex size-6 items-center justify-center rounded-full outline-none transition-transform duration-150 hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                            style={{
                              backgroundColor:
                                resolvedTheme === 'dark'
                                  ? preset.dark
                                  : preset.light,
                            }}
                            onClick={() => handleSwatchClick(preset.id)}
                          >
                            {/* Selected indicator: white checkmark */}
                            <AnimatePresence>
                              {isSelected && (
                                <motion.span
                                  className="pointer-events-none flex items-center justify-center"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30,
                                  }}
                                >
                                  <Check
                                    className="size-3.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
                                    strokeWidth={3}
                                    color="white"
                                  />
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </button>
                        }
                      />
                      <TooltipContent side="bottom" sideOffset={6}>
                        <p>{preset.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
