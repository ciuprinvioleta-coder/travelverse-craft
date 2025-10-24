import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Search, X } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { parseMarkdown } from "@/lib/markdown-parser";
import destination1 from "@/assets/destination-1.jpg";
import destination2 from "@/assets/destination-2.jpg";
import destination3 from "@/assets/destination-3.jpg";

interface ArticleFrontmatter {
  title: string;
  summary: string;
  cover: string;
  country: string;
  category: string;
  tags: string[];
  dateVisited: string;
  published: boolean;
}

interface Article extends ArticleFrontmatter {
  slug: string;
}

// Map cover filenames to imported images
const coverImages: Record<string, string> = {
  "destination-1.jpg": destination1,
  "destination-2.jpg": destination2,
  "destination-3.jpg": destination3,
};

const Articles = () => {
  const { locale = "en" } = useParams<{ locale: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(12);

  // Filter states from URL
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get("country") || "all");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  );

  // Load articles
  useEffect(() => {
    const loadArticles = async () => {
      try {
        // Load article manifest
        const manifestResponse = await fetch('/content/articles-manifest.json');
        const manifest = await manifestResponse.json();
        const slugs = manifest.articles || [];
        
        const loadedArticles = await Promise.all(
          slugs.map(async (slug) => {
            try {
              const response = await fetch(`/content/${locale}/articles/${slug}.md`);
              if (!response.ok) return null;
              
              const text = await response.text();
              const { frontmatter } = parseMarkdown(text);

              return { ...frontmatter, slug } as Article;
            } catch {
              return null;
            }
          })
        );

        setArticles(loadedArticles.filter((a): a is Article => a !== null && a.published));
      } catch (error) {
        console.error("Error loading articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [locale]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCountry !== "all") params.set("country", selectedCountry);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    setSearchParams(params);
  }, [searchQuery, selectedCountry, selectedCategory, selectedTags, setSearchParams]);

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    if (selectedCountry !== "all" && article.country !== selectedCountry) return false;
    if (selectedCategory !== "all" && article.category !== selectedCategory) return false;
    if (selectedTags.length > 0 && !selectedTags.some((tag) => article.tags.includes(tag))) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.country.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const displayedArticles = filteredArticles.slice(0, displayedCount);

  // Get unique values for filters
  const countries = Array.from(new Set(articles.map((a) => a.country)));
  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags)));

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("all");
    setSelectedCategory("all");
    setSelectedTags([]);
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = searchQuery || selectedCountry !== "all" || selectedCategory !== "all" || selectedTags.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Travel Articles
              </h1>
              <p className="text-lg text-muted-foreground">
                Real stories from real travelers. Get inspired, plan better, and discover destinations through authentic experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b bg-background/50 backdrop-blur-sm sticky top-20 z-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col gap-4">
              {/* Search and Select Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Country Filter */}
                <div className="flex gap-2">
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCountry !== "all" && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCountry("all")}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCategory !== "all" && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCategory("all")}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Tags Multi-Select */}
                <div className="flex gap-2">
                  <Select
                    value={selectedTags[0] || "none"}
                    onValueChange={(value) => {
                      if (value !== "none" && !selectedTags.includes(value)) {
                        setSelectedTags([...selectedTags, value]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Select Tags</SelectItem>
                      {allTags.map((tag) => (
                        <SelectItem key={tag} value={tag} disabled={selectedTags.includes(tag)}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTags.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Selected Tags Display */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive/10"
                      onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                    >
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Results Count and Clear */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredArticles.length} {filteredArticles.length === 1 ? "result" : "results"}
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading articles...</p>
              </div>
            ) : displayedArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your filters.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedArticles.map((article) => (
                    <Link key={article.slug} to={`/${locale}/articles/${article.slug}`}>
                      <Card className="overflow-hidden group cursor-pointer h-full bg-card shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={coverImages[article.cover] || article.cover}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-accent text-accent-foreground shadow-medium">
                              {article.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {article.summary}
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{article.country}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{article.dateVisited}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Load More Button */}
                {displayedCount < filteredArticles.length && (
                  <div className="text-center mt-12">
                    <Button
                      onClick={() => setDisplayedCount(displayedCount + 12)}
                      variant="outline"
                      size="lg"
                    >
                      Load More Articles
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
