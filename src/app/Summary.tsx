import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSession } from "./SessionContext";
import { useApp } from "./AppContext";
import { RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import einsteinSvg from "@/assets/Einstein.svg";
import logoRevSvg from "@/assets/LearnWithAI-LogoRev.svg";

export function Summary() {
  const { totalAnswered, correctAnswers, startSession } = useSession();
  const { setShowLogoReveal } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const colors = ["#34d399", "#10b981", "#4F46E5", "#6366f1", "#fbbf24"];
    confetti({
      particleCount: 240,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors,
      zIndex: 0,
    });
    confetti({
      particleCount: 240,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.5 },
      colors,
      zIndex: 0,
    });
  }, []);

  const handleRestart = () => {
    startSession();
    navigate('/practice');
  };

  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex flex-col items-center justify-center p-6 text-slate-900 font-sans relative overflow-hidden">
      {/* Subtle ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-50/50 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full bg-white/80 backdrop-blur-xl p-10 rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <img src={einsteinSvg} alt="" className="h-16 w-auto" />
          <img src={logoRevSvg} alt="Learn With AI" className="h-[27px] max-w-[170px] w-auto" />
        </motion.div>

        <h1 className="text-3xl font-semibold mb-3 text-slate-900 tracking-tight">Session Complete</h1>

        <div className="flex justify-center gap-6 mb-8 mt-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold tracking-tight text-slate-900">{correctAnswers}</span>
            <span className="text-sm font-medium text-slate-500 mt-1">Correct</span>
          </div>
          <div className="w-px h-12 bg-slate-200 self-center" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold tracking-tight text-slate-900">{accuracy}%</span>
            <span className="text-sm font-medium text-slate-500 mt-1">Accuracy</span>
          </div>
        </div>

        <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 mb-10 shadow-sm shadow-slate-200/20">
          <p className="text-slate-600 font-medium leading-relaxed text-sm">
            You completed {totalAnswered} comparisons and are building a stronger intuition for these concepts.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              navigate("/");
              setShowLogoReveal(true);
            }}
            className="w-full bg-slate-900 text-white rounded-full py-3 px-6 font-medium text-sm hover:bg-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 shadow-sm"
          >
            Done for today
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRestart}
            className="w-full text-slate-500 font-medium py-3 px-6 flex items-center justify-center gap-2 hover:text-slate-900 hover:bg-slate-50 rounded-full border border-slate-200 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Start another set
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
