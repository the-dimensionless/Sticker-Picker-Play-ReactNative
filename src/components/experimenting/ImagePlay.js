import React from 'react';
import { View, Text, Image } from 'react-native';

import PinchingOperation from '../experimenting/PinchingOperation';
import ghost from '../../../assets/emojis/ghost.png';

const ImagePlay = () => {
    return (
        <View>
            <Text>Below is the image</Text>
            <PinchingOperation imageUri={Image.resolveAssetSource(ghost).uri} />
            <Text>EOImage</Text>
        </View>
    );
};

export default ImagePlay;