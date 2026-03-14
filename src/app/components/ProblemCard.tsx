import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Problem, Fraction, EXPLANATIONS, STRATEGY_HINTS } from "../data/problems";
import { useSession } from "../SessionContext";
import { BarModel } from "./BarModel";
import { Workpad } from "./Workpad";

interface ProblemCardProps {
  problem: Problem;
  onNext: () => void;
}

type SelectionState = 'idle' | 'left' | 'right';
type AnswerStatus = 'idle' | 'correct' | 'incorrect';

export function ProblemCard({ problem, onNext }: ProblemCardProps) {
  const { recordAnswer } = useSession();
  const [selection, setSelection] = useState<SelectionState>('idle');
  const [status, setStatus] = useState<AnswerStatus>('idle');

  const largerSide = (problem.left.num / problem.left.den) > (problem.right.num / problem.right.den) ? 'left' : 'right';

  const handleSelect = (side: 'left' | 'right') => {
    if (status !== 'idle') return;
    
    setSelection(side);
    const isCorrect = side === largerSide;
    setStatus(isCorrect ? 'correct' : 'incorrect');
    recordAnswer(isCorrect);
  };

  const isCorrect = status === 'correct';
  const isWrong = status === 'incorrect';
  const isAnswered = status !== 'idle';

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col min-h-[58vh] max-h-[85vh]">
      {/* Single card: problem left, scratchpad or feedback right (same column) */}
      <div className="bg-white rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-200/60 p-6 flex flex-col lg:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        {/* Left: prompt + fractions + Outstanding / Let's look */}
        <div className="flex flex-col flex-1 min-w-0 relative pt-[125px]">
          {problem.isFollowUp && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-3 -mt-[100px]"
            >
              <div className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-indigo-100">
                Focus Strategy: {STRATEGY_HINTS[problem.type]}
              </div>
            </motion.div>
          )}
          <h2 className={`text-xl font-semibold text-slate-800 mb-6 tracking-tight text-center ${problem.isFollowUp ? "mt-[100px]" : ""}`}>
            Which fraction is greater?
          </h2>
          <div className="flex items-center justify-center gap-6 w-full max-w-md mx-auto perspective-[1200px]">
            <FractionButton
              fraction={problem.left}
              isSelected={selection === "left"}
              status={selection === "left" ? status : "idle"}
              disabled={status !== "idle"}
              onClick={() => handleSelect("left")}
              correctSide={largerSide === "left" && status !== "idle"}
            />
            <span className="text-slate-300 font-medium text-lg">or</span>
            <FractionButton
              fraction={problem.right}
              isSelected={selection === "right"}
              status={selection === "right" ? status : "idle"}
              disabled={status !== "idle"}
              onClick={() => handleSelect("right")}
              correctSide={largerSide === "right" && status !== "idle"}
            />
          </div>
          <div className="mt-[52px] min-h-10 flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              {isCorrect && (
                <motion.div
                  key="correct-msg"
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="text-emerald-700 font-semibold bg-white px-6 py-3 rounded-[8px] shadow-[0_8px_30px_rgba(16,185,129,0.15)] border border-emerald-100"
                >
                  Outstanding! That&apos;s exactly right.
                </motion.div>
              )}
              {isWrong && (
                <motion.div
                  key="wrong-msg"
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-slate-600 font-semibold bg-white px-6 py-3 rounded-[8px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-200 text-lg"
                >
                  Let&apos;s look at this together.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: scratchpad before answer, then feedback (explanation + bar models + Next/Apply) in same column */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 border-t lg:border-t-0 lg:border-l border-slate-200/50 pt-6 lg:pt-0 lg:pl-6">
          <AnimatePresence mode="wait">
            {!isAnswered ? (
              <motion.div
                key="workpad"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col flex-1 min-h-0 rounded-[8px] overflow-hidden"
              >
                <p className="text-xs text-slate-500 mb-2">Scratchpad</p>
                <Workpad problemId={problem.id} />
              </motion.div>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col flex-1 min-h-0 rounded-[8px] p-4 overflow-y-auto ${
                  isCorrect ? "bg-emerald-50/60 border border-emerald-100" : "bg-slate-50/80 border border-slate-100"
                }`}
              >
                <p className={`text-sm font-bold mb-3 ${isCorrect ? "text-emerald-800" : "text-slate-700"}`}>
                  {isCorrect ? "Here's why you're right:" : "Explanation"}
                </p>
                <p className={`text-sm leading-relaxed mb-4 ${isCorrect ? "text-emerald-800/90" : "text-slate-600"}`}>
                  {EXPLANATIONS[problem.type]}
                </p>
                <div className={`rounded-[8px] p-4 border flex flex-col gap-3 mb-2 origin-center scale-90 ${
                  isCorrect ? "bg-white border-emerald-100" : "bg-white border-slate-200"
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-800 tabular-nums w-10">{problem.left.num}/{problem.left.den}</span>
                    <BarModel fraction={problem.left} colorTheme={isCorrect ? "success" : "default"} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-800 tabular-nums w-10">{problem.right.num}/{problem.right.den}</span>
                    <BarModel fraction={problem.right} colorTheme={isCorrect ? "success" : "default"} />
                  </div>
                </div>
                <div className="flex justify-center mt-auto mb-[5px]">
                  {isCorrect ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onNext}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 text-white text-sm font-medium px-4 py-2 hover:bg-emerald-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/30 shadow-sm"
                    >
                      Next
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onNext}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-indigo-600 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/30 shadow-sm"
                    >
                      Apply Strategy
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

interface FractionButtonProps {
  fraction: Fraction;
  isSelected: boolean;
  status: AnswerStatus;
  disabled: boolean;
  correctSide: boolean;
  onClick: () => void;
}

function FractionButton({ fraction, isSelected, status, disabled, correctSide, onClick }: FractionButtonProps) {
  // 3D tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle tilt (max 4 degrees) for a classy hover
    const rx = ((y - centerY) / centerY) * -4; 
    const ry = ((x - centerX) / centerX) * 4;
    
    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  let containerClasses = "relative w-28 h-36 flex flex-col items-center justify-center rounded-[8px] border-2 outline-none transform-gpu ";
  let textClasses = "text-4xl font-semibold tracking-tight transition-colors duration-300 ";
  let lineClasses = "w-12 border-t-2 my-2 rounded-full transition-colors duration-300 ";

  if (!disabled) {
    // High contrast styling for untouched state
    containerClasses += "bg-white border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.06)] cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-slate-300/90 transition-shadow transition-colors duration-200 ";
    textClasses += "text-slate-800 ";
    lineClasses += "border-slate-300 ";
  } else {
    if (isSelected && status === 'correct') {
      containerClasses += "bg-emerald-500 border-emerald-400 shadow-[0_16px_40px_rgba(16,185,129,0.3)] ";
      textClasses += "text-white ";
      lineClasses += "border-emerald-200/50 ";
    } else if (isSelected && status === 'incorrect') {
      containerClasses += "bg-slate-100 border-slate-200 opacity-80 ";
      textClasses += "text-slate-500 ";
      lineClasses += "border-slate-300 ";
    } else if (!isSelected && correctSide && status === 'incorrect') {
      containerClasses += "bg-white border-indigo-200 ring-4 ring-indigo-50 shadow-[0_16px_40px_rgba(99,102,241,0.15)] ";
      textClasses += "text-slate-800 ";
      lineClasses += "border-indigo-200 ";
    } else {
      containerClasses += "bg-white/50 border-white opacity-40 ";
      textClasses += "text-slate-400 ";
      lineClasses += "border-slate-200 ";
    }
    containerClasses += "cursor-default ";
  }

  // Dynamic animation properties
  const scaleTarget = disabled ? (isSelected && status === 'correct' ? 1.05 : 0.95) : 1;

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: scaleTarget,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      disabled={disabled}
      onClick={onClick}
      className={containerClasses}
      style={{ transformStyle: 'preserve-3d' }}
      aria-label={`${fraction.num} over ${fraction.den}`}
    >
      <motion.span 
        className={textClasses}
        style={{ transform: 'translateZ(30px)' }}
      >
        {fraction.num}
      </motion.span>
      <motion.div 
        className={lineClasses}
        style={{ transform: 'translateZ(20px)' }}
      />
      <motion.span 
        className={textClasses}
        style={{ transform: 'translateZ(30px)' }}
      >
        {fraction.den}
      </motion.span>
    </motion.button>
  );
}
