import { Fraction } from "../data/problems";
import { motion } from "motion/react";

interface BarModelProps {
  fraction: Fraction;
  colorTheme?: 'default' | 'success';
}

export function BarModel({ fraction, colorTheme = 'default' }: BarModelProps) {
  const { num, den } = fraction;
  
  const fillColor = colorTheme === 'success' ? 'bg-emerald-500' : 'bg-indigo-500';
  
  return (
    <div className="flex-1 h-10 w-full flex gap-1.5 p-1 bg-white rounded-[8px] shadow-inner border border-slate-100">
      {Array.from({ length: den }).map((_, i) => (
        <div 
          key={i} 
          className="flex-1 rounded-[4px] bg-slate-100 overflow-hidden relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]"
        >
          {i < num && (
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 1.2, 
                delay: i * 0.15, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={`absolute top-0 bottom-0 left-0 ${fillColor} rounded-[4px]`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
