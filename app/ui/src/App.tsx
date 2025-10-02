import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { FlightImport } from './components/FlightImport';
import { RegionRating } from './components/RegionRating';
import { Analytics } from './components/Analytics';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { ApiDocumentation } from './components/ApiDocumentation';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole, setUserRole] = useState<'operator' | 'administrator'>('operator');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'import':
        return <FlightImport />;
      case 'rating':
        return <RegionRating />;
      case 'analytics':
        return <Analytics />;
      case 'reports':
        return <Reports />;
      case 'api':
        return <ApiDocumentation />;
      case 'settings':
        return <Settings userRole={userRole} setUserRole={setUserRole} />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        userRole={userRole}
      />
      <main className="flex-1 p-6 bg-background">
        {renderPage()}
      </main>
    </div>
  );
}