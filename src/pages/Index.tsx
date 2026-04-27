import { Link } from 'react-router-dom';
import { tours } from '@/data/tours';
import TourCard from '@/components/TourCard';
import Icon from '@/components/ui/icon';

const stats = [
  { value: '10+', label: 'лет на рынке' },
  { value: '3 500', label: 'довольных клиентов' },
  { value: '60+', label: 'направлений' },
  { value: '98%', label: 'клиентов возвращаются' },
];

export default function HomePage() {
  const featured = tours.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="container py-20 md:py-28">
        <div className="max-w-2xl animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">Турагентство MalachitTravel</p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-medium leading-tight mb-6 text-foreground">
            Путешествие, которое<br />
            <span className="text-primary italic">вы запомните</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
            Подбираем туры под ваш бюджет, интересы и даты. Более 60 направлений, только проверенные отели и прозрачные цены.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
            >
              Смотреть туры <Icon name="ArrowRight" size={16} />
            </Link>
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 border border-border text-foreground font-medium px-5 py-2.5 rounded hover:bg-muted transition-colors"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30">
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center md:text-left">
                <p className="text-3xl font-semibold text-primary mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tours */}
      <section className="container py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Подборка</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Популярные направления</h2>
          </div>
          <Link
            to="/tours"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-70 transition-opacity"
          >
            Все туры <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map(t => <TourCard key={t.id} tour={t} />)}
        </div>
        <div className="mt-6 md:hidden">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            Смотреть все туры <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="border-t border-border">
        <div className="container py-16 md:py-20">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Почему мы</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Работаем честно</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'Shield', title: 'Безопасность', text: 'Работаем только с проверенными отелями и авиакомпаниями. Все туры застрахованы.' },
              { icon: 'Headphones', title: 'Поддержка 24/7', text: 'Наш менеджер на связи в любое время суток — в дороге вы не одни.' },
              { icon: 'BadgePercent', title: 'Честная цена', text: 'Никаких скрытых доплат. Цена, озвученная менеджером — финальная.' },
            ].map(f => (
              <div key={f.title} className="flex gap-4">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name={f.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary/5">
        <div className="container py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Не можете выбрать тур?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Оставьте заявку — менеджер свяжется с вами в течение часа и подберёт лучший вариант под ваш запрос.</p>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity"
          >
            Получить бесплатную консультацию
          </Link>
        </div>
      </section>
    </main>
  );
}
