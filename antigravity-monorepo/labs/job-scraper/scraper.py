from scrapers.jobberman import JobbermanScraper
from scrapers.myjobmag import MyJobMagScraper
from scrapers.ngcareers import NgCareersScraper
from database import JobDatabase
import time

class JobScraper:
    def __init__(self):
        self.db = JobDatabase()
        self.scrapers = [
            JobbermanScraper(),
            MyJobMagScraper(),
            NgCareersScraper()
        ]

    def run_scraping(self):
        """Run all scrapers and save jobs to database"""
        total_jobs = 0

        print("Starting job scraping...")

        for scraper in self.scrapers:
            print(f"Scraping {scraper.source}...")
            try:
                jobs = scraper.scrape_jobs()
                print(f"Found {len(jobs)} design jobs from {scraper.source}")

                for job in jobs:
                    self.db.insert_job(job)
                    total_jobs += 1

                # Be respectful to servers
                time.sleep(2)

            except Exception as e:
                print(f"Error scraping {scraper.source}: {e}")
                continue

        print(f"Scraping complete! Added/updated {total_jobs} design jobs.")

        # Clean up old jobs (older than 30 days)
        cleaned = self.db.cleanup_old_jobs(30)
        if cleaned > 0:
            print(f"Cleaned up {cleaned} old job listings.")

        return total_jobs

if __name__ == "__main__":
    scraper = JobScraper()
    scraper.run_scraping()