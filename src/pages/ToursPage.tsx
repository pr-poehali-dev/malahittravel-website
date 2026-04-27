import { useEffect, useState, useMemo } from 'react';
import { fetchTours, Tour } from '@/lib/api';
import TourCard from '@/components/TourCard';
import Icon from '@/components/ui/icon';

const TYPES = ['Все', 'Пляжный', 'Экскурсионный', 'Горнолыжный', 'Экотуризм', 'Круиз', 'Другое'];

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('Все');
  const [country, setCountry] = useState('Все');
  const [maxPrice, setMaxPrice] = useState(500000);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'date'>('date');

  useEffect(() => {
    fetchTours().then(data => { setTours(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const allCountries = useMemo(() => ['Все', ...Array.from(new Set(tours.map(t => t.country)))], [tours]);
  const maxPriceInDB = useMemo(() => Math.max(500000, ...tours.map(t => t.price)), [tours]);

  const filtered = useMemo(() => {
    return tours
      .filter(t => {
        if (type !== 'Все' && t.type !== type) return false;
        if (country !== 'Все' && t.country !== country) return false;
        if (t.price > maxPrice) return false;
        if (search) {
          const q = search.toLowerCase();
          if (!t.title.toLowerCase().includes(q) && !t.country.toLowerCase().includes(q) && !t.region.toLowerCase().includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'duration') return a.duration - b.duration;
        return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime();
      });
  }, [tours, search, type, country, maxPrice, sortBy]);

  const reset = () => { setSearch(''); setType('Все'); setCountry('Все'); setMaxPrice(maxPriceInDB); setSortBy('date'); };
  const hasFilters = type !== 'Все' || country !== 'Все' || maxPrice < maxPriceInDB || !!search;

  return (
    <main className="container py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Направления</p>
        <h1 className="text-3xl md:text-4xl font-semibold">Каталог туров</h1>
      </div>

      <div className="bg-card border border-border rounded p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative lg:col-span-2">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Страна, город, название..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <select value={country} onChange={e => setCountry(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring">
            {allCountries.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as 'price' | 'duration' | 'date')}
            className="px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring">
            <option value="date">По дате</option>
            <option value="price">По цене</option>
            <option value="duration">По длительности</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {TYPES.map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`filter-chip text-xs font-medium px-3 py-1.5 rounded-full border border-border ${type === t ? 'active' : 'bg-background text-foreground/70 hover:text-foreground'}`}>
              {t}
            </button>
          ))}
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Цена до</span>
            <span className="font-medium text-foreground">{maxPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
          <input type="range" min={10000} max={maxPriceInDB} step={5000}
            value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
            className="w-full accent-primary" />
        </div>

        {hasFilters && (
          <button onClick={reset} className="mt-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <Icon name="X" size={11} /> Сбросить фильтры
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-52 bg-muted rounded animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded">
          <Icon name="SearchX" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="font-medium mb-1">{tours.length === 0 ? 'Туры скоро появятся' : 'Ничего не найдено'}</p>
          {tours.length > 0 && (
            <button onClick={reset} className="mt-2 text-sm text-primary hover:opacity-70">Сбросить фильтры</button>
          )}
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-5">Найдено: <span className="font-medium text-foreground">{filtered.length}</span></p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(t => <TourCard key={t.id} tour={t} />)}
          </div>
        </>
      )}
    </main>
  );
}
