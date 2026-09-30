import React, { useEffect } from 'react';
import { useRouter } from './services/router';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { DevelopersPage } from './pages/DevelopersPage';
import { DeveloperDetailPage } from './pages/DeveloperDetailPage';
import { BrokersPage } from './pages/BrokersPage';
import { ForBusinessPage } from './pages/ForBusinessPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ComparePage } from './pages/ComparePage';
import { ListPropertyPage } from './pages/ListPropertyPage';
import { ListProjectPage } from './pages/ListProjectPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage, PrivacyPage, TermsPage } from './pages/ContactPage';

export default function App() {
  const { path } = useRouter();

  // Dynamic SEO schema injection
  useEffect(() => {
    const existingScript = document.getElementById('aqrevia-schema');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'aqrevia-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: 'AQREVIA',
        description: 'Modern real-estate marketplace and business growth platform.',
        url: window.location.origin,
        areaServed: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR'],
        serviceType: [
          'Property Discovery',
          'Real Estate Listing',
          'Performance Marketing',
          'Video Production',
          'AI Lead Qualification',
        ],
      });
      document.head.appendChild(script);
    }
  }, []);

  const renderContent = () => {
    // 1. Property Details
    if (path.startsWith('/property/')) {
      return <PropertyDetailPage />;
    }

    // 2. Project Details
    if (path.startsWith('/project/')) {
      return <ProjectDetailPage />;
    }

    // 3. Developer Details
    if (path.startsWith('/developer/')) {
      return <DeveloperDetailPage />;
    }

    // 4. Growth Service Details
    if (path.startsWith('/services/')) {
      return <ServiceDetailPage />;
    }

    // 5. Properties Catalog (including /properties/city)
    if (path.startsWith('/properties')) {
      return <PropertiesPage />;
    }

    // Standard static routes
    switch (path) {
      case '/projects':
        return <ProjectsPage />;
      case '/developers':
        return <DevelopersPage />;
      case '/brokers':
        return <BrokersPage />;
      case '/for-business':
        return <ForBusinessPage />;
      case '/services':
        return <ServicesPage />;
      case '/compare':
        return <ComparePage />;
      case '/list-property':
        return <ListPropertyPage />;
      case '/list-project':
        return <ListProjectPage />;
      case '/dashboard':
        return <DashboardPage />;
      case '/admin':
        return <AdminPage />;
      case '/resources':
      case '/blog':
        return <ResourcesPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#121316]">
      <Navbar />
      <main className="flex-1">{renderContent()}</main>
      <Footer />
    </div>
  );
}
