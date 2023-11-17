import {
  useCallback, useMemo, useState,
} from 'react';
import NavigationContext from './NavigationContext';
import { ProviderProps } from '../types/contextTypes';

const NavigationProvider = ({ children }: ProviderProps) => {
  const [page, setPage] = useState(1);

  const handleNextPage = useCallback(() => {
    setPage((previousPage) => previousPage + 1);
  }, []);

  const handleResetApp = useCallback(() => {
    setPage(1);
  }, []);

  const providedData = useMemo(
    () => ({
      page,
      handleNextPage,
      handleResetApp,
    }),
    [
      page,
      handleNextPage,
      handleResetApp,
    ],
  );

  return (
    <NavigationContext.Provider value={providedData}>{children}</NavigationContext.Provider>
  );
};

export default NavigationProvider;
