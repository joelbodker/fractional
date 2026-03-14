import { createContext, useContext, useState, ReactNode } from 'react';
import { Problem, getInitialProblems, generateFollowUp } from './data/problems';

interface SessionState {
  problems: Problem[];
  currentIndex: number;
  streak: number;
  correctAnswers: number;
  totalAnswered: number;
  startSession: () => void;
  recordAnswer: (correct: boolean) => void;
  nextProblem: () => void;
}

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const startSession = () => {
    setProblems(getInitialProblems());
    setCurrentIndex(0);
    setStreak(0);
    setCorrectAnswers(0);
    setTotalAnswered(0);
  };

  const recordAnswer = (correct: boolean) => {
    setTotalAnswered(prev => prev + 1);
    if (correct) {
      setStreak(prev => prev + 1);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setStreak(0);
      const currentProblem = problems[currentIndex];
      const followUp = generateFollowUp(currentProblem.type);
      setProblems(prev => {
        const newProblems = [...prev];
        // Insert directly after the current missed problem
        newProblems.splice(currentIndex + 1, 0, followUp);
        return newProblems;
      });
    }
  };

  const nextProblem = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <SessionContext.Provider value={{
      problems, currentIndex, streak, correctAnswers, totalAnswered,
      startSession, recordAnswer, nextProblem
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within SessionProvider");
  return context;
}
