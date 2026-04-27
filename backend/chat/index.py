"""
ИИ-ассистент для ответов на вопросы о турах MalachitTravel.
"""
import json
import os
import urllib.request
import urllib.error
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p79341844_malahittravel_websit')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

SYSTEM_PROMPT = """Ты — помощник турагентства MalachitTravel. 
Отвечай кратко и по делу на вопросы о турах, бронировании и путешествиях.
Если знаешь конкретный тур из контекста — используй эту информацию.
Для оформления заявки говори, что нужно связаться с менеджером или заполнить форму на сайте.
Отвечай на русском языке. Не выдумывай цены и даты — опирайся только на предоставленный список туров."""


def get_tours_context():
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        cur.execute(f"""
            SELECT title, country, region, type, price, duration, date_start, date_end, description
            FROM {SCHEMA}.tours WHERE active = TRUE ORDER BY date_start ASC LIMIT 20
        """)
        rows = cur.fetchall()
        cur.close()
        conn.close()
        if not rows:
            return "Туры пока не добавлены."
        lines = []
        for r in rows:
            lines.append(f"- {r[0]} | {r[1]}, {r[2]} | {r[3]} | {r[4]:,} ₽ | {r[5]} дней | {r[6]} – {r[7]} | {r[8]}")
        return "Актуальные туры:\n" + "\n".join(lines)
    except Exception:
        return ""


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    messages = body.get('messages', [])

    if not messages:
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'No messages'})}

    api_key = os.environ.get('OPENAI_API_KEY', '')
    if not api_key:
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({
            'reply': 'ИИ-ассистент временно недоступен. Свяжитесь с нами напрямую.'
        })}

    tours_ctx = get_tours_context()
    system = SYSTEM_PROMPT + "\n\n" + tours_ctx

    payload = json.dumps({
        'model': 'gpt-4o-mini',
        'messages': [{'role': 'system', 'content': system}] + messages[-10:],
        'max_tokens': 500,
        'temperature': 0.7,
    }).encode()

    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=payload,
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read())
        reply = data['choices'][0]['message']['content']
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'reply': reply}, ensure_ascii=False)}
    except Exception as e:
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({
            'reply': 'Не удалось получить ответ. Попробуйте позже или свяжитесь с нами напрямую.'
        })}
