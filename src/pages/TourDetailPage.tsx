import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTour, fetchTours, submitOrder, Tour } from '@/lib/api';
import Icon from '@/components/ui/icon';

export default function TourDetailPage() {
  const { id } = useParams();
  const [tour, setTour] = useState<Tour | null>(null);
  const [related, setRelated] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', people: '1', comment: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchTour(Number(id)).then(data => {
      setTour(data);
      setLoading(false);
      fetchTours().then(all => {
        setRelated(all.filter(t => t.id !== data.id && (t.country === data.country || t.type === data.type)).slice(0, 3));
      });
    }).catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitOrder({ tourId: tour?.id, tourTitle: tour?.title, ...form, people: Number(form.people) });
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  if (loading) return (
    <div className="container py-20">
      <div className="h-8 w-64 bg-muted rounded animate-pulse mb-4" />
      <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
      <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
    </div>
  );

  if (!tour) return (
    <div className="container py-24 text-center">
      <p className="text-muted-foreground mb-4">Тур не найден</p>
      <Link to="/tours" className="text-primary text-sm hover:opacity-70">← Все туры</Link>
    </div>
  );

  return (
    <main className="container py-10 md:py-14">
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Главная</Link>
        <Icon name="ChevronRight" size={12} />
        <Link to="/tours" className="hover:text-foreground">Туры</Link>
        <Icon name="ChevronRight" size={12} />
        <span className="text-foreground">{tour.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{tour.country} · {tour.region}</p>
          {tour.tag && <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-3">{tour.tag}</span>}
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">{tour.title}</h1>

          <div className="flex flex-wrap gap-5 py-4 border-y border-border mb-6">
            <span className="flex items-center gap-2 text-sm"><Icon name="Clock" size={15} className="text-muted-foreground" />{tour.duration} дней</span>
            <span className="flex items-center gap-2 text-sm">
              <Icon name="Calendar" size={15} className="text-muted-foreground" />
              {new Date(tour.dateStart).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} — {new Date(tour.dateEnd).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2 text-sm"><Icon name="Tag" size={15} className="text-muted-foreground" />{tour.type}</span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{tour.description}</p>
          {tour.details && <p className="text-sm text-muted-foreground leading-relaxed mb-6">{tour.details}</p>}

          {((tour.included && tour.included.length > 0) || (tour.notIncluded && tour.notIncluded.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tour.included && tour.included.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-3">Включено</p>
                  <ul className="flex flex-col gap-1.5">
                    {tour.included.map(item => (
                      <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tour.notIncluded && tour.notIncluded.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-3">Не включено</p>
                  <ul className="flex flex-col gap-1.5">
                    {tour.notIncluded.map(item => (
                      <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-0.5">✗</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24 bg-card border border-border rounded p-6">
            <p className="text-xs text-muted-foreground mb-1">Стоимость</p>
            <p className="text-3xl font-semibold mb-1">{tour.price.toLocaleString('ru-RU')} ₽</p>
            <p className="text-xs text-muted-foreground mb-6">на человека</p>

            {!formOpen && !sent && (
              <button onClick={() => setFormOpen(true)}
                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded hover:opacity-90 transition-opacity mb-3">
                Оставить заявку
              </button>
            )}

            {formOpen && !sent && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Имя *</label>
                  <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Телефон *</label>
                  <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Человек</label>
                  <select value={form.people} onChange={e => setForm({ ...form, people: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Комментарий</label>
                  <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })}
                    rows={2} placeholder="Пожелания..."
                    className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
                </div>
                <button type="submit" disabled={sending}
                  className="w-full bg-primary text-primary-foreground font-medium py-2.5 rounded hover:opacity-90 disabled:opacity-60 transition-opacity">
                  {sending ? 'Отправляем...' : 'Отправить'}
                </button>
                <button type="button" onClick={() => setFormOpen(false)} className="text-xs text-muted-foreground hover:text-foreground">Отмена</button>
              </form>
            )}

            {sent && (
              <div className="text-center py-4">
                <Icon name="CheckCircle2" size={30} className="text-primary mx-auto mb-3" />
                <p className="font-semibold mb-1">Заявка принята</p>
                <p className="text-xs text-muted-foreground">Свяжемся с вами в ближайшее время.</p>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Вопросы?</p>
              <Link to="/contacts" className="text-sm text-primary hover:opacity-70 transition-opacity">Написать нам →</Link>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14 pt-10 border-t border-border">
          <h2 className="text-lg font-semibold mb-5">Похожие туры</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map(t => (
              <Link key={t.id} to={`/tours/${t.id}`} className="tour-card block bg-card border border-border rounded p-4 group">
                <p className="text-xs text-muted-foreground mb-1">{t.country}</p>
                <p className="font-medium text-sm group-hover:text-primary transition-colors mb-2">{t.title}</p>
                <p className="text-sm font-semibold">{t.price.toLocaleString('ru-RU')} ₽</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
