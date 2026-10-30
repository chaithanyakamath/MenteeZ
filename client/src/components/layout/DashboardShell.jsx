import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';

const DashboardShellContext = createContext(false);

export const DashboardShell = ({ children }) => {
  const isNested = useContext(DashboardShellContext);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const scrollPositions = useRef({});

  // Sensible scroll restoration between primary categories (Section 8 Requirement)
  useEffect(() => {
    if (prevPathRef.current) {
      scrollPositions.current[prevPathRef.current] = window.scrollY;
    }

    const currentPath = location.pathname;
    const isTopCategory = [
      '/dashboard',
      '/mentees',
      '/academic-records',
      '/academics',
      '/documents',
      '/meetings',
      '/analytics',
      '/users',
      '/mentor-assignments',
      '/settings',
      '/profile',
    ].includes(currentPath);

    if (isTopCategory && prevPathRef.current !== currentPath) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    prevPathRef.current = currentPath;
  }, [location.pathname]);

  // If already rendered inside the persistent application shell, render content directly
  if (isNested) {
    return <>{children || <Outlet />}</>;
  }

  return (
    <DashboardShellContext.Provider value={true}>
      <div className="app-shell min-h-screen bg-brand-surface font-sans text-brand-dark antialiased">
        <Sidebar />
        <div className="app-workspace">
          <TopNavbar />
          <main className="app-main">
            <div
              key={location.pathname}
              className="page-transition-enter w-full flex flex-col gap-6 flex-1"
            >
              {children || <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </DashboardShellContext.Provider>
  );
};
