import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '@/lib/api';
import Icon from '@/components/ui/icon';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Здравствуйте! Я помощник MalachitTravel. Задайте вопрос о турах или направлениях — постараюсь помочь.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const newMessages: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const reply = await sendChatMessage(newMessages.map(m => ({ role: m.role, content: m.content })));
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Произошла ошибка. Попробуйте позже.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 md:w-96 bg-card border border-border rounded shadow-xl flex flex-col animate-fade-in" style={{ height: '420px' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Помощник MalachitTravel</p>
              <p className="text-xs text-muted-foreground">Ответит на вопросы о турах</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] text-sm px-3 py-2 rounded-lg leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted px-3 py-2 rounded-lg">
                  <div className="flex gap-1 items-center h-4">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Введите вопрос..."
              rows={1}
              className="flex-1 px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
            <button onClick={send} disabled={loading || !input.trim()}
              className="px-3 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-40 transition-opacity">
              <Icon name="Send" size={15} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center"
        aria-label="Открыть чат"
      >
        <Icon name={open ? 'X' : 'MessageCircle'} size={20} />
      </button>
    </div>
  );
}
