import { writable, derived, get } from 'svelte/store';
import { settings } from './settingsStore.js';

// ── Configuration ──
const DIGITS_PER_CHUNK = 50;

function getTotalSeconds() {
  const s = get(settings);
  // duration is in minutes
  return Math.floor(s.duration * 60);
}

// ── Helper: generate random digit 0-9 ──
function randomDigit() {
  return Math.floor(Math.random() * 10);
}

// ── Helper: generate a chunk of pairs ──
function generateDigitsChunk() {
  const isOrdered = get(settings).questionType === 'Berurut';
  return Array.from({ length: DIGITS_PER_CHUNK }, (_, i) => {
    if (isOrdered) {
      return {
        top: i % 10,
        bottom: (i + 1) % 10
      };
    } else {
      return {
        top: randomDigit(),
        bottom: randomDigit()
      };
    }
  });
}

// ── Core Game State ──
export const screen = writable('START'); // 'START' | 'COUNTDOWN' | 'PLAYING' | 'RESULT' | 'SETTINGS' | 'HISTORY'
export const playerName = writable('');

// Current game data
// Current game data
export const currentRowIndex = writable<number>(0);
export const gameDigits = writable<{top: number, bottom: number}[]>([]);

// Timer
export const timeLeft = writable(0);

// Global live score
// Global live score
export const currentCorrect = writable<number>(0);
export const currentWrong = writable<number>(0);

// Last answer feedback: null | 'correct' | 'wrong'
export const lastFeedback = writable<'correct' | 'wrong' | null>(null);

// Countdown value
export const countdownValue = writable(3);

// ── Derived: current two numbers to display ──
export const currentPair = derived(
  [gameDigits, currentRowIndex],
  ([$digits, $row]) => {
    if (!$digits || $row >= $digits.length) return null;
    return $digits[$row];
  }
);

// ── Derived: total scores ──
export const totalScore = derived(
  [currentCorrect, currentWrong],
  ([$cc, $cw]) => {
    return {
      correct: $cc,
      wrong: $cw,
    };
  }
);

// ── Derived: timer progress ──
export const timeProgress = derived(
  timeLeft,
  ($time) => $time / getTotalSeconds()
);

// ── Timer Logic ──
// ── Timer Logic ──
let timerInterval: ReturnType<typeof setInterval> | null = null;

function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function startTimer() {
  clearTimer();
  timeLeft.set(getTotalSeconds());
  timerInterval = setInterval(() => {
    timeLeft.update(t => {
      if (t <= 1) {
        endGame();
        return 0;
      }
      return t - 1;
    });
  }, 1000);
}

// ── Answer Evaluation ──
// ── Answer Evaluation ──
export function submitAnswer(digit: number) {
  const pair = get(currentPair);
  if (!pair) return;
  
  let correctAnswer;
  if (get(settings).operation === 'Pengurangan') {
    correctAnswer = (pair.top - pair.bottom + 10) % 10;
  } else {
    correctAnswer = (pair.top + pair.bottom) % 10;
  }
  
  const isCorrect = digit === correctAnswer;
  
  if (isCorrect) {
    currentCorrect.update(n => n + 1);
    lastFeedback.set('correct');
  } else {
    currentWrong.update(n => n + 1);
    lastFeedback.set('wrong');
  }
  
  // Clear feedback after a short delay
  setTimeout(() => lastFeedback.set(null), 250);
  
  // Move to next row
  currentRowIndex.update(r => r + 1);
  
  // If we're nearing the end of digits, generate more!
  const row = get(currentRowIndex);
  const digits = get(gameDigits);
  if (row >= digits.length - 5) {
    gameDigits.update(d => [...d, ...generateDigitsChunk()]);
  }
}

// ── Game Controls ──
export function startCountdown() {
  screen.set('COUNTDOWN');
  countdownValue.set(3);
  
  const cdInterval = setInterval(() => {
    countdownValue.update(v => {
      if (v <= 1) {
        clearInterval(cdInterval);
        startGame();
        return 0;
      }
      return v - 1;
    });
  }, 1000);
}

function startGame() {
  currentRowIndex.set(0);
  currentCorrect.set(0);
  currentWrong.set(0);
  gameDigits.set(generateDigitsChunk());
  lastFeedback.set(null);
  screen.set('PLAYING');
  startTimer();
}

function endGame() {
  clearTimer();
  screen.set('RESULT');
  
  // Save to localStorage
  try {
    const name = get(playerName) || 'Anonim';
    const record = {
      name,
      date: new Date().toISOString(),
      columns: [{ correct: get(currentCorrect), wrong: get(currentWrong), total: get(currentCorrect) + get(currentWrong) }], // Maintain array format for compatibility with ResultScreen
      totalCorrect: get(currentCorrect),
      totalWrong: get(currentWrong),
      duration: get(settings).duration,
      operation: get(settings).operation,
      questionType: get(settings).questionType,
    };
    
    const history: any[] = JSON.parse(localStorage.getItem('kraepelin_history') || '[]');
    history.push(record);
    localStorage.setItem('kraepelin_history', JSON.stringify(history));
  } catch (e) {
    // Silently fail if localStorage is unavailable
  }
}

export function resetGame() {
  clearTimer();
  currentRowIndex.set(0);
  currentCorrect.set(0);
  currentWrong.set(0);
  gameDigits.set(generateDigitsChunk());
  lastFeedback.set(null);
  timeLeft.set(getTotalSeconds());
  screen.set('START');
}

// ── Constants export for components ──
export const CONFIG = {
  get TOTAL_SECONDS() { return getTotalSeconds(); }
};
