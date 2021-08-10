import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
// import HTML from 'react-native-render-html';

import axios from '../../api';
import {
  HeaderWithBack,
  HeaderWithDrawer,
  ButtonWithoutShadow,
} from '../../component/Button';
import PromoImages, {BannerImage} from '../../component/PromoImages';
import {CustomStyles} from '../style/CustomStyles';
import {colors, fonts, translate, staticData} from '../../utils/constant';
import SharedClass from '../../utils/SharedClass';
import InputBox, {PlainTextInput, ErrorMsg} from '../../component/InputBox';

import {actions} from '../../redux/reducer';
import {connect} from 'react-redux';

const bannerImages = [
  {
    image: 'banner2',
  },
];

const promoImages = [
  {
    image: 'promo',
  },
  {
    image: 'promo',
  },
  {
    image: 'promo',
  },
  {
    image: 'promo',
  },
];
const {height, width} = Dimensions.get('window');

class DemoScreen extends Component {
  constructor(props) {
    super(props);
    this.sharedClass = new SharedClass();
    this.state = {
      screenHeight: height,
      loading: false,
      email: '',
      password: '',
      secureTextEntry: true,
      searchText: '',
      errors: {
        searchText: '',
      },
      index: 0,
      routes: [
        {key: 'categories', title: 'categorytitle'},
        {key: 'zainDeals', title: 'zingdeals'},
      ],
    };
  }

  onLogin = () => {
    if (!this.state.email || !this.state.password) {
      this.sharedClass.ShowSnakBar({
        message: 'Please enter all required data:username, password', //response.statusText,
        type: 'danger',
        delay: 0,
      });
      return;
    }

    this.getOffer();
  };
  getOffer = async () => {
    try {
      this.setState({
        loading: true,
      });

      let reqdata = {
        username: this.state.email,
        password: this.state.password,
      };
      console.log(reqdata);
      let response = await axios.post(`login-user`, reqdata);
      console.log(response);
      // debugger
      this.setState({
        loading: false,
      });
      if (response && response.status == 200) {
        console.log(response.data.result);
        if (response.data.result) {
          this.props.setLoggedInUserDetails(response.data.result);
          this.props.setLoggedInUserType('user');
          this.props.navigation.navigate('TabStack');
          this.sharedClass.ShowSnakBar({
            message: 'Login successfully',
            type: 'success',
            delay: 0,
          });
        } else {
          this.sharedClass.ShowSnakBar({
            message: response.statusText ? response.statusText : response.data, //response.statusText,
            type: 'danger',
            delay: 0,
          });
        }
      } else {
        this.sharedClass.ShowSnakBar({
          message: response.statusText
            ? response.statusText
            : response.data.message, //response.statusText,
          type: 'danger',
          delay: 0,
        });
      }
      this.setState({
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.error({error});
    }
  };
  render() {
    const {searchText, errors, email, password, secureTextEntry} = this.state;
    return (
      <>
        <View style={CustomStyles.containerbording}>
          <SafeAreaView style={CustomStyles.mainContainerBording}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={colors.statusBarColor}
            />
            <HeaderWithBack
              backgroundColor={1}
              onActionRight={() => {}}
              onActionMiddle={() => {}}
              onActionLeft={() => {
                this.props.navigation.goBack();
              }}
              label=""
              labelStyle={{
                color: colors.headingColor,
                fontFamily: fonts.bold,
                fontSize: 22,
              }}
            />

            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={CustomStyles.scrollview}>
              <View>
                <View
                  style={{width: width, flexDirection: 'row', marginTop: 30}}>
                  <Text
                    style={{
                      color: colors.text,
                      fontFamily: fonts.whitneysemibold,
                      fontSize: 32,
                      marginLeft: 20,
                    }}>
                    Log in
                  </Text>

                  <View style={{position: 'absolute', right: 20}}>
                    <ButtonWithoutShadow
                      height={50}
                      backgroundColor={colors.lightGreen}
                      width={100}
                      borderRadius={5}
                      fontFamily={fonts.whitneysemibold}
                      fontSize={18}
                      labelColor={colors.greenColor}
                      label="Sign up"
                      onAction={() =>
                        this.props.navigation.navigate('SignupScreen')
                      }
                    />
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      color: colors.grayText,
                      fontFamily: fonts.whitneybook,
                      fontSize: 32,
                      marginLeft: 20,
                      marginTop: 30,
                    }}>
                    First login your account.
                  </Text>
                </View>
                <View style={{marginHorizontal: 20}}>
                  <InputBox
                    height={60}
                    backgroundColor={colors.white}
                    width={width - 40}
                    borderRadius={30}
                    marginTop={30}
                    placeholder="Enter your Username / Email"
                    label="Username / Email"
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    secureTextEntry={false}
                    editable={true}
                    value={email}
                    maxLength={50}
                    iconName="callPng"
                    onIconClick={() => {}}
                    onChangeText={text => {
                      this.setState({
                        email: text,
                      });
                    }}
                  />
                </View>
                <View style={{marginHorizontal: 20}}>
                  <InputBox
                    height={60}
                    backgroundColor={colors.white}
                    width={width - 40}
                    borderRadius={30}
                    marginTop={30}
                    placeholder="Enter your Password"
                    label="Password"
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    secureTextEntry={secureTextEntry}
                    editable={true}
                    value={password}
                    maxLength={50}
                    iconName={
                      secureTextEntry ? 'visibility' : 'visibilitycross'
                    }
                    onIconClick={() => {
                      this.setState({
                        secureTextEntry: !secureTextEntry,
                      });
                    }}
                    onChangeText={text => {
                      this.setState({
                        password: text,
                      });
                    }}
                  />
                </View>
                <View
                  style={{
                    width: width - 20,
                    alignItems: 'flex-end',
                    marginTop: 20,
                  }}>
                  <ButtonWithoutShadow
                    height={50}
                    backgroundColor={colors.transparent}
                    width={150}
                    borderRadius={5}
                    fontFamily={fonts.whitneysemibold}
                    fontSize={18}
                    labelColor={colors.text}
                    label="Forgot password?"
                    onAction={() =>
                      this.props.navigation.navigate('ForgotPassScreen')
                    }
                  />
                </View>
                <View
                  style={{width: width, alignItems: 'center', marginTop: 20}}>
                  <ButtonWithoutShadow
                    height={55}
                    backgroundColor={colors.greenColor}
                    width={width - 40}
                    borderRadius={5}
                    fontFamily={fonts.whitneysemibold}
                    fontSize={18}
                    labelColor={colors.white}
                    label="Login"
                    onAction={() => this.onLogin()}
                  />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoggedInUserAuthToken: token => {
      dispatch(actions.setLoggedInUserAuthToken(token));
    },
    setMyCartProduct: mycartProduct => {
      dispatch(actions.setMyCartProduct(mycartProduct));
    },

    setLoggedInUserAuthToken: token => {
      dispatch(actions.setLoggedInUserAuthToken(token));
    },
    setLoggedInUserDetails: userDetails => {
      dispatch(actions.setLoggedInUserDetails(userDetails));
    },
    setLoggedInUserStatus: loginStatus => {
      dispatch(actions.setLoggedInUserStatus(loginStatus));
    },
    setLoggedInUserType: loginType => {
      dispatch(actions.setLoggedInUserType(loginType));
    },
  };
};
const mapToProp = state => {
  return {
    loginUserType: state.localStates.loginUserType,
    mycartProduct: state.localStates.mycartProduct,
    // loading: state.auth.loading
  };
};

export default connect(mapToProp, mapDispatchToProps)(DemoScreen);
