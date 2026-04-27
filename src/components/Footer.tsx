import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-primary font-cormorant text-xl italic font-medium">Malachit</span>
              <span className="font-golos font-semibold text-xs uppercase tracking-widest text-foreground/40">Travel</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Турагентство с опытом более 10 лет. Помогаем найти идеальный тур для каждого клиента.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Разделы</p>
            <nav className="flex flex-col gap-2">
              {[
                { to: '/tours', label: 'Каталог туров' },
                { to: '/about', label: 'О нас' },
                { to: '/faq', label: 'Вопросы и ответы' },
                { to: '/contacts', label: 'Контакты' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Контакты</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>+7 (800) 123-45-67</span>
              <span>info@malachittravel.ru</span>
              <span>Пн–Пт: 9:00–19:00</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© 2026 MalachitTravel. Все права защищены.</p>
          <p className="text-xs text-muted-foreground">Лицензия РТО 123456</p>
        </div>
      </div>
    </footer>
  );
}
