import Hero from "../components/features/Hero";
import TrustBar from "../components/features/TrustBar";
import ServicesGrid from "../components/features/ServicesGrid";
import PaymentFeature from "../components/features/PaymentFeature";
import HowItWorks from "../components/features/HowItWorks";
import LegalHelp from "../components/features/LegalHelp";
import MoreServices from "../components/features/MoreServices";
import Reviews from "../components/features/Reviews";

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <PaymentFeature />
      <HowItWorks />
      <LegalHelp />
      <MoreServices />
      <Reviews />
    </div>
  );
}