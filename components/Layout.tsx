
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showReset?: boolean;
  onReset?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showReset, onReset }) => {
  return (
    <div className="min-h-screen bg-red-50 flex flex-col">
      <header className="bg-red-600 text-white py-6 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex-1">
            {/* Empty space for alignment */}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center flex-[2]">{title}</h1>
          <div className="flex-1 text-right">
            {showReset && onReset && (
              <button 
                onClick={onReset}
                className="text-xs bg-red-700 hover:bg-red-800 px-3 py-2 rounded-lg transition-colors border border-red-500 shadow-sm"
              >
                ลงทะเบียนใหม่
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        {children}
      </main>
      <footer className="bg-red-800 text-red-100 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} School Activity Scoring System
      </footer>
    </div>
  );
};

export default Layout;
