
import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '../components/seo/SEOHead';
import ClaimDomainPage from './ClaimDomainPage';

export const metadata: Metadata = generateSEOMetadata({
  title: "Claim Domain - andreasmogensen.dk Available",
  description: "The domain andreasmogensen.dk is available for Andreas Mogensen to claim. This unofficial fansite offers the domain to the Danish ESA astronaut for his official use.",
  canonical: "/claim-domain",
  keywords: [
    "andreasmogensen.dk",
    "domain claim",
    "Andreas Mogensen domain",
    "ESA astronaut domain",
    "official website",
    "domain transfer",
    "Danish astronaut"
  ],
  type: "website",
  noindex: true, // This page should not be indexed as it's a private offer
});

export default function ClaimDomain() {
  return <ClaimDomainPage />;
}