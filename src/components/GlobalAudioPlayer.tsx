import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store';
import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';

export default function GlobalAudioPlayer() {
  const { audioState, setAudioState, reciter } = useAppStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (audioState.isPlaying) {
      setIsVisible(true);
      const bitrate = reciter === 'ar.abdulbasitmurattal' ? 192 : 128;
      const url = `https://cdn.islamic.network/quran/audio/${bitrate}/${reciter}/${audioState.currentAyah}.mp3`;
      if (audioRef.current) {
        if (audioRef.current.src !== url) {
          audioRef.current.src = url;
        }
        audioRef.current.play().catch(e => {
          console.error("Audio play error:", e);
          setAudioState({ isPlaying: false });
        });
      }
    } else {
      audioRef.current?.pause();
    }
  }, [audioState.isPlaying, audioState.currentAyah, reciter]);

  const handleEnded = () => {
    if (audioState.currentAyah < 6236) {
      setAudioState({ currentAyah: audioState.currentAyah + 1 });
    } else {
      setAudioState({ isPlaying: false });
      setIsVisible(false);
    }
  };

  if (!isVisible && !audioState.isPlaying) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[400px] z-[100]">
      <div className="glass-card p-3 rounded-xl flex items-center gap-4 shadow-2xl border border-white/10" dir="rtl">
        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-surface-dark border border-white/10 shrink-0">
          <span className="text-primary font-bold text-sm">{audioState.currentAyah}</span>
          <span className="text-[10px] text-text-gold leading-none">آية</span>
        </div>
        
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-xs text-text-gold font-medium">
            <span className="truncate">
              {reciter === 'ar.abdulbasitmurattal' ? 'عبد الباسط عبد الصمد' : 
               reciter === 'ar.minshawi' ? 'محمد صديق المنشاوي' :
               reciter === 'ar.husary' ? 'محمود خليل الحصري' :
               'مشاري العفاسي'}
            </span>
          </div>
          <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
            <div className={`h-full bg-primary w-[35%] rounded-full relative ${audioState.isPlaying ? 'animate-pulse' : ''}`}></div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => setAudioState({ currentAyah: Math.max(1, audioState.currentAyah - 1) })}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setAudioState({ isPlaying: !audioState.isPlaying })}
            className="w-8 h-8 flex items-center justify-center bg-primary text-background-dark rounded-full hover:scale-105 transition-transform"
          >
            {audioState.isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          
          <button 
            onClick={() => setAudioState({ currentAyah: Math.min(6236, audioState.currentAyah + 1) })}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button 
            onClick={() => {
              setIsVisible(false);
              setAudioState({ isPlaying: false });
            }}
            className="ml-2 text-slate-400 hover:text-red-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <audio ref={audioRef} onEnded={handleEnded} className="hidden" />
    </div>
  );
}
