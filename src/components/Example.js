import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import FontTypes from '../enums/FontTypes';

const Example = props => {
    const [fontFamily, setFontFamily] = useState('SansitaSwashed-Bold');
    const fontStyle = {
        fontSize: 24,
        fontFamily: fontFamily
    }
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text style={fontStyle}>This is the header</Text>
            <TextInput style={styles.input} placeholder='Enter some text' />
            <Button title='Click here to change header style' onPress={() => {
                setFontFamily('SansitaSwashed-Black');
            }} />
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