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
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import MyStatusBar from '../../component/MyStatusBar';
import {GrayColorPopup} from './../../component/GrayColorPopup';
import ShowToast from './../../component/Toast';
import DataManager from './../../utils/DataManager';
import {getAPI, postAPI} from './../../utils/Api';
const participants = [
  'Apple',
  'Nokia',
  'Uber',
  'Tesla',
  'King',
  'Jetblue',
  'Ford',
  'Amc',
];

let forceResetLastButton = null;
class SpinScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      winnerValue: null,
      winnerIndex: null,
      isModalVisible: false,
      isSpinnerStart: false,
      shareName: '',
      imagePaths: '',
      accountType: [
        {AccountType: 'Individual', text: 'hsdfjkhksjdf'},
        {AccountType: 'Joint', text: 'hsdfjkhksjdf'},
        {AccountType: 'Retirement', text: 'hsdfjkhksjdf'},
      ],
    };
  }

  componentDidCatch = () => {
    this.child._onPress();
    this.setState({isSpinnerStart: true});
  };

  openModal = () => {
    this.setState({isModalVisible: true});
    console.log('IsSpinner', this.state.isSpinnerStart);
  };
  modalClose = () => {
    this.setState({isModalVisible: false});
    this.handleSubmit();
  };

  handleSubmit = async () => {
    const {shareName} = this.state;
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);

    const dataToSend = {
      userId: userDetails._id,
      wheelStock: shareName,
    };
    postAPI('getWheelStock', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.props.navigation.navigate('PlaidLink', {
            id: this.props.route.params.id,
          });
        } else {
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        this.setState({loadingSpinner: false});
        // ShowToast('Something went wrong!');
        console.log(err);
      });
  };

  setIsSpinner = () => {
    this.child._onPress();
    // setTimeout(()=>this.setState({isModalVisible:true}),8000)
  };
  componentDidMount = () => {
    this.setIsSpinner();
  };

  getWinnerName = (value, index) => {
    this.setState({isModalVisible: true, shareName: value});
  };

  render() {
    const {spinnerIndex} = this.props.route.params;
    const {shareName} = this.state;
    const wheelOptions = {
      rewards: participants,
      knobSize: 10,
      borderWidth: 3,
      borderColor: 'transparent',
      innerRadius: 30,
      duration: 5000,
      winner: 7,
      textAngle: 'vertical',
      backgroundColor: 'transparent',
      onRef: ref => (this.child = ref),
      spinnerImage: localImages.spinner2,
      isSpinnerStart: true,
    };

    return (
      <>
        {/* <MyStatusBar
          {...this.props}
          backgroundColor="blue"
          barStyle="light-content"
        /> */}
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
                    marginTop: Platform.OS == 'ios' ? -30 : 0,
                  }}>
                  Claim a free stock on us.
                </Text>
                <View style={{alignSelf: 'center'}}>
                  <View
                    style={{
                      width: wp('22%'),
                      height: wp('22'),
                      marginTop: Platform.OS == 'ios' ? 150 : 150,
                      alignSelf: 'center',
                    }}>
                    <WheelOfFortune
                      options={wheelOptions}
                      knobSize={10}
                      borderWidth={3}
                      borderColor={'#FFF'}
                      backgroundColor={'#fff'}
                      getWinner={(value, index) =>
                        this.getWinnerName(value, index)
                      }
                      onPlay={play => this._renderPlayButton(play)}
                    />
                  </View>
                </View>
                <GrayColorPopup
                  isModalVisible={this.state.isModalVisible}
                  modalClose={this.modalClose}
                  submitAction={() => this.modalClose()}>
                  <View style={styles.container}>
                    <View>
                      <Image
                        source={
                          shareName == 'King'
                            ? localImages.king
                            : shareName == 'Uber'
                            ? localImages.uber
                            : shareName == 'Tesla'
                            ? localImages.tesla
                            : shareName == 'Amc'
                            ? localImages.amc
                            : shareName == 'Ford'
                            ? localImages.ford
                            : shareName == 'Jetblue'
                            ? localImages.jetblue
                            : shareName == 'Apple'
                            ? localImages.apple
                            : localImages.nokia
                        }
                        style={{
                          marginTop: 5,
                          height: 122,
                          width: 122,
                          alignSelf: 'center',
                          resizeMode: 'stretch',
                        }}></Image>
                    </View>

                    <Text
                      numberOfLines={3}
                      style={{
                        color: colors.black,
                        fontSize: 20,
                        fontFamily: fonts.bold,
                        marginTop: 30,
                        // marginHorizontal: 40,
                        fontWeight: '600',
                        textAlign: 'center',
                        lineHeight: 30,
                        width: width - 110,
                        alignSelf: 'center',
                      }}>
                      {shareName}
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={{
                        color: colors.black,
                        fontSize: 16,
                        fontFamily: fonts.bold,
                        marginTop: 15,
                        // marginHorizontal: 40,
                        fontWeight: '600',
                        textAlign: 'center',
                        lineHeight: 25,
                        width: width - 110,
                        alignSelf: 'center',
                      }}>
                      Congratulations!
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={{
                        color: colors.black,
                        fontSize: 16,
                        fontFamily: fonts.bold,
                        // marginHorizontal: 40,
                        fontWeight: '600',
                        textAlign: 'center',
                        lineHeight: 25,
                        width: width - 110,
                        alignSelf: 'center',
                      }}>
                      You received 1 free share of
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={{
                        color: colors.black,
                        fontSize: 16,
                        fontFamily: fonts.bold,
                        // marginHorizontal: 40,
                        fontWeight: '600',
                        textAlign: 'center',
                        lineHeight: 25,
                        width: width - 110,
                        alignSelf: 'center',
                      }}>
                      {shareName + '.'}
                    </Text>
                    <View style={styles.buttonContainer}>
                      <ButtonWithoutShadow
                        width={width - 240}
                        height={38}
                        marginTop={22}
                        borderRadius={20}
                        labelColor={colors.white}
                        label={'Continue'}
                        backgroundColor={colors.blue}
                        onAction={() => this.modalClose()}
                      />
                    </View>
                  </View>
                </GrayColorPopup>
              </View>
            </ScrollView>
            {/* <View
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
                      forceReset={(reset) => {
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
                        fontSize: 13,
                        color: colors.blue,
                        fontWeight: 'bold',
                      }}></SwipeButton>
                  </View>
                </LinearGradient>
              </View>
            </View> */}
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
  container: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 21,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 15,
  },
  descriptionText2: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    textAlign: 'center',
    // marginTop: 15,
    marginBottom: height / 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default SpinScreen;
