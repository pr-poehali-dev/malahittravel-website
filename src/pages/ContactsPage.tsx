import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', type: 'Подбор тура' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="container py-12 md:py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Свяжитесь с нами</p>
        <h1 className="text-3xl md:text-4xl font-semibold">Контакты</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <p className="text-sm text-muted-foreground mb-6">Оставьте заявку — менеджер перезвонит в течение часа и поможет подобрать идеальный тур.</p>

          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Ваше имя *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Телефон *</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="ivan@example.com"
                    className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Тип запроса</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {['Подбор тура', 'Вопрос по брони', 'Корпоративный тур', 'Другое'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Сообщение</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Расскажите о вашем запросе: страна, даты, количество человек, бюджет..."
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded hover:opacity-90 transition-opacity"
              >
                Отправить заявку
              </button>
              <p className="text-xs text-muted-foreground">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
            </form>
          ) : (
            <div className="border border-border rounded p-8 text-center animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle2" size={28} className="text-primary" />
              </div>
              <h2 className="font-semibold text-lg mb-2">Заявка получена!</h2>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">Менеджер свяжется с вами в рабочее время (9:00–19:00). В будние дни — в течение часа.</p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Как нас найти</p>
            <div className="flex flex-col gap-4">
              {[
                { icon: 'Phone', label: 'Телефон', value: '+7 (800) 123-45-67', sub: 'Звонок бесплатный' },
                { icon: 'Mail', label: 'Email', value: 'info@malachittravel.ru', sub: 'Ответим в течение 2 часов' },
                { icon: 'MapPin', label: 'Офис', value: 'Москва, ул. Тверская, 12', sub: 'Пн–Пт: 9:00–19:00' },
              ].map(c => (
                <div key={c.label} className="flex gap-4">
                  <div className="w-9 h-9 rounded bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={c.icon} size={15} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{c.label}</p>
                    <p className="font-medium text-sm">{c.value}</p>
                    <p className="text-xs text-muted-foreground">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border rounded p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Время работы</p>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { day: 'Понедельник–Пятница', time: '9:00 – 19:00' },
                { day: 'Суббота', time: '10:00 – 16:00' },
                { day: 'Воскресенье', time: 'Выходной' },
              ].map(h => (
                <div key={h.day} className="flex justify-between">
                  <span className="text-muted-foreground">{h.day}</span>
                  <span className="font-medium">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-primary/20 bg-primary/5 rounded p-5">
            <div className="flex items-start gap-3">
              <Icon name="MessageCircle" size={18} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Срочная консультация</p>
                <p className="text-xs text-muted-foreground">Для срочных вопросов работает чат в Telegram — отвечаем даже вечером и в выходные.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
