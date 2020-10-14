import React, { createRef, useState } from 'react';
import { Animated, Image, View, Button, StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';

/* import Sticker from '../experimenting/MixedMode'; */
import StickerHandler from '../experimenting/StickerHandler';
import WithSheet from '../experimenting/withSheet';


const StickerWrap = ({ displayImage }) => {
    const viewShot = createRef()
    const [emojis, setEmojis] = useState([]);
    const [showSticker, setShowSticker] = useState(false);

    const [pickerVisible, setPickerVisible] = useState(true);

    const [finalImage, setFinalImage] = useState({});
    const [pan, setPan] = useState(new Animated.ValueXY());
    const [previewImageSize, setPreviousImageSize] = useState(400);

    const addEmoji = (emo) => {
        setEmojis([...emojis, emo]);
    }
    const takeViewShot = () => {
        console.log('capturing . . .')
        viewShot.current.capture().then(uri => {
            Image.getSize(uri, (width, height) => {
                completedEditing(uri, width, height);
                setFinalImage({
                    uri: uri,
                    width: width,
                    height: height
                })
            });
            console.log('done capturing!')
        });
    }

    const completedEditing = (imageUri, width, height) => {
        setPickerVisible(false);
    }

    const resetViewShot = () => {
        setFinalImage({
            finalImage: null
        });
        setPan(new Animated.ValueXY());
        setShowSticker(false);
    }

    const PreviewStickerImage = () => {
        return (
            <Image
                style={{
                    width: '100%',
                    height: '90%',
                    margin: 0,
                }}
                source={{ uri: finalImage.uri }}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {(pickerVisible) ?
                <>
                    <ViewShot
                        style={{ flex: 3 }}
                        ref={viewShot}
                        options={{ format: 'jpg', quality: 1.0 }}
                    >
                        <Image source={displayImage} style={{ flex: 1, width: '100%' }} />
                        {emojis.map((sticker, index) => {
                            return (
                                <StickerHandler image={sticker} key={index} />
                            )
                        })}
                    </ViewShot>

                    <WithSheet props={addEmoji} />
                    <View style={{ flex: 0.15 }} >
                        <Button title='Take Snapshot' onPress={() => takeViewShot()} />
                    </View>
                </>
                :
                <>
                    <PreviewStickerImage imageUrl={finalImage.uri} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                        <View style={{ flex: 0.4 }}>
                            <Button title='Go Back' onPress={() => {
                                setPickerVisible(true);
                                setEmojis([])
                            }} />
                        </View>
                        <View style={{ flex: 0.4 }}>
                            <Button title='Go Forward' />
                        </View>
                    </View>
                </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    stickerPickerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 130,
    },
})

export default StickerWrap;