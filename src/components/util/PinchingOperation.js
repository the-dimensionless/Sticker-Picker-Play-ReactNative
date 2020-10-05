import React from 'react'
import { Animated, Dimensions, View, Text, Image } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

import ghost from '../../../assets/emojis/ghost.png';


const screen = Dimensions.get('window')

const PinchingOperation = ({ uri: imageUri }) => {
    let scale = new Animated.Value(1)

    let onPinchEvent = Animated.event(
        [{
            nativeEvent: { scale: scale }
        }],
        {
            useNativeDriver: true
        }
    )

    let onPinchStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            console.log(event.nativeEvent)
            /*    Animated.spring(scale, {
                   toValue: 1,
                   useNativeDriver: true
               }).start() */
        }
    }
    return (
        <PinchGestureHandler
            onGestureEvent={onPinchEvent}
            onHandlerStateChange={onPinchStateChange}
        >
            <Animated.Image
                source={ghost}
                style={{
                    width: screen.width,
                    height: 400,
                    transform: [{ scale: scale }]
                }}
                resizeMode='contain'
            />
        </PinchGestureHandler>
    );
};

export default PinchingOperation;