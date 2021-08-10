import AsyncStorage from '@react-native-community/async-storage';
import {localKey} from './DataManagerKeys';
// import { AsyncStorage } from "react-native";

const DataManager = {
  //method to set app intro boolean value
  setIntoToApp(data) {
    AsyncStorage.setItem(localKey.introToApp, JSON.stringify(data));
  },

  //method to get app intro boolean value
  getIntoToApp() {
    try {
      return AsyncStorage.getItem(localKey.introToApp).then(data => {
        return data;
      });
    } catch (error) {}
  },

  //method to set access token
  setAccessToken(token) {
    AsyncStorage.setItem(localKey.accessToken, JSON.stringify(token));
  },

  //method to set profile data
  setProfileData(data) {
    AsyncStorage.setItem(localKey.myProfile, JSON.stringify(data));
  },

  //method to get access token
  getProfileData() {
    try {
      return AsyncStorage.getItem(localKey.myProfile).then(myProfile => {
        return myProfile;
      });
    } catch (error) {}
  },

  //method to set profile data
  setRememberMe(data) {
    AsyncStorage.setItem(localKey.rememberMe, JSON.stringify(data));
  },

  //method to get access token
  getRememberMe() {
    try {
      return AsyncStorage.getItem(localKey.rememberMe).then(rememberMe => {
        return rememberMe;
      });
    } catch (error) {}
  },

  //set Enable pin
  //method to set profile data
  setPin(data) {
    AsyncStorage.setItem(localKey.pin, JSON.stringify(data));
  },
  getPin() {
    try {
      return AsyncStorage.getItem(localKey.pin).then(pin => {
        return pin;
      });
    } catch (error) {}
  },

  //method to get access token
  getAccessToken() {
    try {
      return AsyncStorage.getItem(localKey.accessToken).then(token => {
        return token;
      });
    } catch (error) {}
  },

  setWeelIndex(weelIndex) {
    AsyncStorage.setItem(localKey.weelIndex, JSON.stringify(weelIndex));
  },

  getWeelIndex() {
    try {
      return AsyncStorage.getItem(localKey.weelIndex).then(index => {
        return index;
      });
    } catch (error) {}
  },

  //method to set access token
  setUserDetail(data) {
    AsyncStorage.setItem(localKey.userDetail, JSON.stringify(data));
  },

  //method to get access token
  getUserDetail() {
    try {
      return AsyncStorage.getItem(localKey.userDetail).then(data => {
        return data;
      });
    } catch (error) {}
  },

  clearLocalStorage() {
    AsyncStorage.removeItem('accessToken');
    // AsyncStorage.getAllKeys()
    // .then(keys => AsyncStorage.multiRemove(keys))
    // .then(() => alert('Logout successfully.'));
    // AsyncStorage.multiRemove([localKey.accessToken, localKey.userDetail,localKey.myProfile])
  },
  //method to set access token
  setPages(data) {
    AsyncStorage.setItem(localKey.setPages, JSON.stringify(data));
  },
  getPages() {
    try {
      return AsyncStorage.getItem(localKey.setPages).then(data => {
        return data;
      });
    } catch (error) {}
  },
  setApplicationId(data) {
    AsyncStorage.setItem(localKey.application_id, JSON.stringify(data));
  },
  getApplicationId() {
    try {
      return AsyncStorage.getItem(localKey.application_id).then(data => {
        return data;
      });
    } catch (error) {}
  },
  setSignUpDetails(data) {
    AsyncStorage.setItem(localKey.signUpDetails, JSON.stringify(data));
  },
  getSignUpDetails() {
    try {
      return AsyncStorage.getItem(localKey.signUpDetails).then(data => {
        return data;
      });
    } catch (error) {}
  },
};

module.exports = DataManager;
