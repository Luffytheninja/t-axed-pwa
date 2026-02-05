from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.schedulers.background import BackgroundScheduler
from scraper import JobScraper
from config import SCRAPE_TIMES
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class JobScheduler:
    def __init__(self):
        self.scraper = JobScraper()

    def scrape_job(self):
        """Function to run the scraping job"""
        logger.info("Running scheduled job scraping...")
        try:
            jobs_found = self.scraper.run_scraping()
            logger.info(f"Successfully scraped {jobs_found} jobs")
        except Exception as e:
            logger.error(f"Error during scheduled scraping: {e}")

    def start_background_scheduler(self):
        """Start scheduler in background (non-blocking)"""
        scheduler = BackgroundScheduler()

        # Schedule scraping at specified times
        for time_str in SCRAPE_TIMES:
            hour, minute = map(int, time_str.split(':'))
            scheduler.add_job(
                self.scrape_job,
                'cron',
                hour=hour,
                minute=minute,
                id=f'scrape_{time_str}',
                name=f'Daily scrape at {time_str}'
            )
            logger.info(f"Scheduled scraping at {time_str}")

        scheduler.start()
        logger.info("Background scheduler started. Jobs will run at: " + ", ".join(SCRAPE_TIMES))

        return scheduler

    def start_blocking_scheduler(self):
        """Start scheduler in blocking mode (for testing)"""
        scheduler = BlockingScheduler()

        # Schedule scraping every 5 minutes for testing
        scheduler.add_job(
            self.scrape_job,
            'interval',
            minutes=5,
            id='test_scrape',
            name='Test scrape every 5 minutes'
        )

        logger.info("Starting blocking scheduler (test mode - every 5 minutes)")
        scheduler.start()

if __name__ == "__main__":
    scheduler = JobScheduler()

    # For production, use background scheduler
    # scheduler.start_background_scheduler()

    # For testing, use blocking scheduler
    scheduler.start_blocking_scheduler()