import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuid } from 'uuid';

/* start timestamp to date funtions */
export const timeStampToDate = (date) => {
    date = new Date(+date)
    const [month, day] = date.toLocaleDateString().split('/')
    const year = date.getFullYear();
    const [hr, mn] = date.toLocaleTimeString().split(':')
    const dateString = `${day}-${month}-${year}`
    let hrs
    hr > 12 ? (hrs = hr - 12) : hrs = hr;
    hrs < 10 ? hrs = `0${hrs}` : null
    const timeString = `${hrs}:${mn} ${hr > 12 ? "pm" : "am"}`
    const fullDate = `${dateString} ${timeString}`
    return fullDate
}
/* end timestamp to date funtions */

/* start push notifications funtions */
export async function sendPushNotification(expoPushToken, notificationMessag = false) {
    let message
    if (notificationMessag) {
        message = notificationMessag
    } else {
        message = {
            to: expoPushToken,
            sound: 'default',
            title: 'toDo app',
            body: '',
        };
    }


    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        // console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
/* end push notifications funtions */

/* start storageAsync funtions*/
// store data
export const storeDataObject = async (value) => {
    try {
        let prevData = prevData = await AsyncStorage.getItem('@todos')
        let exist = false
        if (prevData) {
            prevData = JSON.parse(prevData.replace("[,", "["))
            exist = prevData.some((e) => e.todo === value.todo)
            if (exist) {
                return 'item exist'
            } else {
                const jsonValue = JSON.stringify({ ...value, id: uuid() })
                prevData = JSON.stringify(prevData).replace('[','').replace(']','')
                const data = `[${prevData},${jsonValue}]`
                await AsyncStorage.setItem('@todos', data)
                return 'item added'
            }
        } else {
            const jsonValue = JSON.stringify({ ...value, id: uuid() })
            const data = `[${jsonValue}]`
            await AsyncStorage.setItem('@todos', data)
            return 'item added'
        }
    } catch (e) {
        console.log(e)
    }
}
// update when these is over due
export const updateOverdue = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@todos', jsonValue)
    } catch (e) {
        console.log(e)
    }
}
//update single or multiple rows
export const updateDataObject = async (value, muliple = []) => {
    try {
        const prevData = await AsyncStorage.getItem('@todos')
        if (prevData) {
            let updatePrevData
            if (muliple.length) {
                updatePrevData = JSON.parse(prevData.replace("[,", "[")).map(item => muliple.includes(item.id) ? { ...item, status: 'complete' } : item)
            } else {
                updatePrevData = JSON.parse(prevData.replace("[,", "[")).map(item => item.id === value.id ? { ...item, ...value } : item)
            }
            const jsonValue = JSON.stringify(updatePrevData)
            await AsyncStorage.setItem('@todos', jsonValue)
            return 'item updated'
        } else {
            return "item didn't update"
        }
    } catch (e) {
        console.log(e)
    }
}
//delete on or multiple rows
export const deleteDataObject = async (ids) => {
    try {
        const prevData = await AsyncStorage.getItem('@todos')
        if (prevData) {
            let updatePrevData = prevData
            if (ids.length) {
                updatePrevData = JSON.parse(prevData.replace("[,", "[")).filter(item => !ids.includes(item.id) && item)
            }
            const jsonValue = JSON.stringify(updatePrevData)
            await AsyncStorage.setItem('@todos', jsonValue)
            return 'items deleted'
        } else {
            return "item didn't update"
        }
    } catch (e) {
        console.log(e)
    }
}
// get all data from storageAsync
export const getDataObject = async () => {
    try {
        const data = await AsyncStorage.getItem('@todos')
        if (data) {
            return (await JSON.parse(data.replace("[,", "[")))
        }
        return await null
    } catch (e) {
        console.log(e)
    }
}
/* end of storageAsync*/ 

export const clearStorage = async () => {
    try {
        await AsyncStorage.setItem('@todos', "")
        return "clear"
    } catch (e) {
        // saving error
    }
}