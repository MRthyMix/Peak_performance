# Peak Performance

A responsive fitness and wellness web application designed to help users achieve their health and fitness goals. Built with vanilla HTML, CSS, and JavaScript, with real-time nutrition data powered by the USDA FoodData Central API.

## Live Demo

**[peak-performance-lilac.vercel.app](https://peak-performance-lilac.vercel.app)**

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home — hero carousel, program overview, testimonials, contact form |
| `programs.html` | Weight loss, muscle building, and wellness program details |
| `health-diet.html` | Nutrition lookup tool with live food search and autocomplete |
| `blogs.html` | Health and lifestyle articles with modal-based reading view |

## Features

- **Hero Carousel** — 3-banner auto-advancing slideshow (5s interval), pauses on hover, manual dot controls
- **Nutrition Lookup** — Search any food item and get calories, protein, fat, and carbohydrates from the USDA database
- **Food Autocomplete** — Live suggestions as you type in the nutrition search bar (debounced, shows up to 6 results)
- **Blog Modals** — Click any article card to read the full post in an overlay modal
- **Hamburger Menu** — Collapsible nav for smaller screens

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+) — no frameworks
- **API**: USDA FoodData Central (proxied via Vercel serverless function)
- **Hosting**: Vercel

## Project Structure

```
Peak_performance/
├── index.html
├── programs.html
├── health-diet.html
├── blogs.html
├── css/
│   ├── home_style.css
│   ├── health-diet_style.css
│   ├── programs_style.css
│   └── blogs_style.css
├── js/
│   ├── home_script.js       # Hero carousel
│   ├── nutrition.js         # Nutrition lookup + food autocomplete
│   ├── autocomplete.js      # Blog search bar autocomplete
│   ├── blog_script.js       # Blog modal open/close
│   ├── hamburger_menu.js    # Mobile nav toggle
│   └── config.js            # API key (gitignored — local dev only)
├── api/
│   └── nutrition.js         # Vercel serverless function (proxies USDA API)
└── images/
```

## Local Development

1. Get a free USDA API key at [fdc.nal.usda.gov/api-guide.html](https://fdc.nal.usda.gov/api-guide.html)
2. Create `js/config.js` (already gitignored):
   ```js
   window.API_CONFIG = {
       USDA_API_KEY: "your-key-here"
   };
   ```
3. Open `index.html` in your browser, or use the **Live Server** VS Code extension

> For the nutrition feature to work locally without a server, the key in `config.js` is used directly. On Vercel, the key lives in environment variables and is never exposed to the client.

## Deploying to Vercel

1. Push the repo to GitHub
2. Import the project in [vercel.com](https://vercel.com)
3. Add an environment variable: `USDA_API_KEY` = your key
4. Deploy — the `/api/nutrition` serverless function handles all API calls server-side
