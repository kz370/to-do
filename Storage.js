import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuid } from 'uuid';

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

export const updateOverdue = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@todos', jsonValue)
    } catch (e) {
        console.log(e)
    }
}


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


export const clearStorage = async () => {
    try {
        await AsyncStorage.setItem('@todos', "")
        return "clear"
    } catch (e) {
        // saving error
    }
}