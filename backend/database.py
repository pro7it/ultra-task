import os
import psycopg2
from configparser import ConfigParser


def load_config(
    filename="database.ini",
    section="postgresql"
):
    parser = ConfigParser()
    parser.read(filename)

    if not parser.has_section(section):
        raise Exception(
            f"Section {section} not found in {filename}"
        )

    return {
        param[0]: param[1]
        for param in parser.items(section)
    }

def get_connection():
    try:
        return psycopg2.connect(
            host=os.getenv("POSTGRES_HOST"),
            port=os.getenv("POSTGRES_PORT"),
            database=os.getenv("POSTGRES_DB"),
            user=os.getenv("POSTGRES_USER"),
            password=os.getenv("POSTGRES_PASSWORD"),
        )
    except psycopg2.DatabaseError as error:
        raise Exception(f"Database connection failed: {error}")


def init_db():
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS tasks (
                    id SERIAL PRIMARY KEY,
                    title TEXT NOT NULL,
                    completed BOOLEAN NOT NULL DEFAULT FALSE
                )
            """)

        connection.commit()

    finally:
        connection.close()


def get_all_tasks():
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT id, title, completed
                FROM tasks
                ORDER BY id
            """)

            rows = cursor.fetchall()

            return [
                {
                    "id": row[0],
                    "title": row[1],
                    "completed": row[2]
                }
                for row in rows
            ]

    finally:
        connection.close()


def create_task(title):
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO tasks (title)
                VALUES (%s)
                RETURNING id, title, completed
                """,
                (title,)
            )

            row = cursor.fetchone()

        connection.commit()

        return {
            "id": row[0],
            "title": row[1],
            "completed": row[2]
        }

    except Exception:
        connection.rollback()
        raise

    finally:
        connection.close()

def toggle_task(task_id: int):
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                UPDATE tasks
                SET completed = NOT completed
                WHERE id = %s
                RETURNING id, title, completed
                """,
                (task_id,)
            )

            row = cursor.fetchone()

            if row is None:
                return None

        connection.commit()

        return {
            "id": row[0],
            "title": row[1],
            "completed": row[2]
        }

    except Exception:
        connection.rollback()
        raise

    finally:
        connection.close()

def delete_task(task_id: int):
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                DELETE FROM tasks
                WHERE id = %s
                RETURNING id
                """,
                (task_id,)
            )

            row = cursor.fetchone()

        connection.commit()

        return row is not None

    except Exception:
        connection.rollback()
        raise

    finally:
        connection.close()

if __name__ == '__main__':
    init_db()