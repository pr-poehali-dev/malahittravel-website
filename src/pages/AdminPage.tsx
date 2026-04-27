import { useEffect, useState } from 'react';
import { fetchTours, createTour, deleteTour, Tour } from '@/lib/api';
import Icon from '@/components/ui/icon';

const EMPTY_TOUR = {
  title: '', country: '', region: '', type: 'Пляжный',
  price: 0, duration: 7, dateStart: '', dateEnd: '',
  description: '', details: '', tag: '', active: true,
  included: [] as string[], notIncluded: [] as string[],
};

const ADMIN_KEY = 'malahit2026';

export default function AdminPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...EMPTY_TOUR });
  const [includedInput, setIncludedInput] = useState('');
  const [notIncludedInput, setNotIncludedInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    fetchTours().then(data => { setTours(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const included = includedInput.split('\n').map(s => s.trim()).filter(Boolean);
      const notIncluded = notIncludedInput.split('\n').map(s => s.trim()).filter(Boolean);
      await createTour({ ...form, included, notIncluded }, ADMIN_KEY);
      setForm({ ...EMPTY_TOUR });
      setIncludedInput('');
      setNotIncludedInput('');
      setSaved(true);
      setShowForm(false);
      load();
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Скрыть этот тур?')) return;
    await deleteTour(id, ADMIN_KEY);
    load();
  };

  return (
    <main className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Управление</p>
          <h1 className="text-2xl font-semibold">Туры</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded hover:opacity-90 transition-opacity">
          <Icon name={showForm ? 'X' : 'Plus'} size={15} />
          {showForm ? 'Отмена' : 'Добавить тур'}
        </button>
      </div>

      {saved && (
        <div className="mb-5 p-3 bg-primary/10 text-primary text-sm rounded flex items-center gap-2 animate-fade-in">
          <Icon name="CheckCircle2" size={15} /> Тур добавлен успешно
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSave} className="bg-card border border-border rounded p-6 mb-8 animate-fade-in">
          <h2 className="font-semibold mb-5">Новый тур</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-xs text-muted-foreground mb-1">Название *</label>
              <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Стамбул: мосты двух миров"
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Страна *</label>
              <input required value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
                placeholder="Турция"
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Регион / Город</label>
              <input value={form.region} onChange={e => setForm({ ...form, region: e.target.value })}
                placeholder="Стамбул"
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Тип тура</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring">
                {['Пляжный', 'Экскурсионный', 'Горнолыжный', 'Экотуризм', 'Круиз', 'Другое'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Цена, ₽ *</label>
              <input required type="number" value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                placeholder="45000"
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Дней *</label>
              <input required type="number" value={form.duration} onChange={e => setForm({ ...form, duration: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Дата начала *</label>
              <input required type="date" value={form.dateStart} onChange={e => setForm({ ...form, dateStart: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Дата конца *</label>
              <input required type="date" value={form.dateEnd} onChange={e => setForm({ ...form, dateEnd: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-muted-foreground mb-1">Краткое описание *</label>
              <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                rows={2} placeholder="Кратко о туре..."
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-muted-foreground mb-1">Подробное описание</label>
              <textarea value={form.details} onChange={e => setForm({ ...form, details: e.target.value })}
                rows={3} placeholder="Детали тура, программа..."
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Включено (каждое с новой строки)</label>
              <textarea value={includedInput} onChange={e => setIncludedInput(e.target.value)}
                rows={3} placeholder={"Авиаперелёт\nПроживание\nЗавтрак"}
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Не включено (каждое с новой строки)</label>
              <textarea value={notIncludedInput} onChange={e => setNotIncludedInput(e.target.value)}
                rows={3} placeholder={"Страховка\nВиза"}
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Метка (тег)</label>
              <input value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })}
                placeholder="Горящий / Популярный / Новинка"
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
          </div>

          <button type="submit" disabled={saving}
            className="bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded hover:opacity-90 disabled:opacity-60 transition-opacity">
            {saving ? 'Сохраняем...' : 'Сохранить тур'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-muted rounded animate-pulse" />)}
        </div>
      ) : tours.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded text-muted-foreground text-sm">
          Туров пока нет. Добавьте первый.
        </div>
      ) : (
        <div className="border border-border rounded divide-y divide-border">
          {tours.map(t => (
            <div key={t.id} className="flex items-center gap-4 px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.country} · {t.type} · {t.duration} дн · {t.price.toLocaleString('ru-RU')} ₽</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground hidden md:block">
                  {new Date(t.dateStart).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: '2-digit' })}
                </span>
                <button onClick={() => handleDelete(t.id)}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors" title="Скрыть тур">
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
