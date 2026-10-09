import type { Metadata } from "next";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { Hero } from "@/components/landing/Hero";
import { HighlightsSection } from "@/components/landing/HighlightsSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { PricingSection } from "@/components/landing/PricingSection";
import { ProblemsSection } from "@/components/landing/ProblemsSection";
import { ResponsiveSection } from "@/components/landing/ResponsiveSection";
import { StructuredData } from "@/components/landing/StructuredData";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function LandingPage() {
  return (
    <div className="landing-root min-h-full bg-background">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <LandingHeader />
      <main id="conteudo" className="overflow-x-clip">
        <Hero />
        <ProblemsSection />
        <FeaturesSection />
        <HighlightsSection />
        <HowItWorksSection />
        <PricingSection />
        <ResponsiveSection />
        <BenefitsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
      <StructuredData />
    </div>
  );
}
