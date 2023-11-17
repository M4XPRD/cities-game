/* eslint-disable max-len */
import useNavigation from '../../hooks/navigationHook';
import rules from '../../utils/gameRules';

const Content = () => {
  const { handleNextPage } = useNavigation();

  return (
    <div className="h-[283px] bg-white rounded-b-[16px] prose-sm shadow-md">
      <section className="flex flex-col justify-between p-[24px] h-[235px] text-gray-700">
        <div>Цель: Назвать как можно больше реальных городов.</div>
        <ul>
          {rules.map(({ key, text }) => (
            <li key={key} className="m-0">{text}</li>
          ))}
        </ul>
        <button
          type="button"
          className="bg-violet-600 w-[126px] min-h-[40px] rounded-[4px] text-white self-center prose-base font-medium"
          onClick={handleNextPage}
        >
          Начать игру
        </button>
      </section>
    </div>
  );
};

export default Content;
