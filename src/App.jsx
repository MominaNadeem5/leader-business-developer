
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToHash from "./components/layout/ScrollToHash";
import Home from "./pages/Home";
import StartLLC from "./pages/business-information/StartLLC/StartLLC";
import StartDBA from "./pages/business-information/DBA/DBA";
import Corporation from "./pages/business-information/Corporation/Corporation";
import SoleProprietorship from "./pages/business-information/SoleProprietorship/SoleProprietorship";
import StateFederalFilings from "./pages/business-information/StateFederalFilings/StateFederalFilings";
import Compliance from "./pages/grow-and-manage/Compliance/Compliance ";
import AnnualReport from "./pages/grow-and-manage/Annualreport/Annualreport";

import "./components/common/Button.css";
import "./components/common/Card.css";
import "./components/common/Icon.css";
import BusinessLicenses from "./pages/grow-and-manage/Businesslicenses/Businesslicenses";
import EinItin from "./pages/grow-and-manage/EIN/Einitin";
import OperatingAgreement from "./pages/grow-and-manage/OperatingAgreement/Operatingagreement";
import RegisteredAgent from "./pages/grow-and-manage/Registeredagent/Registeredagent";
import VirtualAddress from "./pages/grow-and-manage/Virtualaddress/Virtualaddress";
import Trademark from "./pages/safeguard-your-brand/Trademark/Trademark";
import NameCheck from "./pages/safeguard-your-brand/NameCheck/NameCheck";
import TrademarkSearch from "./pages/safeguard-your-brand/TrademarkSearch/TrademarkSearch";
import BrandWatch from "./pages/safeguard-your-brand/BrandWatch/BrandWatch";
import ProvisionalPatent from "./pages/safeguard-your-brand/ProvisionalPatent/ProvisionalPatent";
import Copyright from "./pages/safeguard-your-brand/Copyright/Copyright";
import MerchantAccountServices from "./pages/merchant/pages/MerchantAccount";
import PosSolutions from "./pages/merchant/pages/PosSolutions";
import VirtualTerminal from "./pages/merchant/pages/VirtualTerminal";
import BusinessBanking from "./pages/banking/BusinessBanking";
import AccountAssistance from "./pages/banking/AccountAssistance";
import CheckingSavings from "./pages/banking/CheckingSavings";
import LlcBanking from "./pages/banking/LlcBanking";
import CorporateBanking from "./pages/banking/CorporateBanking";
import StartupBanking from "./pages/banking/StartupBanking";
import SmallBusinessBanking from "./pages/banking/SmallBusinessBanking";
import InternationalBanking from "./pages/banking/InternationalBanking";
import NonResidentBanking from "./pages/banking/NonResidentBanking";
import PaymentSolutions from "./pages/banking/PaymentSolutions";
import MerchantAccount from "./pages/banking/MerchantAccount";
import CompareAccounts from "./pages/banking/CompareAccounts";
import BankingConsultation from "./pages/banking/BankingConsultation";
import VirtualBankAccount from "./pages/banking/VirtualBankAccount";
import PhysicalBankAccount from "./pages/banking/PhysicalBankAccount";
import BusinessAccountGuidance from "./pages/banking/BusinessAccountGuidance";
import PaymentIntegration from "./pages/payment-integration/PaymentIntegration";
import GatewayCustomization from "./pages/payment-integration/GatewayCustomization";
import ProviderSetup from "./pages/payment-integration/ProviderSetup";
import EcommerceIntegration from "./pages/payment-integration/EcommerceIntegration";
import ApiIntegration from "./pages/payment-integration/ApiIntegration";
import EcommerceSolutions from "./pages/ecommerce/EcommerceSolutions";
import ProductListing from "./pages/ecommerce/ProductListing";
import CartCheckout from "./pages/ecommerce/CartCheckout";
import InventoryOrders from "./pages/ecommerce/InventoryOrders";
import ShippingFulfillment from "./pages/ecommerce/ShippingFulfillment";
import MarketplaceIntegration from "./pages/ecommerce/MarketplaceIntegration";
import AmazonSetup from "./pages/ecommerce/AmazonSetup";
import WebsiteSetup from "./pages/website/WebsiteSetup";
import DomainHosting from "./pages/website/DomainHosting";
import WordPressSetup from "./pages/website/WordPressSetup";
import ShopifySetup from "./pages/website/ShopifySetup";
import WebsiteMaintenance from "./pages/website/WebsiteMaintenance";
import BrandingServices from "./pages/branding/BrandingServices";
import ProfileOptimization from "./pages/branding/ProfileOptimization";
import LogoDesign from "./pages/branding/LogoDesign";
import EmailDigitalCards from "./pages/branding/EmailDigitalCards";
import MarketingServices from "./pages/marketing/MarketingServices";
import GoogleAds from "./pages/marketing/GoogleAds";
import TwitterAds from "./pages/marketing/TwitterAds";
import MetaAds from "./pages/marketing/MetaAds";
import LegalForms from "./pages/forms/LegalForms";
import BusinessContract from "./pages/forms/BusinessContract";
import PartnershipAgreement from "./pages/forms/PartnershipAgreement";
import NdaAgreement from "./pages/forms/NdaAgreement";
import ServiceAgreement from "./pages/forms/ServiceAgreement";
import InvoiceReceipt from "./pages/forms/InvoiceReceipt";
import ArticlesOfOrganization from "./pages/forms/ArticlesOfOrganization";
import OperatingAgreementForm from "./pages/forms/OperatingAgreementForm";
import DbaForm from "./pages/forms/DbaForm";
import EinForm from "./pages/forms/EinForm";
import AnnualReportForm from "./pages/forms/AnnualReportForm";
import LearnHub from "./pages/resources/LearnHub";
import StartBusiness from "./pages/resources/StartBusiness";
import LlcVsCorporation from "./pages/resources/LlcVsCorporation";
import BusinessName from "./pages/resources/BusinessName";
import ComplianceGuide from "./pages/resources/Compliance";
import ToolsHub from "./pages/resources/ToolsHub";
import NameGenerator from "./pages/resources/NameGenerator";
import NameAvailability from "./pages/resources/NameCheck";
import ComplianceCheck from "./pages/resources/ComplianceCheck";
import CostCalculator from "./pages/resources/CostCalculator";
import SupportHub from "./pages/resources/SupportHub";
import HelpCenter from "./pages/resources/HelpCenter";
import Faqs from "./pages/resources/Faqs";
import Consultation from "./pages/resources/Consultation";
import Contact from "./pages/resources/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import GetStarted from "./pages/get-started/GetStarted";
import ThankYou from "./pages/get-started/ThankYou";

export const SITE_URL = import.meta.env.VITE_SITE_URL;

function NotFound() {
  return (
    <section className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist yet.</p>
      <a href="/" style={{ display: "inline-block", marginTop: "20px" }}>
        Back to Home
      </a>
    </section>
  );
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business/llc" element={<StartLLC />} />
          <Route path="/business/corporation" element={<Corporation />} />
          <Route path="/business/dba" element={<StartDBA />} />
          <Route
            path="/business/sole-proprietor"
            element={<SoleProprietorship />}
          />

          <Route
            path="/business/federal-filing"
            element={<StateFederalFilings />}
          />


          <Route path="/business/compliance" element={<Compliance />} />
          <Route path="/business/annual-report" element={<AnnualReport />} />
          <Route path="/business/licenses" element={<BusinessLicenses />} />
          <Route path="/business/ein" element={<EinItin />} />
          <Route path="/business/operating-agreement" element={<OperatingAgreement />} />
          <Route path="/business/registered-agent" element={<RegisteredAgent />} />
          <Route path="/business/virtual-address" element={<VirtualAddress />} />
          <Route path="/business/trademark" element={<Trademark />} />
          <Route path="/business/free-name-check" element={<NameCheck />} />
          <Route path="/business/trademark-search" element={<TrademarkSearch />} />
          <Route path="/business/brand-watch" element={<BrandWatch />} />
          <Route path="/business/provisional-patent" element={<ProvisionalPatent />} />
          <Route path="/business/copyright" element={<Copyright />} />

          {/* Merchant Solutions (the 3 items in the navbar dropdown) */}
          <Route path="/merchant/merchant-account" element={<MerchantAccountServices />} />
          <Route path="/merchant/pos-terminal" element={<PosSolutions />} />
          <Route path="/merchant/virtual-terminal" element={<VirtualTerminal />} />

          {/* Banking Solutions */}
          <Route path="/banking" element={<BusinessBanking />} />
          <Route path="/banking/virtual-bank" element={<VirtualBankAccount />} />
          <Route path="/banking/physical-bank" element={<PhysicalBankAccount />} />
          <Route path="/banking/business-account-guidance" element={<BusinessAccountGuidance />} />
          <Route path="/banking/account-assistance" element={<AccountAssistance />} />
          <Route path="/banking/checking-savings" element={<CheckingSavings />} />
          <Route path="/banking/llc" element={<LlcBanking />} />
          <Route path="/banking/corporate" element={<CorporateBanking />} />
          <Route path="/banking/startups" element={<StartupBanking />} />
          <Route path="/banking/small-business" element={<SmallBusinessBanking />} />
          <Route path="/banking/international" element={<InternationalBanking />} />
          <Route path="/banking/non-residents" element={<NonResidentBanking />} />
          <Route path="/banking/payments" element={<PaymentSolutions />} />
          <Route path="/banking/merchant-account" element={<MerchantAccount />} />
          <Route path="/banking/compare" element={<CompareAccounts />} />
          <Route path="/banking/consultation" element={<BankingConsultation />} />

          {/* Payment Integration */}
          <Route path="/payment-integration" element={<PaymentIntegration />} />
          <Route path="/payment-integration/gateway" element={<GatewayCustomization />} />
          <Route path="/payment-integration/stripe-square-paypal" element={<ProviderSetup />} />
          <Route path="/payment-integration/shopify-woocommerce" element={<EcommerceIntegration />} />
          <Route path="/payment-integration/api" element={<ApiIntegration />} />

          {/* Ecommerce Solutions */}
          <Route path="/ecommerce" element={<EcommerceSolutions />} />
          <Route path="/ecommerce/product-listing" element={<ProductListing />} />
          <Route path="/ecommerce/cart-checkout" element={<CartCheckout />} />
          <Route path="/ecommerce/inventory-orders" element={<InventoryOrders />} />
          <Route path="/ecommerce/shipping" element={<ShippingFulfillment />} />
          <Route path="/ecommerce/marketplaces" element={<MarketplaceIntegration />} />
          <Route path="/ecommerce/amazon-setup" element={<AmazonSetup />} />

          {/* Website Setup */}
          <Route path="/website" element={<WebsiteSetup />} />
          <Route path="/website/domain-hosting" element={<DomainHosting />} />
          <Route path="/website/wordpress" element={<WordPressSetup />} />
          <Route path="/website/shopify" element={<ShopifySetup />} />
          <Route path="/website/maintenance" element={<WebsiteMaintenance />} />

          {/* Branding & Digital Identity */}
          <Route path="/branding" element={<BrandingServices />} />
          <Route path="/branding/profile-optimization" element={<ProfileOptimization />} />
          <Route path="/branding/logo-design" element={<LogoDesign />} />
          <Route path="/branding/email-digital-cards" element={<EmailDigitalCards />} />

          {/* Marketing Services */}
          <Route path="/marketing" element={<MarketingServices />} />
          <Route path="/marketing/google-ads" element={<GoogleAds />} />
          <Route path="/marketing/twitter-ads" element={<TwitterAds />} />
          <Route path="/marketing/meta-ads" element={<MetaAds />} />

          {/* Legal Form */}
          <Route path="/forms/legal" element={<LegalForms />} />
          <Route path="/forms/contract" element={<BusinessContract />} />
          <Route path="/forms/templates/partnership" element={<PartnershipAgreement />} />
          <Route path="/forms/templates/nda" element={<NdaAgreement />} />
          <Route path="/forms/templates/service-agreement" element={<ServiceAgreement />} />
          <Route path="/forms/invoice" element={<InvoiceReceipt />} />
          <Route path="/forms/legal/articles-of-organization" element={<ArticlesOfOrganization />} />
          <Route path="/forms/legal/operating-agreement" element={<OperatingAgreementForm />} />
          <Route path="/forms/legal/dba" element={<DbaForm />} />
          <Route path="/forms/legal/ein" element={<EinForm />} />
          <Route path="/forms/legal/annual-report" element={<AnnualReportForm />} />

          {/* Resources: Learn */}
          <Route path="/resources/learn" element={<LearnHub />} />
          <Route path="/resources/learn/start-business" element={<StartBusiness />} />
          <Route path="/resources/learn/llc-vs-corporation" element={<LlcVsCorporation />} />
          <Route path="/resources/learn/business-name" element={<BusinessName />} />
          <Route path="/resources/learn/compliance" element={<ComplianceGuide />} />

          {/* Resources: Free Tools */}
          <Route path="/resources/tools" element={<ToolsHub />} />
          <Route path="/resources/tools/name-generator" element={<NameGenerator />} />
          <Route path="/resources/tools/name-check" element={<NameAvailability />} />
          <Route path="/resources/tools/compliance-check" element={<ComplianceCheck />} />
          <Route path="/resources/tools/cost-calculator" element={<CostCalculator />} />

          {/* Resources: Support */}
          <Route path="/resources/support" element={<SupportHub />} />
          <Route path="/resources/support/help" element={<HelpCenter />} />
          <Route path="/resources/support/faqs" element={<Faqs />} />
          <Route path="/consultation" element={<Consultation />} />

          {/* Get Started quote flow: all 7 steps render on this one URL; submitting goes to /thank-you */}
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/contact" element={<Contact />} />

          {/* Account */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/sign-in" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Navigate to="/register" replace />} />
          <Route path="/forgot-password" element={<Navigate to="/reset-password" replace />} />

          {/* Other pages not implemented yet */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}