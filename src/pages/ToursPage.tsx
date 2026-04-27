import { useState, useMemo } from 'react';
import { tours, TOUR_TYPES, COUNTRIES } from '@/data/tours';
import TourCard from '@/components/TourCard';
import Icon from '@/components/ui/icon';

export default function ToursPage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('Все');
  const [country, setCountry] = useState('Все');
  const [maxPrice, setMaxPrice] = useState(300000);
  const [maxDuration, setMaxDuration] = useState(21);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'date'>('date');

  const filtered = useMemo(() => {
    return tours
      .filter(t => {
        if (type !== 'Все' && t.type !== type) return false;
        if (country !== 'Все' && t.country !== country) return false;
        if (t.price > maxPrice) return false;
        if (t.duration > maxDuration) return false;
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
  }, [search, type, country, maxPrice, maxDuration, sortBy]);

  const resetFilters = () => {
    setSearch(''); setType('Все'); setCountry('Все');
    setMaxPrice(300000); setMaxDuration(21); setSortBy('date');
  };

  const hasFilters = type !== 'Все' || country !== 'Все' || maxPrice < 300000 || maxDuration < 21 || search;

  return (
    <main className="container py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Все направления</p>
        <h1 className="text-3xl md:text-4xl font-semibold">Каталог туров</h1>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Страна, город, название тура..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Country */}
          <div>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'price' | 'duration' | 'date')}
              className="w-full px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="date">По дате вылета</option>
              <option value="price">По цене</option>
              <option value="duration">По длительности</option>
            </select>
          </div>
        </div>

        {/* Type chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {TOUR_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`filter-chip text-xs font-medium px-3 py-1.5 rounded-full border border-border transition-colors ${type === t ? 'active' : 'bg-background text-foreground/70 hover:text-foreground'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Range sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Цена до</span>
              <span className="font-medium text-foreground">{maxPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <input
              type="range" min={10000} max={300000} step={5000}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Длительность до</span>
              <span className="font-medium text-foreground">{maxDuration} дней</span>
            </div>
            <input
              type="range" min={3} max={21} step={1}
              value={maxDuration}
              onChange={e => setMaxDuration(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        {hasFilters && (
          <button onClick={resetFilters} className="mt-4 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            <Icon name="X" size={12} /> Сбросить фильтры
          </button>
        )}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          Найдено: <span className="font-medium text-foreground">{filtered.length}</span> {filtered.length === 1 ? 'тур' : filtered.length < 5 ? 'тура' : 'туров'}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded">
          <Icon name="SearchX" size={36} className="text-muted-foreground mx-auto mb-3" />
          <p className="font-medium mb-1">Ничего не найдено</p>
          <p className="text-sm text-muted-foreground mb-4">Попробуйте изменить параметры поиска</p>
          <button onClick={resetFilters} className="text-sm text-primary hover:opacity-70 transition-opacity">
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(t => <TourCard key={t.id} tour={t} />)}
        </div>
      )}
    </main>
  );
}
