export type ProblemType = 'same-denominator' | 'same-numerator' | 'unlike-denominators';

export interface Fraction {
  num: number;
  den: number;
}

export interface Problem {
  id: string;
  left: Fraction;
  right: Fraction;
  type: ProblemType;
  isFollowUp?: boolean;
}

export const EXPLANATIONS: Record<ProblemType, string> = {
  'same-denominator': 'Imagine two identical cakes, both cut into the exact same number of slices (that\'s your denominator). Because they are cut the exact same way, every single slice is the identical size. Now, just look at the top number (the numerator) to see how many slices you get. The fraction with the larger top number simply gives you MORE of those equal-sized slices. More slices equals a larger total fraction!',
  'same-numerator': 'When the top numbers (numerators) are the same, you are getting the exact same amount of pieces. But look closely at the bottom numbers — a smaller denominator means the whole was cut into fewer, but much LARGER pieces. Having the same amount of much larger pieces naturally makes a bigger fraction.',
  'unlike-denominators': 'When both the top and bottom numbers are different, it helps to compare how much of the whole each fraction takes up. Visualizing them side-by-side shows exactly which fraction covers more total space.'
};

export const STRATEGY_HINTS: Record<ProblemType, string> = {
  'same-denominator': 'Same denominator',
  'same-numerator': 'Same numerator',
  'unlike-denominators': 'Different parts'
};

export function getInitialProblems(): Problem[] {
  return [
    { id: 'p1', left: { num: 3, den: 5 }, right: { num: 4, den: 5 }, type: 'same-denominator' },
    { id: 'p2', left: { num: 2, den: 3 }, right: { num: 2, den: 7 }, type: 'same-numerator' },
    { id: 'p3', left: { num: 1, den: 4 }, right: { num: 3, den: 8 }, type: 'unlike-denominators' },
    { id: 'p4', left: { num: 5, den: 6 }, right: { num: 1, den: 6 }, type: 'same-denominator' },
    { id: 'p5', left: { num: 4, den: 9 }, right: { num: 4, den: 5 }, type: 'same-numerator' },
    { id: 'p6', left: { num: 1, den: 2 }, right: { num: 2, den: 5 }, type: 'unlike-denominators' },
    { id: 'p7', left: { num: 7, den: 10 }, right: { num: 3, den: 10 }, type: 'same-denominator' },
    { id: 'p8', left: { num: 3, den: 4 }, right: { num: 3, den: 8 }, type: 'same-numerator' },
    { id: 'p9', left: { num: 2, den: 5 }, right: { num: 3, den: 5 }, type: 'same-denominator' },
    { id: 'p10', left: { num: 5, den: 8 }, right: { num: 5, den: 12 }, type: 'same-numerator' },
    { id: 'p11', left: { num: 2, den: 3 }, right: { num: 3, den: 5 }, type: 'unlike-denominators' },
    { id: 'p12', left: { num: 4, den: 7 }, right: { num: 5, den: 7 }, type: 'same-denominator' },
    { id: 'p13', left: { num: 3, den: 5 }, right: { num: 3, den: 7 }, type: 'same-numerator' },
    { id: 'p14', left: { num: 1, den: 3 }, right: { num: 2, den: 5 }, type: 'unlike-denominators' },
    { id: 'p15', left: { num: 6, den: 11 }, right: { num: 5, den: 11 }, type: 'same-denominator' },
  ];
}

let followUpIdCounter = 0;
export function generateFollowUp(type: ProblemType): Problem {
  followUpIdCounter++;
  const id = `f_${followUpIdCounter}`;
  
  if (type === 'same-denominator') {
    const den = [5, 7, 8, 9, 10][Math.floor(Math.random() * 5)];
    const num1 = Math.floor(Math.random() * (den - 2)) + 1;
    const num2 = num1 + 1;
    return { id, left: { num: num2, den }, right: { num: num1, den }, type, isFollowUp: true };
  } else if (type === 'same-numerator') {
    const num = [1, 2, 3, 4][Math.floor(Math.random() * 4)];
    const den1 = num + 1 + Math.floor(Math.random() * 3);
    const den2 = den1 + 2 + Math.floor(Math.random() * 3);
    return { id, left: { num, den: den1 }, right: { num, den: den2 }, type, isFollowUp: true };
  } else {
    // Keep it simple for unlike denominators, draw from a fixed pool
    const pool = [
      { left: { num: 2, den: 3 }, right: { num: 3, den: 5 } },
      { left: { num: 3, den: 4 }, right: { num: 5, den: 8 } },
      { left: { num: 1, den: 3 }, right: { num: 2, den: 5 } },
      { left: { num: 4, den: 5 }, right: { num: 3, den: 4 } }
    ];
    const picked = pool[Math.floor(Math.random() * pool.length)];
    return { id, left: picked.left, right: picked.right, type, isFollowUp: true };
  }
}
