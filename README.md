# Personal CV & Portfolio

A simple, dark-themed personal CV website showcasing your skills, projects, and social profiles. Built with vanilla HTML, CSS, and JavaScript for easy deployment on GitHub Pages.

## Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Dark Theme** - Professional dark interface with blue accents
- **Skills Section** - Display your skills with visual progress bars (1-5 scale)
- **Projects Showcase** - Featured projects with GitHub links and tech tags
- **Social Links** - Quick access to LinkedIn, Thingiverse, Chess.com, and more
- **Smooth Navigation** - Smooth scrolling and navigation between sections
- **GitHub Pages Ready** - Deploy directly to GitHub Pages for free hosting

## Quick Start

1. **Customize Content**
   - Edit `index.html` with your name, bio, and contact information
   - Update the skills section with your actual skills and proficiency levels
   - Add your GitHub projects with descriptions and links
   - Update social media links with your profiles

2. **Customize Styling** (optional)
   - Edit `style.css` to change colors, fonts, or layout
   - Default theme uses dark background (#1a1a1a) with blue accents (#4a9eff)

3. **Test Locally**
   - Open `index.html` in your web browser
   - Or use a local server: `python -m http.server` (Python 3) or `npx http-server`

## Deployment to GitHub Pages

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial CV site"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" directory
   - Click "Save"

3. Your site will be live at: `https://yourusername.github.io/personal-cv/`

## File Structure

```
personal-cv/
├── index.html       # Main HTML structure
├── style.css        # Styling and layout
├── script.js        # JavaScript functionality
├── .gitignore       # Git ignore rules
└── README.md        # This file
```

## Customization Guide

### Skills Section
Each skill card shows a proficiency level (1-5):
- Find `skill-bar` elements in `index.html`
- Adjust the `width` percentage (20% = 1/5, 40% = 2/5, etc.)
- Update the skill rating text (e.g., "4.5/5")

### Projects Section
Add or remove project cards by duplicating the project-card structure:
- Update project title, description, and tech tags
- Replace GitHub links with your own repositories
- Remove or add projects as needed

### Social Links
Edit the links in the "Connect With Me" section:
- Update URLs to your actual profiles
- Add or remove links as needed
- Update link titles and descriptions

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Gradients)
- Vanilla JavaScript (no dependencies)
- GitHub Pages (free hosting)

## Tips for Success

- Keep it simple and readable
- Use the same link format for consistency
- Test on mobile devices before deploying
- Update projects and skills regularly
- Consider adding your own favicon
- Use descriptive project descriptions

## License

Feel free to use this template for your own personal CV site.

---

**Note:** Remember to replace all template placeholders (your name, profile links, skills, projects) with your actual information before going live!
