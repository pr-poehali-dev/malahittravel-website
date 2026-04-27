import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const links = [
  { to: '/', label: 'Главная' },
  { to: '/tours', label: 'Туры' },
  { to: '/about', label: 'О нас' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contacts', label: 'Контакты' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-primary font-cormorant text-2xl italic font-medium tracking-tight">Malachit</span>
          <span className="font-golos font-semibold text-sm uppercase tracking-widest text-foreground/50">Travel</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link text-sm font-medium transition-colors ${pathname === l.to ? 'text-primary active' : 'text-foreground/70 hover:text-foreground'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contacts"
          className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Оставить заявку
        </Link>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <Icon name={open ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container flex flex-col py-4 gap-1">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-2 py-2.5 text-sm font-medium rounded transition-colors ${pathname === l.to ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contacts"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded hover:opacity-90 transition-opacity"
            >
              Оставить заявку
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
