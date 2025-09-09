import { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function generateMetadata({
  title,
  description,
  canonical,
  keywords = [],
  author = 'Andreas Mogensen Fansite',
  publishedTime,
  modifiedTime,
  image = 'https://andreasmogensen.dk/og-image.jpg',
  imageAlt = 'Andreas Mogensen - Danish ESA Astronaut',
  type = 'website',
  locale = 'en_US',
  siteName = 'Andreas Mogensen - Unofficial Fansite',
  twitterCard = 'summary_large_image',
  twitterSite = '@andreasmogensen',
  twitterCreator = '@andreasmogensen',
  noindex = false,
  nofollow = false,
}: SEOProps): Metadata {
  const baseUrl = 'https://andreasmogensen.dk';
  const fullTitle = title.includes('Andreas Mogensen') ? title : `${title} | Andreas Mogensen`;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined;
  
  const robots = [];
  if (noindex) robots.push('noindex');
  if (nofollow) robots.push('nofollow');
  if (!noindex && !nofollow) robots.push('index', 'follow');

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: [{ name: author }],
    creator: author,
    publisher: siteName,
    robots: robots.join(', '),
    openGraph: {
      type,
      locale,
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      site: twitterSite,
      creator: twitterCreator,
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'article:author': author,
      'article:publisher': siteName,
    },
  };

  if (publishedTime) {
    metadata.other!['article:published_time'] = publishedTime;
  }

  if (modifiedTime) {
    metadata.other!['article:modified_time'] = modifiedTime;
  }

  return metadata;
}

export function generateStructuredData({
  title,
  description,
  canonical,
  type = 'website',
  author = 'Andreas Mogensen Fansite',
  publishedTime,
  modifiedTime,
  image = 'https://andreasmogensen.dk/og-image.jpg',
}: Partial<SEOProps>) {
  const baseUrl = 'https://andreasmogensen.dk';
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;

  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    name: title,
    description,
    url,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Andreas Mogensen - Unofficial Fansite',
      url: baseUrl,
    },
    image: image,
    inLanguage: 'en-US',
  };

  if (type === 'article' && publishedTime) {
    return {
      ...baseStructuredData,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
    };
  }

  return baseStructuredData;
}
