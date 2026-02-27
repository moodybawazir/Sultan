import { useAppStore } from '../store';
import { Download, Palette, BookOpen } from 'lucide-react';

export default function Settings() {
  const { theme, setTheme, fontSize, setFontSize, translationLang, setTranslationLang } = useAppStore();

  const handleInstall = () => {
    alert("للتثبيت، استخدم خيار 'Add to Home Screen' من متصفحك.");
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">الإعدادات والتخصيص</h1>
        <p className="text-slate-500 dark:text-text-gold text-base">خصص تجربة القراءة وتفضيلات التطبيق الخاصة بك.</p>
      </div>

      <div className="grid gap-8">
        {/* Install App */}
        <section className="glass-card rounded-xl p-6 md:p-8 bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary">
                <Download className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">تثبيت التطبيق</h2>
                <p className="text-sm text-slate-500 dark:text-text-gold">احصل على تجربة أسرع ووصول دون اتصال بالإنترنت.</p>
              </div>
            </div>
            <button onClick={handleInstall} className="bg-primary hover:bg-primary-dark text-background-dark font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              تثبيت الآن
            </button>
          </div>
        </section>

        {/* Theme */}
        <section className="glass-card rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="text-primary w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">المظهر العام</h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">السمة</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="cursor-pointer group relative">
                  <input type="radio" name="theme" className="peer sr-only" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
                  <div className="h-24 rounded-lg border-2 border-white/10 bg-[#1f1c13] flex items-center justify-center transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary/50">
                    <span className="text-sm font-medium text-slate-200">ذهبي داكن</span>
                  </div>
                </label>
                <label className="cursor-pointer group relative">
                  <input type="radio" name="theme" className="peer sr-only" checked={theme === 'light'} onChange={() => setTheme('light')} />
                  <div className="h-24 rounded-lg border-2 border-slate-200 bg-[#f5f5f0] flex items-center justify-center transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary/50">
                    <span className="text-sm font-medium text-slate-800">فاتح</span>
                  </div>
                </label>
                <label className="cursor-pointer group relative">
                  <input type="radio" name="theme" className="peer sr-only" checked={theme === 'paper'} onChange={() => setTheme('paper')} />
                  <div className="h-24 rounded-lg border-2 border-[#d6d0c0] bg-[#e8e4d9] flex items-center justify-center transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary/50">
                    <span className="text-sm font-medium text-[#5c5645]">ورقي بيج</span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">حجم الخط القرآني</label>
                <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">{fontSize} بكسل</span>
              </div>
              <input 
                type="range" 
                min="16" max="60" 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                dir="ltr"
              />
              <div className="mt-6 p-6 rounded-lg bg-surface-dark/50 border border-white/5 text-center">
                <p className="text-slate-900 dark:text-slate-100 leading-loose font-quran" style={{ fontSize: `${fontSize}px` }}>
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quran Preferences */}
        <section className="glass-card rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-primary w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">تفضيلات القرآن</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">لغة الترجمة</label>
              <select 
                value={translationLang}
                onChange={(e) => setTranslationLang(e.target.value)}
                className="block w-full rounded-lg border-white/10 bg-surface-dark py-3 px-4 text-slate-900 dark:text-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="en.asad">الإنجليزية (Asad)</option>
                <option value="en.sahih">الإنجليزية (Sahih International)</option>
                <option value="fr.hamidullah">الفرنسية</option>
                <option value="ur.jalandhry">الأردية</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
