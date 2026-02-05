from base_scraper import BaseScraper
from datetime import datetime

class MyJobMagScraper(BaseScraper):
    def __init__(self):
        super().__init__('myjobmag')
        self.base_url = 'https://www.myjobmag.com'

    def scrape_jobs(self):
        """Scrape design jobs from MyJobMag"""
        jobs = []

        # Search for designer jobs
        search_url = f"{self.base_url}/search/jobs?q=designer"
        soup = self.get_soup(search_url)

        if not soup:
            return jobs

        # Find job listings
        job_items = soup.find_all('li', class_='job-list-li')

        for item in job_items[:20]:  # Limit to first 20 jobs
            try:
                job_data = self.extract_job_data(item)
                if job_data and self.is_design_job(job_data['title'], job_data.get('description', '')):
                    jobs.append(job_data)
            except Exception as e:
                print(f"Error extracting job from MyJobMag: {e}")
                continue

        return jobs

    def extract_job_data(self, item):
        """Extract job data from a job list item"""
        job_data = {}

        # Title and URL
        title_elem = item.find('h2')
        if title_elem:
            link = title_elem.find('a')
            if link:
                job_data['title'] = self.clean_text(link.get_text())
                href = link.get('href')
                job_data['apply_url'] = self.base_url + href if href.startswith('/') else href

        # Company
        company_elem = item.find('a', href=lambda x: x and '/jobs-at/' in x)
        if company_elem:
            job_data['company'] = self.clean_text(company_elem.get_text())

        # Description
        desc_elem = item.find('li', class_='job-desc')
        if desc_elem:
            job_data['description'] = self.clean_text(desc_elem.get_text())
        else:
            job_data['description'] = ''

        # Location (might be in description or separate element)
        location_elem = item.find('span', class_='location') or item.find('div', class_='location')
        if location_elem:
            job_data['location'] = self.clean_text(location_elem.get_text())
        else:
            # Try to extract from description
            desc_text = job_data.get('description', '').lower()
            if 'lagos' in desc_text:
                job_data['location'] = 'Lagos'
            elif 'abuja' in desc_text:
                job_data['location'] = 'Abuja'
            elif 'port harcourt' in desc_text:
                job_data['location'] = 'Port Harcourt'
            else:
                job_data['location'] = 'Nigeria'

        # Salary
        job_data['salary'] = self.extract_salary(job_data.get('description', ''))

        # Posted date
        date_elem = item.find('li', id='job-date')
        if date_elem:
            job_data['posted_date'] = self.clean_text(date_elem.get_text())
        else:
            job_data['posted_date'] = datetime.now().strftime('%Y-%m-%d')

        job_data['source'] = self.source

        return job_data if job_data.get('title') else None