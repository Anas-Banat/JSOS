
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from '@vercel/analytics/react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Login from "./pages/emp/EmpPortal";
import Dashboard from "./pages/emp/EmpDashboard";
import NewsDetail from "./pages/news/NewsDetail";
import AddNews from "./pages/news/AddNews";
import EditNews from "./pages/news/EditNews";
import EventDetail from "./pages/events/EventDetail";
import AddEvent from "./pages/events/AddEvent";
import EditEvent from "./pages/events/EditEvent";
import GalleryDetail from "./pages/gallery/GalleryDetail";
import AddGallery from "./pages/gallery/AddGallery";
import EditGallery from "./pages/gallery/EditGallery";
import Admin from "./pages/AccountsManagement";
import Setup from "./pages/Setup";

import AboutUs from "./pages/AboutUs";
import OrganizationChart from "./pages/organization/OrganizationChart";
import JsosMedia from "./pages/JsosMedia";
import FirstCongress from "./pages/FirstCongress";
import SecondCongress from "./pages/SecondCongress";
import ThirdCongress from "./pages/ThirdCongress";
import FourthCongress from "./pages/FourthCongress";
import FifthCongress from "./pages/FifthCongress";
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
// import News from "./pages/news/News";
import News from "./pages/News";
import Gallery from "./pages/gallery/Gallery";

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
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Analytics />
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <Routes>
          <Route path="/" element={<Index />} />
          
          <Route path="/setup" element={<Setup />} />

          
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/organization-chart" element={<OrganizationChart />} />
          <Route path="/jsos-media" element={<JsosMedia />} />
          <Route path="/first-congress" element={<FirstCongress />} />
          <Route path="/second-congress" element={<SecondCongress />} />
          <Route path="/third-congress" element={<ThirdCongress />} />
          <Route path="/fourth-congress" element={<FourthCongress />} />
          <Route path="/fifth-congress" element={<FifthCongress />} />
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
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/dashboard/add-news" element={
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <AddNews />
            </ProtectedRoute>
          } />
          <Route path="/edit-news/:id" element={
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <EditNews />
            </ProtectedRoute>
          } />
            <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/add-events" element={
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <AddEvent />
            </ProtectedRoute>
          } />
          <Route path="/edit-events/:id" element={
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <EditEvent />
            </ProtectedRoute>
          } />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
          <Route path="/add-gallery" element={
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <AddGallery />
            </ProtectedRoute>
          } />
          <Route path="/edit-gallery/:id" element={
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <EditGallery />
            </ProtectedRoute>
          } />
          <Route path="/emp-portal" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['admin', 'editor']}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/accounts-management" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );

export default App;
