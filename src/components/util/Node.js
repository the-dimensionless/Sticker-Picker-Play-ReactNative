import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Node = ({ item }) => {
    return (
        <View

            style={!item.currentDate ? { ...styles.pellet, backgroundColor: item.backgroundColor }
                : { ...styles.circle, borderColor: item.backgroundColor, borderWidth: 5 }
            } key={item.key}
            ref={item.keyRef}
        >
            <Text style={styles.date}>
                {item.currentDate && item.key}
            </Text>
        </View>

    );
};

const styles = StyleSheet.create({
    circle: {
        borderRadius: 40,
        width: 55,
        height: 60,
        marginBottom: 5,
        marginRight: 5
    },
    pellet: {
        borderRadius: 7,
        width: 40,
        height: 10,
        marginBottom: 5,
        marginRight: 5
    },
    today: {

    },
    date: {
        fontSize: 24,
        alignSelf: 'center',
        padding: 12
    }
})

export default Node;