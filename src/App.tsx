
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Members from "./pages/Members";
import OrganizationChart from "./pages/OrganizationChart";
import JsosMedia from "./pages/JsosMedia";
import FirstCongress from "./pages/FirstCongress";
import SecondCongress from "./pages/SecondCongress";
import ThirdCongress from "./pages/ThirdCongress";
import FourthCongress from "./pages/FourthCongress";
import AlKindiWorkshop from "./pages/AlKindiWorkshop";
import Workshop from "./pages/Workshop";
import JsosBylaw from "./pages/JsosBylaw";
import DoctorGuidelines from "./pages/DoctorGuidelines";
import PracticalRecommendations from "./pages/PracticalRecommendations";
import EuropeanGuidelines from "./pages/EuropeanGuidelines";
import ObesityCountries from "./pages/ObesityCountries";
import NutritionalGuidelines from "./pages/NutritionalGuidelines";
import Bmi from "./pages/Bmi";
import Candidate from "./pages/Candidate";
import Disease from "./pages/Disease";
import GastricBanding from "./pages/GastricBanding";
import BilioPancreatic from "./pages/BilioPancreatic";
import OneAnastomosis from "./pages/OneAnastomosis";
import RouxEnY from "./pages/RouxEnY";
import SleeveGastrectomy from "./pages/SleeveGastrectomy";
import ClinicalTrials from "./pages/ClinicalTrials";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import News from "./pages/News";
import Gallery from "./pages/Gallery";

// مكون للتمرير إلى أعلى الصفحة عند تغيير المسار
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/members" element={<Members />} />
          <Route path="/organization-chart" element={<OrganizationChart />} />
          <Route path="/jsos-media" element={<JsosMedia />} />
          <Route path="/first-congress" element={<FirstCongress />} />
          <Route path="/second-congress" element={<SecondCongress />} />
          <Route path="/third-congress" element={<ThirdCongress />} />
          <Route path="/fourth-congress" element={<FourthCongress />} />
          <Route path="/al-kindi-workshop" element={<AlKindiWorkshop />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/jsos-bylaw" element={<JsosBylaw />} />
          <Route path="/doctor-guidelines" element={<DoctorGuidelines />} />
          <Route path="/practical-recommendations" element={<PracticalRecommendations />} />
          <Route path="/european-guidelines" element={<EuropeanGuidelines />} />
          <Route path="/obesity-countries" element={<ObesityCountries />} />
          <Route path="/nutritional-guidelines" element={<NutritionalGuidelines />} />
          <Route path="/bmi" element={<Bmi />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/gastric-banding" element={<GastricBanding />} />
          <Route path="/biliopancreatic" element={<BilioPancreatic />} />
          <Route path="/one-anastomosis" element={<OneAnastomosis />} />
          <Route path="/roux-en-y" element={<RouxEnY />} />
          <Route path="/sleeve-gastrectomy" element={<SleeveGastrectomy />} />
          <Route path="/clinical-trials" element={<ClinicalTrials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
