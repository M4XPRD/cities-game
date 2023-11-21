/* eslint-disable max-len */
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import GameLogicContext from './GameLogicContext';
import { ProviderProps } from '../types/contextTypes';
import { restrictedLetters, citiesList, updateCitiesList } from '../utils/citiesList';
import standardizeWord from '../utils/standardizeWord';

const GameLogicProvider = ({ children }: ProviderProps) => {
  const [currentPlayer, setCurrentPlayer] = useState<string>('human');
  const [activeLetter, setActiveLetter] = useState< string>('');
  const [enteredCities, setEnteredCities] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [turns, setTurns] = useState<number>(0);

  const handleNextTurn = useCallback(() => {
    setTurns((previousAmount) => previousAmount + 1);
    setCurrentPlayer((previousPlayer) => (previousPlayer === 'human' ? 'ai' : 'human'));
  }, []);

  const setupNewActiveLetter = useCallback((newCity: string) => {
    if (newCity) {
      const lastLetter = newCity[newCity.length - 1].toUpperCase();
      const penultimateLetter = newCity[newCity.length - 2].toUpperCase();
      const firstCondition = restrictedLetters.includes(lastLetter);
      const secondCondition = citiesList.filter((city) => city.startsWith(lastLetter));

      const filteredLastLetter = firstCondition || secondCondition.length === 0
        ? penultimateLetter
        : lastLetter;

      setActiveLetter(filteredLastLetter);
    }
  }, []);

  const handleTurnValidation = (newCity?: string) => {
    if (newCity) {
      const standardizedWord = standardizeWord(newCity);

      if (standardizedWord.startsWith(activeLetter) && citiesList.includes(standardizedWord) && !enteredCities.includes(standardizedWord)) {
        setupNewActiveLetter(standardizedWord);
        setEnteredCities([...enteredCities, standardizedWord]);
        updateCitiesList(standardizedWord);
        handleNextTurn();
      } else {
        console.log('Ошибка');
      }
    }
  };

  const handleAiTurn = () => {
    const pickRandomCity = () => {
      const filteredCities = citiesList.filter((city) => city.startsWith(activeLetter));

      const randomIndex = Math.floor(Math.random() * filteredCities.length);

      return filteredCities[randomIndex];
    };
    const pickedCity = pickRandomCity();
    handleTurnValidation(pickedCity);
    setupNewActiveLetter(pickedCity);
  };

  useEffect(() => {
    const updateTimer = () => {
      if (gameOver) {
        return;
      }
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          setGameOver(true);
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    };

    const timerInterval = setInterval(updateTimer, 1000);

    setTimeLeft(120);
    setGameOver(false);

    return () => clearInterval(timerInterval);
  }, [currentPlayer]);

  const providedData = useMemo(
    () => ({
      currentPlayer,
      turns,
      timeLeft,
      activeLetter,
      gameOver,
      handleNextTurn,
      enteredCities,
      handleTurnValidation,
    }),
    [currentPlayer,
      turns,
      activeLetter,
      handleNextTurn,
      enteredCities,
      handleTurnValidation,
    ],
  );

  useEffect(() => {
    const minDelay = 3000;
    const maxDelay = 10000;
    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;

    if (currentPlayer === 'ai') {
      setTimeout(() => {
        handleAiTurn();
      }, randomDelay);
    }
  }, [currentPlayer]);

  return (
    <GameLogicContext.Provider value={providedData}>
      {children}
    </GameLogicContext.Provider>
  );
};

export default GameLogicProvider;
