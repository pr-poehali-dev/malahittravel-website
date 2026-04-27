import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tours } from '@/data/tours';
import Icon from '@/components/ui/icon';

export default function TourDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find(t => t.id === Number(id));

  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', people: '1', comment: '' });
  const [sent, setSent] = useState(false);

  if (!tour) {
    return (
      <div className="container py-24 text-center">
        <p className="text-muted-foreground mb-4">Тур не найден</p>
        <Link to="/tours" className="text-primary text-sm hover:opacity-70 transition-opacity">← Вернуться к каталогу</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const related = tours.filter(t => t.id !== tour.id && (t.country === tour.country || t.type === tour.type)).slice(0, 3);

  return (
    <main className="container py-10 md:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
        <Icon name="ChevronRight" size={12} />
        <Link to="/tours" className="hover:text-foreground transition-colors">Туры</Link>
        <Icon name="ChevronRight" size={12} />
        <span className="text-foreground">{tour.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 items-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{tour.country} · {tour.region}</span>
            {tour.tag && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tour.tag}</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold mb-2">{tour.title}</h1>
          <p className="text-lg text-muted-foreground font-cormorant italic mb-8">{tour.description}</p>

          <div className="flex flex-wrap gap-5 mb-8 py-4 border-y border-border">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span><span className="font-medium">{tour.duration}</span> дней</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span>
                {new Date(tour.dateStart).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                {' '}—{' '}
                {new Date(tour.dateEnd).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Tag" size={16} className="text-muted-foreground" />
              <span>{tour.type}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-semibold mb-3">О туре</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{tour.details}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Icon name="CheckCircle2" size={15} className="text-primary" /> Включено
              </h3>
              <ul className="flex flex-col gap-2">
                {tour.included.map(item => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Icon name="XCircle" size={15} className="text-muted-foreground" /> Не включено
              </h3>
              <ul className="flex flex-col gap-2">
                {tour.notIncluded.map(item => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-muted-foreground mt-0.5">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border border-border rounded p-6">
            <p className="text-xs text-muted-foreground mb-1">Стоимость</p>
            <p className="text-3xl font-semibold mb-1">{tour.price.toLocaleString('ru-RU')} ₽</p>
            <p className="text-xs text-muted-foreground mb-6">на человека</p>

            {!formOpen && !sent && (
              <button
                onClick={() => setFormOpen(true)}
                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded hover:opacity-90 transition-opacity mb-3"
              >
                Забронировать тур
              </button>
            )}

            {formOpen && !sent && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Ваше имя *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Телефон *</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Количество человек</label>
                  <select
                    value={form.people}
                    onChange={e => setForm({ ...form, people: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Комментарий</label>
                  <textarea
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                    placeholder="Пожелания или вопросы..."
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-medium py-2.5 rounded hover:opacity-90 transition-opacity"
                >
                  Отправить заявку
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Отмена
                </button>
              </form>
            )}

            {sent && (
              <div className="text-center py-4">
                <Icon name="CheckCircle2" size={32} className="text-primary mx-auto mb-3" />
                <p className="font-semibold mb-1">Заявка отправлена!</p>
                <p className="text-sm text-muted-foreground">Менеджер свяжется с вами в течение часа.</p>
              </div>
            )}

            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Есть вопросы?</p>
              <a href="tel:+78001234567" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <Icon name="Phone" size={14} className="text-primary" />
                +7 (800) 123-45-67
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-border">
          <h2 className="text-xl font-semibold mb-6">Похожие туры</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map(t => (
              <Link
                key={t.id}
                to={`/tours/${t.id}`}
                className="tour-card block bg-card border border-border rounded p-4 group"
              >
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
