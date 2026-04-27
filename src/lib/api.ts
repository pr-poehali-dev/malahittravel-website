const TOURS_URL = 'https://functions.poehali.dev/4dc0d346-9b8e-4bb8-bc2c-fae887fa6c72';
const ORDERS_URL = 'https://functions.poehali.dev/da828e7b-33b9-435e-bd4c-031fa6c03a1d';
const CHAT_URL = 'https://functions.poehali.dev/2d7f1f35-a31a-4d9c-8253-381cc409b7fc';

export type Tour = {
  id: number;
  title: string;
  country: string;
  region: string;
  type: string;
  price: number;
  duration: number;
  dateStart: string;
  dateEnd: string;
  description: string;
  details?: string;
  included?: string[];
  notIncluded?: string[];
  tag?: string;
  active?: boolean;
};

export async function fetchTours(): Promise<Tour[]> {
  const res = await fetch(TOURS_URL);
  const data = await res.json();
  return typeof data === 'string' ? JSON.parse(data) : data;
}

export async function fetchTour(id: number): Promise<Tour> {
  const res = await fetch(`${TOURS_URL}/${id}`);
  const data = await res.json();
  return typeof data === 'string' ? JSON.parse(data) : data;
}

export async function createTour(tour: Omit<Tour, 'id'>, adminKey: string): Promise<{ id: number }> {
  const res = await fetch(TOURS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
    body: JSON.stringify(tour),
  });
  const data = await res.json();
  return typeof data === 'string' ? JSON.parse(data) : data;
}

export async function updateTour(id: number, tour: Partial<Tour>, adminKey: string): Promise<void> {
  await fetch(`${TOURS_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
    body: JSON.stringify(tour),
  });
}

export async function deleteTour(id: number, adminKey: string): Promise<void> {
  await fetch(`${TOURS_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'X-Admin-Key': adminKey },
  });
}

export async function submitOrder(order: {
  tourId?: number;
  tourTitle?: string;
  name: string;
  phone: string;
  email?: string;
  people?: number;
  comment?: string;
}): Promise<{ id: number }> {
  const res = await fetch(ORDERS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  const data = await res.json();
  return typeof data === 'string' ? JSON.parse(data) : data;
}

export async function sendChatMessage(messages: { role: string; content: string }[]): Promise<string> {
  const res = await fetch(CHAT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  const parsed = typeof data === 'string' ? JSON.parse(data) : data;
  return parsed.reply || 'Нет ответа';
}
