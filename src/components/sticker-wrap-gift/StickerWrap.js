import React, { createRef, useState } from 'react';
import { Animated, Image, View, TouchableOpacity, Text, Button, ScrollView, StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';

import Sticker from '../experimenting/MixedMode';

import ghost from '../../../assets/emojis/ghost.png';
import heart from '../../../assets/emojis/heart.png';
import heartEyes from '../../../assets/emojis/heartEyes.png';
import kiss from '../../../assets/emojis/kiss.png';
import party from '../../../assets/emojis/party.png';
import smile from '../../../assets/emojis/smile.png';
import sunglasses from '../../../assets/emojis/sunglasses.png';
import robot from '../../../assets/emojis/robot.png';
import thumbsup from '../../../assets/emojis/thumbsup.png';

import WithSheet from '../experimenting/withSheet';


const StickerWrap = ({ displayImage }) => {
    const viewShot = createRef()
    const stickers = []
    const [emojis, setEmojis] = useState([ghost]);
    const [sticker, setSticker] = useState();
    const [showSticker, setShowSticker] = useState(false);

    const [pickerVisible, setPickerVisible] = useState(true);

    const [finalImage, setFinalImage] = useState({});
    const [pan, setPan] = useState(new Animated.ValueXY());
    const [previewImageSize, setPreviousImageSize] = useState(350);

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

    const PreviewStickerImage = (imageUrl, size = 15) => {
        return (
            <Image
                style={{
                    width: previewImageSize,
                    height: previewImageSize,
                    margin: 5
                }}
                source={{ uri: finalImage.uri }}
            />
        )
    }

    const SheetStickerImage = (imageUrl, size = 15) => {
        return (
            <Image
                style={{ width: 50, height: 50, margin: 5 }}
                source={imageUrl}
            />
        )
    }
    const defaultStickers = [
        [SheetStickerImage(ghost), ghost],
        [SheetStickerImage(heart), heart],
        [SheetStickerImage(heartEyes), heartEyes],
        [SheetStickerImage(kiss), kiss],
        [SheetStickerImage(party), party],
        [SheetStickerImage(robot), robot],
        [SheetStickerImage(smile), smile],
        [SheetStickerImage(sunglasses), sunglasses],
        [SheetStickerImage(thumbsup), thumbsup]
    ];

    let finalStickers = defaultStickers;
    /* if (!stickers) {
        finalStickers = defaultStickers;
    } else if (includeDefaultStickers) {
        finalStickers = stickers.concat(defaultStickers);
    } else {
        finalStickers = stickers;
    } */


    return (
        <View style={{ flex: 1 }}>
            {(pickerVisible) ?
                <>
                    <ViewShot
                        style={{ flex: 1.2 }}
                        ref={viewShot}
                        options={{ format: 'jpg', quality: 1.0 }}
                    >
                        <Sticker image={displayImage} emojis={emojis} />
                    </ViewShot>

                    <TouchableOpacity onPress={() => takeViewShot()} style={{ flex: 0.5 }}>
                        <Text>Take Snapshot</Text>
                    </TouchableOpacity>
                    <View >
                        <Button title='Hi' />
                    </View>
                    <WithSheet props={addEmoji} />
                    {/* <ScrollView overScrollMode={'always'} horizontal={true} contentContainerStyle={[styles.stickerPickerContainer]}>
                        {finalStickers.map((sticker, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => setSticker(sticker[1])}>
                                    {sticker[0]}
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView> */}

                </>
                :
                <>
                    <Text>This is a preview</Text>
                    <PreviewStickerImage imageUrl={finalImage.uri} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                        <Button title='Go Back' onPress={() => setPickerVisible(true)} />
                        <Button title='Go Forward' />
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