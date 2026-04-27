import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function AboutPage() {
  return (
    <main className="container py-12 md:py-16 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">О компании</p>
      <h1 className="text-4xl font-cormorant font-medium leading-tight mb-8">
        MalachitTravel
      </h1>

      <p className="text-base text-muted-foreground leading-relaxed mb-5">
        Турагентство MalachitTravel. Помогаем организовать поездку: подбираем туры, оформляем документы, отвечаем на вопросы.
      </p>
      <p className="text-base text-muted-foreground leading-relaxed mb-10">
        Работаем лично с каждым клиентом — без скриптов и шаблонных ответов.
      </p>

      <div className="flex flex-col gap-4 mb-10">
        {[
          { icon: 'Eye', title: 'Прозрачные цены', text: 'Цена, которую вы видите — финальная.' },
          { icon: 'Heart', title: 'Личный подход', text: 'Один менеджер ведёт вас от заявки до возвращения.' },
          { icon: 'Globe', title: 'Честно о турах', text: 'Рассказываем как есть — без лишних украшений.' },
        ].map(v => (
          <div key={v.title} className="flex gap-4 p-4 border border-border rounded">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
              <Icon name={v.icon} size={15} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-0.5">{v.title}</p>
              <p className="text-sm text-muted-foreground">{v.text}</p>
            </div>
          </div>
        ))}
      </div>

      <Link to="/contacts"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded hover:opacity-90 transition-opacity">
        Связаться с нами <Icon name="ArrowRight" size={14} />
      </Link>
    </main>
  );
}
