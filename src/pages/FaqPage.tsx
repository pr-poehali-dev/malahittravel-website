import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const faqs = [
  {
    category: 'Бронирование',
    items: [
      {
        q: 'Как забронировать тур?',
        a: 'Выберите тур в каталоге и нажмите «Забронировать» или оставьте заявку — менеджер свяжется в течение часа, уточнит детали и оформит бронь.',
      },
      {
        q: 'Нужно ли платить сразу полную стоимость?',
        a: 'Нет. Для подтверждения брони необходим аванс 30% от стоимости тура. Оставшуюся сумму можно оплатить за 14 дней до вылета.',
      },
      {
        q: 'За сколько дней до поездки нужно бронировать?',
        a: 'Рекомендуем бронировать за 2–4 недели. Для высокого сезона (июль–август, новогодние праздники) — за 1,5–2 месяца. Горящие туры можно найти за 3–7 дней до вылета.',
      },
    ],
  },
  {
    category: 'Документы и визы',
    items: [
      {
        q: 'Вы помогаете с оформлением визы?',
        a: 'Да, для большинства направлений мы берём на себя подготовку визовых документов. Стоимость визового сбора и наших услуг прописывается отдельно.',
      },
      {
        q: 'Нужна ли страховка?',
        a: 'Страховка обязательна для большинства стран. Мы включаем её в стоимость тура или помогаем оформить отдельно. Рекомендуем страховку с расширенным покрытием для активного отдыха.',
      },
      {
        q: 'Какие документы нужны для поездки?',
        a: 'Для большинства стран — загранпаспорт со сроком действия не менее 6 месяцев после возвращения. Для стран ближнего зарубежья может быть достаточно внутреннего паспорта. Точный список мы предоставим при бронировании.',
      },
    ],
  },
  {
    category: 'Изменения и отмена',
    items: [
      {
        q: 'Можно ли отменить тур?',
        a: 'Да. Условия отмены зависят от тура и сроков: за 30+ дней — возврат аванса за вычетом банковской комиссии; за 14–30 дней — штраф 20–30%; менее 14 дней — штраф 50–100%. Полные условия прописаны в договоре.',
      },
      {
        q: 'Что если изменился рейс?',
        a: 'При изменении рейса авиакомпанией мы оперативно уведомим вас и предложим альтернативные варианты. Все изменения по вине авиакомпании — их ответственность.',
      },
      {
        q: 'Можно ли изменить даты после бронирования?',
        a: 'В большинстве случаев — да, но это зависит от условий отеля и авиакомпании. Перенос дат обычно возможен с небольшой доплатой. Уточните у менеджера.',
      },
    ],
  },
  {
    category: 'Оплата',
    items: [
      {
        q: 'Какие способы оплаты доступны?',
        a: 'Банковская карта, перевод на расчётный счёт, наличные в офисе. Рассрочку предлагаем через партнёрские банки.',
      },
      {
        q: 'Есть ли скидки для постоянных клиентов?',
        a: 'Да, при повторном обращении действует скидка 3%. При бронировании на группу 5+ человек — от 5%. Также проводим сезонные акции.',
      },
    ],
  },
];

export default function FaqPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <main className="container py-12 md:py-16 max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Поддержка</p>
        <h1 className="text-3xl md:text-4xl font-semibold">Часто задаваемые вопросы</h1>
      </div>

      <div className="flex flex-col gap-10">
        {faqs.map(cat => (
          <div key={cat.category}>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">{cat.category}</p>
            <div className="flex flex-col border border-border rounded divide-y divide-border">
              {cat.items.map(item => {
                const key = `${cat.category}-${item.q}`;
                const isOpen = openItem === key;
                return (
                  <div key={item.q}>
                    <button
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                      onClick={() => setOpenItem(isOpen ? null : key)}
                    >
                      <span className="font-medium text-sm">{item.q}</span>
                      <Icon
                        name="ChevronDown"
                        size={16}
                        className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 animate-fade-in">
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-border rounded p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="font-semibold mb-1">Не нашли ответ на свой вопрос?</p>
          <p className="text-sm text-muted-foreground">Напишите нам — ответим в течение двух часов.</p>
        </div>
        <Link
          to="/contacts"
          className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded hover:opacity-90 transition-opacity"
        >
          Написать <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
    </main>
  );
}
