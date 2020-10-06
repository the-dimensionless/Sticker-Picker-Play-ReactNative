import React from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import Node from './Node';
import _ from 'lodash';

const todayDate = new Date('2020-09-06');
let date = undefined;
let maxDate = undefined;
let startDay = undefined;

class FLayout extends React.Component {
    constructor(props) {
        super(props);

        date = todayDate.getDate();
        maxDate = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0).getDate();
        startDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1).getDay();


        this.state = {
            gridViewItems: _.range(1 - startDay, 36 - startDay).map(app => {
                return {
                    key: app,
                    keyRef: React.createRef(),
                    backgroundColor: 'grey',
                    currentDate: false,
                    transparent: app < 1 || app > maxDate,
                    opacity: 1
                }
            })
        }
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

        const animateNode = async (index) => {
            const newList = (this.state)
            newList.gridViewItems[index].opacity = 0.2;
            this.setState(newList);
            for (let currentOpacity = 0.2; currentOpacity < 1.0; currentOpacity += 0.65) {
                await delay(1);
                const newList = (this.state)
                newList.gridViewItems[index].opacity = Math.min(currentOpacity, 1);
                this.setState(newList);
            }
        }

        const handleAnimation = async () => {
            for (let index = 0; index < this.state.gridViewItems.length; index++) {
                //animateNode(index);
                const i = this.state.gridViewItems[index];
                const newList = (this.state)
                newList.gridViewItems[index].backgroundColor = (i.key < date) ? "green" : "red";
                newList.gridViewItems[index].currentDate = (i.key === date);
                this.setState(newList);

                if ((index + 1) % 3 === 0) {
                    await delay(250);
                }
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
                    numColumns={7}
                />
                <Button title='start' onPress={() => handleAnimation()} />
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        maxHeight: '100%'
    }

})
export default FLayout;