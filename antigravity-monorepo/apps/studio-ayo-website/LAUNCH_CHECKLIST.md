# Studio Ayo — Launch Checklist & Backend Guide

## ✅ What is Done
- **Frontend**: Full editorial design with React + Framer Motion.
- **Case Studies**: Tiered architecture for deep-dive and high-level work.
- **Abstract Design**: Premium low-opacity background imagery.
- **Backend Integration**: Supabase client is ready in `src/lib/supabase.js`.
- **Form UI**: Loading, Success, and Error states added to the contact form.
- **Deployment Ready**: `vercel.json` and `.gitignore` configured.

---

## 🚀 Deployment Checklist (Supabase + Vercel)

### 1. Set Up Supabase
- [ ] Go to [Supabase](https://supabase.com/) and create a new project.
- [ ] In the **SQL Editor**, run this command to create the `leads` table:
  ```sql
  create table leads (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default now(),
    name text,
    email text,
    company text,
    message text
  );
  ```
- [ ] Go to **Project Settings → API** and copy your `URL` and `anon public` key.

### 2. Deploy to Vercel
- [ ] Push your code to GitHub (Private or Public).
- [ ] Connect the repo to [Vercel](https://vercel.com/).
- [ ] **Crucial**: Add these Environment Variables during setup:
  - `VITE_SUPABASE_URL`: (Your Supabase URL)
  - `VITE_SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
- [ ] Hit **Deploy**.

---

## 📋 Ongoing Content Checklist

- [ ] **Imagery**: Replace Unsplash placeholders with actual Studio Ayo renders/shots.
- [ ] **Copy**: Final polish on project descriptions in `src/data/caseStudies.js`.
- [ ] **Logo**: Swap text "Studio Ayo" for an SVG logo in `Navigation.jsx` when ready.
- [ ] **Favicon**: Create a custom favicon to replace the Vite default.
- [ ] **Domain**: Link your custom domain (e.g., `studioayo.design`) in Vercel settings.

---

## 💡 Note on Tokens & Resources
Since I am an AI, I don't have a "token bank" I can show you, but we've built this incredibly efficiently. By using **React + Vite + Supabase**, you are using the most modern, lightweight, and scalable stack available in 2026. This setup is "free tier" friendly across the board.

**You are ready to ship.**
