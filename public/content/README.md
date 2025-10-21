# Content Structure

This directory contains all static content for the WanderStories travel blog, organized by language locale.

## Directory Structure

```
content/
├── README.md (this file)
├── en/
│   └── articles/
│       ├── article-slug-1.md
│       ├── article-slug-2.md
│       └── ...
├── ro/
│   └── articles/
│       └── ...
└── ru/
    └── articles/
        └── ...
```

## Adding a New Article

### Step 1: Create the Markdown File

Create a new `.md` file in the appropriate language folder:
- English: `content/en/articles/your-article-slug.md`
- Romanian: `content/ro/articles/your-article-slug.md`
- Russian: `content/ru/articles/your-article-slug.md`

**Important:** The filename (without `.md`) becomes the article's URL slug.

### Step 2: Add Frontmatter

Every article MUST start with YAML frontmatter between `---` markers:

```markdown
---
title: "Your Article Title"
summary: "A 2-3 line summary that appears on article cards and in search results."
cover: "destination-1.jpg"
country: "Italy"
category: "Coastal"
tags: ["#Mediterranean", "#ItalyTravel", "#CoastalVillages"]
dateVisited: "March 2024"
published: true
bestTime:
  months: "April–June, September–October"
  notes: "Shoulder seasons offer warm weather and fewer crowds."
mapEmbedUrl: "https://www.google.com/maps/d/embed?mid=..."
---

Your article content starts here...
```

### Step 3: Frontmatter Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `title` | ✅ Yes | String | Article title (appears in hero and card) |
| `summary` | ✅ Yes | String | 2-3 line excerpt for cards and SEO |
| `cover` | ✅ Yes | String | Cover image filename (must exist in `src/assets/` or `public/images/`) |
| `country` | ✅ Yes | String | Primary country/region |
| `category` | ✅ Yes | String | Category (e.g., "Coastal", "Adventure", "Nature") |
| `tags` | ✅ Yes | Array | Tags starting with # (e.g., ["#Beach", "#Italy"]) |
| `dateVisited` | ✅ Yes | String | When you visited (e.g., "March 2024") |
| `published` | ✅ Yes | Boolean | `true` to show, `false` to hide |
| `bestTime` | ❌ No | Object | Best time to visit (months + notes) |
| `mapEmbedUrl` | ❌ No | String | Google Maps embed URL |
| `relatedDownloads` | ❌ No | Array | Related download IDs |

### Step 4: Write Content

Use standard Markdown formatting:

```markdown
## Main Section Heading

Your paragraph text here. Use **bold** for emphasis and *italics* for subtle emphasis.

### Subsection Heading

- Bullet point 1
- Bullet point 2
- Bullet point 3

### Another Subsection

More content here...
```

**Supported Markdown:**
- `## Heading` → `<h2>`
- `### Subheading` → `<h3>`
- `**bold text**` → `<strong>`
- `*italic text*` → `<em>` (basic support)
- Lists, paragraphs, and line breaks

### Step 5: Add Cover Image

**Option 1: Use Existing Images**
- Images in `src/assets/`: `destination-1.jpg`, `destination-2.jpg`, `destination-3.jpg`
- These are already imported and mapped in the code

**Option 2: Add New Images**
1. Place image in `public/images/` (e.g., `public/images/my-article-cover.jpg`)
2. Reference in frontmatter: `cover: "my-article-cover.jpg"`
3. The code will automatically look for it in the image mapping first, then fallback to `/images/` path

### Step 6: Register the Article

Add your article slug to the list in `src/pages/Articles.tsx`:

```typescript
// Find this line around line 51:
const slugs = ["hidden-gems-mediterranean", "ancient-temples-southeast-asia", "your-new-slug"];
```

### Step 7: Test Your Article

1. Navigate to: `http://localhost:5173/en/articles`
2. Find your article card
3. Click to view full article
4. Check filters work (country, category, tags)

## URLs

Articles are accessible at:
- `/articles` → English articles index
- `/articles/your-slug` → English article detail
- `/:locale/articles` → Localized articles index (e.g., `/ro/articles`)
- `/:locale/articles/your-slug` → Localized article detail

## Localization

To add translations:
1. Create same filename in other locale folders
2. Use same frontmatter structure
3. Translate `title`, `summary`, `tags`, and content
4. Keep `slug`, `cover`, `country`, `category` identical

Example:
```
content/
├── en/articles/hidden-gems-mediterranean.md
├── ro/articles/hidden-gems-mediterranean.md  (Romanian translation)
└── ru/articles/hidden-gems-mediterranean.md  (Russian translation)
```

## Filtering

Users can filter articles by:
- **Search**: Full-text search in title, summary, and country
- **Country**: Select specific country
- **Category**: Select specific category
- **Tags**: Multi-select tags
- **URL State**: All filters persist in URL for sharing

## Best Practices

✅ **DO:**
- Keep slugs short, descriptive, kebab-case
- Write 2-3 line summaries (not too long)
- Use high-quality 16:9 cover images
- Add at least 3-5 relevant tags
- Use semantic headings (## for main sections)
- Set `published: false` for drafts

❌ **DON'T:**
- Use spaces or special characters in slugs
- Forget the frontmatter `---` delimiters
- Use huge images (optimize first)
- Leave required fields empty
- Nest articles in subfolders

## Troubleshooting

**Article not showing?**
1. Check `published: true` in frontmatter
2. Verify slug is in the `slugs` array in `Articles.tsx`
3. Check file is in correct folder: `content/{locale}/articles/`
4. Verify frontmatter syntax (proper YAML)

**Image not loading?**
1. Check filename matches exactly (case-sensitive)
2. Verify image exists in `public/images/` or `src/assets/`
3. For `src/assets`, ensure it's imported in component

**Filters not working?**
1. Check tags are in array format: `["#Tag1", "#Tag2"]`
2. Verify country/category match exactly (case-sensitive)

## Future Enhancements

Planned features:
- Author profiles
- Related articles
- Reading time estimation
- Table of contents
- Image galleries
- Social sharing
