import {
  useCallback, useMemo, useState,
} from 'react';
import GameLogicContext from './GameLogicContext';
import { ProviderProps } from '../types/contextTypes';

const GameLogicProvider = ({ children }: ProviderProps) => {
  const [turn, setTurn] = useState('human');

  const handleNextTurn = useCallback(() => {
    setTurn((previousTurn) => (previousTurn === 'human' ? 'ai' : 'human'));
  }, []);

  const providedData = useMemo(
    () => ({
      turn,
      handleNextTurn,
    }),
    [
      turn,
      handleNextTurn,
    ],
  );

  return (
    <GameLogicContext.Provider value={providedData}>{children}</GameLogicContext.Provider>
  );
};

export default GameLogicProvider;
