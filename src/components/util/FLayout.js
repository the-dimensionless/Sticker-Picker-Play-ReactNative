import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Button, Animated } from 'react-native';

const FLayout = () => {
    const listRef = React.createRef();
    const date = 6;
    /*  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
         31, 32, 33, 34, 35]; */
    const gridViewItems =
        [
            {
                key: 1,
                keyRef: new React.createRef()
            },
            {
                key: 2,
                keyRef: new React.createRef()
            },
            {
                key: 3,
                keyRef: new React.createRef()
            },
            {
                key: 4,
                keyRef: new React.createRef()
            },
            {
                key: 5,
                keyRef: new React.createRef()
            },
            {
                key: 6,
                keyRef: new React.createRef()
            },
            {
                key: 7,
                keyRef: new React.createRef()
            },
            {
                key: 8,
                keyRef: new React.createRef()
            },
            {
                key: 9,
                keyRef: new React.createRef()
            },
            {
                key: 10,
                keyRef: new React.createRef()
            },
            {
                key: 11,
                keyRef: new React.createRef()
            },
            {
                key: 12,
                keyRef: new React.createRef()
            },
            {
                key: 13,
                keyRef: new React.createRef()
            },
            {
                key: 14,
                keyRef: new React.createRef()
            },
            {
                key: 15,
                keyRef: new React.createRef()
            },
            {
                key: 16,
                keyRef: new React.createRef()
            },
            {
                key: 17,
                keyRef: new React.createRef()
            },
            {
                key: 18,
                keyRef: new React.createRef()
            },
            {
                key: 19,
                keyRef: new React.createRef()
            },
            {
                key: 20,
                keyRef: new React.createRef()
            },
            {
                key: 21,
                keyRef: new React.createRef()
            },
            {
                key: 22,
                keyRef: new React.createRef()
            },
            {
                key: 23,
                keyRef: new React.createRef()
            },
            {
                key: 24,
                keyRef: new React.createRef()
            },
            {
                key: 25,
                keyRef: new React.createRef()
            },
            {
                key: 26,
                keyRef: new React.createRef()
            },
            {
                key: 27,
                keyRef: new React.createRef()
            },
            {
                key: 28,
                keyRef: new React.createRef()
            },
            {
                key: 29,
                keyRef: new React.createRef()
            },
            {
                key: 30,
                keyRef: new React.createRef()
            },
            {
                key: 31,
                keyRef: new React.createRef()
            },
            {
                key: 32,
                keyRef: new React.createRef()
            },
            {
                key: 33,
                keyRef: new React.createRef()
            },
            {
                key: 34,
                keyRef: new React.createRef()
            },
            {
                key: 35,
                keyRef: new React.createRef()
            },
        ];

    useEffect(() => {
        console.log('Hello----------------');
        console.log(gridViewItems);
    })

    const [animation, setAnimation] = useState(new Animated.Value(0));
    const pastDays = animation.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ["rgb(211,211,211)", "rgb(34,139,34)", "rgb(128,0,0)"]
    })
    const bgStyle = {
        backgroundColor: pastDays
    }

    const handleAnimation = () => {
        console.log('Starting animation . . .');
        gridViewItems.forEach((i) => {
            console.log('Element', i.keyRef.current.setNativeProps(styles.circleGreen));
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <FlatList
                data={gridViewItems}
                keyExtractor={item => item.key}
                ref={listRef}
                renderItem={({ item }) =>
                    <Animated.View
                        style={{ ...styles.circle, ...bgStyle }} key={item.key}
                        ref={item.keyRef}
                    >
                        <Text>{item.key}</Text>
                    </Animated.View>}
                numColumns={5}
            />
            <Button title='start' onPress={() => handleAnimation()} />
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        borderRadius: 40,
        width: 55,
        height: 60,
        backgroundColor: 'grey',
        marginBottom: 5,
        marginRight: 5
    },
    circleGreen: {
        borderRadius: 40,
        width: 55,
        height: 60,
        backgroundColor: 'green',
        marginBottom: 5,
        marginRight: 5
    },
    btn: {
        fontSize: 36,
        color: 'blue'
    }
})
export default FLayout;