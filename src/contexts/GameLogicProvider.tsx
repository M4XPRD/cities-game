import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import GameLogicContext from './GameLogicContext';
import { ProviderProps } from '../types/contextTypes';
import { citiesList, updateCitiesList } from '../utils/citiesList';

const GameLogicProvider = ({ children }: ProviderProps) => {
  const [currentPlayer, setCurrentPlayer] = useState<string>('human');
  const [lastEnteredCity, setLastEnteredCity] = useState< string | null>(null);
  const [turns, setTurns] = useState<number>(0);

  const handleNextTurn = useCallback(() => {
    setTurns((previousAmount) => previousAmount + 1);
    setCurrentPlayer((previousPlayer) => (previousPlayer === 'human' ? 'ai' : 'human'));
  }, []);

  const handleAiTurn = useCallback(() => {
    const pickRandomCity = () => {
      const randomIndex = Math.floor(Math.random() * citiesList.length);
      const selectedCity = citiesList[randomIndex];
      setLastEnteredCity(selectedCity);
      updateCitiesList(selectedCity);
      handleNextTurn();
    };
    pickRandomCity();
  }, []);

  const providedData = useMemo(
    () => ({
      currentPlayer,
      turns,
      handleNextTurn,
    }),
    [
      currentPlayer,
      turns,
      handleNextTurn,
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
    <GameLogicContext.Provider value={providedData}>{children}</GameLogicContext.Provider>
  );
};

export default GameLogicProvider;
