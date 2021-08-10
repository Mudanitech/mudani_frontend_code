/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Provider, connect} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './app/utils/store';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator, {navigationRef} from './app/navigation/RootNavigator';
import AnimatedSplash from 'react-native-animated-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {colors, fonts, localImages} from './app/utils/constant';
import SplashScreen from 'react-native-splash-screen';
import {RootSiblingParent} from 'react-native-root-siblings';

const App = () => {
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    // SplashScreen.hide();
    setTimeout(() => SplashScreen.hide(), 5000);
    // callOnLoad()
  }, []);

  const callOnLoad = () => {
    checkPermission();
    DeviceInfo.isEmulator().then(isEmulator => {
      // false
      console.log(isEmulator);
      if (!isEmulator) {
        // registerDeviceWithFcm()
        // checkPermission()
      }
    });

    // GoogleSignin.configure({
    //   // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    //   // webClientId: '112083228693-5641pmoddplfd62cprnq1fudurc84583.apps.googleusercontent.com', // required
    // });
  };

  return (
    <>
      {/* <AnimatedSplash
        translucent={isLoaded}
        isLoaded={isLoaded}
        logoImage={localImages.mudani_logo}
        backgroundColor={'#fff'}
        logoHeight={150}
        logoWidth={150}> */}
      {/* <SafeAreaView style={{flex: 1,}}> */}
      <RootSiblingParent>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer ref={navigationRef}>
              <StatusBar barStyle="light-content" backgroundColor={'black'} />

              <RootNavigator></RootNavigator>
              {/* <FlashMessage position="bottom" duration={2000} /> */}
            </NavigationContainer>
          </PersistGate>
          <FlashMessage position="top" />
        </Provider>
      </RootSiblingParent>
      {/* </SafeAreaView> */}
      {/* </AnimatedSplash> */}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
