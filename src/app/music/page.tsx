import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '../components/seo/SEOHead';
import MusicPage from './MusicPage';

export const metadata: Metadata = generateSEOMetadata({
  title: "Music - Cosmic Soundtrack by BGMCandy",
  description: "Listen to the cosmic soundtrack created by BGMCandy for the Andreas Mogensen fansite. Space-themed ambient music perfect for your cosmic journey.",
  canonical: "/music",
  keywords: [
    "space music",
    "cosmic soundtrack",
    "BGMCandy",
    "ambient space music",
    "astronaut music",
    "space exploration music",
    "electronic space music",
    "space rock",
    "dream pop space"
  ],
  type: "website",
});

export default function Music() {
  return <MusicPage />;
}   