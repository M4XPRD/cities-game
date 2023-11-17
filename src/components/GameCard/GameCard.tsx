import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as SendMessageIcon } from '../../assets/send_message.svg';
import { ReactComponent as SendMessageDisabledIcon } from '../../assets/send_message_disabled.svg';
import useGameLogic from '../../hooks/gameLogicHook';
import { citiesList, updateCitiesList } from '../../utils/citiesList';

const GameCard = () => {
  const { currentPlayer, turns, handleNextTurn } = useGameLogic();
  const [enteredCities, setEnteredCities] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(false);

    if (inputRef.current) {
      const enteredCity = inputRef.current.value;
      if (citiesList.includes(enteredCity)) {
        setEnteredCities([...enteredCities, enteredCity]);
        updateCitiesList(enteredCity);
        handleNextTurn();
      } else {
        setErrorMessage(true);
      }
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-scroll');

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [enteredCities]);

  const playerText = currentPlayer === 'human'
    ? 'Сейчас ваша очередь'
    : 'Сейчас очередь соперника';

  const placeholderText = errorMessage
    ? 'Введите другой город'
    : 'Напишите любой город, например: Где вы живете?';
  return (
    <div className="w-[576px] h-[464px]">
      <header className="flex flex-row justify-between items-center w-full text-center bg-white rounded-t-[16px] h-[64px] border-gray-100 pl-[16px] pr-[16px]">
        <span className="prose-base">{playerText}</span>
        <span className="prose-xl">01:59</span>
      </header>
      <div className="w-[576px] bg-gray-100 h-[5px]">
        <div className="bg-violet-300 h-[5px] w-[90%]" />
      </div>
      <section className="flex flex-col h-[320px] gap-[8px] pt-[40px] bg-white prose-sm overflow-y-scroll no-scrollbar">
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
      <footer className="h-[80px] bg-white rounded-b-[16px] shadow-md flex justify-center items-center">
        <form className="relative" onSubmit={handleSubmit}>
          <label htmlFor="enterCity">
            <input
              ref={inputRef}
              type="text"
              aria-label="Ввести город"
              name="enterCity"
              className="bg-gray-100 w-[544px] h-[48px] rounded-[6px] prose-base pl-[12px] text-gray-700 outline-none"
              placeholder={placeholderText}
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
