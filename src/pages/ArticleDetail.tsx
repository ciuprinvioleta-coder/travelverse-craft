import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { parseMarkdown } from "@/lib/markdown-parser";
import { SocialShare } from "@/components/ArticleDetail/SocialShare";
import { RelatedArticles } from "@/components/ArticleDetail/RelatedArticles";
import destination1 from "@/assets/destination-1.jpg";
import destination2 from "@/assets/destination-2.jpg";
import destination3 from "@/assets/destination-3.jpg";

// Map cover filenames to imported images
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
  mapEmbedUrl?: string;
  bestTime?: {
    months: string;
    notes: string;
  };
}

interface Article extends ArticleFrontmatter {
  content: string;
  slug: string;
}

const ArticleDetail = () => {
  const { locale = "en", slug } = useParams<{ locale: string; slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch(`/content/${locale}/articles/${slug}.md`);
        if (!response.ok) throw new Error("Article not found");
        
        const text = await response.text();
        const { frontmatter, content } = parseMarkdown(text);
        
        setArticle({
          ...(frontmatter as ArticleFrontmatter),
          content,
          slug: slug || "",
        });
      } catch (error) {
        console.error("Error loading article:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [locale, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <p className="text-muted-foreground">Loading article...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <Link to={`/${locale}/articles`}>
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <Link to={`/${locale}/articles`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>

        {/* Hero Section with Cover Image */}
        <section className="relative h-[60vh] min-h-[400px] mb-12">
          <img
            src={coverImages[article.cover] || `/images/${article.cover}`}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 lg:px-8 pb-12">
            <Badge className="mb-4 bg-accent text-accent-foreground">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{article.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{article.dateVisited}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="container mx-auto px-4 lg:px-8 max-w-4xl pb-16">
          {/* Summary */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {article.summary}
          </p>

          {/* Tags & Share */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <SocialShare 
              title={article.title} 
              url={`/${locale}/articles/${article.slug}`} 
            />
          </div>

          {/* Best Time to Visit */}
          {article.bestTime && (
            <div className="bg-secondary/30 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-bold mb-3">📅 Best Time to Visit</h3>
              <p className="font-semibold text-foreground mb-2">{article.bestTime.months}</p>
              <p className="text-muted-foreground">{article.bestTime.notes}</p>
            </div>
          )}

          {/* Article Body Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-li:text-muted-foreground
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ 
              __html: article.content
                .replace(/\n\n/g, '</p><p>')
                .replace(/^/, '<p>')
                .replace(/$/, '</p>')
                .replace(/#{3}\s+(.+)/g, '<h3>$1</h3>')
                .replace(/#{2}\s+(.+)/g, '<h2>$1</h2>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            }}
          />

          {/* Embedded Map */}
          {article.mapEmbedUrl && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">🗺️ Interactive Map</h2>
              <div className="aspect-video rounded-lg overflow-hidden shadow-strong">
                <iframe
                  src={article.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Route Map"
                />
              </div>
            </div>
          )}

          {/* Related Articles */}
          <RelatedArticles 
            currentSlug={article.slug}
            currentCategory={article.category}
            currentTags={article.tags}
            locale={locale}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
