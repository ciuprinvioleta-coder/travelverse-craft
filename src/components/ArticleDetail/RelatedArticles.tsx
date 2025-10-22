import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { parseMarkdown } from "@/lib/markdown-parser";
import destination1 from "@/assets/destination-1.jpg";
import destination2 from "@/assets/destination-2.jpg";
import destination3 from "@/assets/destination-3.jpg";

const coverImages: Record<string, string> = {
  "destination-1.jpg": destination1,
  "destination-2.jpg": destination2,
  "destination-3.jpg": destination3,
};

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

interface RelatedArticle extends ArticleFrontmatter {
  slug: string;
}

interface RelatedArticlesProps {
  currentSlug: string;
  currentCategory: string;
  currentTags: string[];
  locale?: string;
}

export const RelatedArticles = ({ currentSlug, currentCategory, currentTags, locale = "en" }: RelatedArticlesProps) => {
  const [articles, setArticles] = useState<RelatedArticle[]>([]);

  useEffect(() => {
    const loadRelatedArticles = async () => {
      try {
        const manifestResponse = await fetch('/content/articles-manifest.json');
        const manifest = await manifestResponse.json();
        
        const articlesData = await Promise.all(
          manifest.articles
            .filter((slug: string) => slug !== currentSlug)
            .map(async (slug: string) => {
              try {
                const response = await fetch(`/content/${locale}/articles/${slug}.md`);
                if (!response.ok) return null;
                
                const text = await response.text();
                const { frontmatter } = parseMarkdown(text);
                
                if (!frontmatter.published) return null;
                
                return {
                  ...(frontmatter as ArticleFrontmatter),
                  slug,
                };
              } catch {
                return null;
              }
            })
        );

        const validArticles = articlesData.filter((article): article is RelatedArticle => article !== null);
        
        // Score articles by relevance
        const scoredArticles = validArticles.map(article => {
          let score = 0;
          
          // Same category gets highest score
          if (article.category === currentCategory) score += 10;
          
          // Shared tags
          const sharedTags = article.tags.filter(tag => currentTags.includes(tag)).length;
          score += sharedTags * 5;
          
          return { article, score };
        });

        // Sort by score and take top 3
        const topArticles = scoredArticles
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(item => item.article);

        setArticles(topArticles);
      } catch (error) {
        console.error("Error loading related articles:", error);
      }
    };

    loadRelatedArticles();
  }, [currentSlug, currentCategory, currentTags, locale]);

  if (articles.length === 0) return null;

  return (
    <section className="border-t border-border pt-16 mt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Related Articles</h2>
        <p className="text-muted-foreground">Continue your journey with these stories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/${locale}/articles/${article.slug}`}
            className="group"
          >
            <Card className="overflow-hidden bg-card shadow-medium hover:shadow-strong transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={coverImages[article.cover] || `/images/${article.cover}`}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-accent text-accent-foreground shadow-medium">
                    {article.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{article.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{article.dateVisited}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
