# Kene Okwoli: Robotics and Electronics Portfolio

Plain HTML, CSS and JavaScript. No build step, no frameworks. Hosted free on GitHub Pages.

## Folder structure

```
index.html              Home page (hero, featured, all projects, about, contact)
project.html            One template that renders every project page
assets/css/style.css    All styling (light and dark mode)
assets/js/projects.js   ALL CONTENT: edit this to change text or add images
assets/js/main.js       Renderer (you should not need to touch this)
images/<project-slug>/  Your photos, one folder per project
```

## 1. Put it on GitHub Pages (about 5 minutes)

1. On GitHub, create a new **public** repository named exactly `KeneOkwoli.github.io`.
2. Upload everything in this folder to the repository (drag and drop on the GitHub website works).
3. Go to **Settings > Pages**, set Source to **Deploy from a branch**, Branch **main**, folder **/ (root)**, then Save.
4. After a minute or two the site is live at `https://keneokwoli.github.io`.

Optional custom domain: buy one (for example `keneokwoli.com`), add it under **Settings > Pages > Custom domain**, and follow GitHub's DNS instructions.

## 2. Add your images

Every project already lists the images it expects. Until a file exists, the site shows a grid placeholder with the exact path, for example `Add image: images/myomimic/cover.jpg`.

1. Export each photo from Notion or your phone.
2. Rename it to match the placeholder (for example `cover.jpg`, `01.jpg`, `02.jpg`).
3. Drop it into the matching `images/<slug>/` folder and commit.

To add more images to a project, add a line to its `gallery` in `assets/js/projects.js`:

```js
{ src: "images/myomimic/07.jpg", cap: "Close-up of the tendon routing" },
```

There is no limit on the number of images. Keep each one under about 1 MB for fast loading:
export at around 1600 px wide as JPG (quality 80) or WebP. Squoosh (squoosh.app) does this in the browser.
GitHub's only practical limits are 100 MB per file and about 1 GB per repository.

## 3. Fill in your contact details

At the top of `assets/js/projects.js`:

```js
email: "you@example.com",
linkedin: "https://www.linkedin.com/in/your-handle",
cv: "assets/Kene_Okwoli_CV.pdf"   // put the PDF in /assets/
```

Buttons stay hidden until a value is filled in.

## 4. Add a new project

Copy any project block in `projects.js`, give it a new `slug`, create `images/<slug>/`, and fill in the fields:

| Field | What it does |
|---|---|
| `slug` | URL name, e.g. `pokedex` gives `project.html#pokedex` |
| `category` | Used by the filter chips (University, Personal, Household Repair, or any new one) |
| `featured` | `true` puts it in the Featured section on the home page |
| `short` | One-line text on the card |
| `lede` | Intro paragraph on the project page |
| `video` | `{ id: "YouTubeID" }`, add `vertical: true` for Shorts, `start: 60` to start at 60 s |
| `results` | Big headline numbers shown under the cover image |
| `facts` | Sidebar boxes (Hardware, Software, Skills, or anything else) |
| `sections` | Main write-up: each has a heading `h`, paragraphs `p` and/or bullet list `ul` |

Bold text inside a section: `"<b>Label:</b> text"`.

## Preview locally

Double-click `index.html`, or for exact GitHub Pages behaviour run `python -m http.server` in this folder and open `http://localhost:8000`.
