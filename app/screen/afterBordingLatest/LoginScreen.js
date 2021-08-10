import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {PlainTextInput} from '../../component/InputBox';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {hp, wp} from '../../utils/responsive';
import SignUpModel from './../../component/SignUpModel';
const {height, width} = Dimensions.get('window');

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      isModal: false,
    };
  }

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView>
            <View style={styles.loginContainer}>
              <View>
                <Image
                  source={localImages.mudani_logo}
                  style={{
                    borderRadius: 50,
                    height: 63,
                    width: 178,
                    alignSelf: 'center',
                  }}></Image>
              </View>
              <Text style={styles.loginText}>Login</Text>
              <View>
                <PlainTextInput
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 100}
                  borderRadius={30}
                  //   marginTop={17}
                  placeholder="Enter your email"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={50}
                  // iconName={'search_gray_icon'}
                />
                <PlainTextInput
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 100}
                  borderRadius={30}
                  marginTop={23}
                  placeholder="Enter Password"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={50}
                  iconName={
                    this.state.showPassword ? 'visibility' : 'visibilitycross'
                  }
                  onIconClick={() =>
                    this.setState({
                      showPassword: this.state.showPassword ? false : true,
                    })
                  }
                  secureTextEntry={this.state.showPassword}
                  onChangeText={() => null}
                />
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 29,
                }}>
                <ButtonWithoutShadow
                  width={width - 147}
                  height={43}
                  marginTop={58}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Login"
                  backgroundColor={colors.blue}
                  onAction={() => null}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgetPassword')
                }>
                <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>
                  Don't have an account?{' '}
                  <Text style={{color: colors.info_color}}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  loginText: {
    color: colors.blue,
    fontSize: wp('5.33%'),
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 27,
    textAlign: 'left',
    marginTop: hp('5.84%'),
    marginBottom: hp('5.84%'),
  },
  loginContainer: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
  },
  forgetPasswordText: {
    color: colors.black,
    fontSize: wp('3.2%'),
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 27,
    textAlign: 'center',
    fontStyle: 'italic',
    // marginTop : hp("5.84%"),
    marginBottom: hp('42%'),
  },
  signUpText: {
    color: colors.black,
    fontSize: wp('3.2%'),
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 27,
    textAlign: 'center',
    fontStyle: 'normal',
    marginBottom: hp('5%'),
  },
});

export default LoginScreen;

// import React, { Component, useState, useEffect } from 'react'
// import { Text, FlatList, StyleSheet, TouchableOpacity, View, SafeAreaView, StatusBar, ScrollView, Platform, Dimensions } from 'react-native'
// // import HTML from 'react-native-render-html';

// import axios from '../../api'
// import { HeaderWithBack, HeaderWithDrawer, ButtonWithoutShadow } from '../../component/Button'
// import PromoImages, { BannerImage, } from '../../component/PromoImages'
// import { CustomStyles } from '../style/CustomStyles'
// import { colors, fonts, translate, staticData } from '../../utils/constant'
// import SharedClass from '../../utils/SharedClass'
// import InputBox, { PlainTextInput, ErrorMsg } from '../../component/InputBox'

// import { actions } from "../../redux/reducer"
// import { connect } from 'react-redux';

// const bannerImages = [
//     {
//         image: 'banner2'
//     }
// ]

// const promoImages = [
//     {
//         image: 'promo'
//     },
//     {
//         image: 'promo'
//     },
//     {
//         image: 'promo'
//     },
//     {
//         image: 'promo'
//     }
// ]
// const { height, width } = Dimensions.get('window')

// class LoginScreen extends Component {

//     constructor(props) {
//         super(props);
//         this.sharedClass = new SharedClass();
//         this.state = {
//             screenHeight: height,
//             loading: false,
//             email: '',
//             password: '',
//             secureTextEntry: true,
//             searchText: '',
//             errors: {
//                 searchText: ''
//             },
//             index: 0,
//             routes: [
//                 { key: 'categories', title: 'categorytitle' },
//                 { key: 'zainDeals', title: 'zingdeals' },
//             ],
//         }
//     }

//     onLogin = () => {

//         if (!this.state.email || !this.state.password) {
//             this.sharedClass.ShowSnakBar({
//                 message: 'Please enter all required data:username, password',//response.statusText,
//                 type: 'danger',
//                 delay: 0
//             })
//             return
//         }

//         this.getOffer()
//     }
//     getOffer = async () => {
//         try {
//             this.setState({
//                 loading: true
//             })

//             let reqdata = {
//                 username: this.state.email,
//                 password: this.state.password
//             }
//             console.log(reqdata)
//             let response = await axios.post(`login-user`, reqdata)
//             console.log(response)
//             // debugger
//             this.setState({
//                 loading: false
//             })
//             if (response && response.status == 200) {
//                 console.log(response.data.result)
//                 if (response.data.result) {
//                     this.props.setLoggedInUserDetails(response.data.result)
//                     this.props.setLoggedInUserType('user')
//                     this.props.navigation.navigate('TabStack')
//                     this.sharedClass.ShowSnakBar({
//                         message: 'Login successfully',
//                         type: 'success',
//                         delay: 0
//                     })
//                 } else {
//                     this.sharedClass.ShowSnakBar({
//                         message: response.statusText ? response.statusText : response.data,//response.statusText,
//                         type: 'danger',
//                         delay: 0
//                     })
//                 }

//             } else {
//                 this.sharedClass.ShowSnakBar({
//                     message: response.statusText ? response.statusText : response.data.message,//response.statusText,
//                     type: 'danger',
//                     delay: 0
//                 })
//             }
//             this.setState({
//                 loading: false
//             })
//         } catch (error) {
//             this.setState({
//                 loading: false
//             })
//             console.error({ error })
//         }
//     }
//     render() {
//         const { searchText, errors, email, password, secureTextEntry } = this.state
//         return <>
//             <View style={CustomStyles.containerbording}>
//                 <SafeAreaView style={CustomStyles.mainContainerBording}>
//                     {this.state.loading && <Loder data={this.state.loading}></Loder>}
//                     <StatusBar barStyle="dark-content" backgroundColor={colors.statusBarColor} />
//                     <HeaderWithBack
//                         backgroundColor={1}
//                         onActionRight={() => { }}
//                         onActionMiddle={() => { }}
//                         onActionLeft={() => { this.props.navigation.goBack() }}
//                         label=""
//                         labelStyle={{
//                             color: colors.headingColor,
//                             fontFamily: fonts.bold,
//                             fontSize: 22
//                         }}
//                     />

//                     <ScrollView
//                         style={{ flex: 1 }}
//                         contentContainerStyle={CustomStyles.scrollview}
//                     >
//                         <View>
//                             <View style={{ width: width, flexDirection: 'row', marginTop: 30 }}>
//                                 <Text style={{ color: colors.text, fontFamily: fonts.semiBold, fontSize: 32, marginLeft: 20 }}>Log in</Text>

//                                 <View style={{ position: 'absolute', right: 20 }}>
//                                     <ButtonWithoutShadow
//                                         height={50}
//                                         backgroundColor={colors.lightGreen}
//                                         width={100}
//                                         borderRadius={5}
//                                         fontFamily={fonts.semiBold}
//                                         fontSize={18}
//                                         labelColor={colors.greenColor}
//                                         label="Sign up"
//                                         onAction={() => this.props.navigation.navigate('SignupScreen')}
//                                     />
//                                 </View>
//                             </View>
//                             <View>
//                                 <Text style={{ color: colors.grayText, fontFamily: fonts.regular, fontSize: 32, marginLeft: 20, marginTop: 30 }}>First login your account.</Text>
//                             </View>
//                             <View style={{ marginHorizontal: 20 }}>
//                                 <InputBox
//                                     height={60}
//                                     backgroundColor={colors.white}
//                                     width={(width - 40)}
//                                     borderRadius={30}
//                                     marginTop={30}
//                                     placeholder="Enter your Username / Email"
//                                     label="Username / Email"
//                                     labelColor={colors.labelColor}
//                                     placeholderColor={colors.placeHolderColor}
//                                     inputTextColor={colors.text}
//                                     secureTextEntry={false}
//                                     editable={true}
//                                     value={email}
//                                     maxLength={50}
//                                     iconName="callPng"
//                                     onIconClick={() => { }}
//                                     onChangeText={(text) => {
//                                         this.setState({
//                                             email: text
//                                         })
//                                     }}
//                                 />
//                             </View>
//                             <View style={{ marginHorizontal: 20 }}>
//                                 <InputBox
//                                     height={60}
//                                     backgroundColor={colors.white}
//                                     width={(width - 40)}
//                                     borderRadius={30}
//                                     marginTop={30}
//                                     placeholder="Enter your Password"
//                                     label="Password"
//                                     labelColor={colors.labelColor}
//                                     placeholderColor={colors.placeHolderColor}
//                                     inputTextColor={colors.text}
//                                     secureTextEntry={secureTextEntry}
//                                     editable={true}
//                                     value={password}
//                                     maxLength={50}
//                                     iconName={secureTextEntry ? 'visibility' : 'visibilitycross'}
//                                     onIconClick={() => {

//                                         this.setState({
//                                             secureTextEntry: !secureTextEntry
//                                         })
//                                     }}
//                                     onChangeText={(text) => {
//                                         this.setState({
//                                             password: text
//                                         })
//                                     }}
//                                 />
//                             </View>
//                             <View style={{ width: width - 20, alignItems: 'flex-end', marginTop: 20 }}>
//                                 <ButtonWithoutShadow
//                                     height={50}
//                                     backgroundColor={colors.transparent}
//                                     width={150}
//                                     borderRadius={5}
//                                     fontFamily={fonts.semiBold}
//                                     fontSize={18}
//                                     labelColor={colors.text}
//                                     label="Forgot password?"
//                                     onAction={() => this.props.navigation.navigate('ForgotPassScreen')}
//                                 />
//                             </View>
//                             <View style={{ width: width, alignItems: 'center', marginTop: 20 }}>
//                                 <ButtonWithoutShadow
//                                     height={55}
//                                     backgroundColor={colors.greenColor}
//                                     width={width - 40}
//                                     borderRadius={5}
//                                     fontFamily={fonts.semiBold}
//                                     fontSize={18}
//                                     labelColor={colors.white}
//                                     label="Login"
//                                     onAction={()=>this.props.navigation.navigate('SignUp')}
//                                 />
//                             </View>

//                         </View>

//                     </ScrollView>
//                 </SafeAreaView>
//             </View>
//         </>
//     }

// }

// const mapDispatchToProps = dispatch => {
//     return {
//         setLoggedInUserAuthToken: token => {
//             dispatch(actions.setLoggedInUserAuthToken(token));
//         },
//         setMyCartProduct: mycartProduct => {
//             dispatch(actions.setMyCartProduct(mycartProduct));
//         },

//         setLoggedInUserAuthToken: token => {
//             dispatch(actions.setLoggedInUserAuthToken(token));
//         },
//         setLoggedInUserDetails: userDetails => {
//             dispatch(actions.setLoggedInUserDetails(userDetails));
//         },
//         setLoggedInUserStatus: loginStatus => {
//             dispatch(actions.setLoggedInUserStatus(loginStatus));
//         },
//         setLoggedInUserType: loginType => {
//             dispatch(actions.setLoggedInUserType(loginType));
//         },
//     };
// };
// const mapToProp = state => {
//     return {
//         loginUserType: state.localStates.loginUserType,
//         mycartProduct: state.localStates.mycartProduct,
//         // loading: state.auth.loading
//     }
// }

// export default connect(mapToProp, mapDispatchToProps)(LoginScreen)
