import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

import ghost from '../../../assets/emojis/ghost.png';
import heart from '../../../assets/emojis/heart.png';
import heartEyes from '../../../assets/emojis/heartEyes.png';
import kiss from '../../../assets/emojis/kiss.png';
import party from '../../../assets/emojis/party.png';
import smile from '../../../assets/emojis/smile.png';
import sunglasses from '../../../assets/emojis/sunglasses.png';
import robot from '../../../assets/emojis/robot.png';
import thumbsup from '../../../assets/emojis/thumbsup.png';

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

const WithSheet = (props) => {

    const logger = () => {
        console.log('Sticker is selected', props.props);

    }

    //export default class WithSheet extends React.Component {
    const renderInner = () => (
        // <View style={styles.panel}>
        <ScrollView overScrollMode={'always'} horizontal={true} contentContainerStyle={[styles.stickerPickerContainer]}>
            {finalStickers.map((sticker, index) => {
                return (
                    /*  <TouchableOpacity key={index} onPress={() => logger()}>
                         {sticker[0]}
                     </TouchableOpacity> */
                    <View key={index} onTouchStart={() => props.props(sticker[1])}>
                        {sticker[0]}
                    </View>
                )
            })}
        </ScrollView>
        //  </View>
    )
    const renderHeader = () => <View style={styles.header} />
    const fall = new Animated.Value(1)
    return (
        <>
            <BottomSheet
                snapPoints={[500, 50]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledInnerScrolling={true}
                borderRadius={36}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: 50,
    },
    panel: {
        backgroundColor: 'rgb(246, 241, 241)',
        width: '100%',
        height: '100%',
    },
    stickerPickerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 130,
    },
})

export default WithSheet;