import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, CircleOff } from 'lucide-react';
import { morningAzkar, eveningAzkar, sabhaAzkar } from '../data/azkar';

type ZikrCategory = 'morning' | 'evening' | 'sabha';

export default function Azkar() {
    const [activeTab, setActiveTab] = useState<ZikrCategory>('sabha');

    // Local state for tracking progress of the active tab's azkar list
    const [azkarList, setAzkarList] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);

    // Load data based on tab selection
    useEffect(() => {
        let list: any[] = [];
        if (activeTab === 'morning') list = JSON.parse(JSON.stringify(morningAzkar));
        if (activeTab === 'evening') list = JSON.parse(JSON.stringify(eveningAzkar));
        if (activeTab === 'sabha') list = JSON.parse(JSON.stringify(sabhaAzkar));

        setAzkarList(list);
        setCurrentIndex(0);
        setCurrentCount(0);
    }, [activeTab]);

    const handleTap = () => {
        // Vibrate gently
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        if (azkarList.length === 0 || currentIndex >= azkarList.length) return;

        const currentZikr = azkarList[currentIndex];

        if (currentCount + 1 >= currentZikr.count) {
            // Completed this zikr
            setCurrentCount(0);
            setCurrentIndex(prev => prev + 1);

            // Stronger vibration on finish
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        } else {
            setCurrentCount(prev => prev + 1);
        }
    };

    const getProgress = () => {
        if (azkarList.length === 0 || currentIndex >= azkarList.length) return 100;
        const currentZikr = azkarList[currentIndex];
        return (currentCount / currentZikr.count) * 100;
    };

    const isCompleted = currentIndex >= azkarList.length && azkarList.length > 0;

    return (
        <div className="p-4 md:p-8 flex flex-col gap-6 max-w-2xl mx-auto h-[calc(100vh-80px)] overflow-hidden">

            {/* Header Tabs */}
            <div className="flex bg-background-card/50 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                <button
                    onClick={() => setActiveTab('sabha')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${activeTab === 'sabha' ? 'bg-primary text-background-dark shadow-md' : 'text-silver hover:text-white'
                        }`}
                >
                    <CircleOff className="w-4 h-4" />
                    مسبحة
                </button>
                <button
                    onClick={() => setActiveTab('morning')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${activeTab === 'morning' ? 'bg-[#4ade80] text-background-dark shadow-md' : 'text-silver hover:text-white'
                        }`}
                >
                    <Sun className="w-4 h-4" />
                    الصباح
                </button>
                <button
                    onClick={() => setActiveTab('evening')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${activeTab === 'evening' ? 'bg-primary/80 text-background-dark shadow-md' : 'text-silver hover:text-white'
                        }`}
                >
                    <Moon className="w-4 h-4" />
                    المساء
                </button>
            </div>

            {/* Main Interactive Zikr Area */}
            <div
                className="flex-1 glass-card rounded-3xl relative overflow-hidden flex flex-col items-center justify-center cursor-pointer select-none ring-1 ring-white/10 shadow-2xl active:scale-[0.98] transition-all duration-75 touch-none"
                onClick={handleTap}
                role="button"
                aria-label="Tap to count Zikr"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark/50 pointer-events-none"></div>

                <AnimatePresence mode="wait">
                    {!isCompleted ? (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1, y: -20 }}
                            className="relative z-10 w-full px-8 text-center flex flex-col items-center gap-8"
                        >
                            {/* Progress Text */}
                            <div className="text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 text-sm">
                                الذكر {currentIndex + 1} من {azkarList.length}
                            </div>

                            {/* Zikr Text */}
                            <p className="text-2xl md:text-3xl font-quran leading-loose text-white drop-shadow-md">
                                {azkarList[currentIndex]?.text}
                            </p>

                            {/* Counter Circle */}
                            <div className="relative w-32 h-32 flex items-center justify-center mt-4">
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" className="stroke-white/10" strokeWidth="8" fill="none" />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        className="stroke-primary"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray="351.8"
                                        strokeDashoffset={351.8 - (getProgress() / 100) * 351.8}
                                        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                                    />
                                </svg>
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-4xl font-arabic font-extrabold text-white text-glow">
                                        {currentCount}
                                    </span>
                                    <span className="text-xs text-silver font-bold mt-1">
                                        من {azkarList[currentIndex]?.count}
                                    </span>
                                </div>
                            </div>

                            <p className="text-silver/50 text-sm animate-pulse mt-4">اضغط في أي مكان للمتابعة</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="completed"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative z-10 flex flex-col items-center text-center px-8"
                        >
                            <div className="w-24 h-24 bg-[#4ade80]/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-[#4ade80]/50 shadow-[0_0_30px_rgba(74,222,128,0.3)]">
                                <svg className="w-12 h-12 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h2 className="text-3xl font-arabic font-bold text-white mb-2">تقبل الله طاعتكم</h2>
                            <p className="text-silver mb-8 border-b border-white/10 pb-4">لقد أكملت جميع الأذكار في هذا القسم.</p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(0);
                                    setCurrentCount(0);
                                }}
                                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors flex gap-2 items-center"
                            >
                                <CircleOff className="w-4 h-4" />
                                إعادة البدء
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
