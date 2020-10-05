import React from 'react'
import { StyleSheet, View } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

const WithSheet = () => {
    //export default class WithSheet extends React.Component {
    const renderInner = () => (
        <View style={styles.panel}>
            <SampleView2 />
        </View>
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
    }
})

export default WithSheet;