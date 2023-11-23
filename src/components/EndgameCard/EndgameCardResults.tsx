import useGameLogic from '../../hooks/gameLogicHook';

const EndgameCardResults = () => {
  const { currentPlayer, gameOver } = useGameLogic();
  const { reason } = gameOver;

  return (
    <>
      {currentPlayer === 'human' ? (
        <div className="flex flex-col justify-center items-center">
          <p>Твой противник победил!</p>
          <p>
            {reason === 'no-time-left'
              ? 'К сожалению, твое время вышло!'
              : 'Список городов закончился'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p>Поздравляем тебя с победой!</p>
          <p>
            {reason === 'no-time-left'
              ? 'Твой противник не вспомнил нужный город!'
              : 'Список городов закончился'}
          </p>
        </div>
      )}
      <div className="text-center">
        <p className="text-red-600 text-3xl font-semibold">00:00</p>
      </div>
    </>
  );
};

export default EndgameCardResults;
