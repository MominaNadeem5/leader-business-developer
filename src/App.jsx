
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
          {/* Other pages not implemented yet */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}