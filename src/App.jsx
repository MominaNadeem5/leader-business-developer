
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToHash from "./components/layout/ScrollToHash";
import Home from "./pages/Home";
import StartLLC from "./pages/business-information/StartLLC/StartLLC";

import "./components/common/Button.css";
import "./components/common/Card.css";
import "./components/common/Icon.css";
import StartDBA from "./pages/business-information/DBA/DBA";
import Corporation from "./pages/business-information/Corporation/Corporation";
import SoleProprietorship from "./pages/business-information/SoleProprietorship/SoleProprietorship";
import StateFederalFilings from "./pages/business-information/StateFederalFilings/StateFederalFilings";
import Compliance from "./pages/business-information/Compliance/Compliance ";
import AnnualReport from "./pages/business-information/Annualreport/Annualreport";

// Production website URL from .env
export const SITE_URL = import.meta.env.VITE_SITE_URL;

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
            path="/business/federal-filling"
            element={<StateFederalFilings />}
          />
          <Route path="/business/compliance" element={<Compliance />} />
          <Route path="/business/annual-report" element={<AnnualReport />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
