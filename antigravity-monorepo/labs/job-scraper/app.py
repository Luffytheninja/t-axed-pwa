import streamlit as st
import pandas as pd
from database import JobDatabase
from config import APP_TITLE, APP_ICON
import webbrowser

# Page configuration
st.set_page_config(
    page_title=APP_TITLE,
    page_icon=APP_ICON,
    layout="wide"
)

# Initialize database
db = JobDatabase()

# Custom CSS for better styling
st.markdown("""
<style>
.job-card {
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    margin: 10px 0;
    background-color: #f9f9f9;
}
.job-title {
    color: #1f77b4;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
.job-company {
    color: #666;
    font-weight: 500;
    margin-bottom: 5px;
}
.job-meta {
    color: #888;
    font-size: 14px;
    margin-bottom: 10px;
}
.job-description {
    color: #333;
    margin-bottom: 15px;
    line-height: 1.4;
}
.apply-button {
    background-color: #1f77b4;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
}
.apply-button:hover {
    background-color: #155a8a;
}
</style>
""", unsafe_allow_html=True)

def main():
    st.title(f"{APP_ICON} {APP_TITLE}")

    # Sidebar filters
    st.sidebar.header("Filters")

    # Location filter
    locations = ["All", "Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Other"]
    selected_location = st.sidebar.selectbox("Location", locations)

    # Salary filter
    salary_ranges = ["All", "₦50k-₦100k", "₦100k-₦200k", "₦200k-₦500k", "₦500k+", "$1000-$2000", "$2000+"]
    selected_salary = st.sidebar.selectbox("Salary Range", salary_ranges)

    # Get jobs based on filters
    location_filter = None if selected_location == "All" else selected_location
    salary_filter = None if selected_salary == "All" else selected_salary.replace("₦", "").replace("$", "").replace("k", "000")

    df = db.get_jobs(location_filter=location_filter, salary_filter=salary_filter, limit=100)

    # Stats
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Jobs", len(df))
    with col2:
        recent_jobs = db.get_recent_jobs(24)
        st.metric("New Today", recent_jobs)
    with col3:
        unique_companies = len(df['company'].unique()) if not df.empty else 0
        st.metric("Companies", unique_companies)

    # Jobs list
    if df.empty:
        st.info("No jobs found matching your criteria. Try adjusting the filters.")
    else:
        st.subheader(f"Found {len(df)} Design Jobs")

        for _, job in df.iterrows():
            with st.container():
                st.markdown(f"""
                <div class="job-card">
                    <div class="job-title">{job['title']}</div>
                    <div class="job-company">{job['company'] or 'Company not specified'}</div>
                    <div class="job-meta">
                        📍 {job['location'] or 'Location not specified'} |
                        💰 {job['salary'] or 'Salary not specified'} |
                        📅 {job['posted_date']} |
                        🔗 {job['source']}
                    </div>
                    <div class="job-description">{job['description'][:200]}{'...' if len(job['description']) > 200 else ''}</div>
                </div>
                """, unsafe_allow_html=True)

                # Apply button
                if job['apply_url']:
                    if st.button(f"Apply for {job['title'][:30]}...", key=f"apply_{job['id']}"):
                        webbrowser.open_new_tab(job['apply_url'])
                else:
                    st.write("No apply link available")

                st.divider()

    # Footer
    st.markdown("---")
    st.caption("Data updated automatically 3 times daily. Last scraped: check database for latest timestamp.")

if __name__ == "__main__":
    main()