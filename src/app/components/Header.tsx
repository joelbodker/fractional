import { Flame } from "lucide-react";
import { useSession } from "../SessionContext";
import { motion } from "motion/react";
import logoRevSvg from "@/assets/LearnWithAI-LogoRev.svg";

export function Header() {
  const { problems, currentIndex, streak } = useSession();
  
  const total = problems.length;
  const current = currentIndex + 1;
  const progressPercent = Math.min(100, (current / total) * 100);

  return (
    <header className="w-full flex flex-col gap-6 pt-3 pb-0.5 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={logoRevSvg} alt="Learn With AI" className="h-5 w-auto" />
          <span className="text-slate-400 font-medium text-sm">–</span>
          <span className="text-xl font-semibold text-slate-900 tracking-tight">
            Fractional Sense Bootcamp
          </span>
        </div>
        
        <motion.div 
          key={streak}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border shadow-sm transition-colors duration-300 ${
            streak > 0 
              ? 'bg-orange-50 border-orange-200/50 text-orange-600' 
              : 'bg-white border-slate-200/60 text-slate-400'
          }`}
        >
          <Flame className={`w-3 h-3 transition-all duration-300 ${streak > 0 ? 'fill-orange-500/20' : ''}`} />
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Streak</span>
          <span className="font-semibold text-xs tabular-nums">{streak}</span>
        </motion.div>
      </div>
      
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-3 bg-slate-200/50 rounded-full overflow-hidden relative backdrop-blur-sm">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-slate-900 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
        </div>
        <span className="text-sm font-semibold text-slate-400 tabular-nums tracking-wide">
          {Math.min(current, total)} / {total}
        </span>
      </div>
    </header>
  );
}
