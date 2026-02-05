import sqlite3
from datetime import datetime
import pandas as pd
from config import DATABASE_PATH

class JobDatabase:
    def __init__(self):
        self.db_path = DATABASE_PATH
        self.init_db()

    def init_db(self):
        """Initialize database and create tables if they don't exist"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                company TEXT,
                location TEXT,
                salary TEXT,
                description TEXT,
                apply_url TEXT,
                posted_date TEXT,
                source TEXT NOT NULL,
                scraped_at TEXT NOT NULL,
                UNIQUE(title, company, source)
            )
        ''')

        conn.commit()
        conn.close()

    def insert_job(self, job_data):
        """Insert a new job or update if it exists"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        try:
            cursor.execute('''
                INSERT OR REPLACE INTO jobs
                (title, company, location, salary, description, apply_url, posted_date, source, scraped_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                job_data['title'],
                job_data.get('company', ''),
                job_data.get('location', ''),
                job_data.get('salary', ''),
                job_data.get('description', ''),
                job_data.get('apply_url', ''),
                job_data.get('posted_date', ''),
                job_data['source'],
                datetime.now().isoformat()
            ))
            conn.commit()
        except Exception as e:
            print(f"Error inserting job: {e}")
        finally:
            conn.close()

    def get_jobs(self, location_filter=None, salary_filter=None, limit=50):
        """Get jobs with optional filters"""
        conn = sqlite3.connect(self.db_path)
        query = "SELECT * FROM jobs ORDER BY scraped_at DESC LIMIT ?"
        params = [limit]

        if location_filter:
            query = "SELECT * FROM jobs WHERE location LIKE ? ORDER BY scraped_at DESC LIMIT ?"
            params = [f'%{location_filter}%', limit]

        df = pd.read_sql_query(query, conn, params=params)
        conn.close()

        # Apply salary filter if specified
        if salary_filter and not df.empty:
            # Simple salary filtering - could be enhanced
            df = df[df['salary'].str.contains(salary_filter, case=False, na=False)]

        return df

    def get_recent_jobs(self, hours=24):
        """Get jobs scraped in the last N hours"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute('''
            SELECT COUNT(*) FROM jobs
            WHERE scraped_at > datetime('now', '-{} hours')
        '''.format(hours))

        count = cursor.fetchone()[0]
        conn.close()
        return count

    def cleanup_old_jobs(self, days=30):
        """Remove jobs older than specified days"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute('''
            DELETE FROM jobs
            WHERE scraped_at < datetime('now', '-{} days')
        '''.format(days))

        deleted_count = cursor.rowcount
        conn.commit()
        conn.close()

        return deleted_count