import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSurah } from '../services/api';
import { useAppStore } from '../store';
import { PlayCircle, Bookmark, Type, Languages, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Reader() {
  const { surahId } = useParams();
  const navigate = useNavigate();
  const [surah, setSurah] = useState<any>(null);
  const [translation, setTranslation] = useState<any>(null);
  const [tafsir, setTafsir] = useState<any>(null);

  const {
    fontSize,
    showTranslation,
    translationLang,
    setLastRead,
    setAudioState,
    addBookmark,
    bookmarks
  } = useAppStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (surahId) {
      fetchSurah(Number(surahId)).then(setSurah);
      if (showTranslation) {
        fetchSurah(Number(surahId), translationLang).then(setTranslation);
      }
      fetchSurah(Number(surahId), 'ar.muyassar').then(setTafsir);

      const currentLastRead = useAppStore.getState().lastRead;
      if (!currentLastRead || currentLastRead.surah !== Number(surahId)) {
        setLastRead(Number(surahId), 1);
      }
    }
  }, [surahId, showTranslation, translationLang]);

  useEffect(() => {
    if (surah) {
      const currentLastRead = useAppStore.getState().lastRead;
      if (currentLastRead && currentLastRead.surah === Number(surahId) && currentLastRead.ayah > 1) {
        setTimeout(() => {
          const el = document.getElementById(`ayah-${currentLastRead.ayah}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 500);
      }

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const ayahNum = parseInt(entry.target.getAttribute('data-ayah') || '1');
              useAppStore.getState().setLastRead(Number(surahId), ayahNum);
            }
          });
        },
        { root: null, rootMargin: '-30% 0px -50% 0px', threshold: 0 }
      );

      setTimeout(() => {
        document.querySelectorAll('.ayah-element').forEach(el => {
          observerRef.current?.observe(el);
        });
      }, 1000);
    }

    return () => observerRef.current?.disconnect();
  }, [surah, surahId]);

  if (!surah) return <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  const handlePlayAyah = (ayahNumber: number) => {
    setAudioState({
      isPlaying: true,
      currentSurah: Number(surahId),
      currentAyah: ayahNumber
    });
  };

  const handleBookmark = (ayah: any) => {
    addBookmark({
      surah: Number(surahId),
      ayah: ayah.numberInSurah,
      text: ayah.text,
      date: new Date().toISOString()
    });
  };

  const isBookmarked = (ayahNum: number) => {
    return bookmarks.some(b => b.surah === Number(surahId) && b.ayah === ayahNum);
  };

  return (
    <div className="flex flex-col h-full relative z-10">
      {/* Top Toolbar */}
      <div className="w-full flex justify-center py-4 sticky top-16 md:top-0 z-20 pointer-events-none">
        <div className="glass-card pointer-events-auto flex items-center gap-1 px-2 py-1.5 rounded-full shadow-2xl mx-4 max-w-full overflow-x-auto" dir="rtl">
          <div className="hidden sm:flex items-center gap-2 px-3 border-l border-white/10 ml-2">
            <span className="text-xs text-text-gold font-medium">{surah.number}. {surah.name}</span>
          </div>

          <button onClick={() => useAppStore.setState(s => ({ showTranslation: !s.showTranslation }))} className={`p-2 rounded-full transition-all active:scale-95 ${showTranslation ? 'text-primary bg-primary/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Languages className="w-5 h-5" />
          </button>

          <button onClick={() => useAppStore.setState(s => ({ fontSize: Math.min(60, s.fontSize + 2) }))} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-all active:scale-95">
            <Type className="w-5 h-5" />
          </button>

          <div className="h-6 w-px bg-white/10 mx-1"></div>

          <button onClick={() => handlePlayAyah(surah.ayahs[0].number)} className="p-2 text-primary hover:text-primary/80 rounded-full hover:bg-primary/10 transition-all active:scale-95">
            <PlayCircle className="w-6 h-6 fill-current" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-8 pb-32 px-4 md:px-12 lg:px-24" ref={containerRef}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl blur-3xl -z-10"></div>
            <div className="w-full flex justify-between items-start mb-6 border-b border-primary/20 pb-6">
              <div className="text-right">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{surah.name}</h1>
                <p className="text-primary font-medium text-lg">{surah.englishName}</p>
              </div>
              <div className="text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-dark border border-primary/20 mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs text-text-gold uppercase tracking-wider font-bold">{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</span>
                </div>
                <p className="text-slate-500 dark:text-text-gold text-sm">{surah.numberOfAyahs.toLocaleString('ar-EG')} آيات</p>
              </div>
            </div>

            {Number(surahId) !== 1 && Number(surahId) !== 9 && (
              <div className="mb-12 text-center font-quran text-3xl text-slate-800 dark:text-slate-200">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </div>
            )}
          </div>

          <div className="text-center font-quran leading-[2.5] text-slate-800 dark:text-slate-100" style={{ fontSize: `${fontSize}px` }}>
            {surah.ayahs.map((ayah: any, index: number) => {
              let text = ayah.text;
              if (Number(surahId) !== 1 && index === 0 && text.startsWith('بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ')) {
                text = text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ', '');
              }

              return (
                <span
                  key={ayah.number}
                  id={`ayah-${ayah.numberInSurah}`}
                  data-ayah={ayah.numberInSurah}
                  className="relative group inline-block ayah-element"
                >
                  <span
                    className="hover:text-primary transition-colors duration-300 cursor-pointer"
                    onClick={() => handlePlayAyah(ayah.number)}
                  >
                    {text}
                  </span>
                  <span className="ayah-marker">{ayah.numberInSurah.toLocaleString('ar-EG')}</span>

                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex items-center gap-2 bg-background-card border border-white/10 rounded-lg p-1 shadow-xl z-50">
                    <button onClick={() => handlePlayAyah(ayah.number)} className="p-2 hover:bg-white/10 rounded text-primary">
                      <PlayCircle className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleBookmark(ayah)} className={`p-2 hover:bg-white/10 rounded ${isBookmarked(ayah.numberInSurah) ? 'text-primary' : 'text-slate-400'}`}>
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {showTranslation && translation && (
                    <div className="block text-left font-display text-base text-slate-500 dark:text-slate-400 my-4 p-4 bg-surface-dark/50 rounded-lg border border-white/5" dir="ltr">
                      {translation.ayahs[index].text}
                    </div>
                  )}
                  {showTranslation && tafsir && (
                    <div className="block text-right font-arabic text-lg text-slate-600 dark:text-slate-300 my-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <span className="text-primary font-bold text-sm block mb-1">التفسير الميسر:</span>
                      {tafsir.ayahs[index].text}
                    </div>
                  )}
                </span>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-20 pt-8 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={() => navigate(`/read/${Math.min(114, Number(surahId) + 1)}`)}
              disabled={Number(surahId) === 114}
              className="group flex items-center gap-4 text-right hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-background-dark shadow-[0_0_15px_rgba(201,167,74,0.4)] group-hover:scale-105 transition-transform">
                <ChevronLeft className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <span className="block text-xs text-slate-500 uppercase tracking-widest">السورة التالية</span>
              </div>
            </button>

            <button
              onClick={() => navigate(`/read/${Math.max(1, Number(surahId) - 1)}`)}
              disabled={Number(surahId) === 1}
              className="group flex items-center gap-4 text-left disabled:opacity-50"
            >
              <div className="hidden sm:block">
                <span className="block text-xs text-slate-500 uppercase tracking-widest">السورة السابقة</span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 dark:border-white/20 text-slate-400">
                <ChevronRight className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
