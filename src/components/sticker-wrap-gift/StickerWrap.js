import React, { createRef, useState } from 'react';
import { Animated, Image, View } from 'react-native';
import ViewShot from 'react-native-view-shot';

import Sticker from '../experimenting/MixedMode';

const StickerWrap = ({ displayImage }) => {
    const viewShot = createRef()

    const [sticker, setSticker] = useState();
    const [showSticker, setShowSticker] = useState(false);

    const [finalImage, setFinalImage] = useState();
    const [pan, setPan] = useState(new Animated.ValueXY());
    const [previewImageSize, setPreviousImageSize] = useState();


    const takeViewShot = () => {
        viewShot.current.capture().then(uri => {
            Image.getSize(uri, (width, height) => {
                completedEditing(uri, width, height);
                setFinalImage({
                    finalImage: {
                        uri: uri,
                        width: width,
                        height: height
                    }
                })
            });
        });
    }

    const resetViewShot = () => {
        setFinalImage({
            finalImage: null
        });
        setPan(new Animated.ValueXY());
        setShowSticker(false);
    }

    const previewStickerImage = (imageUrl, size = 15) => {
        return (
            <Image
                style={{
                    width: previewImageSize,
                    height: previousImageSize,
                    margin: 5
                }}
                source={imageUrl}
            />
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <ViewShot
                style={{ flex: 1 }}
                ref={viewShot}
                options={{ format: 'jpg', quality: 1.0 }}
            >
                <Sticker image={displayImage} />
            </ViewShot>

        </View>
        // <Sticker />
    );
};

export default StickerWrap;