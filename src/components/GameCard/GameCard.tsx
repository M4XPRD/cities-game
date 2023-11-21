import React, { useEffect, useRef } from 'react';
import { ReactComponent as SendMessageIcon } from '../../assets/send_message.svg';
import { ReactComponent as SendMessageDisabledIcon } from '../../assets/send_message_disabled.svg';
import useGameLogic from '../../hooks/gameLogicHook';
import formatTime from '../../utils/formatTime';
import useNavigation from '../../hooks/navigationHook';
import countdownWidthPercent from '../../utils/countdownWidthPercent';

const GameCard = () => {
  const {
    currentPlayer,
    turns,
    activeLetter,
    timeLeft,
    gameOver,
    enteredCities,
    handleTurnValidation,
  } = useGameLogic();

  const { handleNextPage } = useNavigation();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current) {
      const enteredCity = inputRef.current.value;
      handleTurnValidation(enteredCity);
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-scroll');

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [enteredCities]);

  useEffect(() => {
    if (gameOver) {
      handleNextPage();
    }
  }, [gameOver]);

  const playerText = currentPlayer === 'human'
    ? 'Сейчас ваша очередь'
    : 'Сейчас очередь соперника';

  const placeholderText = () => {
    if (turns < 1) {
      return 'Напишите любой город, например: Где вы живете?';
    }
    if (currentPlayer === 'human') {
      return `Знаете город на букву "${activeLetter?.toUpperCase()}"?`;
    }
    return 'Ожидаем ответа соперника...';
  };

  return (
    <div className="w-[576px] h-[464px]">
      <header className="flex flex-row justify-between items-center w-full text-center bg-white rounded-t-[16px] h-[64px] border-gray-100 pl-[16px] pr-[16px]">
        <span className="prose-base">{playerText}</span>
        <span className="prose-xl">{formatTime(timeLeft)}</span>
      </header>
      <div className="w-[576px] bg-gray-100 h-[5px]">
        <div className="bg-violet-300 h-[5px]" style={{ width: countdownWidthPercent(timeLeft, 120) }} />
      </div>
      <section className="flex flex-col h-[276px] gap-[8px] pt-[40px] bg-white prose-sm overflow-y-scroll no-scrollbar">
        {turns < 1 ? (
          <div className="flex justify-center items-center h-[100%] prose-sm text-gray-400">
            Первый участник вспоминает города...
          </div>
        ) : (
          enteredCities.map((city: string, index) => (
            <div
              key={city}
              className={`h-[36px] pl-3 pr-3 pt-[6px] pb-[6px] rounded-tl-xl rounded-tr-xl ${
                index % 2 === 0
                  ? 'self-end bg-violet-500 text-white rounded-br-none rounded-bl-xl mr-[16px]'
                  : 'self-start bg-violet-50 text-grey-700 rounded-br-xl rounded-bl-none ml-[16px]'
              }`}
            >
              {city}
            </div>
          ))
        )}
      </section>
      <h1 className={`text-center bg-white prose-sm pt-[20px] ${turns < 1 ? 'text-white' : 'text-gray-400'}`}>{`Всего перечислено городов: ${enteredCities.length}`}</h1>
      <footer className="h-[75px] bg-white rounded-b-[16px] shadow-md flex justify-center items-center">
        <form className="relative" onSubmit={handleSubmit}>
          <label htmlFor="enterCity">
            <input
              ref={inputRef}
              type="text"
              aria-label="Ввести город"
              name="enterCity"
              className="bg-gray-100 w-[544px] h-[48px] rounded-[6px] prose-base pl-[12px] text-gray-700 outline-none"
              placeholder={placeholderText()}
              autoComplete="off"
              readOnly={currentPlayer === 'ai'}
            />
          </label>
          <button
            type="submit"
            aria-label="Отправить ответ"
            className="absolute top-[7px] right-[7px]"
            disabled={currentPlayer === 'ai'}
          >
            {currentPlayer === 'human' ? (
              <SendMessageIcon />
            ) : (
              <SendMessageDisabledIcon />
            )}
          </button>
        </form>
      </footer>
    </div>
  );
};

export default GameCard;
