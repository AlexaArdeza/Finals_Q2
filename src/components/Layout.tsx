import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const themes: ('light' | 'dark' | 'ocean' | 'forest')[] = ['light', 'dark', 'ocean', 'forest'];

  return (
    <div className="theme-toggle glass">
      {themes.map((t) => (
        <button
          key={t}
          className={`theme-btn btn-${t} ${theme === t ? 'active' : ''}`}
          onClick={() => setTheme(t)}
          title={`Switch to ${t} theme`}
        />
      ))}
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <nav className="glass">
        <div className="logo">TaskFlow</div>
        <div className="nav-links">
          <NavLink to="/" end>Tasks</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>

      <ThemeToggle />

      <main>
        {children}
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        &copy; 2026 TaskFlow Solutions. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
