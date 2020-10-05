import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Example from './src/components/Example';
import StickerOverlay from './src/components/Overlays/StickerOverlay';
import ImagePlay from './src/components/experimenting/ImagePlay';
import StickerWraps from './src/components/sticker-wrap-gift/StickerWrap';

import DisplayImage from './assets/diwali.jpg';

export default function App() {
  return (
    // <Example />
    // <StickerOverlay />
    // <ImagePlay />
    <StickerWraps displayImage={DisplayImage} />
  );
}

