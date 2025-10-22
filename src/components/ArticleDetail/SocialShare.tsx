import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Share2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  title: string;
  url: string;
}

export const SocialShare = ({ title, url }: SocialShareProps) => {
  const shareUrl = `${window.location.origin}${url}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:text-[#1DA1F2]",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-[#1877F2]",
    },
    {
      name: "Pinterest",
      icon: Share2,
      url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      color: "hover:text-[#E60023]",
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            onClick={() => window.open(link.url, '_blank', 'width=600,height=400')}
            className={`transition-colors ${link.color}`}
          >
            <Icon className="w-4 h-4" />
          </Button>
        );
      })}
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="transition-colors hover:text-accent"
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
