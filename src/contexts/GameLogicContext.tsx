import { createContext } from 'react';
import { GameLogicContextTypes } from '../types/contextTypes';

const defaultValues = {
  currentPlayer: 'human',
  turns: 0,
  handleNextTurn: () => {},
};

const GameLogicContext = createContext<GameLogicContextTypes>(defaultValues);

export default GameLogicContext;
