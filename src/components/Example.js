import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import FontTypes from '../enums/FontTypes';
import DropDownPicker from 'react-native-dropdown-picker';

const Example = props => {
    const [fontFamily, setFontFamily] = useState('SansitaSwashed-Bold');
    const fontStyle = {
        fontSize: 24,
        fontFamily: fontFamily
    }
    const fontNames = [Object.keys(FontTypes)];
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text style={fontStyle}>This is the header</Text>
            <TextInput style={styles.input} placeholder='Enter some text' />

            <DropDownPicker style={{ width: '50%' }}
                items={[
                    { label: 'Font 1', value: FontTypes.SansitaSwashedBlack },
                    { label: 'Font 2', value: FontTypes.SansitaSwashedBold },
                ]}
                defaultIndex={0}
                placeholder="Select a Font Style"
                containerStyle={{ height: 40 }}
                dropDownStyle={{ width: 120 }}
                onChangeItem={item => setFontFamily(item.value)}
            />

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
        fontSize: 16,
        fontFamily: 'SansitaSwashed-Regular'
    }
});

export default Example;