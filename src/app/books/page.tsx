
import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '../components/seo/SEOHead';
import BooksPage from './BooksPage';

export const metadata: Metadata = generateSEOMetadata({
  title: "Books - Andreas Mogensen's Space Chronicles",
  description: "Explore Andreas Mogensen's books about space exploration, astronaut training, and life aboard the International Space Station. Discover his memoirs and insights from space missions.",
  canonical: "/books",
  keywords: [
    "Andreas Mogensen books",
    "astronaut books",
    "space memoirs",
    "International Space Station",
    "astronaut training",
    "space exploration books",
    "ESA astronaut",
    "space chronicles",
    "zero gravity",
    "space photography"
  ],
  type: "website",
});

export default function Books() {
  return <BooksPage />;
}