# Deployment and analytics checklist

This repository is a static site deployed through Cloudflare Pages. The case-study
pages, share cards and sitemap require no build command.

## Before merging

1. Preview the branch deployment and check `/`, `/works/`, `/privacy/`, and at
   least one route under `/works/<project>/`.
2. Confirm the browser console has no errors and all project images return `200`.
3. Confirm internal `Case study` and `Privacy` links stay in the same tab.
4. Confirm GitHub, live-app and download links open in a new tab.
5. Inspect the page source for a project and confirm its canonical URL and
   `og:image` point to the matching project route and social card.

## Cloudflare Web Analytics

Do not add a made-up analytics token to the repository. Cloudflare Pages can
inject the correct beacon automatically:

1. Open the Cloudflare dashboard.
2. Go to **Workers & Pages** and select the Eclipxse Pages project.
3. Open **Metrics**.
4. Select **Enable** under **Web Analytics**.
5. Trigger the next production deployment by merging the reviewed branch.

Cloudflare adds the JavaScript beacon to valid HTML on that next deployment. The
site's `_headers` file does not set `Cache-Control: no-transform`, so it does not
block automatic injection.

After deployment, open **Web Analytics**, select the Pages project, visit several
routes, and allow a few minutes for the first page-view and performance data to
appear. Verify that the homepage, work index, privacy page and individual case
studies are all recorded.

Official reference:
https://developers.cloudflare.com/pages/how-to/web-analytics/

## Search and share verification

1. Open `https://eclipxse.in/sitemap.xml` and confirm all eight case-study routes
   appear.
2. Open `https://eclipxse.in/robots.txt` and confirm it points to that sitemap.
3. Test the homepage and two project URLs in a social-card debugger. Every project
   should use its own image under `/assets/images/social/`.
4. Request re-indexing in the search-console account after the new sitemap is live.

## Cache check

The static asset cache is intentionally one week. Modified styles and scripts use
versioned query strings, so a new deployment can keep the cache policy without
serving the previous interface.
