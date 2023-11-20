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
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
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

      console.log(secondCondition);

      const filteredLastLetter = firstCondition || secondCondition.length === 0
        ? penultimateLetter
        : lastLetter;

      console.log(firstCondition, '||', secondCondition.length === 0);

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
        console.log(standardizedWord.startsWith(activeLetter));
        console.log(citiesList.includes(standardizedWord));
        console.log(!enteredCities.includes(standardizedWord));
        console.log('ошибка');
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

  const providedData = useMemo(
    () => ({
      currentPlayer,
      turns,
      activeLetter,
      errorMessage,
      handleNextTurn,
      enteredCities,
      handleTurnValidation,
    }),
    [currentPlayer,
      turns,
      activeLetter,
      errorMessage,
      handleNextTurn,
      enteredCities,
      handleTurnValidation,
    ],
  );

  useEffect(() => {
    const minDelay = 1000;
    const maxDelay = 3000;
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
