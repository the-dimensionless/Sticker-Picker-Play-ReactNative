import React, { useEffect } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';
import {
    PanGestureHandler,
    PinchGestureHandler,
    RotationGestureHandler,
    State,
} from 'react-native-gesture-handler';
import ghost from '../../../assets/emojis/ghost.png';

const USE_NATIVE_DRIVER = false;
const MINIMUM_STICKER_SCALE = 0.25;
const MAXIMUM_STICKER_SCALE = 2.5;

const StickerHandler = (props) => {
    useEffect(() => {
        console.log('Component Loaded. . .');
        console.log('Image Loaded. . . ', props.image);
    });

    let dragImageRef = React.createRef();
    let pinchImageRef = React.createRef();
    let rotateImageRef = React.createRef();

    /* Pinching */
    let baseScale = new Animated.Value(1);
    let pinchScale = new Animated.Value(1);
    let scale = pinchScale.interpolate({
        inputRange: [MINIMUM_STICKER_SCALE, MAXIMUM_STICKER_SCALE],
        outputRange: [MINIMUM_STICKER_SCALE, MAXIMUM_STICKER_SCALE],
        extrapolate: 'clamp',
    });
    let lastScale = 1;

    let onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale: pinchScale } }],
        { useNativeDriver: USE_NATIVE_DRIVER }
    );

    /* Rotation */
    let rotate = new Animated.Value(0);
    let rotateStr = rotate.interpolate({
        inputRange: [-100, 100],
        outputRange: ['-100rad', '100rad'],
    });
    let lastRotate = 0;
    let onRotateGestureEvent = Animated.event(
        [{ nativeEvent: { rotation: rotate } }],
        { useNativeDriver: USE_NATIVE_DRIVER }
    );

    /* Pan */
    let translateX = new Animated.Value(0);
    let translateY = new Animated.Value(0);
    let lastOffset = { x: 0, y: 0 };
    let onPanGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                },
            },
        ],
        { useNativeDriver: USE_NATIVE_DRIVER }
    );

    const onRotateHandlerStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            lastRotate += event.nativeEvent.rotation;
            rotate.setOffset(lastRotate);
            rotate.setValue(0);
        }
    };

    const onPinchHandlerStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            lastScale *= event.nativeEvent.scale;
            baseScale.setValue(lastScale);
            // this.pinchScale.setValue(1);
        }
    };

    const onPanStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            lastOffset.x += event.nativeEvent.translationX;
            lastOffset.y += event.nativeEvent.translationY;
            translateX.setOffset(lastOffset.x);
            translateX.setValue(0);
            translateY.setOffset(lastOffset.y);
            translateY.setValue(0);
        }
    };

    /* let translateX = translateX;
    let translateY = translateY; */
    let panStyle = {
        transform: [{ translateX }, { translateY }],
    };


    return (
        <>
            <PanGestureHandler
                onGestureEvent={onPanGestureEvent}
                onHandlerStateChange={onPanStateChange}
                ref={dragImageRef}
                simultaneousHandlers={[pinchImageRef, rotateImageRef]}
                shouldCancelWhenOutside={true}
            >
                <RotationGestureHandler
                    ref={rotateImageRef}
                    simultaneousHandlers={[pinchImageRef, dragImageRef]}
                    onGestureEvent={onRotateGestureEvent}
                    onHandlerStateChange={onRotateHandlerStateChange}
                >
                    <PinchGestureHandler
                        ref={pinchImageRef}
                        simultaneousHandlers={[rotateImageRef, dragImageRef]}
                        onGestureEvent={onPinchGestureEvent}
                        onHandlerStateChange={onPinchHandlerStateChange}
                    >
                        <Animated.View
                            style={[panStyle, styles.stickerContainer]}
                            collapsable={false}
                        >
                            <Animated.Image
                                style={[
                                    styles.pinchableImage,
                                    {
                                        transform: [
                                            { perspective: 200 },
                                            { scale: scale },
                                            { rotate: rotateStr },
                                        ],
                                    },
                                ]}
                                source={ghost}
                            />
                        </Animated.View>
                    </PinchGestureHandler>
                </RotationGestureHandler>
            </PanGestureHandler>
        </>
    );
};

const imageSize = 400;
const stickerCanvasSize = imageSize * 2;
const styles = StyleSheet.create({
    stickerContainer: {
        position: 'absolute',
        height: 250,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'yellow'
    },
    backgroundImage: {
        height: imageSize,
        width: imageSize
    },
    pinchableImage: {
        width: 250,
        height: 250,
    },
})

export default StickerHandler;