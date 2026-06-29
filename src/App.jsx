import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { Onboarding } from './pages/Onboarding.jsx';
import { ProfileCreation } from './pages/ProfileCreation.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Loading } from './pages/Loading.jsx';

const AppContent = () => {
  const { profile, loading } = useAuth();
  const [page, setPage] = React.useState('loading');
  const [selectedRole, setSelectedRole] = React.useState(null);

  React.useEffect(() => {
    if (!loading) {
      if (profile) {
        setPage('dashboard');
      } else {
        setPage('onboarding');
      }
    }
  }, [loading, profile]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setPage('profile');
  };

  const handleProfileSave = () => {
    setPage('dashboard');
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#070707] text-white p-6 md:p-12 font-sans">
      {page === 'onboarding' && (
        <Onboarding onRoleSelect={handleRoleSelect} />
      )}
      
      {page === 'profile' && (
        <ProfileCreation 
          role={selectedRole}
          onBack={() => setPage('onboarding')}
          onSave={handleProfileSave}
        />
      )}
      
      {page === 'dashboard' && (
        <Dashboard />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}