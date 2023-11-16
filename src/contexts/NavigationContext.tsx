import { createContext } from 'react';
import { NavigatorContext } from '../types/navigationContext';

const defaultValues = {
  page: 1,
  handleNextPage: () => {},
  handleResetApp: () => {},
};

const NavigationContext = createContext<NavigatorContext>(defaultValues);

export default NavigationContext;
