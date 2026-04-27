import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const team = [
  { name: 'Александра Волкова', role: 'Основатель и руководитель', exp: '15 лет в туризме' },
  { name: 'Михаил Дорохов', role: 'Менеджер по Азии и ОАЭ', exp: 'Эксперт по экзотическим турам' },
  { name: 'Анна Ларина', role: 'Менеджер по Европе', exp: 'Знает каждый уголок Средиземноморья' },
  { name: 'Игорь Серов', role: 'Горнолыжные туры', exp: 'Инструктор и профессиональный гид' },
];

export default function AboutPage() {
  return (
    <main className="container py-12 md:py-16">
      <div className="max-w-3xl animate-fade-in">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">О компании</p>
        <h1 className="text-4xl md:text-5xl font-cormorant font-medium leading-tight mb-6">
          MalachitTravel —<br />
          <span className="italic text-primary">люди, не роботы</span>
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-5">
          Мы начинали в 2014 году с небольшого офиса и большой любви к путешествиям. Сегодня у нас тысячи довольных клиентов, которые возвращаются снова и снова — потому что мы не просто продаём туры, а помогаем создавать воспоминания.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-10">
          Каждый менеджер лично посещает курорты, с которыми работает. Мы знаем отели изнутри, понимаем разницу между номером «с видом на море» и реальным видом на море, и честно рассказываем клиентам всё как есть.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-3xl">
        {[
          { icon: 'Eye', title: 'Прозрачность', text: 'Никаких скрытых доплат и мелкого шрифта. Цена в объявлении — это финальная цена.' },
          { icon: 'Heart', title: 'Личный подход', text: 'Ваш менеджер один. Он знает вас, ваши предпочтения и всегда на связи.' },
          { icon: 'Globe', title: 'Экспертиза', text: 'Мы лично посещаем курорты и отели. Только живые отзывы, без копирования с сайтов.' },
          { icon: 'Clock', title: 'Скорость', text: 'Подбор вариантов за 2 часа, оформление документов за 1 день.' },
        ].map(v => (
          <div key={v.title} className="flex gap-4 p-5 border border-border rounded">
            <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center shrink-0">
              <Icon name={v.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Команда</p>
        <h2 className="text-2xl font-semibold mb-8">Ваши менеджеры</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map(m => (
            <div key={m.name} className="border border-border rounded p-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon name="User" size={20} className="text-primary" />
              </div>
              <p className="font-medium text-sm mb-0.5">{m.name}</p>
              <p className="text-xs text-primary mb-1">{m.role}</p>
              <p className="text-xs text-muted-foreground">{m.exp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Licenses */}
      <div className="border border-border rounded p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
            <Icon name="FileCheck" size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold mb-0.5">Лицензии и документы</p>
            <p className="text-sm text-muted-foreground">Реестровый номер РТО 123456 · ОГРН 1234567890123 · ИНН 123456789</p>
          </div>
        </div>
        <Link
          to="/contacts"
          className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded hover:opacity-90 transition-opacity"
        >
          Связаться с нами
        </Link>
      </div>
    </main>
  );
}
