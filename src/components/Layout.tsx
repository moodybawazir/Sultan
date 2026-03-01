import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, Settings, Heart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className="flex flex-col min-h-screen bg-background-dark text-white font-arabic overflow-x-hidden selection:bg-primary/30">
      {/* Desktop Header - Simplified */}
      <header className="hidden md:block sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-primary group">
            <BookOpen className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <h1 className="text-2xl font-bold text-white pt-1">بسم الله</h1>
          </Link>

          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path.split('/')[1]));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${isActive ? 'text-background-dark' : 'text-silver hover:text-white'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill-desktop"
                      className="absolute inset-0 bg-gold-gradient rounded-full shadow-lg shadow-primary/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto relative pb-32 md:pb-12">
        <Outlet />
      </main>

      {/* Floating Pill Navigation - Mobile & Tablet */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
        <div className="bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-[28px] p-2 flex items-center justify-between shadow-2xl shadow-black/50 overflow-hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path.split('/')[1]));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center justify-center py-3 px-4 rounded-[22px] transition-all duration-500 overflow-hidden h-12 ${isActive ? 'flex-[1.5] text-background-dark' : 'flex-1 text-silver'
                  }`}
                style={{ touchAction: 'manipulation' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-gold-gradient shadow-md"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-2">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-background-dark' : 'text-silver'}`} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs font-bold whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <GlobalAudioPlayer />
    </div>
  );
}
