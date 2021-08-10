import React, {useState, useEffect} from 'react';
import {View} from 'react-native-animatable';
import {BallIndicator} from 'react-native-indicators';
const Loader = props => {
  return props.visible ? (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
      }}>
      <BallIndicator animating={props.visible} color="#2b8ecd" />
    </View>
  ) : null;
};
export default Loader;
