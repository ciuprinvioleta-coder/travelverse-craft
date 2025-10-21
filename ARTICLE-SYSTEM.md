# Article System Documentation

## ✅ Complete Setup

Your article system is fully functional with:

### 📁 File Structure
```
public/content/
├── README.md                     # Full documentation
├── HOW-TO-ADD-ARTICLES.md       # Quick start guide
├── articles-manifest.json        # Article registry
├── en/articles/                  # English articles
│   ├── hidden-gems-mediterranean.md
│   ├── ancient-temples-southeast-asia.md
│   └── northern-lights-scandinavia.md
├── ro/articles/                  # Romanian translations
└── ru/articles/                  # Russian translations

src/
├── pages/
│   ├── Articles.tsx              # Index page with filters
│   └── ArticleDetail.tsx         # Individual article page
└── lib/
    └── markdown-parser.ts        # Robust YAML parser
```

### 🌐 Active Routes

Both locale-based and non-locale URLs work:

| URL Pattern | Example | Description |
|-------------|---------|-------------|
| `/articles` | `/articles` | English articles index |
| `/articles/:slug` | `/articles/hidden-gems-mediterranean` | English article detail |
| `/:locale/articles` | `/ro/articles` | Localized articles index |
| `/:locale/articles/:slug` | `/ro/articles/hidden-gems-mediterranean` | Localized article detail |

### ✨ Features

✅ **Markdown-Based Content**
- Pure markdown files with YAML frontmatter
- No database required
- Version control friendly
- Easy to edit

✅ **Client-Side Filtering**
- Search by title, summary, country
- Filter by country
- Filter by category
- Multi-select tags
- URL state persistence
- Results counter

✅ **Responsive Design**
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop
- Lazy-loaded images
- Smooth hover effects

✅ **Pagination**
- Loads first 12 articles
- "Load More" button for remaining
- Maintains filter state

✅ **Multi-Language Support**
- English (en)
- Romanian (ro)
- Russian (ru)
- Fallback to English

✅ **Rich Article Pages**
- Hero image with gradient overlay
- Category badge
- Country and date metadata
- Tags display
- "Best Time to Visit" section (optional)
- Embedded Google Maps (optional)
- Semantic HTML content
- "Back to Articles" navigation

## 🚀 Adding New Articles

### Quick Method (3 Steps)

1. **Create markdown file** in `public/content/en/articles/your-article-slug.md`:

```markdown
---
title: "Your Article Title"
summary: "Brief 2-3 line description"
cover: "destination-1.jpg"
country: "France"
category: "Urban"
tags: ["#Paris", "#Travel"]
dateVisited: "May 2024"
published: true
---

## Your Content Here

Write your travel story...
```

2. **Register in manifest** - Edit `public/content/articles-manifest.json`:

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

3. **View at**: `/articles/your-article-slug`

### Adding Translations

Create the same filename in other locale folders:

```
content/
├── en/articles/paris-cafes.md
├── ro/articles/paris-cafes.md  ← Romanian translation
└── ru/articles/paris-cafes.md  ← Russian translation
```

## 📝 Frontmatter Reference

### Required Fields
```yaml
title: "Article Title"           # String
summary: "Brief description"     # String (2-3 lines)
cover: "image.jpg"               # Filename
country: "Italy"                 # String
category: "Coastal"              # String
tags: ["#Tag1", "#Tag2"]         # Array of strings
dateVisited: "March 2024"        # String
published: true                  # Boolean
```

### Optional Fields
```yaml
bestTime:                        # Object
  months: "April–June"
  notes: "Best weather"
mapEmbedUrl: "https://..."       # Google Maps embed
relatedDownloads: []             # Array of IDs
```

## 🖼️ Image Management

### Current Images
- `destination-1.jpg` → Coastal Italian village (Mediterranean article)
- `destination-2.jpg` → Ancient temple (Southeast Asia article)
- `destination-3.jpg` → Northern lights (Scandinavia article)

### Adding New Images

**Option 1:** Import in component (recommended for performance)
1. Add to `src/assets/my-image.jpg`
2. Import in component
3. Add to `coverImages` mapping

**Option 2:** Public folder (simpler)
1. Add to `public/images/my-image.jpg`
2. Reference in frontmatter: `cover: "my-image.jpg"`
3. Code will auto-fallback to `/images/` path

## 🔍 How It Works

### Article Discovery
1. System fetches `articles-manifest.json`
2. Loops through slug array
3. Fetches each `{slug}.md` file
4. Parses frontmatter with custom YAML parser
5. Filters by `published: true`
6. Displays in grid

### Frontmatter Parsing
- Custom parser in `src/lib/markdown-parser.ts`
- Handles nested objects (like `bestTime`)
- Supports arrays, booleans, strings
- Strips quotes automatically
- Error handling for malformed YAML

### Filtering System
- All filters work client-side (instant)
- State syncs to URL query params
- Shareable filtered URLs
- Filters combine with AND logic

## 🎨 Styling

All components use the design system:
- Semantic color tokens (primary, accent, etc.)
- Consistent shadows (soft, medium, strong)
- Smooth transitions (300ms cubic-bezier)
- Responsive typography
- Dark mode support

## 📚 Documentation Files

- `public/content/README.md` → Complete technical docs
- `public/content/HOW-TO-ADD-ARTICLES.md` → Quick guide
- `ARTICLE-SYSTEM.md` (this file) → System overview

## 🔧 Technical Details

### Dependencies Used
- React Router for routing
- Lucide React for icons
- Shadcn UI components
- Custom markdown parser (no external libs)

### Performance
- Lazy image loading
- Code splitting by route
- Optimized re-renders
- Efficient filtering

### SEO Ready
- Semantic HTML5
- Proper heading hierarchy
- Meta-friendly structure
- Clean URLs

## 🐛 Troubleshooting

**Articles not showing?**
- Check `published: true`
- Verify slug in `articles-manifest.json`
- Check console for parsing errors

**Images broken?**
- Verify filename matches exactly
- Check file exists in correct folder
- Ensure proper format (jpg/png/webp)

**Filters not working?**
- Verify tags array format: `["#Tag"]`
- Check case sensitivity
- Clear browser cache

## 🎯 Future Enhancements

Potential additions:
- RSS feed generation
- Reading time estimation
- Related articles algorithm
- Author profiles
- Comments system
- Social sharing buttons
- Table of contents for long articles
- Image galleries with lightbox
- Video embeds
- Article series/collections

## 📞 Support

For questions or issues:
1. Check `public/content/README.md` for detailed docs
2. Review `HOW-TO-ADD-ARTICLES.md` for quick guides
3. Inspect console for error messages
4. Verify markdown syntax at [markdownguide.org](https://www.markdownguide.org)

---

**Status**: ✅ System fully operational and ready for content!
