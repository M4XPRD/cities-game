import useGameLogic from '../../hooks/gameLogicHook';

const EndgameCardStats = () => {
  const { enteredCities } = useGameLogic();
  const lastEnteredCity = enteredCities[enteredCities.length - 1];

  return (
    <>
      <div className="flex flex-col justify-center items-center text-gray-700">
        <span>{`Всего было перечислено городов: ${enteredCities.length}`}</span>
        <span>
          {enteredCities.length < 5
            ? 'Неплохо, но нужно разыграться! '
            : 'Хороший результат!'}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl">Последний город, названный победителем:</p>
        <p className="text-2xl font-semibold">
          {lastEnteredCity || 'Не назван :('}
        </p>
      </div>
    </>
  );
};

export default EndgameCardStats;
