
import { Routes, Route } from "react-router-dom";
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

          {/* Other pages not implemented yet */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}