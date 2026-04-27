CREATE TABLE t_p79341844_malahittravel_websit.tours (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  type TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  included TEXT[],
  not_included TEXT[],
  tag TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE t_p79341844_malahittravel_websit.orders (
  id SERIAL PRIMARY KEY,
  tour_id INTEGER REFERENCES t_p79341844_malahittravel_websit.tours(id),
  tour_title TEXT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  people INTEGER DEFAULT 1,
  comment TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
