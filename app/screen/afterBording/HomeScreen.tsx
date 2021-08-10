import React from 'react';
import { Text, View } from 'react-native';
import PlaidLink from './PlaidLink';

var styles = require('../../utils/style1');


const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.heading}>
        <Text style={styles.titleText}>Plaid Link React Native Demo</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.baseText}>
          &#8226; It’s easy to integrate, with fewer lines than webviews
        </Text>
        <Text style={styles.baseText}>
          &#8226; It supports all Link flows, including oAuth
        </Text>
        <Text style={styles.baseText}>
          &#8226; You can get support directly from the Plaid team
        </Text>
      </View>
      <View style={styles.bottom}>
        <PlaidLink token="link-sandbox-8eac71e2-96c6-49f6-8dc3-c0d16e8e7454" />
      </View>
    </View>
  );
};

export default HomeScreen;