import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';
import { fetchSurahs, fetchAyahOfTheDay } from '../services/api';
import { useAppStore } from '../store';

export default function Home() {
  const [surahs, setSurahs] = useState<any[]>([]);
  const [ayahOfDay, setAyahOfDay] = useState<any>(null);
  const lastRead = useAppStore(state => state.lastRead);

  useEffect(() => {
    fetchSurahs().then(setSurahs);
    fetchAyahOfTheDay().then(setAyahOfDay);
  }, []);

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8">
      <div className="w-full text-center py-2">
        <h1 className="text-4xl md:text-5xl font-arabic font-extrabold text-transparent bg-clip-text bg-gold-gradient sadaka-glow tracking-wide">
          صدقة جارية
        </h1>
      </div>

      <div className="flex flex-col gap-1 px-2">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight font-arabic">
          السلام عليكم، <span className="text-primary text-glow">قارئ القرآن</span>
        </h2>
        <p className="text-silver text-sm">تابع وردك اليومي واستمر في القراءة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Last Read Card */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 lg:p-8 relative overflow-hidden group">
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 px-2.5 py-1 text-xs font-semibold text-[#4ade80] border border-secondary/30 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span>
                  آخر قراءة
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {lastRead ? `سورة ${surahs.find(s => s.number === lastRead.surah)?.name || ''}` : 'ابدأ القراءة'}
                </h3>
                {lastRead && <p className="text-silver text-sm">الآية {lastRead.ayah}</p>}
              </div>
              {lastRead && (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-background-card to-background-dark border border-white/10 flex items-center justify-center text-primary font-arabic font-bold text-xl shadow-lg">
                  {lastRead.surah.toLocaleString('ar-EG')}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Link 
                  to={lastRead ? `/read/${lastRead.surah}` : '/read/1'}
                  className="flex-1 bg-gold-gradient hover:brightness-110 text-background-dark font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(201,168,76,0.2)]"
                >
                  <BookOpen className="w-5 h-5" />
                  اكمل القراءة
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Ayah of the Day */}
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl animate-pulse opacity-50 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">آية اليوم</h3>
            <Sparkles className="text-primary w-5 h-5" />
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center gap-4 py-4">
            {ayahOfDay ? (
              <>
                <p className="font-quran text-2xl leading-loose text-slate-800 dark:text-slate-200">
                  {ayahOfDay.text}
                </p>
                <h4 className="text-lg font-bold text-primary mt-2">{ayahOfDay.surah.name}</h4>
                <span className="text-xs text-silver uppercase tracking-widest font-semibold">الآية {ayahOfDay.numberInSurah.toLocaleString('ar-EG')}</span>
              </>
            ) : (
              <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">قائمة السور</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {surahs.map((surah) => (
          <Link 
            key={surah.number}
            to={`/read/${surah.number}`}
            className="group relative glass-card hover:bg-background-card/80 border border-white/5 hover:border-primary/50 rounded-xl p-4 transition-all duration-300 hover:shadow-[0_4px_20px_-2px_rgba(201,168,76,0.1)] hover:-translate-y-1"
          >
            <div className="flex items-center justify-between flex-row-reverse">
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="relative flex items-center justify-center w-10 h-10">
                  <svg className="absolute inset-0 w-full h-full text-primary/20 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 40 40">
                    <path d="M20 0L24.49 15.51L40 20L24.49 24.49L20 40L15.51 24.49L0 20L15.51 15.51L20 0Z" opacity="0.4"></path>
                  </svg>
                  <span className="text-sm font-bold text-slate-900 dark:text-white z-10 font-arabic">{surah.number.toLocaleString('ar-EG')}</span>
                </div>
                <div className="text-right">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{surah.name}</h4>
                  <p className="text-xs text-silver">{surah.numberOfAyahs.toLocaleString('ar-EG')} آية</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="font-arabic text-xl font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{surah.englishName}</span>
                <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${surah.revelationType === 'Meccan' ? 'text-secondary bg-secondary/10 border-secondary/20' : 'text-primary bg-primary/10 border-primary/20'}`}>
                  {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
