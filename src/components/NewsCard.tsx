import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Share2, Clock, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';
import { calculateReadingTime } from '../utils/readingTime';
import { sanitizeHtml } from '../utils/sanitizeHtml';
import { Article } from '../types/news';

interface NewsCardProps {
  article: Article;
  index: number;
  showReadingTime: boolean;
  enableSocialShare: boolean;
  showThumbnails: boolean;
  language: 'en' | 'np';
  onBookmark: (articleId: string) => void;
  onReadLater: (articleId: string) => void;
}

const fallbackImages = [
  'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1000',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000',
  'https://images.unsplash.com/photo-1557428894-56bcc97113fe?q=80&w=1000',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1000',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000',
  'https://images.unsplash.com/photo-1504465039710-0cc49c2b5919?q=80&w=1000',
  'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000'
];

export function NewsCard({
  article,
  index,
  showReadingTime,
  enableSocialShare,
  showThumbnails,
  language,
  onBookmark,
  onReadLater
}: NewsCardProps) {
  const readingTime = showReadingTime ? calculateReadingTime(article.content || article.description) : 0;
  const fallbackImage = fallbackImages[index % fallbackImages.length];
  const sanitizedDescription = sanitizeHtml(article.description);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-surface border border-border/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {showThumbnails && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={article.thumbnail || fallbackImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackImage) {
                target.src = fallbackImage;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/20 to-transparent" />
        </div>
      )}

      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {article.source}
          </span>
          <time className="text-secondary" dateTime={article.pubDate}>
            {format(new Date(article.pubDate), 'MMM d, yyyy')}
          </time>
        </div>

        <h2 className="text-xl font-bold mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {article.title}
        </h2>

        <div 
          className="text-secondary line-clamp-3 mb-4 flex-grow"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/10">
          <div className="flex items-center gap-4">
            {showReadingTime && (
              <span className="flex items-center text-sm text-secondary">
                <Clock className="h-4 w-4 mr-1" />
                {readingTime} {language === 'en' ? 'min' : 'मिनेट'}
              </span>
            )}
            {enableSocialShare && (
              <div className="flex items-center gap-2">
                <TwitterShareButton url={article.link} title={article.title}>
                  <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                    <Share2 className="h-4 w-4 text-secondary hover:text-primary" />
                  </button>
                </TwitterShareButton>
                <button 
                  onClick={() => onBookmark(article.id)}
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                  title={language === 'en' ? 'Bookmark' : 'बुकमार्क'}
                >
                  {article.isBookmarked ? (
                    <BookmarkCheck className="h-4 w-4 text-primary" />
                  ) : (
                    <Bookmark className="h-4 w-4 text-secondary hover:text-primary" />
                  )}
                </button>
              </div>
            )}
          </div>

          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary font-medium hover:text-primary-dark transition-colors"
          >
            {language === 'en' ? 'Read More' : 'थप पढ्नुहोस्'}
            <ExternalLink className="h-4  w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}