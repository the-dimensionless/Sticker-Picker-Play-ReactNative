import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Example from './src/components/Example';
import StickerOverlay from './src/components/Overlays/StickerOverlay';
import ImagePlay from './src/components/util/ImagePlay';
import StickerWraps from './src/components/sticker-wrap-gift/StickerWrap';

import DisplayImage from './assets/diwali.jpg';

import Layout from './src/components/util/Layout';
import FLayout from './src/components/util/FLayout';
import WithSheet from './src/components/experimenting/withSheet';
import StickerHandler from './src/components/experimenting/StickerHandler';

export default function App() {
  return (
    // <Example />
    // <StickerOverlay />
    // <ImagePlay />
    <StickerWraps displayImage={DisplayImage} />
    //<Layout />
    //<FLayout / >
    //<WithSheet />
    /*  
       <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
       <Image source={DisplayImage} />
       <StickerHandler />
       <StickerHandler />
     </View>
    */

  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 400,
    width: 400
  },
})

