import * as React from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';

import {
    PanGestureHandler,
    PinchGestureHandler,
    RotationGestureHandler,
    State,
} from 'react-native-gesture-handler'; // 1.0.0-alpha.35
import ghost from '../../../assets/emojis/ghost.png';

const USE_NATIVE_DRIVER = false; // https://github.com/kmagiera/react-native-gesture-handler/issues/71
const MINIMUM_STICKER_SCALE = 0.25;
const MAXIMUM_STICKER_SCALE = 2.5;

export class Sticker extends React.Component {
    constructor(props) {
        super(props);
        console.log('Image data ', this.props.image);
        console.log('List of Emojis is', this.props.emojis);

        this.dragImageRef = React.createRef();
        this.pinchImageRef = React.createRef();
        this.rotateImageRef = React.createRef();


        /* Pinching */
        this.baseScale = new Animated.Value(1);
        this.pinchScale = new Animated.Value(1);
        this.scale = this.pinchScale.interpolate({
            inputRange: [MINIMUM_STICKER_SCALE, MAXIMUM_STICKER_SCALE],
            outputRange: [MINIMUM_STICKER_SCALE, MAXIMUM_STICKER_SCALE],
            extrapolate: 'clamp',
        });
        this.lastScale = 1;

        this.onPinchGestureEvent = Animated.event(
            [{ nativeEvent: { scale: this.pinchScale } }],
            { useNativeDriver: USE_NATIVE_DRIVER }
        );

        /* Rotation */
        this.rotate = new Animated.Value(0);
        this.rotateStr = this.rotate.interpolate({
            inputRange: [-100, 100],
            outputRange: ['-100rad', '100rad'],
        });
        this.lastRotate = 0;
        this.onRotateGestureEvent = Animated.event(
            [{ nativeEvent: { rotation: this.rotate } }],
            { useNativeDriver: USE_NATIVE_DRIVER }
        );

        /* Pan */
        this.translateX = new Animated.Value(0);
        this.translateY = new Animated.Value(0);
        this.lastOffset = { x: 0, y: 0 };
        this.onPanGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        translationX: this.translateX,
                        translationY: this.translateY,
                    },
                },
            ],
            { useNativeDriver: USE_NATIVE_DRIVER }
        );
    }

    onRotateHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this.lastRotate += event.nativeEvent.rotation;
            this.rotate.setOffset(this.lastRotate);
            this.rotate.setValue(0);
        }
    };

    onPinchHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this.lastScale *= event.nativeEvent.scale;
            this.baseScale.setValue(this.lastScale);
            // this.pinchScale.setValue(1);
        }
    };

    onPanStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this.lastOffset.x += event.nativeEvent.translationX;
            this.lastOffset.y += event.nativeEvent.translationY;
            this.translateX.setOffset(this.lastOffset.x);
            this.translateX.setValue(0);
            this.translateY.setOffset(this.lastOffset.y);
            this.translateY.setValue(0);
        }
    };

    render() {
        const translateX = this.translateX;
        const translateY = this.translateY;
        const panStyle = {
            transform: [{ translateX }, { translateY }],
        };
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Image source={this.props.image} style={styles.backgroundImage} />

                {this.props.emojis.map((sticker, index) => {
                    return (
                        <PanGestureHandler key={index}
                            {...this.props}
                            onGestureEvent={this.onPanGestureEvent}
                            onHandlerStateChange={this.onPanStateChange}
                            ref={this.dragImageRef}
                            simultaneousHandlers={[this.pinchImageRef, this.rotateImageRef]}
                            shouldCancelWhenOutside={true}
                        >
                            <RotationGestureHandler
                                ref={this.rotateImageRef}
                                simultaneousHandlers={[this.pinchImageRef, this.dragImageRef]}
                                onGestureEvent={this.onRotateGestureEvent}
                                onHandlerStateChange={this.onRotateHandlerStateChange}
                            >
                                <PinchGestureHandler
                                    ref={this.pinchImageRef}
                                    simultaneousHandlers={[this.rotateImageRef, this.dragImageRef]}
                                    onGestureEvent={this.onPinchGestureEvent}
                                    onHandlerStateChange={this.onPinchHandlerStateChange}
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
                                                        { scale: this.scale },
                                                        { rotate: this.rotateStr },
                                                    ],
                                                },
                                            ]}
                                            source={sticker}
                                        />
                                    </Animated.View>
                                </PinchGestureHandler>
                            </RotationGestureHandler>
                        </PanGestureHandler>
                    )
                })}
            </View>
        );
    }
}

export default Sticker;

const imageSize = 400
const stickerCanvasSize = imageSize * 2
const styles = StyleSheet.create({
    stickerContainer: {
        position: 'absolute',
        height: stickerCanvasSize,
        width: stickerCanvasSize,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        height: imageSize,
        width: imageSize
    },
    pinchableImage: {
        width: 250,
        height: 250,
    },
});
