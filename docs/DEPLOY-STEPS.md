# Deploy Fractional Sense Bootcamp to GitHub Pages

## What’s already done

- Workflow: `.github/workflows/deploy-pages.yml` — builds on every push to `main` and deploys to GitHub Pages.
- Vite `base: '/fractional/'` and router `basename: '/fractional'` so the app works at `https://<your-username>.github.io/fractional/`.

## Steps to get it running

### 1. Push the latest code (if you haven’t already)

From the project folder:

```bash
cd /Users/joelbodker/Projects/math-project
git add -A
git commit -m "Add GitHub Actions deploy and Pages base path"
git push origin main
```

### 2. Turn on GitHub Pages and use Actions

1. Open your repo: **https://github.com/joelbodker/fractional**
2. Click **Settings** (repo top menu).
3. In the left sidebar, click **Pages** (under “Code and automation”).
4. Under **Build and deployment**:
   - **Source:** choose **GitHub Actions** (not “Deploy from a branch”).

That’s it. The first time you use **GitHub Actions** as the source, GitHub may show a notice that no Pages site is deployed yet. As soon as the workflow runs successfully, the site will appear.

### 3. Run the workflow (if it didn’t run on push)

- Go to the **Actions** tab of the repo.
- You should see a run for “Deploy to GitHub Pages” from your push.
- If it’s green, the site is live. If it’s red, open the run and check the logs.

### 4. Open your live site

After a successful run:

**https://joelbodker.github.io/fractional/**

(Replace `joelbodker` with your GitHub username if the repo is under a different account.)

---

## If something breaks

- **404 or blank page:** Make sure in **Settings → Pages** the source is **GitHub Actions**.
- **Wrong base path:** Repo name must be `fractional` so the URL is `.../fractional/`. If you renamed the repo, change `base` in `vite.config.ts` and `basename` in `src/app/routes.ts` to `'/your-repo-name'`.
- **Build fails in Actions:** Open the failed run in the **Actions** tab and read the error (often a missing dependency or Node version).
