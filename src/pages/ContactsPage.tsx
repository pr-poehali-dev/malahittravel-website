import { useState } from 'react';
import { submitOrder } from '@/lib/api';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitOrder({ name: form.name, phone: form.phone, email: form.email, comment: form.message });
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="container py-12 md:py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Связь</p>
        <h1 className="text-3xl md:text-4xl font-semibold">Контакты</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Имя *</label>
                <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Телефон *</label>
                  <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="ivan@example.com"
                    className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Сообщение</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Куда хотите поехать, когда, сколько человек..."
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
              </div>
              <button type="submit" disabled={sending}
                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded hover:opacity-90 disabled:opacity-60 transition-opacity">
                {sending ? 'Отправляем...' : 'Отправить'}
              </button>
            </form>
          ) : (
            <div className="border border-border rounded p-8 text-center animate-fade-in">
              <Icon name="CheckCircle2" size={28} className="text-primary mx-auto mb-4" />
              <p className="font-semibold mb-1">Заявка принята</p>
              <p className="text-sm text-muted-foreground">Свяжемся с вами в ближайшее время.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            {[
              { icon: 'Phone', label: 'Телефон', value: 'Скоро добавим' },
              { icon: 'Mail', label: 'Email', value: 'Скоро добавим' },
              { icon: 'Clock', label: 'Время работы', value: 'Скоро добавим' },
            ].map(c => (
              <div key={c.label} className="flex gap-3">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                  <Icon name={c.icon} size={14} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-sm text-muted-foreground italic">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
