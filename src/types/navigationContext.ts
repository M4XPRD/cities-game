import { ReactNode } from 'react';

export type NavigatorProviderProps = {
  children: ReactNode,
};

export type NavigatorContext = {
  page: number,
  handleNextPage: () => void,
  handleResetApp: () => void,
};
