import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from './components/seo/SEOHead';
import HomePage from './HomePage';

export const metadata: Metadata = generateSEOMetadata({
  title: "Andreas Mogensen - Danish ESA Astronaut",
  description: "Welcome to the unofficial fansite of Andreas Mogensen, the Danish ESA astronaut. Learn about his space missions, training, and achievements in space exploration.",
  canonical: "/",
  keywords: [
    "Andreas Mogensen",
    "Danish astronaut",
    "ESA astronaut",
    "International Space Station",
    "ISS",
    "space exploration",
    "astronaut biography",
    "European Space Agency",
    "space missions",
    "astronaut training",
    "Copenhagen astronaut",
    "Danish space program"
  ],
  type: "website",
});

export default function Home() {
  return <HomePage />;
}
