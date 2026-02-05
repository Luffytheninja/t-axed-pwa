REM Nigeria Design Job Scraper Setup and Run Script

echo === Nigeria Design Job Scraper ===
echo.

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Initialize database
echo Setting up database...
python -c "from database import JobDatabase; db = JobDatabase(); print('Database initialized')"

REM Run initial scrape
echo Running initial job scrape...
python scraper.py

REM Start web app
echo Starting web dashboard...
echo Access the app at: http://localhost:8501
streamlit run app.py