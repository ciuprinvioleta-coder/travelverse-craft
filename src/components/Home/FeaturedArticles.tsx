import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import destination1 from "@/assets/destination-1.jpg";
import destination2 from "@/assets/destination-2.jpg";
import destination3 from "@/assets/destination-3.jpg";

const articles = [
  {
    id: 1,
    title: "Hidden Gems of the Mediterranean Coast",
    excerpt: "Discover the charming villages and pristine beaches that tourists often miss along the stunning Mediterranean coastline.",
    image: destination1,
    country: "Italy",
    date: "March 15, 2024",
    category: "Coastal",
  },
  {
    id: 2,
    title: "Ancient Temples of Southeast Asia",
    excerpt: "Journey through time as we explore the magnificent temple complexes hidden in the jungles of Cambodia and Thailand.",
    image: destination2,
    country: "Cambodia",
    date: "March 10, 2024",
    category: "Adventure",
  },
  {
    id: 3,
    title: "Chasing Northern Lights in Scandinavia",
    excerpt: "A complete guide to witnessing the magical aurora borealis in Norway's Arctic wilderness during winter.",
    image: destination3,
    country: "Norway",
    date: "March 5, 2024",
    category: "Nature",
  },
];

export const FeaturedArticles = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get inspired by our latest travel adventures and insider tips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} to={`/articles/${article.id}`}>
              <Card className="overflow-hidden group cursor-pointer h-full bg-card shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{article.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/articles">
            <button className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-medium">
              View All Articles
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
