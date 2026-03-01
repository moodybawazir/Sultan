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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">الإعدادات والتخصيص</h1>
        <p className="text-slate-500 dark:text-text-gold text-base">خصص تجربة القراءة وتفضيلات التطبيق الخاصة بك.</p>
      </div>

      <div className="grid gap-8">
        {/* Install App - Enhanced */}
        <section className="glass-card rounded-2xl overflow-hidden border-primary/20">
          <div className="bg-gold-gradient p-6 flex items-center gap-4">
            <div className="bg-background-dark/20 p-3 rounded-full">
              <Download className="w-8 h-8 text-background-dark" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-background-dark">تثبيت التطبيق على جوالك</h2>
              <p className="text-sm text-background-dark/80 font-medium">عشان تفتح "صدقة جارية" بضغطة واحدة وبدون إنترنت</p>
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* iOS Instructions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .76-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                </div>
                <h3 className="font-bold text-white">لمستخدمين الآيفون (iOS)</h3>
              </div>
              <ul className="space-y-3 text-sm text-silver">
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] shrink-0 mt-0.5">١</span>
                  <p>افتح الموقع في متصفح <span className="text-white font-bold">Safari</span>.</p>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] shrink-0 mt-0.5">٢</span>
                  <p>اضغط على أيقونة المشاركة <span className="text-white font-bold">(المربع اللي فيه سهم فوق)</span> تحت في نص الشاشة.</p>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] shrink-0 mt-0.5">٣</span>
                  <p>دوّر تحت على خيار <span className="text-white font-bold">"إضافة للشاشة الرئيسية"</span> واضغطه.</p>
                </li>
                <li className="mt-4 pt-2 border-t border-white/5 text-primary italic">
                  بكذا يصير التطبيق عندك في الجوال، وأبشر بالسعد!
                </li>
              </ul>
            </div>

            {/* Android Instructions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.3414C17.069 15.3414 16.699 15.7114 16.699 16.1654C16.699 16.6194 17.069 16.9894 17.523 16.9894C17.977 16.9894 18.347 16.6194 18.347 16.1654C18.347 15.7114 17.977 15.3414 17.523 15.3414ZM6.477 15.3414C6.023 15.3414 5.653 15.7114 5.653 16.1654C5.653 16.6194 6.023 16.9894 6.477 16.9894C6.931 16.9894 7.301 16.6194 7.301 16.1654C7.301 15.7114 6.931 15.3414 6.477 15.3414ZM17.935 12.3514L19.744 9.21943C19.839 9.05543 19.782 8.84743 19.618 8.75243C19.454 8.65743 19.245 8.71443 19.151 8.87843L17.318 12.0534C15.795 11.3534 13.991 10.9634 12 10.9634C10.009 10.9634 8.205 11.3534 6.682 12.0534L4.849 8.87843C4.755 8.71443 4.546 8.65743 4.382 8.75243C4.218 8.84743 4.161 9.05543 4.256 9.21943L6.065 12.3514C3.006 14.0044 0.941 17.1524 0.771 20.8544H23.23C23.059 17.1524 20.994 14.0044 17.935 12.3514Z" /></svg>
                </div>
                <h3 className="font-bold text-white">لمستخدمين الأندرويد (Android)</h3>
              </div>
              <ul className="space-y-3 text-sm text-silver">
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] shrink-0 mt-0.5">١</span>
                  <p>افتح الموقع في متصفح <span className="text-white font-bold">Google Chrome</span>.</p>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] shrink-0 mt-0.5">٢</span>
                  <p>اضغط على <span className="text-white font-bold">الثلاث نقاط</span> اللي فوق على اليسار (أو اليمين حسب لغة جوالك).</p>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] shrink-0 mt-0.5">٣</span>
                  <p>ابحث عن خيار <span className="text-white font-bold">"تثبيت التطبيق"</span> أو "إضافة إلى الشاشة الرئيسية".</p>
                </li>
                <li className="mt-4 pt-2 border-t border-white/5 text-primary italic">
                  ثواني ويكون التطبيق جاهز في جوالك، وحيّاك الله!
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Theme */}
        <section className="glass-card rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="text-primary w-6 h-6" />
            <h2 className="text-xl font-bold text-white">المظهر العام</h2>
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
            <h2 className="text-xl font-bold text-white">تفضيلات القرآن</h2>
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
