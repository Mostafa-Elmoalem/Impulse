import { useEffect, useState } from 'react';
import { useCompletionStore } from '@/stores/useCompletionStore';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

export const CompletionSheet = () => {
    const { isOpen, activeTask, closeSheet } = useCompletionStore();
    const [actualTime, setActualTime] = useState(0); // بالدقائق

    // عند فتح النافذة، نحسب الوقت تلقائياً
    useEffect(() => {
        if (isOpen && activeTask) {
            // هنا منطق "الذكاء": نحسب الفرق بين الآن ووقت البدء
            // هذا مجرد مثال، المفروض تأخذ وقت البدء الحقيقي من الباك اند أو الستيت
            const calculatedMinutes = 60; // فرضنا أنه ساعة
            setActualTime(calculatedMinutes);
        }
    }, [isOpen, activeTask]);

    if (!isOpen || !activeTask) return null;

    const handleConfirm = () => {
        // هنا نرسل الـ API للباك اند
        console.log(`Task ${activeTask.id} completed in ${actualTime} mins`);
        closeSheet();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm transition-all">
            <div className="w-full max-w-md bg-white rounded-t-2xl p-6 shadow-2xl animate-slide-up">

                <div className="text-center mb-6">
                    <div className="mx-auto w-12 h-1 bg-gray-300 rounded-full mb-4"></div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        أحسنت! أتممت المهمة
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">{activeTask.title}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                    <label className="text-xs font-semibold text-gray-400 uppercase">المدة الفعلية للعمل</label>
                    <div className="flex items-center justify-between mt-2">
                        <button onClick={() => setActualTime(t => Math.max(0, t - 5))} className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100">-5</button>
                        <div className="text-2xl font-bold text-primary flex items-center gap-2">
                            {actualTime} <span className="text-sm font-normal text-gray-500">دقيقة</span>
                        </div>
                        <button onClick={() => setActualTime(t => t + 5)} className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100">+5</button>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={closeSheet} className="flex-1 py-3 text-gray-600 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200">
                        تعديل لاحقاً
                    </button>
                    <button onClick={handleConfirm} className="flex-[2] py-3 text-white bg-primary rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700">
                        تأكيد وإغلاق
                    </button>
                </div>

            </div>
        </div>
    );
};