import { useState, useEffect } from "react";
import { motion } from "motion/react";

import einsteinSvg from "@/assets/Einstein.svg";
import logoRevSvg from "@/assets/LearnWithAI-LogoRev.svg";

const INITIAL_DELAY_MS = 1000; // ~1 sec before logo fades in
const LOGO_FADE_DURATION = 0.85;
const LOGO_HOLD_AFTER_FADE = 0.75; // sec logo stays centered before sliding
const LOGO_SLIDE_DURATION = 1.1;
const TEXT_REVEAL_DURATION = 1.1;
// Show button after logo/text reach final position (slide starts after hold)
const BUTTON_APPEAR_DELAY_MS =
  (LOGO_HOLD_AFTER_FADE + 0.25 + Math.max(LOGO_SLIDE_DURATION, TEXT_REVEAL_DURATION)) * 1000;

const easeInOut = [0.65, 0, 0.35, 1];

const LOGO_WIDTH = 120;
const LOGO_HEIGHT = 129;
const GAP = 24;
const TEXT_FINAL_WIDTH = 320;
const ROW_HALF_PX = (LOGO_WIDTH + GAP + TEXT_FINAL_WIDTH) / 2;

// Logo slide starts after the hold; text starts soon after (text sits behind logo so no overlay)
const LOGO_SLIDE_DELAY = 0.25 + LOGO_HOLD_AFTER_FADE;
const TEXT_REVEAL_DELAY = 0.6 + LOGO_HOLD_AFTER_FADE;

const EXIT_DURATION = 0.28;
const EXIT_SCALE = 1.06;

type LogoRevealProps = {
  onComplete: () => void;
  onBeginClick: () => void;
};

export function LogoReveal({ onComplete, onBeginClick }: LogoRevealProps) {
  const [started, setStarted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleBeginClick = () => {
    if (exiting) return;
    setExiting(true);
  };

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), INITIAL_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setShowButton(true), BUTTON_APPEAR_DELAY_MS);
    return () => clearTimeout(t);
  }, [started]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FBFBFD]"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: "50% 50%" }}
        animate={{
          scale: exiting ? EXIT_SCALE : 1,
          opacity: exiting ? 0 : 1,
        }}
        transition={{
          duration: EXIT_DURATION,
          ease: [0.4, 0, 0.2, 1],
        }}
        onAnimationComplete={() => {
          if (exiting) onBeginClick();
        }}
      >
        {/* Text: behind the logo (lower z-index), revealed as logo slides left */}
        <motion.div
        className="absolute overflow-hidden"
        style={{
          left: `calc(50% - ${ROW_HALF_PX - LOGO_WIDTH - GAP}px)`,
          top: "calc(50% - 90px)",
          height: 48,
          marginTop: -24,
          zIndex: 0,
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={
          started
            ? {
                width: TEXT_FINAL_WIDTH,
                opacity: 1,
              }
            : { width: 0, opacity: 0 }
        }
        transition={{
          width: {
            duration: TEXT_REVEAL_DURATION,
            ease: easeInOut,
            delay: started ? TEXT_REVEAL_DELAY : 0,
          },
          opacity: {
            duration: 0.45,
            delay: started ? 0.25 : 0,
          },
        }}
      >
        <img
          src={logoRevSvg}
          alt="Learn With AI"
          className="h-12 w-[320px] object-contain object-left"
          width={829.5}
          height={115.5}
          style={{ minWidth: TEXT_FINAL_WIDTH }}
        />
        </motion.div>

        {/* Logo: on top of text so it never overlays — starts center, slides left */}
      <motion.div
        className="absolute flex shrink-0"
        style={{
          width: LOGO_WIDTH,
          height: LOGO_HEIGHT,
          left: "50%",
          top: "calc(50% - 90px)",
          zIndex: 1,
        }}
        initial={{
          x: "-50%",
          y: "-50%",
          opacity: 0,
        }}
        animate={{
          x: started ? -ROW_HALF_PX : "-50%",
          y: "-50%",
          opacity: started ? 1 : 0,
        }}
        transition={{
          x: {
            duration: LOGO_SLIDE_DURATION,
            ease: easeInOut,
            delay: started ? LOGO_SLIDE_DELAY : 0,
          },
          y: { duration: 0 },
          opacity: {
            duration: LOGO_FADE_DURATION,
            delay: started ? 0 : 0,
          },
        }}
      >
        <img
          src={einsteinSvg}
          alt=""
          className="h-full w-full object-contain"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
        />
      </motion.div>

        {/* Pill button: appears after logo/text in place */}
        <motion.button
          type="button"
          onClick={handleBeginClick}
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 px-8 py-3 text-base font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        style={{ top: "calc(50% + 30px)" }}
        initial={{ opacity: 0, y: 8 }}
        animate={
          showButton
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 8 }
        }
        transition={{ duration: 0.35, ease: easeInOut }}
        whileHover={{
          scale: 1.03,
          y: -2,
          transition: { duration: 0.2, ease: easeInOut },
        }}
        whileTap={{ scale: 0.98 }}
        aria-label="Begin practice"
      >
          Let's Begin
        </motion.button>
      </motion.div>
    </div>
  );
}
