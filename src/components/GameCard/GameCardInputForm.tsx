import React, { useRef } from 'react';
import useGameLogic from '../../hooks/gameLogicHook';
import { ReactComponent as SendMessageIcon } from '../../assets/send_message.svg';
import { ReactComponent as SendMessageDisabledIcon } from '../../assets/send_message_disabled.svg';

const GameCardInputForm = () => {
  const {
    currentPlayer, turns, activeLetter, handleTurnValidation,
  } = useGameLogic();

  const inputRef = useRef<HTMLInputElement>(null);

  const placeholderText = () => {
    if (turns < 1) {
      return 'Напишите любой город, например: Где вы живете?';
    }
    if (currentPlayer === 'human') {
      return `Знаете город на букву "${activeLetter?.toUpperCase()}"?`;
    }
    return 'Ожидаем ответа соперника...';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current) {
      const enteredCity = inputRef.current.value;
      handleTurnValidation(enteredCity);
      inputRef.current.value = '';
    }
  };
  return (
    <section className="h-[75px] bg-white rounded-b-[16px] shadow-md flex justify-center items-center">
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
    </section>
  );
};

export default GameCardInputForm;
