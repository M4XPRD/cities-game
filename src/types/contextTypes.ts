import { ReactNode } from 'react';

export type ProviderProps = {
  children: ReactNode,
};

export type NavigatorContext = {
  page: number,
  handleNextPage: () => void,
  handleResetApp: () => void,
};

export type GameLogicContextTypes = {
  currentPlayer: string,
  turns: number,
  handleNextTurn: () => void,
};
