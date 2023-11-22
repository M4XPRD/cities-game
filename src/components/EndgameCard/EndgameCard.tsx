import useGameLogic from '../../hooks/gameLogicHook';
import useNavigation from '../../hooks/navigationHook';

const EndgameCard = () => {
  const { currentPlayer, enteredCities, gameOver } = useGameLogic();
  const { reason } = gameOver;
  const { handleNextPage } = useNavigation();

  const lastEnteredCity = enteredCities[enteredCities.length - 1];

  return (
    <div className="flex flex-col gap-[32px] justify-center items-center w-[576px] h-[485px] text-black text-xl rounded-t-[16px] bg-white rounded-b-[16px] shadow-md">
      {currentPlayer === 'human' ? (
        <>
          <div className="flex flex-col justify-center items-center">
            <p>Твой противник победил!</p>
            <p>{reason === 'no-time-left' ? 'К сожалению, твое время вышло!' : 'Список городов закончился'}</p>
          </div>
          <div className="text-center">
            <p className="text-red-600 text-3xl font-semibold">00:00</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <p>Поздравляем тебя с победой!</p>
            <p>{reason === 'no-time-left' ? 'Твой противник не вспомнил нужный город!' : 'Список городов закончился'}</p>
          </div>
          <div className="text-center">
            <p className="text-green-600 text-3xl font-semibold">00:00</p>
          </div>
        </>
      )}
      <div className="flex flex-col justify-center items-center text-gray-700">
        <span>{`Всего было перечислено городов: ${enteredCities.length}`}</span>
        <span>{enteredCities.length < 5 ? 'Неплохо, но нужно разыграться! ' : 'Хороший результат!'}</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl">Последний город, названный победителем:</p>
        <p className="text-2xl font-semibold">{lastEnteredCity || 'Не назван :('}</p>
      </div>
      <button
        type="button"
        className="bg-violet-600 w-[180px] text-base min-h-[40px] rounded-[4px] text-white self-center font-medium"
        onClick={handleNextPage}
      >
        Начать новую игру
      </button>
    </div>
  );
};

export default EndgameCard;
