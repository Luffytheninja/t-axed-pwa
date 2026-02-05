import os
import requests
from bs4 import BeautifulSoup
from random_user_agent.user_agent import UserAgent
from random_user_agent.params import SoftwareName, OperatingSystem
import time
import re
from config import DESIGN_KEYWORDS

class BaseScraper:
    def __init__(self, source_name):
        self.source = source_name
        self.session = requests.Session()
        self.ua = UserAgent()
        self.setup_session()

    def setup_session(self):
        """Setup session with random user agent and headers"""
        self.session.headers.update({
            'User-Agent': self.ua.get_random_user_agent(),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })

    def get_soup(self, url, retries=3):
        """Get BeautifulSoup object from URL with retries"""
        for attempt in range(retries):
            try:
                response = self.session.get(url, timeout=30)
                response.raise_for_status()
                return BeautifulSoup(response.content, 'lxml')
            except Exception as e:
                print(f"Attempt {attempt + 1} failed for {url}: {e}")
                if attempt < retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
        return None

    def is_design_job(self, title, description=''):
        """Check if job is design-related"""
        text = f"{title} {description}".lower()
        return any(keyword in text for keyword in DESIGN_KEYWORDS)

    def extract_salary(self, text):
        """Extract salary information from text"""
        # Common Nigerian salary patterns
        patterns = [
            r'₦[\d,]+(?:k)?(?:\s*-\s*₦[\d,]+(?:k)?)?',  # ₦50,000 - ₦100,000
            r'[\d,]+(?:k)?(?:\s*-\s*[\d,]+(?:k)?)?\s*naira',  # 50,000 - 100,000 naira
            r'[\$£][\d,]+(?:k)?(?:\s*-\s*[\$£][\d,]+(?:k)?)?',  # $1000 - $2000
        ]

        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(0)
        return ''

    def clean_text(self, text):
        """Clean and normalize text"""
        if not text:
            return ''
        return ' '.join(text.strip().split())

    def scrape_jobs(self):
        """Main scraping method - to be implemented by subclasses"""
        raise NotImplementedError