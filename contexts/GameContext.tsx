import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Question {
  id: number;
  operand1: number;
  operand2: number;
  operator: '+' | '-' | '*' | '/';
  correctAnswer: number;
  visualItems: number;
}

interface GameState {
  currentLevel: number;
  score: number;
  timeLeft: number;
  totalTime: number;
  currentQuestion: Question | null;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  lives: number;
}

interface GameContextType extends GameState {
  generateNewQuestion: () => void;
  checkAnswer: (answer: number) => boolean;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  exitGame: () => void;
  nextLevel: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    timeLeft: 30,
    totalTime: 30,
    currentQuestion: null,
    isPlaying: false,
    isPaused: false,
    isGameOver: false,
    lives: 3,
  });

  // Süre sayacı
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.isGameOver)
      return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 1) {
          return { ...prev, timeLeft: 0, isGameOver: true };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isPlaying, gameState.isPaused, gameState.isGameOver]);

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateNewQuestion = () => {
    const operations: ('+' | '-' | '*' | '/')[] = ['+', '-', '*', '/'];
    const level = gameState.currentLevel;

    // Seviyeye göre zorluk ayarı
    let maxNumber = Math.min(10 + level * 2, 20);
    let minNumber = 1;

    if (level > 5) {
      operations.splice(0, 1); // İleri seviyelerde toplama işlemini kaldır
    }

    const operator = operations[Math.floor(Math.random() * operations.length)];
    let operand1, operand2, correctAnswer;

    switch (operator) {
      case '+':
        operand1 = generateRandomNumber(minNumber, maxNumber);
        operand2 = generateRandomNumber(minNumber, maxNumber);
        correctAnswer = operand1 + operand2;
        break;
      case '-':
        operand1 = generateRandomNumber(minNumber + 5, maxNumber);
        operand2 = generateRandomNumber(minNumber, operand1);
        correctAnswer = operand1 - operand2;
        break;
      case '*':
        operand1 = generateRandomNumber(1, Math.min(level + 1, 5));
        operand2 = generateRandomNumber(1, Math.min(level + 1, 5));
        correctAnswer = operand1 * operand2;
        break;
      case '/':
        operand2 = generateRandomNumber(1, Math.min(level + 1, 5));
        correctAnswer = generateRandomNumber(1, 10);
        operand1 = operand2 * correctAnswer;
        break;
    }

    const question: Question = {
      id: Date.now(),
      operand1,
      operand2,
      operator,
      correctAnswer,
      visualItems: operator === '+' ? operand1 + operand2 : operand1,
    };

    setGameState((prev) => ({ ...prev, currentQuestion: question }));
  };

  const checkAnswer = (answer: number): boolean => {
    if (!gameState.currentQuestion) return false;

    const isCorrect = answer === gameState.currentQuestion.correctAnswer;

    setGameState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 10 : prev.score,
      lives: isCorrect ? prev.lives : Math.max(0, prev.lives - 1),
      isGameOver: !isCorrect && prev.lives <= 1,
    }));

    if (isCorrect) {
      setTimeout(() => {
        if (gameState.score + 10 >= gameState.currentLevel * 50) {
          nextLevel();
        } else {
          generateNewQuestion();
        }
      }, 1000);
    }

    return isCorrect;
  };

  const pauseGame = () => {
    setGameState((prev) => ({ ...prev, isPaused: true }));
  };

  const resumeGame = () => {
    setGameState((prev) => ({ ...prev, isPaused: false }));
  };

  const restartGame = () => {
    setGameState({
      currentLevel: 1,
      score: 0,
      timeLeft: 30,
      totalTime: 30,
      currentQuestion: null,
      isPlaying: true,
      isPaused: false,
      isGameOver: false,
      lives: 3,
    });
    generateNewQuestion();
  };

  const exitGame = () => {
    setGameState((prev) => ({ ...prev, isPlaying: false, isPaused: false }));
  };

  const nextLevel = () => {
    setGameState((prev) => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
      timeLeft: Math.max(20, 35 - prev.currentLevel * 2),
      totalTime: Math.max(20, 35 - prev.currentLevel * 2),
    }));
    generateNewQuestion();
  };

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        generateNewQuestion,
        checkAnswer,
        pauseGame,
        resumeGame,
        restartGame,
        exitGame,
        nextLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
