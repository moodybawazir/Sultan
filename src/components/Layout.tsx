import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Settings, Headphones, Search, Heart, Clock } from 'lucide-react';
import GlobalAudioPlayer from './GlobalAudioPlayer';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: BookOpen, label: 'القرآن' },
    { path: '/azkar', icon: Heart, label: 'الأذكار' },
    { path: '/prayer', icon: Clock, label: 'الصلاة' },
    { path: '/settings', icon: Settings, label: 'الإعدادات' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-50 glass-card border-b border-primary/20 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-primary group">
            <BookOpen className="w-8 h-8 group-hover:text-white transition-colors" />
            <h1 className="text-2xl font-bold text-white group-hover:text-primary transition-colors pt-1">بسم الله</h1>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-background-card/50 p-1 rounded-full border border-white/5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path.split('/')[1]))
                  ? 'bg-primary text-background-dark'
                  : 'text-silver hover:text-primary'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Search removed based on user request */}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-primary/20 z-50">
        <div className="flex items-center justify-around p-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path.split('/')[1]));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-silver'}`}
              >
                <item.icon className={`w-6 h-6 ${isActive ? 'fill-primary/20' : ''}`} />
                <span className="text-[10px] font-bold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <GlobalAudioPlayer />
    </div>
  );
}
