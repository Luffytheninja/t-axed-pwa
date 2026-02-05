#!/bin/bash

# Nigeria Design Job Scraper Setup and Run Script

echo "=== Nigeria Design Job Scraper ==="
echo ""

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Initialize database
echo "Setting up database..."
python -c "from database import JobDatabase; db = JobDatabase(); print('Database initialized')"

# Run initial scrape
echo "Running initial job scrape..."
python scraper.py

# Start web app
echo "Starting web dashboard..."
echo "Access the app at: http://localhost:8501"
streamlit run app.py