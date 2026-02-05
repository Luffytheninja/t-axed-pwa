from base_scraper import BaseScraper
from datetime import datetime

class JobbermanScraper(BaseScraper):
    def __init__(self):
        super().__init__('jobberman')
        self.base_url = 'https://www.jobberman.com'

    def scrape_jobs(self):
        """Scrape design jobs from Jobberman"""
        jobs = []

        # Search for design jobs
        search_url = f"{self.base_url}/jobs?q=design"
        soup = self.get_soup(search_url)

        if not soup:
            return jobs

        # Find job listings
        job_cards = soup.find_all('div', class_='search-result')

        for card in job_cards[:20]:  # Limit to first 20 jobs
            try:
                job_data = self.extract_job_data(card)
                if job_data and self.is_design_job(job_data['title'], job_data.get('description', '')):
                    jobs.append(job_data)
            except Exception as e:
                print(f"Error extracting job from Jobberman: {e}")
                continue

        return jobs

    def extract_job_data(self, card):
        """Extract job data from a job card"""
        job_data = {}

        # Title and URL
        title_elem = card.find('h3') or card.find('a', class_='job-title')
        if title_elem:
            job_data['title'] = self.clean_text(title_elem.get_text())
            link = title_elem.find('a') or title_elem
            if link and link.get('href'):
                job_data['apply_url'] = self.base_url + link['href'] if link['href'].startswith('/') else link['href']

        # Company
        company_elem = card.find('span', class_='company-name') or card.find('div', class_='company')
        if company_elem:
            job_data['company'] = self.clean_text(company_elem.get_text())

        # Location
        location_elem = card.find('span', class_='location') or card.find('div', class_='location')
        if location_elem:
            job_data['location'] = self.clean_text(location_elem.get_text())

        # Description (if available in card)
        desc_elem = card.find('p', class_='job-description') or card.find('div', class_='summary')
        if desc_elem:
            job_data['description'] = self.clean_text(desc_elem.get_text())
        else:
            job_data['description'] = ''

        # Salary
        salary_elem = card.find('span', class_='salary') or card.find('div', class_='salary')
        if salary_elem:
            job_data['salary'] = self.extract_salary(salary_elem.get_text())
        else:
            job_data['salary'] = self.extract_salary(job_data.get('description', ''))

        # Posted date
        date_elem = card.find('span', class_='date') or card.find('time')
        if date_elem:
            job_data['posted_date'] = self.clean_text(date_elem.get_text())
        else:
            job_data['posted_date'] = datetime.now().strftime('%Y-%m-%d')

        job_data['source'] = self.source

        return job_data if job_data.get('title') else None