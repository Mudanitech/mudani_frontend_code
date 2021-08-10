// export default Test;
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ColorPropType,
  Image,
  SafeAreaView,
  Platform,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel'; // 3.6.0
import {
  colors,
  fonts,
  translate,
  staticData,
  localImages,
} from '../../utils/constant';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {CustomStyles} from '../style/CustomStyles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').width;
const {height, width} = Dimensions.get('window');
import DataManager from './../../utils/DataManager';

import {wp, hp} from '../../utils/responsive';
import {TwoButtonModal} from './../../component/confirmModal';
import DeviceInfo from 'react-native-device-info';
const Screen = props => {
  const [isModal, setState] = useState(false);
  const modalOpen = () => {
    setState(true);
  };
  const modalClose = () => {
    setState(false);
  };

  return (
    <View
      style={{
        // flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        // height: height - 400,
        justifyContent: 'center',
      }}>
      <Image source={props.image} style={{height: 100, width: 100}} />
      <Text style={styles.headingText}>{props.text}</Text>
      <Text style={styles.descriptionText}>{props.descriptionText}</Text>
      <TouchableOpacity onPress={() => modalOpen()}>
        <Text style={styles.buttonText}>{props.buttonText}</Text>
      </TouchableOpacity>
      <TwoButtonModal isModalVisible={isModal} modalClose={() => modalClose()}>
        <View style={styles.popupMainContainer}>
          <Image source={props.image} style={styles.circleDollar} />
          <Text style={styles.popUpText}>{props.popupText}</Text>
        </View>
        <View style={styles.popupButtonContainer}>
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Dismiss"
            backgroundColor={colors.blue}
            onAction={() => modalClose()}
          />
        </View>
      </TwoButtonModal>
    </View>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      userDetails: null,
      pin: null,
    };
  }

  componentDidMount = async () => {
    // console.log('Choose your plan', this.props.route.params.data);
    var userDetails = await DataManager.getUserDetail();
    var pin = await DataManager.getPin();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails);
    console.log('Pin', pin);

    this.setState({userDetails: userDetails});
  };
  SCREENS = [
    <Screen
      text="Welcome to Mudani"
      image={localImages.home_screen_logo}
      descriptionText={'An all-in-one app for the everyday retail investor.'}
      buttonText={''}
    />,
    <Screen
      text="Dual-Journey"
      image={localImages.dual_journey}
      descriptionText={
        'Our platform allows users to choose from a self-directed trading account, a professionally managed account, or both on one single app.'
      }
      buttonText={'How it works'}
      popupText={
        <Text>
          A{' '}
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: fonts.extraBold,
            }}>
            self-directed
          </Text>
           brokerage account is one in which you have complete control over how
          you invest & trade stocks.{'\n'} A{' '}
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: fonts.extraBold,
            }}>
            managed account
          </Text>{' '}
          is when our robo advisor generates a customized investment portfolio
          for you consisting of stocks, ETF’s, and even crypto.{'\n'}{' '}
          <Text>On our app, you can pick one or both</Text>
        </Text>
      }
    />,
    <Screen
      text="Fractional shares"
      image={localImages.fractional_shares}
      descriptionText={
        'We offer the ability for users to buy & sell fractional shares. You set the dollar amount you wish to invest.'
      }
      buttonText={'Learn more'}
      popupText={
        <Text>
          Fractional shares are pieces, or fractions, of whole shares of a
          company or ETF{'\n'} Amazon stock trades at over $3,000 per share.
          Can’t afford that? Well now you can. You tell us the dollar amount you
          want to invest and you get a slice of a share.
        </Text>
      }
    />,
    <Screen
      text="Rewards"
      image={localImages.reward}
      descriptionText={
        'Win free stocks, gift cards, and more while playing our weekly fantasy games.'
      }
      buttonText={'Learn more'}
      popupText={
        <Text>
          Earn Mudani coins by placing self-direct trades or by playing our
          weekly fantasy games. Redeem your coins for free stocks, gift cards
          and more.
        </Text>
      }
    />,
    <Screen
      text="Stock Games"
      image={localImages.round_up}
      descriptionText={
        'Investing can be boring at times. So we made it fun with our free weekly fantasy games. A great opportunity to learn the markets and earn rewards at no cost.'
      }
      buttonText={'Learn more'}
      popupText={
        <Text>
          Play our fantasy games and learn the stock market while having fun.{' '}
          {'\n'}
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: fonts.extraBold,
            }}>
            Green or Red –
          </Text>{' '}
          Similar to the sports betting over/under, you will pick whether 8
          stocks will close positive or negative for the week. {'\n'}
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: fonts.extraBold,
            }}>
            Stock Fantasy League (SFL)
            <View style={{marginTop: 5}}>
              <Text style={{fontSize: 10}}>TM </Text>
            </View>
            -
          </Text>{' '}
          Fantasy football meets stock market! Set your weekly stock lineup and
          check the leaderboard to see if you’re a winner.
        </Text>
      }
    />,
    <Screen
      text="Security"
      image={localImages.security}
      descriptionText={
        'Bank-grade security to protect the money you work hard for.'
      }
      buttonText={'Learn more'}
      popupText={
        <Text>
          Mudani is a registered investment advisor (RIA) with the SEC. Our
          custodian, Apex Clearing, is registered with FINRA and a member of the
          Securities Investor Protection Corporation (SIPC). The securities in
          your account are fully protected. Our encrypted SSL portal provides
          secure and seamless connectively with over 14,000 financial
          institutions all around the world.
        </Text>
      }
    />,
  ];

  render() {
    let buildNumber = DeviceInfo.hasNotch();

    const {userDetails, pin} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={localImages.carasoul_bg}
          style={{width: width, height: height}}
          resizeMode="stretch">
          <ScrollView>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={colors.authBackGroud}
            />
            <View
              style={{
                // minHeight: height - 300,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: (height * 20) / 100,
              }}>
              <Carousel
                ref={ref => (this.carouselRef = ref)}
                data={this.SCREENS}
                renderItem={({item}) => item}
                onSnapToItem={i => this.setState({activeTab: i})}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={SCREEN_WIDTH}
                slideStyle={{width: SCREEN_WIDTH}}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
              />
            </View>
          </ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom:
                Platform.OS == 'ios' ? (buildNumber ? 100 : 40) : 30,
            }}>
            <View style={{width: width, alignItems: 'center'}}>
              <Pagination
                containerStyle={{
                  backgroundColor: '#F1F1F1',
                  width: 20,
                  height: 20,
                  backgroundColor: 'tranparent',
                }}
                dotStyle={styles.ww}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                activeDotIndex={this.state.activeTab}
                dotsLength={this.SCREENS.length}
                inactiveDotStyle={styles.ww1}
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                // height:100
              }}>
              <ButtonWithoutShadow
                width={width - 140}
                height={43}
                marginTop={0}
                borderRadius={20}
                labelColor={colors.white}
                label="Get Started"
                backgroundColor={colors.blue}
                onAction={() =>
                  this.props.navigation.navigate('SpinScreen', {
                    id: 1,
                  })
                }
              />
              {this.state.activeTab == 0 ? (
                <View>
                  <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={() =>
                      this.props.navigation.navigate('LoginScreen')
                    }>
                    <Text style={styles.logIn}>Log in</Text>
                  </TouchableOpacity>

                  {userDetails != null && pin != 'yes' ? (
                    <TouchableOpacity
                      style={{marginTop: 10}}
                      onPress={() =>
                        this.props.navigation.navigate('TwoStepLogin')
                      }>
                      <Text style={styles.logIn}>Enable 2-step Login</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : (
                <View style={{height: 30}}></View>
              )}
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  ww: {
    // top : 50,
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors.blue,
  },
  ww1: {
    // top : 50,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: 'gray',
  },
  container: {
    // flex: 1,
    // width : 300,
    // height: SCREEN_HEIGHT / 0.7,
    // paddingTop: 40,
    // backgroundColor: colors.authBackGroud,
  },
  tabBar: {
    // borderTopWidth : 1,
    // borderColor : '#ddd',
    backgroundColor: colors.authBackGroud,
    width: wp('10%'),
    alignSelf: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 50,
    paddingTop: 0,
    paddingBottom: 0,
  },
  headingText: {
    fontSize: wp('8'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    marginTop: hp('7.4'),
  },
  descriptionText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 15,
    color: colors.blue,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 30,
    textDecorationLine: 'underline',
  },
  logIn: {
    fontSize: 18,
    color: colors.blue,
    fontFamily: fonts.regular,
    // lineHeight: 20,
    textAlign: 'center',
  },
  circleDollar: {
    height: 40,
    width: 40,
    marginBottom: 21,
    resizeMode: 'contain',
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: wp('3.46%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
  },
});
