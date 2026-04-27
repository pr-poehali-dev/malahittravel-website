"""
Функции для работы с турами: получение списка, одного тура, создание, обновление, удаление.
"""
import json
import os
import psycopg2


SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p79341844_malahittravel_websit')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
}

ADMIN_KEY = os.environ.get('ADMIN_KEY', 'malahit2026')


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def row_to_tour(row):
    return {
        'id': row[0],
        'title': row[1],
        'country': row[2],
        'region': row[3],
        'type': row[4],
        'price': row[5],
        'duration': row[6],
        'dateStart': str(row[7]),
        'dateEnd': str(row[8]),
        'description': row[9],
        'details': row[10],
        'included': row[11] or [],
        'notIncluded': row[12] or [],
        'tag': row[13],
        'active': row[14],
    }


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    headers = event.get('headers', {})

    # /tours/{id}
    parts = [p for p in path.strip('/').split('/') if p]
    tour_id = int(parts[1]) if len(parts) >= 2 and parts[1].isdigit() else None

    conn = get_conn()
    cur = conn.cursor()

    try:
        if method == 'GET' and tour_id is None:
            cur.execute(f"""
                SELECT id, title, country, region, type, price, duration,
                       date_start, date_end, description, details, included, not_included, tag, active
                FROM {SCHEMA}.tours WHERE active = TRUE ORDER BY date_start ASC
            """)
            tours = [row_to_tour(r) for r in cur.fetchall()]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(tours, ensure_ascii=False)}

        if method == 'GET' and tour_id:
            cur.execute(f"""
                SELECT id, title, country, region, type, price, duration,
                       date_start, date_end, description, details, included, not_included, tag, active
                FROM {SCHEMA}.tours WHERE id = {tour_id}
            """)
            row = cur.fetchone()
            if not row:
                return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Not found'})}
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(row_to_tour(row), ensure_ascii=False)}

        # Для изменения данных нужен admin key
        admin_key = headers.get('x-admin-key') or headers.get('X-Admin-Key', '')
        if admin_key != ADMIN_KEY:
            return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Forbidden'})}

        body = json.loads(event.get('body') or '{}')

        if method == 'POST':
            included = body.get('included', [])
            not_included = body.get('notIncluded', [])
            cur.execute(f"""
                INSERT INTO {SCHEMA}.tours
                  (title, country, region, type, price, duration, date_start, date_end, description, details, included, not_included, tag, active)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id
            """, (
                body['title'], body['country'], body.get('region', ''),
                body.get('type', 'Другое'), int(body['price']), int(body['duration']),
                body['dateStart'], body['dateEnd'],
                body['description'], body.get('details', ''),
                included, not_included,
                body.get('tag'), body.get('active', True),
            ))
            new_id = cur.fetchone()[0]
            conn.commit()
            return {'statusCode': 201, 'headers': CORS, 'body': json.dumps({'id': new_id})}

        if method == 'PUT' and tour_id:
            included = body.get('included', [])
            not_included = body.get('notIncluded', [])
            cur.execute(f"""
                UPDATE {SCHEMA}.tours SET
                  title=%s, country=%s, region=%s, type=%s, price=%s, duration=%s,
                  date_start=%s, date_end=%s, description=%s, details=%s,
                  included=%s, not_included=%s, tag=%s, active=%s
                WHERE id={tour_id}
            """, (
                body['title'], body['country'], body.get('region', ''),
                body.get('type', 'Другое'), int(body['price']), int(body['duration']),
                body['dateStart'], body['dateEnd'],
                body['description'], body.get('details', ''),
                included, not_included,
                body.get('tag'), body.get('active', True),
            ))
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        if method == 'DELETE' and tour_id:
            cur.execute(f"UPDATE {SCHEMA}.tours SET active = FALSE WHERE id = {tour_id}")
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}

    finally:
        cur.close()
        conn.close()
