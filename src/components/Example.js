import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import FontTypes from '../enums/FontTypes';
import DropDownPicker from 'react-native-dropdown-picker';

const Example = props => {
    const [fontFamily, setFontFamily] = useState('SansitaSwashed-Bold');
    const fontStyle = {
        fontSize: 16,
        fontFamily: fontFamily,
        width: '50%'
    }
    const fontNames = [Object.keys(FontTypes)];
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text style={styles.input}>This is the header</Text>
            <View style={{ flexDirection: "row" }}>
                <TextInput style={fontStyle} placeholder='Enter some text' />

                <DropDownPicker style={{ width: '100%' }}
                    items={[
                        { label: 'SansitaBlack', value: FontTypes.SansitaSwashedBlack },
                        { label: 'SansitsBold', value: FontTypes.SansitaSwashedBold },
                        { label: 'SansitaExtraBold', value: FontTypes.SansitaSwashedExtraBold },
                        { label: 'SansitaLight', value: FontTypes.SansitaSwashedLight },
                    ]}
                    defaultIndex={0}
                    placeholder="Select a Font Style"
                    containerStyle={{ height: 40 }}
                    dropDownStyle={{ width: 160 }}
                    onChangeItem={item => {
                        setFontFamily(item.value);
                        console.log('Current style is ', fontFamily);
                    }}
                />
            </View>


            <View style={StyleSheet.hairlineWidth} />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {

    },
    input: {
        fontSize: 24,
        fontFamily: 'SansitaSwashed-Regular'
    }
});

export default Example;