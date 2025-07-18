# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Peak Performance is a static fitness coaching website featuring:
- **Personal trainer portfolio** with hero carousel, programs, testimonials, and contact form
- **Multi-page architecture**: Home (index.html), Programs, Blogs, Health & Diet sections
- **Interactive features**: Nutrition API integration, blog modals, image carousels
- **External API integrations**: Nutritionix API for food nutrition data

## Architecture

### Page Structure
- **index.html**: Main landing page with hero carousel, program overview, testimonials, contact form
- **programs.html**: Training program details and offerings
- **health-diet.html**: Health content with integrated nutrition lookup tool
- **blogs.html**: Blog articles with modal-based content display

### JavaScript Architecture
- **home_script.js**: Hero section carousel with automatic/manual navigation and hover controls
- **nutrition.js**: Nutritionix API integration for food nutrition lookup (`health-diet.html`)
- **cal_Ninjas.js**: CalorieNinjas API integration (contains hardcoded API key)
- **autocomplete.js**: Search functionality for Health & Diet section
- **blog_script.js**: Blog modal functionality (currently commented out)

### API Integration
- **Nutritionix API**: Food nutrition data fetching in `nutrition.js`
  - Uses hardcoded app ID: `88819777`
  - Uses hardcoded app key: `29777d075e02bb39a00e3dbc23b503bb`
- **CalorieNinjas API**: Alternative nutrition API in `cal_Ninjas.js`
  - Uses hardcoded API key: `ce19d0164fmsh3d383efc0e85ce5p16dcb1jsnb1a4a3c79541`

### CSS Organization
- **Dedicated stylesheets** for each page: `home_style.css`, `programs_style.css`, `health-diet_style.css`, `blogs_style.css`
- **Image assets** stored in `/images/` directory

## Development Notes

### API Key Security
- **WARNING**: API keys are hardcoded in JavaScript files and exposed client-side
- Consider moving to environment variables or server-side proxy for production

### Static Site Structure
- No build process or package.json - pure HTML/CSS/JS
- Files can be served directly from any web server
- No bundling or compilation required

### Cross-Page Navigation
- Consistent navigation header across all pages
- Contact form links to `index.html#contactus` anchor

### Interactive Features
- Hero carousel with 5-second auto-advance and manual controls
- Nutrition lookup with real-time API calls
- Blog modal system (implementation may be incomplete)