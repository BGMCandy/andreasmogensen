import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '../components/seo/SEOHead';
import ContactPage from './ContactPage';

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact - Andreas Mogensen Fansite",
  description: "Get in touch with the creator of this unofficial Andreas Mogensen fansite. Contact information for domain inquiries and general questions about the site.",
  canonical: "/contact",
  keywords: [
    "contact Andreas Mogensen fansite",
    "domain inquiry",
    "fansite contact",
    "space enthusiast",
    "website feedback",
    "domain claim"
  ],
  type: "website",
});

export default function Contact() {
  return <ContactPage />;
}       