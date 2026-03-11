import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { EditableContentProvider } from "@/lib/editable-content";
import ScrollToTop from "./components/ScrollToTop";
import Seo from "./components/Seo";
import Layout from "./components/Layout";
import Index from "./pages/Index";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const SportsPage = lazy(() => import("./pages/SportsPage"));
const SportDetailPage = lazy(() => import("./pages/SportDetailPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const ExperiencesPage = lazy(() => import("./pages/ExperiencesPage"));
const GetInvolvedPage = lazy(() => import("./pages/GetInvolvedPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();
const RouteFallback = <div className="min-h-screen bg-background" aria-hidden="true" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EditableContentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Seo />
          <Suspense fallback={RouteFallback}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/team" element={<AboutPage />} />
                <Route path="/about" element={<Navigate to="/team" replace />} />
                <Route path="/sports" element={<SportsPage />} />
                <Route path="/sports/:sport" element={<SportDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/experiences" element={<ExperiencesPage />} />
                <Route path="/get-involved" element={<GetInvolvedPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/partners" element={<PartnersPage />} />
              </Route>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </EditableContentProvider>
  </QueryClientProvider>
);

export default App;
