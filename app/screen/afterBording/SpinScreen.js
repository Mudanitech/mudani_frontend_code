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
  ImageBackground,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import SwipeButton from 'rn-swipe-button';
import LinearGradient from 'react-native-linear-gradient';
import {SingleButtonModal} from './../../component/confirmModal';
import {hp, wp} from '../../utils/responsive';
import WheelOfFortune from 'react-native-wheel-of-fortune';
const {height, width} = Dimensions.get('window');
import {CustomStyles} from '../style/CustomStyles';
//import firebase from 'react-native-firebase';

import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import MyStatusBar from '../../component/MyStatusBar';
let forceResetLastButton = null;
const participants = [
  'apple',
  'nokia',
  'uber',
  'snapchat',
  'king',
  'jetblue',
  'ford',
  'amc',
];
class SpinScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      winnerValue: null,
      winnerIndex: null,
      isModalVisible: false,
      isSpinnerStart: false,
      accountType: [
        {AccountType: 'Individual', text: 'hsdfjkhksjdf'},
        {AccountType: 'Joint', text: 'hsdfjkhksjdf'},
        {AccountType: 'Retirement', text: 'hsdfjkhksjdf'},
      ],
    };
  }

  openModal = () => {
    this.setState({isModalVisible: true});
    console.log('IsSpinner', this.state.isSpinnerStart);
  };
  modalClose = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.navigate('SignUp');
    // this.setState({isSpinnerStart: false});
  };
  _renderPlayButton = play => {
    return play;
  };

  setIsSpinner = () => {
    this._renderPlayButton();
    this.child._onPress();
    this.setState({isSpinnerStart: true});
    // this.child._onPress()

    setTimeout(() => this.openModal(), 2000);
  };

  getWinnerName = (value, index) => {};

  // componentDidMount = async () => {
  //   try {
  //     // this.getToken()
  //     if (Platform.OS === 'ios') {
  //       this.checkPermission();
  //     } else {
  //       this.checkPermission();

  //       console.log('==============android');
  //     }
  //   } catch (error) {}
  // };
  // async checkPermission() {
  //   const enabled = await firebase.messaging().hasPermission();
  //   if (enabled) {
  //     this.getToken();
  //   } else {
  //     this.requestPermission();
  //   }
  // }

  // async requestPermission() {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // User has authorised
  //     this.getToken();
  //   } catch (error) {
  //     // User has rejected permissions
  //     console.log('permission rejected');
  //   }
  // }

  // async getToken() {
  //   try {
  //     //let fcmToken = await AsyncStorage.getItem('fcmToken_mental');
  //     // console.log('fcmToken', fcmToken);
  //     // if (!fcmToken) {
  //     let fcmToken = await firebase.messaging().getToken();
  //     console.log('fcmToken', fcmToken);
  //     if (fcmToken) {
  //       // user has a device token
  //       console.log('fcmToken_mental', fcmToken);
  //       console.log('fcmToken', fcmToken);
  //     }
  //   } catch (error) {}

  //   // }
  // }

  render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 10,
      borderWidth: 3,
      borderColor: 'transparent',
      innerRadius: 30,
      duration: 15000,
      winner: this.state.winnerIndex,
      textAngle: 'vertical',
      backgroundColor: 'transparent',
      onRef: ref => (this.child = ref),
    };
    return (
      <>
        <ImageBackground
          source={localImages.spin_background}
          // style={styles.image}
          // style={{height: height, width: width}}
          style={[CustomStyles.dashboardBoarding]}
          resizeMode="stretch">
          <SafeAreaView style={{flex: 1}}>
            <HeaderWithBack
              backgroundColor={1}
              Header={' '}
              labelStyle={styles.labelStyle}
              imageArrow={'left_arrow_w'}
              onActionLeft={() => this.props.navigation.goBack()}
            />
            <ScrollView>
              {/* <StatusBar
                barStyle={
                  Platform.OS == 'ios' ? 'dark-content' : 'light-content'
                }
                backgroundColor={colors.blue}
              /> */}
              <View style={{flex: 1, marginBottom: 300}}>
                <Text
                  numberOfLines={2}
                  style={{
                    color: colors.white,
                    fontSize: 22,
                    fontFamily: fonts.bold,
                    fontWeight: '600',
                    textAlign: 'center',
                    // lineHeight: 29,
                    alignSelf: 'center',
                  }}>
                  We’re glad you’re here!
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    color: colors.white,
                    fontSize: 22,
                    fontFamily: fonts.bold,
                    //marginTop: 48,
                    // marginHorizontal: 40,
                    fontWeight: '600',
                    textAlign: 'center',
                    lineHeight: 29,
                    alignSelf: 'center',
                    //marginTop: Platform.OS == 'ios' ? -30 : 0,
                  }}>
                  Claim a free stock on us.
                </Text>
                <View style={{alignSelf: 'center'}}>
                  <View
                    style={{
                      width: wp('15%'),
                      height: wp('15%'),
                      marginTop: Platform.OS == 'ios' ? 170 : 170,
                      alignSelf: 'center',
                    }}>
                    <WheelOfFortune
                      options={wheelOptions}
                      knobSize={10}
                      borderWidth={3}
                      getWinner={(value, index) =>
                        this.getWinnerName(value, index)
                      }
                      spinnerImage={localImages.spinner2}
                      onPlay={play => this._renderPlayButton(play)}
                    />
                  </View>
                </View>
                <SingleButtonModal
                  isModalVisible={this.state.isModalVisible}
                  // headerText={'Basket Buy Execution'}
                  modalClose={this.modalClose}
                  submitAction={() => this.modalClose()}
                  descriptionText={
                    "You'll receive a free stock when you complete your sign up journey"
                  }
                  nameOnSubmitButton={'Okay'}
                  nameOnIgnoreButton={'Ignore'}
                />
              </View>
            </ScrollView>
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                bottom: hp('0%'),
                height: hp('16%'),
                width: wp('100%'),
                backgroundColor: 'transparent',
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: hp('8%'),
                }}>
                <LinearGradient
                  colors={[colors.blue, '#fff']}
                  start={{x: 1.3, y: 0}}
                  end={{x: 0, y: 0}}
                  style={styles.linearGradient}>
                  <View>
                    <SwipeButton
                      disabled={false}
                      //disable the button by doing true (Optional)
                      swipeSuccessThreshold={70}
                      height={45}
                      //height of the button (Optional)
                      width={(width * 60) / 100}
                      //width of the button (Optional)
                      title="Swipe to Spin"
                      //Text inside the button (Optional)
                      thumbIconImageSource={localImages.btn_arrow_color}
                      //thumbIconStyles = {{resizeMode : "contain"}}
                      //You can also set your own icon (Optional)
                      onSwipeSuccess={() => {
                        // this.openModal();
                        // this._renderPlayButton()
                        this.setIsSpinner();
                        // Alert.alert("Hello")
                      }}
                      forceReset={reset => {
                        forceResetLastButton = reset;
                      }}
                      shouldResetAfterSuccess={true}
                      resetAfterSuccessAnimDelay={5000}
                      //After the completion of swipe (Optional)
                      railFillBackgroundColor={colors.transparent} //(Optional)
                      railFillBorderColor={colors.transparent} //(Optional)
                      thumbIconBackgroundColor={colors.white} //(Optional)
                      thumbIconBorderColor={colors.white} //(Optional)
                      railBackgroundColor={colors.transparent} //(Optional)
                      railBorderColor={colors.transparent} //(Optional)
                      titleStyles={{
                        fontSize: 16,
                        color: colors.blue,
                        fontWeight: 'bold',
                      }}></SwipeButton>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  accordianTextContainer: {
    marginTop: 166,
    alignSelf: 'center',
    marginBottom: 23,
  },
  footerText: {
    height: 27,
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#72e2db',
    textAlign: 'center',
  },
  accordianPadding: {
    paddingTop: 8,
  },
  viewSeparator: {
    borderColor: '#707070',
    borderWidth: 0.3,
    width: '100%',
    alignSelf: 'center',
  },
  createBasketBtn: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
  },
  createBasketBtn1: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 29,
    width: '80%',
  },
  btnInsideView: {
    backgroundColor: '#e0eef8',
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  circleText: {
    fontSize: 15,
    color: '#2b8ecd',
    fontFamily: fonts.regular,
  },
  btnText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,

    textAlign: 'center',
  },
  textContainer: {
    marginLeft: 46,
    marginRight: 46,
    marginTop: 16,
    // alignSelf : "center",
  },
  labelStyle: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.bold,
    // marginTop: 48,
    marginHorizontal: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
  linearGradient: {
    // flex: 1,
    //paddingLeft: 15,
    //paddingRight: 15,
    // borderRadius: 5,
    borderRadius: 50,
  },
});

export default SpinScreen;
