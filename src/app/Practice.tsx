import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useSession } from "./SessionContext";
import { Header } from "./components/Header";
import { ProblemCard } from "./components/ProblemCard";
import { Workpad } from "./components/Workpad";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft } from "lucide-react";

const INTRO_STEPS = 5;

/** Non-interactive fraction card matching the test style, for intro visuals */
function IntroFractionCard({
  num,
  den,
  delay = 0,
  highlight = false,
  largest = false,
}: {
  num: number;
  den: number;
  delay?: number;
  highlight?: boolean;
  largest?: boolean;
}) {
  const card = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 w-24 h-32 flex-shrink-0 ${
        highlight
          ? "bg-indigo-50 border-indigo-200 shadow-indigo-100"
          : largest
            ? "bg-white border-[#359afe]/50 shadow-md"
            : "bg-white border-slate-200 shadow-slate-100"
      }`}
    >
      {largest && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: "0 0 0 2px rgba(53, 154, 254, 0.5), 0 0 20px rgba(53, 154, 254, 0.2)",
          }}
          animate={{ opacity: [0.4, 0.95, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }}
        />
      )}
      <span className="text-3xl font-semibold text-slate-800 relative z-0">{num}</span>
      <div className="w-10 border-t-2 border-slate-300 my-2 rounded-full" />
      <span className="text-3xl font-semibold text-slate-800 relative z-0">{den}</span>
    </motion.div>
  );
  return card;
}

export function Practice() {
  const { problems, currentIndex, nextProblem } = useSession();
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  // Track whether problems have ever been populated so we don't redirect
  // on the single async tick between startSession() and state propagation.
  const hadProblemsRef = useRef(problems.length > 0);

  useEffect(() => {
    if (problems.length > 0) hadProblemsRef.current = true;
  }, [problems.length]);

  useEffect(() => {
    if (problems.length === 0) {
      // Only redirect if we previously had problems (session ended) or
      // we've confirmed this isn't just a propagation delay.
      if (hadProblemsRef.current) navigate('/');
      return;
    }
    if (currentIndex >= problems.length && !showIntro) {
      navigate('/summary');
    }
  }, [problems, currentIndex, navigate, showIntro]);

  if (problems.length === 0) return null;
  if (currentIndex >= problems.length && !showIntro) return null;

  const currentProblem = problems[currentIndex];

  const handleNext = () => {
    nextProblem();
  };

  return (
    <div className="h-screen min-h-0 bg-[#F0F2F5] flex flex-col items-center font-sans selection:bg-indigo-100 relative overflow-hidden">
      {/* Very subtle ambient mesh gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[600px] bg-gradient-to-b from-white to-transparent blur-[120px] rounded-full" />
      </div>

      <div className={`w-full max-w-[1200px] flex flex-col relative z-10 flex-1 min-h-0 overflow-hidden ${showIntro ? "px-6 py-10" : "px-6 py-4"}`}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-4xl mx-auto w-full ${!showIntro ? "flex-shrink-0" : ""}`}
        >
          {/* Only show header if we are past the intro screen */}
          {!showIntro && <Header />}
        </motion.div>
        
        <main className={`flex-1 min-h-0 flex flex-col items-center justify-center w-full overflow-hidden ${showIntro ? "py-6" : "py-2"}`}>
          <AnimatePresence mode="wait">
            {showIntro ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl flex-shrink-0"
              >
                <div className="bg-white rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-slate-200/60 p-10 flex flex-col gap-6 items-center text-center h-[820px]">

                  {/* Header — fixed height so card doesn't resize */}
                  <div className="w-full flex-shrink-0 h-[180px] pt-4 pb-6">
                    <h1 className="text-3xl font-semibold text-slate-900 tracking-tight mb-3">
                      Fractional Sense Bootcamp
                    </h1>
                    <p className="text-base text-slate-500 leading-relaxed text-left pt-3 pb-5">
                      This bootcamp uses simple pictures and explanations to build a strong understanding of how fractions work — no complicated rules or formulas. Once you see the pieces fit together, it suddenly makes sense.
                    </p>
                  </div>

                  {/* Single pill — fixed height so card never resizes */}
                  <div className="w-full h-[400px] flex-shrink-0 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {introStep === 0 && (
                        <motion.div
                          key="step0"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.25 }}
                          className="text-left bg-slate-50 border border-slate-100 rounded-[8px] px-5 py-4 h-full overflow-hidden flex flex-col"
                        >
                          <p className="text-base font-semibold text-slate-800 mb-2 flex-shrink-0">Back to the basics</p>
                          <p className="text-base text-slate-500 leading-relaxed mb-4">Every fraction has two parts: the <span className="font-semibold text-[#359afe]">numerator</span> <em>(top number)</em> and the <span className="font-semibold text-[#359afe]">denominator</span> <em>(bottom number)</em>. The <span className="font-semibold text-[#359afe]">denominator</span> is how many equal parts the whole is split into; the <span className="font-semibold text-[#359afe]">numerator</span> is how many of those parts you have.</p>
                          <div className="flex flex-col items-center gap-8 pt-4 pb-6">
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col justify-between h-36 text-right">
                                <span className="text-sm font-medium text-[#359afe] uppercase tracking-wider mt-[37px]">Numerator</span>
                                <span className="text-sm font-medium text-[#359afe] uppercase tracking-wider mb-[35px]">Denominator</span>
                              </div>
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="flex flex-col items-center justify-center rounded-2xl border-2 border-slate-200 bg-white shadow-md w-28 h-36 px-4"
                              >
                                <span className="text-4xl font-semibold text-slate-800">3</span>
                                <div className="w-12 border-t-2 border-slate-300 my-2 rounded-full" />
                                <span className="text-4xl font-semibold text-slate-800">4</span>
                              </motion.div>
                            </div>
                            <p className="text-base text-slate-500 text-center -mt-[5px]">Example: 3/4 means 3 parts out of 4 equal parts.</p>
                          </div>
                        </motion.div>
                      )}
                      {introStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.25 }}
                          className="text-left bg-slate-50 border border-slate-100 rounded-[8px] px-5 py-4 h-full overflow-hidden flex flex-col"
                        >
                          <p className="text-base font-semibold text-slate-800 mb-2 flex-shrink-0">Same denominator?</p>
                          <p className="text-base text-slate-500 leading-relaxed mb-6">To find the largest fraction, compare by looking only at the <span className="font-semibold text-[#359afe]">numerators</span> <em>(top numbers)</em>.</p>
                          <div className="pt-4 flex items-center justify-center gap-6 flex-wrap">
                            <IntroFractionCard num={2} den={5} delay={0.1} />
                            <span className="text-slate-400 font-medium text-sm">vs</span>
                            <IntroFractionCard num={3} den={5} delay={0.2} largest />
                          </div>
                          <p className="text-base text-slate-500 leading-relaxed mt-[17px] text-center">If the <span className="font-semibold text-[#359afe]">denominators</span> <em>(bottom numbers)</em> are the same → then compare the <span className="font-semibold text-[#359afe]">numerators</span> <em>(top numbers)</em>. The fraction with the largest <span className="font-semibold text-[#359afe]">numerator</span> is the largest fraction.</p>
                        </motion.div>
                      )}
                      {introStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.25 }}
                          className="text-left bg-slate-50 border border-slate-100 rounded-[8px] px-5 py-4 h-full overflow-hidden flex flex-col"
                        >
                          <p className="text-base font-semibold text-slate-800 mb-2 flex-shrink-0">Same numerator?</p>
                          <p className="text-base text-slate-500 leading-relaxed mb-6">The fraction with the smaller <span className="font-semibold text-[#359afe]">denominator</span> is the larger fraction.</p>
                          <div className="pt-4 flex items-center justify-center gap-6 flex-wrap">
                            <IntroFractionCard num={2} den={3} delay={0.1} largest />
                            <span className="text-slate-400 font-medium text-sm">&gt;</span>
                            <IntroFractionCard num={2} den={5} delay={0.2} />
                          </div>
                          <p className="text-base text-slate-500 leading-relaxed mt-[17px] text-center">If the <span className="font-semibold text-[#359afe]">numerators</span> are the same → then the smaller <span className="font-semibold text-[#359afe]">denominator</span> means a larger fraction.</p>
                        </motion.div>
                      )}
                      {introStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.25 }}
                          className="text-left bg-slate-50 border border-slate-100 rounded-[8px] px-5 py-4 h-full overflow-hidden flex flex-col"
                        >
                          <p className="text-base font-semibold text-slate-800 mb-2 flex-shrink-0">Draw on the scratchpad</p>
                          <p className="text-base text-slate-500 leading-relaxed flex-shrink-0">Draw bars, pies, number lines, shaded areas, or anything that makes the sizes feel real to you. Sketching helps turn &ldquo;I think…&rdquo; into &ldquo;I see it!&rdquo; Over time, you&apos;ll get so comfortable that you won&apos;t need to draw every single one.</p>
                          <div className="flex-shrink-0 w-full flex justify-center pt-2">
                            <Workpad problemId="intro" compact />
                          </div>
                        </motion.div>
                      )}
                      {introStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.25 }}
                          className="text-left bg-slate-50 border border-slate-100 rounded-[8px] px-5 py-4 h-full overflow-hidden flex flex-col"
                        >
                          <p className="text-base font-semibold text-slate-800 mb-1 flex-shrink-0">Mistakes are part of learning</p>
                          <p className="text-base text-slate-500 leading-relaxed">When your answer isn't quite right, the visuals instantly highlight where things may have gotten off track. It's super clear and helpful info so you can fix it fast and nail the pattern next time. Every try, even the mistakes, makes your fraction skills stronger!</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Step progress — below card, above button — fixed height */}
                  <div className="flex flex-col items-center gap-1.5 w-full flex-shrink-0">
                    <div className="flex items-center justify-center gap-2">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            i === introStep ? "w-6 bg-slate-900" : i < introStep ? "w-2 bg-slate-400" : "w-2 bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-500">Step {introStep + 1} of {INTRO_STEPS}</p>
                  </div>

                  {/* CTA: Back + Next (Next slides right when Back appears), or Begin on last step — fixed height */}
                  <motion.div layout transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }} className="flex items-center justify-center gap-2 h-10 flex-shrink-0 min-w-0">
                    <AnimatePresence initial={false}>
                      {introStep > 0 && (
                        <motion.div
                          key="back"
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 90, opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                          className="flex overflow-hidden flex-shrink-0 origin-left"
                        >
                          <motion.button
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -24 }}
                            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIntroStep((s) => s - 1)}
                            className="flex items-center justify-center gap-1.5 rounded-full border-2 border-slate-200 bg-white text-slate-700 text-sm font-medium px-4 py-2 hover:bg-slate-50 hover:border-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 whitespace-nowrap"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {introStep < INTRO_STEPS - 1 ? (
                      <motion.button
                        layout
                        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIntroStep((s) => s + 1)}
                        className="flex items-center justify-center gap-1.5 rounded-full bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 shadow-sm"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    ) : (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowIntro(false)}
                        className="flex items-center justify-center gap-1.5 rounded-full bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 shadow-sm"
                      >
                        Begin
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentProblem.id}
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <ProblemCard problem={currentProblem} onNext={handleNext} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
