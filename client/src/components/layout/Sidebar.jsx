import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  BarChart3,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  Layers,
  GraduationCap,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const getNavLinks = () => {
    switch (currentUser.role) {
      case 'MENTOR':
        return [
          { to: '/dashboard', icon: Home, label: 'Overview' },
          { to: '/mentees', icon: Users, label: 'My mentees' },
          { to: '/academic-records', icon: BookOpen, label: 'Academic records' },
          { to: '/documents', icon: FileText, label: 'Document review' },
          { to: '/meetings', icon: Calendar, label: 'Meetings' },
          { to: '/analytics', icon: BarChart3, label: 'Analytics' },
          { to: '/settings', icon: Settings, label: 'Settings' }
        ];
      case 'HOD':
        return [
          { to: '/dashboard', icon: Home, label: 'Overview' },
          { to: '/mentor-assignments', icon: Layers, label: 'Mentor assignments' },
          { to: '/mentees', icon: Users, label: 'Department students' },
          { to: '/analytics', icon: BarChart3, label: 'Analytics' },
          { to: '/settings', icon: Settings, label: 'Settings' }
        ];
      case 'ADMIN':
        return [
          { to: '/dashboard', icon: Home, label: 'Overview' },
          { to: '/users', icon: Users, label: 'User governance' },
          { to: '/mentor-assignments', icon: Layers, label: 'Mentor allocations' },
          { to: '/analytics', icon: BarChart3, label: 'Institution metrics' },
          { to: '/settings', icon: Settings, label: 'Settings' }
        ];
      case 'MENTEE':
      default:
        return [
          { to: '/dashboard', icon: Home, label: 'Overview' },
          { to: '/academic-records', icon: BookOpen, label: 'Academic records' },
          { to: '/documents', icon: FileText, label: 'Documents' },
          { to: '/meetings', icon: Calendar, label: 'Mentor sessions' },
          { to: '/profile', icon: GraduationCap, label: 'My profile' },
          { to: '/settings', icon: Settings, label: 'Settings' }
        ];
    }
  };

  return (
    <aside className="app-sidebar hidden lg:flex">
      <NavLink to="/dashboard" className="app-sidebar-brand" aria-label="Mentee home">
        <span className="app-brand-mark"><GraduationCap size={21} /></span>
        <span className="app-brand-copy">
          <strong>mentee</strong>
          <small>STUDENT SUCCESS</small>
        </span>
      </NavLink>

      <div className="app-sidebar-section">WORKSPACE</div>
      <nav className="app-sidebar-links" aria-label="Workspace navigation">
        {getNavLinks().map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `app-sidebar-link${isActive ? ' is-active' : ''}`}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="app-sidebar-spacer" />
      <div className="app-sidebar-user">
        <div className="app-user-avatar">
          {currentUser?.name?.trim()?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="app-user-copy">
          <strong>{currentUser?.name || 'Account'}</strong>
          <span>{currentUser?.role || 'MEMBER'}</span>
        </div>
        <button
          type="button"
          className="app-signout"
          title="Sign out"
          aria-label="Sign out"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          <LogOut size={17} />
        </button>
      </div>
    </aside>
  );
};
