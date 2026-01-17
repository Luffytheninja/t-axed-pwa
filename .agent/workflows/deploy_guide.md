---
description: Deploy T-Axed to Production (Mobile First)
---

# Deploying T-Axed PWA to Production

Since you have limited internet and want to test on your phone immediately, follow this "Zero Cost / Mobile First" guide.

## Option A: Test Locally on Phone (Zero Data Cost)
**Best for:** Immediate testing without internet. Requires phone and laptop on same Wi-Fi.

1.  **Open Terminal** in the project folder.
2.  Run this command:
    ```bash
    npm run dev -- --host
    ```
3.  Look for the `Network:` URL in the terminal output (e.g., `http://192.168.x.x:5173`).
4.  **On your Phone:** Open Chrome/Safari and type that exact URL.
5.  **Install App:** Tap "Share" (iOS) or "Menu" (Android) -> "Add to Home Screen". This installs it as a native-like app.

---

## Option B: Deploy to Production (For Public Access)
**Best for:** When you are ready to share with others. Uses **Vercel** (Free Tier).

### Prerequisites
- GitHub account (Free)
- Vercel account (Free)

### Steps
1.  **Push to GitHub:**
    Initialize git if not done:
    ```bash
    git init
    git add .
    git commit -m "Ready for launch"
    ```
    (You will need to create a new repo on GitHub.com and follow the 'push existing repository' instructions).

2.  **Deploy on Vercel:**
    - Go to [vercel.com](https://vercel.com) and sign up with GitHub.
    - Click **"Add New Project"**.
    - Select your `T-Axed` repository.
    - Click **Deploy**.
    - Vercel will build it and give you a live URL (e.g., `t-axed.vercel.app`).

### Why Vercel?
- **Speed:** It's optimized for the tech we used (Vite/React).
- **PWA Support:** It handles the HTTPS certificate automatically, which is *required* for the PWA to be installable on users' phones.
- **Cost:** $0 forever for hobby projects.

---

## Option C: Offline Build (Manual Transfer)
**Best for:** If you have NO internet on the laptop but want to manually put files on a hosting server later.

1.  Run the build command:
    ```bash
    npm run build
    ```
2.  This creates a `dist` folder.
3.  This folder contains your entire ready-to-run app. You can drag-and-drop this folder to **Netlify Drop** whenever you get internet access.
