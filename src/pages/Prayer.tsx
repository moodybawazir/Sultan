import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Compass, RefreshCw, Bell } from 'lucide-react';
import { fetchPrayerTimesByGPS, getCityFromCoords, detectLocationFallback } from '../services/api';
import { requestNotificationPermission, schedulePrayerNotification } from '../services/notifications';

const PRAYER_NAMES: Record<string, string> = {
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Sunset: "الغروب",
    Maghrib: "المغرب",
    Isha: "العشاء",
};

// Which prayers to display
const DISPLAY_PRAYERS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export default function Prayer() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [prayerData, setPrayerData] = useState<any>(null);
    const [locationName, setLocationName] = useState<string>("جاري تحديد الموقع...");
    const [currentTime, setCurrentTime] = useState(new Date());

    const loadPrayerData = async (lat: number, lng: number) => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchPrayerTimesByGPS(lat, lng);
            setPrayerData(data.data);

            try {
                const cityInfo = await getCityFromCoords(lat, lng);
                if (cityInfo) {
                    setLocationName(cityInfo);
                } else {
                    setLocationName('موقعك الحالي');
                }
            } catch (e) {
                setLocationName('موقعك الحالي');
            }

        } catch (err: any) {
            setError(err.message || 'حدث خطأ أثناء جلب مواقيت الصلاة');
        } finally {
            setLoading(false);
        }
    };

    const requestLocation = () => {
        setLoading(true);
        if (!navigator.geolocation) {
            setError('متصفحك لا يدعم تحديد الموقع');
            fallbackToDefault();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                loadPrayerData(position.coords.latitude, position.coords.longitude);
            },
            (geoError) => {
                console.warn("Geolocation permission denied or failed:", geoError);
                fallbackToDefault();
            },
            { timeout: 10000 }
        );
    };

    const fallbackToDefault = async () => {
        try {
            const loc = await detectLocationFallback();
            loadPrayerData(loc.lat, loc.lng);
            setLocationName(loc.city);
        } catch {
            // Mecca defaults
            loadPrayerData(21.4225, 39.8262);
            setLocationName('مكة المكرمة');
        }
    };

    useEffect(() => {
        requestLocation();

        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getNextPrayer = () => {
        if (!prayerData) return null;

        const now = currentTime;
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const timings = prayerData.timings;

        for (const key of DISPLAY_PRAYERS) {
            const [hours, minutes] = timings[key].split(':').map(Number);
            const prayerMinutes = hours * 60 + minutes;

            if (prayerMinutes > currentMinutes) {
                return { name: PRAYER_NAMES[key] || key, key, time: timings[key], minutesLeft: prayerMinutes - currentMinutes };
            }
        }

        // If all prayers today passed, next is Fajr tomorrow
        const [fajrHours, fajrMinutes] = timings.Fajr.split(':').map(Number);
        const fajrMinutesTomorrow = (fajrHours + 24) * 60 + fajrMinutes;
        return { name: PRAYER_NAMES.Fajr, key: 'Fajr', time: timings.Fajr, minutesLeft: fajrMinutesTomorrow - currentMinutes };
    };

    const formatTime12 = (time24: string) => {
        let [hours, minutes] = time24.split(':').map(Number);
        const ampm = hours >= 12 ? 'م' : 'ص';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const nextPrayer = getNextPrayer();

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-8 flex flex-col gap-6 max-w-2xl mx-auto"
        >
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h1 className="text-3xl font-arabic font-bold text-transparent bg-clip-text bg-gold-gradient drop-shadow-sm mb-2">
                        مواقيت الصلاة
                    </h1>
                    <div className="flex items-center gap-2 text-silver text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{locationName}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={async () => {
                            const granted = await requestNotificationPermission();
                            if (granted) {
                                schedulePrayerNotification('تم تفعيل الإشعارات', { body: 'سنقوم بتنبيهك قبل دخول وقت الصلاة' });
                            }
                        }}
                        className="p-2 rounded-full glass-card border border-white/5 hover:border-primary/50 text-silver hover:text-primary transition-all active:scale-95"
                        title="تفعيل الإشعارات"
                    >
                        <Bell className="w-5 h-5" />
                    </button>
                    <button
                        onClick={requestLocation}
                        disabled={loading}
                        className="p-2 rounded-full glass-card border border-white/5 hover:border-primary/50 text-silver hover:text-primary transition-all active:scale-95 disabled:opacity-50"
                        title="تحديث الموقع"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-primary' : ''}`} />
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-sm flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">⚠️</div>
                    <div>{error}</div>
                </div>
            )}

            {!loading && !error && prayerData && (
                <>
                    {/* Main Hero Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative glass-card rounded-3xl p-6 md:p-8 overflow-hidden group">
                        {/* Dynamic visual flair based on time could go here */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-transparent to-background-dark opacity-50 blur-2xl z-0"></div>

                        <div className="relative z-10 flex flex-col items-center text-center gap-2">
                            <h2 className="text-xl font-bold text-slate-300">الصلاة القادمة</h2>
                            {nextPrayer ? (
                                <>
                                    <div className="text-5xl md:text-6xl font-arabic font-extrabold text-white my-2 tracking-wide drop-shadow-[0_0_15px_rgba(201,168,76,0.5)] text-glow">
                                        {nextPrayer.name}
                                    </div>
                                    <div className="flex items-center gap-2 text-primary font-bold text-xl bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                                        <Clock className="w-5 h-5" />
                                        <span>{formatTime12(nextPrayer.time)}</span>
                                    </div>
                                    <p className="text-silver mt-4 text-sm font-medium">
                                        متبقي <strong className="text-white">{Math.floor(nextPrayer.minutesLeft / 60)} ساعة و {nextPrayer.minutesLeft % 60} دقيقة</strong>
                                    </p>
                                </>
                            ) : (
                                <div className="text-silver">جاري الحساب...</div>
                            )}
                        </div>
                    </motion.div>

                    {/* Date Info */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex gap-4">
                        <div className="flex-1 glass-card rounded-2xl p-4 flex items-center justify-center gap-3 border border-white/5 shadow-md">
                            <Calendar className="w-5 h-5 text-primary" />
                            <div className="text-sm font-bold text-white text-center">
                                {prayerData.date.hijri.weekday.ar} <br />
                                <span className="text-silver font-normal text-xs">{prayerData.date.hijri.date}</span>
                            </div>
                        </div>
                        <div className="flex-1 glass-card rounded-2xl p-4 flex items-center justify-center gap-3 border border-white/5 shadow-md">
                            <Compass className="w-5 h-5 text-[#4ade80]" />
                            <div className="text-sm font-bold text-white text-center">
                                اتجاه القبلة <br />
                                <span className="text-silver font-normal text-xs">{Math.round(prayerData.meta.qibla)}°</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Prayer Times List */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-background-card/40 border border-white/10 rounded-3xl p-2 shadow-xl backdrop-blur-xl">
                        <div className="flex flex-col gap-1">
                            {DISPLAY_PRAYERS.map((key) => {
                                const isNext = nextPrayer?.key === key;
                                return (
                                    <div
                                        key={key}
                                        className={`flex items-center justify-between p-4 rounded-2xl transition-all ${isNext ? 'bg-primary/15 border border-primary/30 shadow-[0_0_20px_rgba(201,168,76,0.1)]' : 'hover:bg-white/5'}`}
                                    >
                                        <span className={`font-arabic text-lg font-bold ${isNext ? 'text-primary' : 'text-slate-300'}`}>
                                            {PRAYER_NAMES[key] || key}
                                        </span>
                                        <div className="flex items-center gap-4">
                                            <span className={`font-bold tabular-nums ${isNext ? 'text-white' : 'text-silver'}`}>
                                                {formatTime12(prayerData.timings[key])}
                                            </span>
                                            {isNext && <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(201,168,76,0.8)]"></div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </>
            )}

            {loading && (
                <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                    <p className="text-silver font-arabic">جاري جلب إحداثيات الصلاة...</p>
                </div>
            )}
        </motion.div>
    );
}
