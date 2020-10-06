import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Button, Animated } from 'react-native';
import Node from './Node';

const date = 6;
class FLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridViewItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
                23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35].map(app => {
                    return {
                        key: app,
                        keyRef: React.createRef(),
                        backgroundColor: 'grey',
                        currentDate: false
                    }
                })
        }
    }

    componentDidMount() {
        const listRef = React.createRef();
        const date = 6;
        console.log(this.state.gridViewItems);

    }
    render() {
        const delay = (timer) => {
            return new Promise((res, rej) => {
                try {
                    setTimeout(() => {
                        res()
                    }, timer);
                } catch (error) {
                    rej()
                }
            })
        }

        const handleAnimation = async () => {
            for (let index = 0; index < this.state.gridViewItems.length; index++) {
                const i = this.state.gridViewItems[index];
                const newList = (this.state)
                newList.gridViewItems[index].backgroundColor = (i.key < date) ? "green" : "red";
                newList.gridViewItems[index].currentDate = (i.key === date);
                this.setState(newList);
                console.log('Animatin for ', i.key);
                await delay(500);
            }
        }

        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <FlatList
                    data={this.state.gridViewItems}
                    keyExtractor={item => item.key}
                    contentContainerStyle={styles.flatlist}
                    /* ref={listRef} */
                    renderItem={({ item }) =>
                        <Node item={item} />}
                    numColumns={5}
                />
                {/* <Button title='start' onPress={() => handleAnimation()} /> */}
            </View>
        )
    };
};

const styles = StyleSheet.create({
    btn: {
        fontSize: 36,
        color: 'blue'
    },
    flatlist: {
        flex: 1,
        justifyContent: 'space-between'
    }

})
export default FLayout;