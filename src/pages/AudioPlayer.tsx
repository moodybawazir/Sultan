import { useAppStore } from '../store';
import { PlayCircle, CheckCircle2 } from 'lucide-react';

export default function AudioPlayer() {
  const { reciter, setReciter } = useAppStore();

  const reciters = [
    {
      id: 'ar.abdulbasitmurattal',
      name: 'عبد الباسط عبد الصمد',
      type: 'المصحف المرتل',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ07WfxEPrU4LnBW0egLQ7VL_gQPe5evLi0-fhx1Kl-2HSyKgU7Dcl8Ig4691sMP1lRd393Ki5RQmvtw-8_eFua6srna8ptysOPdf9SCJeHR3F36AJIA_iZPZDLH87zr_IgnYXKd49otPvBnFfeUYWLZU1e7MQIAEPJKZguKEIKjvwyhXseYwLRzo3wbHxn3HW3-3RoiyMT4pgPxWa4pwYIyITKGPoZV2s2d13bWFI_Gv65qhBQlMqZ5fPgoe7dtFumenT1-1lLF4'
    },
    {
      id: 'ar.minshawi',
      name: 'محمد صديق المنشاوي',
      type: 'المصحف المرتل',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0IMxqyHUtWOtJiv9QSYvT7yFbzKZAHtN4QjV8eE2HcPL2Mo7VXJNZUIiL48cE5ZRQKy5gRuO-0MoWXOTvtYjkwzs_WsffEP9xFY9TCz9AWP4VZbMKJ_f8AlZZScrPK2ZKOaOvTMixiBsmaBVh_gqiG3WMmzXuCD8GbKONSrPz94TYE429BU8gp9KSfOparfsF4YsahrT_P7Nfe3JzUhAVnEU4XdQajhcrqM9uFac-a7XZAooaA4Voh3UhnL0R1E-cggZJQteXm5g'
    },
    {
      id: 'ar.husary',
      name: 'محمود خليل الحصري',
      type: 'تلاوة حصرية',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk_Ivx9Hq3qPsXiQuXerAXTRAy8Eym5GTqVeLYdYfc-mnTjF6ZdVHjiVFl0SnTGk4Q-SrAXAHZ2KNS_gFhHTtGS4TO6aAphoNEiaCOlD0ZJX1WlUGqqVsO22fE78POkrqnSlBJdhSl9JoKGuHrqHEKOhAZYEWjrXsVcogQuQqetk7y7xFwTVD43n_zeOjznY_9xPgAurYzz3gfO7phnIs8F2eUaTtzHi94YhSYWevSP6t29LTHeDgW8fq6KrQtaNAOyJCiqaYpOic'
    },
    {
      id: 'ar.alafasy',
      name: 'مشاري راشد العفاسي',
      type: 'تلاوة عذبة',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-bzmjX1QTxXrOZv_VbNDDc9A4gHvKp6Dx3kDSrYEJEVeZwkOug5L8pBUp6NQrGa-UJIdq3Dos90hKGa0Z9Tql7323iYBYMJ9JHcyr6LIhskIPlVsS9RSK8e_wJGEAhZdGK0xzD2wEzfacblIUJIq2AHbRHwFkj4Nn5DHrU8MpYUyGgQ-ty2K_ndz-BZsIpXthUUHOgpsIAxRdIYwf72NGypPC_aBq5hgyhtUlS-ZCExwqIZf8I-P-WQ_B-l064G7NUPPxjzkdsI4'
    }
  ];

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2 pt-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">اختر القارئ</h2>
        <p className="text-slate-500 dark:text-text-gold text-lg">استمع إلى آيات الله بأصوات مشاهير القراء في العالم الإسلامي.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reciters.map((r) => (
          <div 
            key={r.id}
            onClick={() => setReciter(r.id)}
            className={`glass-card p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all border-r-4 ${reciter === r.id ? 'border-r-primary bg-surface-dark/80' : 'border-r-transparent hover:border-r-primary/50 hover:bg-surface-dark/50'}`}
          >
            <img 
              src={r.image} 
              alt={r.name} 
              className={`w-16 h-16 rounded-full object-cover border-2 ${reciter === r.id ? 'border-primary' : 'border-[#413b2a]'}`} 
            />
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold truncate text-lg ${reciter === r.id ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{r.name}</h3>
              <p className="text-slate-500 dark:text-text-gold text-sm truncate">{r.type} • ١١٤ سورة</p>
            </div>
            {reciter === r.id ? (
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-background-dark">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <button className="text-slate-400 hover:text-primary transition-colors">
                <PlayCircle className="w-8 h-8" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
