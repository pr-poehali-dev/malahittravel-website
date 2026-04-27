import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-primary font-cormorant text-xl italic font-medium">Malachit</span>
              <span className="font-golos font-semibold text-xs uppercase tracking-widest text-foreground/40">Travel</span>
            </div>
            <p className="text-sm text-muted-foreground">Турагентство</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Разделы</p>
            <nav className="flex flex-col gap-2">
              {[
                { to: '/tours', label: 'Каталог туров' },
                { to: '/about', label: 'О нас' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contacts', label: 'Контакты' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Контакты</p>
            <p className="text-sm text-muted-foreground italic">Скоро добавим</p>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-5">
          <p className="text-xs text-muted-foreground">© 2026 MalachitTravel</p>
        </div>
      </div>
    </footer>
  );
}
