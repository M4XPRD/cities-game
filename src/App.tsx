import EndgameCard from './components/EndgameCard/EndgameCard';
import GameCard from './components/GameCard/GameCard';
import DescriptionCard from './components/WelcomeCard/DescriptionCard';
import useNavigation from './hooks/navigationHook';
import './styles/index.css';
import { PagesMappingTypes } from './types/pagesMappingTypes';

const App = () => {
  const { page } = useNavigation();

  const pagesMapping: PagesMappingTypes = {
    1: <DescriptionCard />,
    2: <GameCard />,
    3: <EndgameCard />,
  };

  return (
    <main className="bg-gray-200 h-screen flex justify-center items-center font-sans">
      {pagesMapping[page]}
    </main>
  );
};

export default App;
