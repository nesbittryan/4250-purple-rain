import PushNotification from 'react-native-push-notification'
import { Payment } from '../common/models/payment';

export default class NotificationService {
    
    lastId: number

    constructor(onNotification: any) {
        this.configure(onNotification);
        this.lastId = 0;
    }
    
    configure(onNotification: any, gcm = "") {
        PushNotification.configure({
            onNotification: onNotification,
            senderID: gcm,
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }

    schedulePaymentNotification(periodInDays: number, payment: Payment) {
        this.lastId++;
        PushNotification.localNotificationSchedule({
            date: new Date(Date.now() + (periodInDays * 1000)),
            title: "Payment due for " + payment.description,
            message: "Payment to " + payment.other_name + " of " + payment.amount + " is due.",
            userInfo: { payment: payment }
        })
    }

    scheduleNotification() {
        this.lastId++;
        PushNotification.localNotificationSchedule({
            date: new Date(Date.now() + (30 * 1000)), // in 30 secs
            title: "Scheduled Notificationff", // (optional)
            message: "My Notification Messagefff", // (required)
        });
    }
}