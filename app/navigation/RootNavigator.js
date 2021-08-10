import React, {useEffect, useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {actions} from '../redux/reducer';

import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import {I18nManager} from 'react-native';

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('../assets/translations/en.json'),
  ar: () => require('../assets/translations/ar.json'),
  fr: () => require('../assets/translations/fr.json'),
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};

  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  console.log(languageTag);
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};

import AfterBoardingStack from './AfterBoardingStack';
import AfterBoardingStackLatest from './AfterBoardingStackLatest';
import DataManager from '../utils/DataManager';

const Stack = createStackNavigator();
const RootNavigator = props => {
  const [isTwoDigitLogin, setTwoDigitLogin] = useState(null);

  useEffect(() => {
    handleLocalizationChange();
    console.log('Stste', props);
  }, []);

  const handleLocalizationChange = async () => {
    var pin = await DataManager.getPin();
    console.log('Pin hai', pin);

    setTwoDigitLogin(pin);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={
          props.twosteplogin ? 'AfterBoardingStackLatest' : 'AfterBoardingStack'
        }
        component={
          props.twosteplogin ? AfterBoardingStackLatest : AfterBoardingStack
        }
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => {
  //var pin = await DataManager.getPin();
  console.log('pooo', JSON.stringify(state));

  return {
    loginStatus: state.localStates.loginStatus,
    introstatus: state.localStates.introstatus,
    twosteplogin: state.localStates.twosteplogin,
  };
};

export default connect(mapStateToProps)(RootNavigator);
