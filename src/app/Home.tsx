import { useNavigate } from "react-router";
import { useSession } from "./SessionContext";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Home() {
  const { startSession } = useSession();
  const navigate = useNavigate();

  const handleStart = () => {
    startSession();
    navigate('/practice');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex flex-col items-center justify-center p-6 text-slate-900 font-sans selection:bg-indigo-100 relative overflow-hidden">
      {/* Subtle ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-50/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-slate-200/50 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-semibold mb-4 tracking-tight text-slate-900">
            Fraction Practice
          </h1>
          <p className="text-slate-500 mb-10 leading-relaxed text-lg">
            Work through a focused set of comparison problems to sharpen your skills and build intuition.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="group w-full bg-slate-900 text-white rounded-2xl py-4 px-6 font-medium text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 shadow-md shadow-slate-900/10"
          >
            Start practice
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
