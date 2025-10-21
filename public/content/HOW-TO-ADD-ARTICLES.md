# Quick Guide: Adding New Articles

## For Non-Technical Users

### Step 1: Prepare Your Article

1. Write your article in any text editor
2. Save it with a simple name (lowercase, dashes instead of spaces)
   - ✅ Good: `paris-hidden-cafes.md`
   - ❌ Bad: `Paris Hidden Cafes.md`

### Step 2: Format Your Article

Start your article with this template:

```markdown
---
title: "Your Amazing Article Title"
summary: "A short 2-3 line description that makes people want to read more."
cover: "destination-1.jpg"
country: "France"
category: "Urban"
tags: ["#Paris", "#Cafes", "#FrenchCulture"]
dateVisited: "April 2024"
published: true
---

## Introduction

Your article content starts here...

## Main Section

More content...

### Subsection

Even more details...
```

### Step 3: Choose Your Cover Image

**Option A:** Use existing images
- `destination-1.jpg` (Coastal Italian village)
- `destination-2.jpg` (Ancient temple)
- `destination-3.jpg` (Northern lights)

**Option B:** Add your own image
1. Optimize your image (recommended: 1920x1080px, under 500KB)
2. Save it to `public/images/your-image-name.jpg`
3. Use filename in frontmatter: `cover: "your-image-name.jpg"`

### Step 4: Upload Your Article

1. Save your article file in: `public/content/en/articles/your-article-slug.md`
2. Open `public/content/articles-manifest.json`
3. Add your slug to the list:

```json
{
  "articles": [
    "hidden-gems-mediterranean",
    "ancient-temples-southeast-asia",
    "northern-lights-scandinavia",
    "your-article-slug"
  ]
}
```

### Step 5: Preview

Visit: `http://yoursite.com/articles/your-article-slug`

---

## For Developers

### Automatic Discovery

Articles are loaded from `articles-manifest.json`. The system:
1. Fetches manifest from `/content/articles-manifest.json`
2. Loads each article by slug from `/content/{locale}/articles/{slug}.md`
3. Parses frontmatter and renders content

### Adding Articles Programmatically

```bash
# 1. Create markdown file
echo "---
title: \"New Article\"
summary: \"Summary here\"
cover: \"image.jpg\"
country: \"Italy\"
category: \"Coastal\"
tags: [\"#Tag1\", \"#Tag2\"]
dateVisited: \"May 2024\"
published: true
---

Content here..." > public/content/en/articles/new-article.md

# 2. Update manifest
# Edit public/content/articles-manifest.json and add "new-article" to the array
```

### Localization

Create translations with the same filename:
```
content/
├── en/articles/my-article.md
├── ro/articles/my-article.md
└── ru/articles/my-article.md
```

### Frontmatter Schema

```typescript
interface ArticleFrontmatter {
  title: string;           // Required
  summary: string;         // Required
  cover: string;           // Required (filename)
  country: string;         // Required
  category: string;        // Required
  tags: string[];          // Required (array of strings with #)
  dateVisited: string;     // Required
  published: boolean;      // Required
  bestTime?: {             // Optional
    months: string;
    notes: string;
  };
  mapEmbedUrl?: string;    // Optional (Google Maps embed)
  relatedDownloads?: string[]; // Optional
}
```

### Supported Markdown

- Headers: `##` → h2, `###` → h3
- Bold: `**text**` → `<strong>`
- Links: `[text](url)` → `<a>`
- Lists: Standard markdown lists
- Paragraphs: Separated by blank lines

### Routes

- `/articles` → English articles index
- `/articles/:slug` → English article detail
- `/:locale/articles` → Localized articles index
- `/:locale/articles/:slug` → Localized article detail

### Component Structure

```
src/pages/
├── Articles.tsx          # Index page with filters
└── ArticleDetail.tsx     # Individual article page

public/content/
├── README.md             # Full documentation
├── HOW-TO-ADD-ARTICLES.md (this file)
├── articles-manifest.json
└── {locale}/articles/
    └── *.md
```
