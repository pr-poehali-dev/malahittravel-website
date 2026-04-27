import { Link } from 'react-router-dom';
import { Tour } from '@/lib/api';
import Icon from '@/components/ui/icon';

type Props = { tour: Tour };

const tagColors: Record<string, string> = {
  'Горящий': 'bg-orange-100 text-orange-700',
  'Популярный': 'bg-blue-100 text-blue-700',
  'Новинка': 'bg-violet-100 text-violet-700',
  'Новый год': 'bg-red-100 text-red-700',
  'Премиум': 'bg-yellow-100 text-yellow-700',
};

export default function TourCard({ tour }: Props) {
  return (
    <Link
      to={`/tours/${tour.id}`}
      className="tour-card block bg-card border border-border rounded p-5 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{tour.country} · {tour.region}</p>
          <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors">{tour.title}</h3>
        </div>
        {tour.tag && (
          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[tour.tag] ?? 'bg-muted text-muted-foreground'}`}>
            {tour.tag}
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{tour.description}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Icon name="Clock" size={13} />
          {tour.duration} дней
        </span>
        <span className="flex items-center gap-1">
          <Icon name="Calendar" size={13} />
          {new Date(tour.dateStart).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
        </span>
        <span className="flex items-center gap-1">
          <Icon name="MapPin" size={13} />
          {tour.type}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">от</p>
          <p className="text-lg font-semibold text-foreground">{tour.price.toLocaleString('ru-RU')} ₽</p>
        </div>
        <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
          Подробнее <Icon name="ArrowRight" size={13} />
        </span>
      </div>
    </Link>
  );
}