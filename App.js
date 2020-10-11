import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Example from './src/components/Example';
import StickerOverlay from './src/components/Overlays/StickerOverlay';
import ImagePlay from './src/components/util/ImagePlay';
import StickerWraps from './src/components/sticker-wrap-gift/StickerWrap';

import DisplayImage from './assets/diwali.jpg';

import Layout from './src/components/util/Layout';
import FLayout from './src/components/util/FLayout';
import WithSheet from './src/components/experimenting/withSheet';

export default function App() {
  return (
    // <Example />
    // <StickerOverlay />
    // <ImagePlay />
    <StickerWraps displayImage={DisplayImage} />
    //<Layout />
    //<FLayout / >
    //<WithSheet />
  );
}

