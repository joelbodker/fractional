import { Flame } from "lucide-react";
import { useSession } from "../SessionContext";
import { motion } from "motion/react";

export function Header() {
  const { problems, currentIndex, streak } = useSession();
  
  const total = problems.length;
  const current = currentIndex + 1;
  const progressPercent = Math.min(100, (current / total) * 100);

  return (
    <header className="w-full flex flex-col gap-4 pt-4 pb-1 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold text-slate-900 tracking-tight">
          Fractional Sense Bootcamp
        </div>
        
        <motion.div 
          key={streak}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full border shadow-sm transition-colors duration-300 ${
            streak > 0 
              ? 'bg-orange-50 border-orange-200/50 text-orange-600' 
              : 'bg-white border-slate-200/60 text-slate-400'
          }`}
        >
          <Flame className={`w-4 h-4 transition-all duration-300 ${streak > 0 ? 'fill-orange-500/20' : ''}`} />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Streak</span>
          <span className="font-semibold text-sm tabular-nums">{streak}</span>
        </motion.div>
      </div>
      
      <div className="w-full flex items-center gap-4">
        <div className="flex-1 h-2 bg-slate-200/50 rounded-full overflow-hidden relative backdrop-blur-sm">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-slate-900 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
        </div>
        <span className="text-xs font-semibold text-slate-400 tabular-nums tracking-wide">
          {Math.min(current, total)} / {total}
        </span>
      </div>
    </header>
  );
}
