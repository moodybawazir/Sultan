export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        console.warn('This browser does not support desktop notification');
        return false;
    }

    if (Notification.permission === 'granted') {
        return true;
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    return false;
};

export const schedulePrayerNotification = (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
        // Basic implementation for immediate local web notification
        // Real background notifications would need a Service Worker pushing at an exact timestamp
        new Notification(title, {
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            dir: 'rtl',
            ...options
        });
    }
};
