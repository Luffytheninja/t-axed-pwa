# Nigeria Design Job Scraper

A web scraper that automatically collects design-related job openings from popular Nigerian job sites and presents them in a clean, filterable web dashboard.

## Features

- **Automatic Scraping**: Runs 3 times daily at 9:00 AM, 1:00 PM, and 7:00 PM
- **Multiple Sources**: Scrapes from Jobberman, MyJobMag, and NgCareers
- **Smart Filtering**: Filters for design-related jobs (UI/UX, Graphic Design, Product Design, etc.)
- **Web Dashboard**: Clean Streamlit interface with location and salary filters
- **Database Storage**: SQLite database with deduplication and cleanup
- **Apply Links**: Direct links to job applications

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run Initial Setup**:
   ```bash
   # Linux/Mac
   ./run.sh

   # Windows
   run.bat
   ```

## Usage

### Manual Scraping
```bash
python scraper.py
```

### Start Web Dashboard
```bash
streamlit run app.py
```

### Background Scheduling
```bash
python scheduler.py
```

## Project Structure

```
nigeria-job-scraper/
├── scraper.py          # Main scraper orchestrator
├── scrapers/
│   ├── jobberman.py    # Jobberman scraper
│   ├── myjobmag.py     # MyJobMag scraper
│   └── ngcareers.py    # NgCareers scraper
├── database.py         # SQLite database operations
├── scheduler.py        # APScheduler setup
├── app.py              # Streamlit web dashboard
├── config.py           # Configuration settings
├── requirements.txt    # Python dependencies
├── run.sh              # Linux/Mac setup script
└── run.bat             # Windows setup script
```

## Configuration

Edit `config.py` to customize:
- Job search keywords
- Scraping sites and URLs
- Schedule times
- Database path

## Database Schema

Jobs are stored in `jobs.db` with the following fields:
- title, company, location, salary
- description, apply_url, posted_date
- source, scraped_at

## Notes

- The scraper respects websites by adding delays between requests
- Jobs older than 30 days are automatically cleaned up
- Duplicate jobs are prevented using title+company+source uniqueness
- Salary extraction is basic - can be enhanced for more accuracy