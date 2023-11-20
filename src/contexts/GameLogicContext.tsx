import { createContext } from 'react';
import { GameLogicContextTypes } from '../types/contextTypes';

const defaultValues = {
  currentPlayer: 'human',
  turns: 0,
  enteredCities: [],
  activeLetter: '',
  errorMessage: false,
  handleNextTurn: () => {},
  handleTurnValidation: () => {},
};

const GameLogicContext = createContext<GameLogicContextTypes>(defaultValues);

export default GameLogicContext;
