import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTours, Tour } from '@/lib/api';
import TourCard from '@/components/TourCard';
import Icon from '@/components/ui/icon';

export default function HomePage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours().then(data => {
      setTours(data.slice(0, 3));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <main>
      <section className="container py-20 md:py-28">
        <div className="max-w-2xl animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">MalachitTravel</p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-medium leading-tight mb-6">
            Подберём тур<br />
            <span className="text-primary italic">под ваш запрос</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
            Туры по всему миру. Напишите нам — расскажите куда хотите и когда, подберём варианты.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
            >
              Все туры <Icon name="ArrowRight" size={16} />
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

      <section className="container pb-16 md:pb-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-xl font-semibold">Актуальные туры</h2>
          <Link to="/tours" className="hidden md:flex items-center gap-1 text-sm text-primary hover:opacity-70 transition-opacity">
            Все туры <Icon name="ArrowRight" size={13} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-52 bg-muted rounded animate-pulse" />)}
          </div>
        ) : tours.length === 0 ? (
          <div className="border border-dashed border-border rounded p-10 text-center text-muted-foreground text-sm">
            Туры скоро появятся
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tours.map(t => <TourCard key={t.id} tour={t} />)}
          </div>
        )}
      </section>

      <section className="border-t border-border bg-primary/5">
        <div className="container py-14 text-center">
          <h2 className="text-2xl font-semibold mb-3">Не нашли подходящий тур?</h2>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm">Оставьте заявку — свяжемся и поможем с выбором.</p>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Написать нам
          </Link>
        </div>
      </section>
    </main>
  );
}
