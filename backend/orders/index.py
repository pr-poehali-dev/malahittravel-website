"""
Приём и просмотр заявок на туры.
"""
import json
import os
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p79341844_malahittravel_websit')
ADMIN_KEY = os.environ.get('ADMIN_KEY', 'malahit2026')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    headers = event.get('headers', {})

    conn = get_conn()
    cur = conn.cursor()

    try:
        if method == 'POST':
            body = json.loads(event.get('body') or '{}')
            cur.execute(f"""
                INSERT INTO {SCHEMA}.orders (tour_id, tour_title, name, phone, email, people, comment)
                VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id
            """, (
                body.get('tourId'), body.get('tourTitle'),
                body['name'], body['phone'],
                body.get('email', ''), int(body.get('people', 1)),
                body.get('comment', ''),
            ))
            new_id = cur.fetchone()[0]
            conn.commit()
            return {'statusCode': 201, 'headers': CORS, 'body': json.dumps({'id': new_id})}

        if method == 'GET':
            admin_key = headers.get('x-admin-key') or headers.get('X-Admin-Key', '')
            if admin_key != ADMIN_KEY:
                return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Forbidden'})}
            cur.execute(f"""
                SELECT id, tour_id, tour_title, name, phone, email, people, comment, status, created_at
                FROM {SCHEMA}.orders ORDER BY created_at DESC LIMIT 100
            """)
            rows = cur.fetchall()
            orders = [
                {
                    'id': r[0], 'tourId': r[1], 'tourTitle': r[2],
                    'name': r[3], 'phone': r[4], 'email': r[5],
                    'people': r[6], 'comment': r[7], 'status': r[8],
                    'createdAt': str(r[9]),
                }
                for r in rows
            ]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(orders, ensure_ascii=False)}

        return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}

    except Exception as ex:
        conn.rollback()
        return {'statusCode': 500, 'headers': CORS, 'body': json.dumps({'error': str(ex)})}
    finally:
        cur.close()
        conn.close()