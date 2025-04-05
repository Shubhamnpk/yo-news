export interface Article {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  source: string;
  content?: string;
  id: string;
  isBookmarked?: boolean;
  isReadLater?: boolean;
}

export interface Settings {
  newsSources: string[];
  articlesPerPage: number;
  language: 'en' | 'np';
  contentLanguage: 'en' | 'np';
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  showReadingTime: boolean;
  enableSocialShare: boolean;
  showThumbnails: boolean;
  hasSeenWelcome: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface FeedUrls {
  [key: string]: {
    all: string[];
    [category: string]: string | string[];
  };
}

export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}