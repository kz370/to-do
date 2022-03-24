import React from 'react';
import { View, Button } from 'react-native';
import { getDataObject, storeDataObject, clearStorage } from './Storage';


const storeData = async () => {
    await console.log(await storeDataObject({ todo: 'kzdev370', description: 'lurem ipsom', date: '1648123936', status: "pending" }))
}

const getData = async () => {
    console.log(await getDataObject())
}
const clearS = async () => {
    console.log(await clearStorage())
}


export default function StorageComponent() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button onPress={async () => storeData()} title="storeData" />
            <Button onPress={async () => getData()} title="getData" />
            <Button onPress={async () => clearS()} title="clear" />
        </View>
    )
}