import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Text, TouchableWithoutFeedback } from 'react-native';
import { Easing } from 'react-native-reanimated';

const Layout = () => {
    const date = 5;

    /*  useEffect(() => {
         handleAnimation();
     }) */

    const objects = React.createRef();
    const [pastAnimation, setPastAnimation] = useState(new Animated.Value(0))
    const [futureAnimation, setFutureAnimation] = useState(new Animated.Value(0))

    let index = 1;
    const handleAnimation = () => {
        Animated.timing(pastAnimation, {
            toValue: 1,
            duration: 1200,
            delay: (index++) * 650,
            easing: Easing.linear(),
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(futureAnimation, {
                toValue: 2,
                duration: 1200,
                delay: (index++) * 650,
                easing: Easing.linear,
                useNativeDriver: false
            }).start()
        })
    }

    const pastDays = pastAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(211,211,211)", "rgb(34,139,34)"]
    })
    const pastDaysStyle = {
        backgroundColor: pastDays
    }
    const comingDays = futureAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(211,211,211)", "rgb(128,0,0)"]
    })
    const comingDaysStyle = {
        backgroundColor: comingDays
    }

    return (
        <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-between", margin: 5 }}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35].map(app => {
                        return (app > date) ? (
                            <Animated.View
                                style={{ ...styles.circle, ...comingDaysStyle }} key={app}>
                            </Animated.View>
                        ) : (
                                <Animated.View
                                    style={{ ...styles.circle, ...pastDaysStyle }} key={app}>
                                </Animated.View>
                            )
                    })}
            </View>
            <TouchableWithoutFeedback onPress={handleAnimation}>
                <Text style={styles.btn}>Start</Text>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    circle: {
        borderRadius: 40,
        width: 55,
        height: 60,
        //backgroundColor: 'grey',
        marginBottom: 5
    },
    btn: {
        fontSize: 36,
        color: 'blue'
    }
})

export default Layout;