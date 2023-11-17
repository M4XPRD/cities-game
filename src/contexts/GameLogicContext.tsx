import { createContext } from 'react';
import { GameLogicContextTypes } from '../types/contextTypes';

const defaultValues = {
  turn: 'human',
  handleNextTurn: () => {},
};

const GameLogicContext = createContext<GameLogicContextTypes>(defaultValues);

export default GameLogicContext;
