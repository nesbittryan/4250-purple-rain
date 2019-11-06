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

    schedulePaymentNotification(date: Date, periodInDays: number, payment: Payment) {
        this.lastId++;
        //date.setDate(date.getDate() + periodInDays)
        date.setTime(date.getTime() + 15000)
        PushNotification.localNotificationSchedule({
            date: date,
            title: "Payment due for " + payment.description,
            message: "Payment to " + payment.other_name + " of " + payment.amount + " dollars is due.",
            userInfo: { date: date, payment: payment, periodInDays: periodInDays }
        })
    }

    sendMessageNotification(user: string) {
        this.lastId++;
        PushNotification.localNotification({
            /* iOS and Android properties */
            title: "New Message from" + user, // (optional)
            message: "You have recieved a new message", // (required)
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        });
    }
}