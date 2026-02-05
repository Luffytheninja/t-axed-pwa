# Configuration settings for Nigeria Job Scraper

# Database
DATABASE_PATH = 'jobs.db'

# Scraping
DESIGN_KEYWORDS = [
    'ui/ux designer', 'ux designer', 'product designer', 'graphic designer',
    'visual designer', 'brand designer', 'motion designer', '3d designer',
    'web designer', 'creative designer', 'design lead', 'design manager'
]

# Sites to scrape
JOB_SITES = {
    'jobberman': 'https://www.jobberman.com/jobs?q=design',
    'myjobmag': 'https://www.myjobmag.com/search/jobs?q=designer',
    'ngcareers': 'https://ngcareers.com/jobs/design'
}

# Scheduling (24-hour format)
SCRAPE_TIMES = ['09:00', '13:00', '19:00']

# Web app
APP_TITLE = 'Nigerian Design Jobs'
APP_ICON = '🎨'