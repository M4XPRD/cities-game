/* eslint-disable max-len */
import useNavigation from '../hooks/navigationHook';
import { GameRules } from '../types/gameRules';

const rules: GameRules[] = [
  { key: 'first', text: 'Запрещается повторение городов.' },
  {
    key: 'second',
    text: 'Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.',
  },
  {
    key: 'third',
    text: 'Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим.',
  },
];

const Content = () => {
  const { handleNextPage } = useNavigation();

  return (
    <div className="h-[283px] bg-white rounded-b-[16px] text-[14px]">
      <section className="flex flex-col justify-between p-[24px] h-full text-gray-700">
        <div>Цель: Назвать как можно больше реальных городов.</div>
        <ul className="pr-[5px]">
          {rules.map(({ key, text }) => (
            <li key={key}>{text}</li>
          ))}
        </ul>
        <button
          type="button"
          className="bg-violet-600 w-[126px] h-[40px] rounded-[4px] text-white self-center text-[16px] font-medium"
          onClick={handleNextPage}
        >
          Начать игру
        </button>
      </section>
    </div>
  );
};

export default Content;
