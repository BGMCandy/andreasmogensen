import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '../components/seo/SEOHead';
import AboutPage from './AboutPage';

export const metadata: Metadata = generateSEOMetadata({
  title: "About - Andreas Mogensen Fansite",
  description: "Learn about this unofficial fansite dedicated to Andreas Mogensen, the Danish ESA astronaut. Discover the story behind the site and its creator.",
  canonical: "/about",
  keywords: [
    "Andreas Mogensen",
    "Danish astronaut",
    "ESA astronaut",
    "fansite",
    "space exploration",
    "astronaut biography",
    "unofficial website",
    "space enthusiast"
  ],
  type: "website",
});

export default function About() {
  return <AboutPage />;
}