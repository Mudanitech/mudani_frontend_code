import React, {useState, Component, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Platform,
  ImageBackground,
  FlatList,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HomeHeader, ButtonWithoutShadow} from '../../component/Button';
import {TwoButtonModal} from './../../component/confirmModal';

import {hp, wp} from '../../utils/responsive';

const Games = props => {
  return (
    <View style={[styles.mainContainer]}>
      {/* <ImageBackground source={localImages.carasoul_bg} style={{width : width,height : height}}> */}
      <View>
        <Text style={styles.fantasyText}>Weekly Stock Fantasy Games</Text>
        <Text style={[styles.fantasySubText, {marginTop: hp('1%')}]}>
          Fantasy meets Finance. Play today to win
        </Text>
        <Text style={styles.fantasySubText}>
          free stocks, gift cards, and Mudani cash.
        </Text>
        <TouchableOpacity
          style={[styles.inTheRedButton, {marginTop: 50, flex: 1}]}
          onPress={() =>
            // props.route.params
            //   ? props.navigation.navigate('MyGameResult')
            //   : props.navigation.navigate('MyGame2')
            props.navigation.navigate('ChooseGameMode', {from: 'green_red'})
          }>
          <Image
            source={localImages.red_green_icon}
            style={{
              height: 60,
              width: 60,
              marginRight: 15,
              resizeMode: 'contain',
            }}
          />
          <View style={{width: wp('60')}}>
            <Text style={[styles.inTheRedButtonText]}>
              In the Green or In the Red
            </Text>
            <Text numberOfLines={2} style={styles.inTheRedButtonSubText}>
              Pick Whether a stock will close up or down for the weekly winners.
            </Text>
          </View>
          <Image
            source={localImages.arrowright}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginLeft: 15,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.inTheRedButton, {marginTop: 10}]}
          onPress={() =>
            //props.navigation.navigate('MyGameSFL')
            props.navigation.navigate('ChooseGameMode', {from: 'bottm'})
          }>
          <Image
            source={localImages.stock_fantasy}
            style={{
              height: 60,
              width: 60,
              marginRight: 15,
              resizeMode: 'contain',
            }}
          />
          <View style={{width: wp('60')}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.inTheRedButtonText]}>
                Stock Fantasy League (SFL)
              </Text>
              <Text style={{fontSize: 12, lineHeight: 18}}>TM</Text>
            </View>
            <Text numberOfLines={2} style={styles.inTheRedButtonSubText}>
              Pick Whether a stock will close up or down for the weekly winners.
            </Text>
          </View>
          <Image
            source={localImages.arrowright}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginLeft: 15,
            }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.howItWorksContainer}
        onPress={() => props.navigation.navigate('MyGameHowItWorks')}>
        <Text style={styles.howItWorks}>How it Works?</Text>
      </TouchableOpacity>
      {/* </ImageBackground> */}
    </View>
  );
};

const Referrals = () => {
  const [state, setState] = useState({
    winnerValue: null,
    winnerIndex: null,
    isModalVisible: false,
    isSpinnerStart: false,
  });

  const [stocksData, setStockDat] = useState([
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
  ]);

  const _renderPlayButton = play => {
    return play;
  };

  const setIsSpinner = () => {
    _renderPlayButton();
    setState({isSpinnerStart: true});
  };

  const renderStocks = ({item}) => {
    return (
      <TouchableOpacity onPress={() => null}>
        <View
          style={{
            borderRadius: width / 40,
            marginTop: 10,
            backgroundColor: colors.white,
            padding: width / 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.semiBold,
                  color: '#082b3c',
                }}>
                Alison Max
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.regular,
                  color: '#082b3c',
                  marginTop: width / 40,
                }}>
                Abc@gmail.com
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.bold,
                  color: colors.blue,
                }}>
                Completed
              </Text>

              <Text
                style={{
                  fontSize: 10,
                  marginTop: width / 40,
                  fontFamily: fonts.regular,
                  color: '#082b3c',
                }}>
                Referral on 5 September 2020
              </Text>

              <View
                style={{
                  marginTop: width / 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={localImages.checked_light_blue}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
                <Text
                  style={{color: colors.info_color, marginLeft: width / 50}}>
                  Reward Earned
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.mainContainer, {marginLeft: 30, marginRight: 30}]}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 24,
            color: colors.white,
            marginTop: width / 15,
            fontFamily: fonts.regular,
          }}>
          Refer a Friend, Both Get a
        </Text>

        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 30,
            marginTop: width / 20,
            color: colors.white,
          }}>
          Free Stock
        </Text>

        <View style={{}}>
          <Image
            source={localImages.game_img}
            style={{width: width / 1.1, height: width / 1.5}}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            backgroundColor: '#082b3c',
            padding: width / 12,
            borderTopLeftRadius: width / 20,
            borderTopRightRadius: width / 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: fonts.semiBold,
              color: colors.white,
            }}>
            The more friends you refer, the more stocks you will receive
          </Text>

          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: 14,
              color: colors.white,
              marginTop: width / 20,
            }}>
            Each stock is valued upto $100
          </Text>

          <ButtonWithoutShadow
            width={width - 147}
            height={43}
            marginTop={width / 20}
            borderRadius={20}
            labelColor={colors.white}
            label="Continue"
            backgroundColor={colors.blue}
            onAction={() => null}
          />

          <Text
            style={{
              color: '#57ded5',
              fontSize: 12,
              fontFamily: fonts.bold,
              marginTop: width / 20,
            }}>
            Terms & Conditions
          </Text>
        </View>

        <View style={{width: '100%', marginTop: width / 20}}>
          <Text
            style={{
              color: '#fafafa',
              fontFamily: fonts.regular,
              fontSize: 16,
            }}>
            My Invites:
          </Text>

          <FlatList
            renderItem={renderStocks}
            data={stocksData}
            contentContainerStyle={{paddingBottom: 60}}
            ListEmptyComponent={() => {
              return (
                <View
                  style={[
                    {
                      marginBottom: 10,
                      marginTop: width / 2,
                      alignItems: 'center',
                    },
                  ]}>
                  <Text>No Stocks Available!</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};
const Levels = props => {
  const [stocksData, setStockDat] = useState([
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
    {
      name: 'A',
    },
  ]);

  const [IsOpen, setIsOpen] = useState(false);
  const [isModal2, setIsOpen2] = useState(false);


  const renderRewards = ({item}) => {
    return (
      <TouchableOpacity onPress={() => null}>
        <View
          style={{
            borderRadius: width / 40,
            marginTop: 10,
            backgroundColor: colors.white,
            padding: width / 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={localImages.deposit}
                style={{
                  height: 40,
                  width: 40,
                  marginRight: width / 20,
                  resizeMode: 'contain',
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.bold,
                    color: colors.black,
                  }}>
                  1st Time Deposit
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    marginTop: width / 40,
                    fontFamily: fonts.regular,
                    color: colors.grayText,
                  }}>
                  Limit once
                </Text>

                <Text
                  style={{
                    fontSize: 10,
                    marginTop: width / 40,
                    fontFamily: fonts.bold,
                    color: colors.black,
                  }}>
                  Earn $10.00{' '}
                </Text>
              </View>
            </View>
            <View>
              <ButtonWithoutShadow
                width={width / 5}
                height={43}
                marginTop={width / 40}
                borderRadius={20}
                labelColor={colors.white}
                label="Go"
                backgroundColor={colors.blue}
                onAction={() => null}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const openMobal = () => {
    setIsOpen(true);
  };
  const modalClose = () => {
    setIsOpen(false);
  };
  const onRewards = () => {
    const {navigate} = props.navigation;
    navigate('EarnRewards');
  };

  modalOpen2 = () => {
    setIsOpen2(true);
  };
  modalClose2 = () => {
    setIsOpen2(false);
  };

  gotoDepositScreen = () => {
    modalClose2();
    props.navigation.navigate('DepositScreen', {from: ''});
  };
  gotoRecurringDeposit = () => {
    modalClose2();
    props.navigation.navigate('Recurring3');
  };


  return (
    <View
      style={[
        styles.mainContainer,
        {
          alignItems: 'center',
          marginRight: width / 14,
          marginLeft: width / 14,
        },
      ]}>
      <Text
        style={{
          color: colors.white,
          fontFamily: fonts.bold,
          fontSize: 35,
          width: width / 2,
          textAlign: 'center',
        }}>
        Do more. Earn more.
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontFamily: fonts.regular,
          color: colors.white,
          marginTop: width / 20,
          textAlign: 'center',
        }}>
        Earn rewards for everything you do on the app. Complete tasks and reach
        millstones to redeem real money.
      </Text>

      <TouchableOpacity
        onPress={() => openMobal()}
        style={{
          position: 'absolute',
          right: -width / 10,
          top: width / 2.3,
          padding: width / 60,
          backgroundColor: '#092E3E50',
          zIndex: 1,
          borderRadius: width / 60,
        }}>
        <View
          style={{
            height: 20,

            flexDirection: 'row',
            zIndex: -1,
          }}>
          <Text style={{color: colors.white, marginRight: 5}}>
            How it works
          </Text>
          <Image
            source={localImages.info_icon}
            style={{
              height: width / 20,
              width: width / 20,
              marginRight: 15,
              resizeMode: 'contain',
            }}
          />
        </View>
      </TouchableOpacity>

      <View style={{alignItems: 'center', marginTop: width / 20}}>
        <ImageBackground
          source={localImages.deposite_bg}
          resizeMode="contain"
          style={{height: width / 1.2, width: width / 1.2}}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: width / 8,

                width: '90%',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.black,
                }}>
                My Rewards
              </Text>

              <TouchableOpacity onPress={onRewards}>
                <Image
                  source={localImages.dollar_icon}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 30,
                fontFamily: fonts.bold,
                color: colors.black,
                marginTop: 0,
                position: 'absolute',
                top: width / 4,
              }}>
              $140.00
            </Text>

            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 20,
                color: colors.grayText,
                marginTop: width / 8,
              }}>
              Your Balance
            </Text>

            <View
              style={{
                flexDirection: 'row',

                width: '90%',
                marginTop: width / 25,
                justifyContent: 'space-between',
              }}>
              <ButtonWithoutShadow
                width={width / 3}
                height={43}
                marginTop={width / 30}
                borderRadius={20}
                labelColor={colors.white}
                label="Deposit"
                backgroundColor={'#1ecbc0'}
                onAction={() => modalOpen2()}
              />
              <ButtonWithoutShadow
                width={width / 3}
                height={43}
                marginTop={width / 40}
                borderRadius={20}
                labelColor={colors.white}
                label="Withdrawal"
                backgroundColor={colors.black}
                onAction={() => props.navigation.navigate('WithDrawal')}
              />
            </View>
          </View>
        </ImageBackground>

        <ImageBackground
          source={localImages.my_reward}
          resizeMode="contain"
          style={{
            width: width / 1.2,
            height: width / 4,
            position: 'absolute',
            top: width / 1.5,
          }}>
          <View style={{padding: width / 15}}>
            <Text
              style={{
                fontSize: 16,
                color: colors.white,
                fontSize: 20,
                fontFamily: fonts.bold,
              }}>
              REWARD SHOP
            </Text>

            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.regular,
                fontSize: 14,
                marginTop: width / 50,
              }}>
              Lorem Ipsum Lorem Ipsum Lorem
            </Text>
          </View>
        </ImageBackground>
        <ImageBackground
          source={localImages.list_bg}
          resizeMode="contain"
          style={{
            height: '100%',
            width: width / 1.2,
            marginTop: width / 14,
          }}>
          <FlatList
            renderItem={renderRewards}
            data={stocksData}
            contentContainerStyle={{paddingBottom: 60}}
            scrollEnabled={false}
            style={{backgroundColor: colors.white}}
            ListEmptyComponent={() => {
              return (
                <View
                  style={[
                    {
                      marginBottom: 10,
                      marginTop: width / 2,
                      alignItems: 'center',
                    },
                  ]}>
                  <Text>No Stocks Available!</Text>
                </View>
              );
            }}
          />
        </ImageBackground>
      </View>

      <TwoButtonModal isModalVisible={IsOpen} modalClose={() => modalClose()}>
        <View style={styles.popupMainContainer}>
          <Text style={styles.popUpText}>How it works</Text>
          <View
            style={{
              alignItems: 'center',
              width: wp('80%'),
              marginTop: 10,
            }}>
            <Text
              textAlign="center"
              style={{
                color: colors.grayText,
                fontSize: 13,
                fontFamily: fonts.regular,
              }}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur
              sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat. Lorem ipsum dolor sit amet,
              consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat.
            </Text>
          </View>
        </View>
      </TwoButtonModal>
    
       <TwoButtonModal
          isModalVisible={isModal2}
          modalClose={() => modalClose2()}>
          <View style={styles.popupMainContainer}>
            <Text style={styles.popupHeading}>Select Type of Deposit</Text>
            <View style={styles.oneTimeMainContainer}>
              <TouchableOpacity
                style={styles.oneTimeContainer}
                onPress={() =>gotoDepositScreen()}>
                <Image
                  source={localImages.unselect}
                  style={{height: 15, width: 15, resizeMode: 'contain'}}
                />
                <Text style={styles.popUpText}>One Time Deposit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.oneTimeContainer}
                onPress={() => gotoRecurringDeposit()}>
                <Image
                  source={localImages.unselect}
                  style={{height: 15, width: 15, resizeMode: 'contain'}}
                />
                <Text style={styles.popUpText}>Recurring Deposit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.popupButtonContainer}>
            <ButtonWithoutShadow
              width={width - wp('65%')}
              height={43}
              // marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label="Continue"
              backgroundColor={colors.blue}
              onAction={() => modalClose2()}
            />
          </View>
        </TwoButtonModal>
    
    </View>
  );
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentPosition: 0,
    };
  }

  setPositions = currentPosition => {
    this.setState({currentPosition: currentPosition});
  };
  showTabs = () => {
    if (this.state.currentPosition == 0) {
      return <Games {...this.props} />;
    } else if (this.state.currentPosition == 1) {
      return <Referrals />;
    } else if (this.state.currentPosition == 2) {
      return <Levels {...this.props} />;
    }
  };
  render() {
    return (
      <ImageBackground
        source={localImages.game_bg}
        style={{width: width, height: height}}>
        <SafeAreaView
          style={
            this.state.currentPosition == 0
              ? null
              : this.state.currentPosition == 2
              ? [CustomStyles.containerbording, {backgroundColor: '#1ecbc0'}]
              : [CustomStyles.containerbording, {backgroundColor: colors.blue}]
          }>
          <HomeHeader
            // Header="My Rewards"
            backgroundColor={1}
            labelStyle={styles.labelStyle}
            onActionLeft={() => null}
            rightIcon1={'add_green_icon'}
            rightIcon2={'well_green_icon'}
            firstOnPress={() =>
              this.props.navigation.navigate('WatchListRoundIcon')
            }
            secondOnPress={() =>
              this.props.navigation.navigate('Notifications')
            }
          />
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={
                this.state.currentPosition == 0
                  ? styles.buttons2
                  : styles.buttons1
              }
              onPress={() => this.setPositions(0)}>
              <Text
                style={
                  this.state.currentPosition == 0
                    ? styles.buttonText2
                    : styles.buttonText1
                }>
                Games
              </Text>
            </TouchableOpacity>
            <View style={styles.borderSeperator} />
            <TouchableOpacity
              style={
                this.state.currentPosition == 1
                  ? styles.buttons4
                  : styles.buttons1
              }
              onPress={() => this.setPositions(1)}>
              <Text
                style={
                  this.state.currentPosition == 1
                    ? styles.buttonText2
                    : styles.buttonText1
                }>
                Free Stocks
              </Text>
            </TouchableOpacity>
            <View style={styles.borderSeperator} />
            <TouchableOpacity
              style={
                this.state.currentPosition == 2
                  ? styles.buttons3
                  : styles.buttons1
              }
              onPress={() => this.setPositions(2)}>
              <Text
                style={
                  this.state.currentPosition == 2
                    ? styles.buttonText2
                    : styles.buttonText1
                }>
                Rewards
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View>{this.showTabs()}</View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  fantasyText: {
    fontSize: 24,
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: hp('20%'),
  },
  fantasySubText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    textAlign: 'center',
    lineHeight: 24,
  },
  inTheRedButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width : wp("100%"),
    backgroundColor: colors.white,
    width: width,
    alignSelf: 'center',
    height: hp('10%'),
    // opacity  : 0.7,
  },
  inTheRedButtonText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.bold,
    textAlign: 'left',
    lineHeight: 24,
  },
  inTheRedButtonSubText: {
    fontSize: 12,
    color: colors.grayColor,
    fontFamily: fonts.regular,
    textAlign: 'left',
    lineHeight: 12,
    marginTop: 3,
  },
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    // marginLeft: wp('7.7%'),
    // marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
    marginBottom: hp('5%'),
  },
  buttons: {
    height: hp('10.94%'),
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginBottom: hp('1.64%'),
  },

  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('0.39%'),
    borderRadius: wp('2%'),
    borderColor: colors.grayColor,
    borderWidth: 0.4,
    backgroundColor: colors.white,
  },
  buttons1: {
    //   width: wp('45%'),
    height: hp('4.84%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttons2: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('4.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: wp('2%'),
    borderBottomLeftRadius: wp('2%'),

    // marginBottom: hp('1.64%'),
  },
  buttons3: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('4.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: wp('2%'),
    borderBottomRightRadius: wp('2%'),
  },
  buttons4: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('4.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopRightRadius: wp('2%'),
    // borderBottomRightRadius: wp('2%'),
  },
  buttonText1: {
    fontSize: wp('3.73%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  buttonText2: {
    fontSize: wp('3.73%'),
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  borderSeperator: {
    height: 25,
    borderWidth: Platform.OS == 'android' ? 0.3 : 0.5,
    borderColor: colors.grayColor,
  },
  iconImage: {
    height: 34,
    width: 34,
  },
  earnedContainer: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: wp('1.9%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    padding: 14,
    marginBottom: 11,
  },
  firstContainer: {width: wp('13%')},
  secondContainer: {width: wp('30%')},
  thirdContainer: {
    flex: 1,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: -8,
  },
  itemText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  itemText1: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  paratext: {
    fontSize: wp('3.73%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: Platform.OS == 'android' ? 150 : 170,
    // marginLeft: wp('2.53'),
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subPopupText: {
    fontSize: wp('2.72%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 15,
    marginLeft: 10,
  },
  spinImage: {
    height: hp('41'),
    width: hp('41'),
    alignSelf: 'center',
    marginTop: 38,
  },
  totalNumber: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 21,
    textAlign: 'left',
    // marginTop: 28,
    marginBottom: 15,
  },
  linearGradient: {
    // flex: 1,
    //paddingLeft: 15,
    //paddingRight: 15,
    // borderRadius: 5,
    borderRadius: 50,
  },
  referralText1: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  referralText2: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  oneTimeMainContainer: {
    width: wp('70%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 27,
    justifyContent: 'space-between',
  },
  popupHeading: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 27,
  },
  levelContainer: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: wp('1.9%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  levelFirstContainer: {
    flexDirection: 'row',
    flex: 1,
    //   alignItems : "flex-start",
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelTwoContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  textLevel1: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  textLevel2: {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  riskLevelText: {
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  aggressiveText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  howItWorksContainer: {
    alignSelf: 'center',
    marginTop: 15,
  },
  howItWorks: {
    fontSize: 13,
    color: colors.blue,
    fontFamily: fonts.regular,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  oneTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  popUpText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginLeft: 10,
  },
  arrowRight: {
    height: 16,
    width: 16,
  },
});
export default Search;

// import React, {useState, Component, useEffect} from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Animated,
//   Platform,
//   ImageBackground,
// } from 'react-native';
// import {colors, fonts, localImages} from '../../utils/constant';
// import {CustomStyles} from '../style/CustomStyles';
// const {height, width} = Dimensions.get('window');
// import {HomeHeader, ButtonWithoutShadow} from '../../component/Button';
// import {hp, wp} from '../../utils/responsive';
// import {PlainTextInput} from './../../component/InputBox';
// import SwipeButton from 'rn-swipe-button';
// import LinearGradient from 'react-native-linear-gradient';
// import WheelOfFortune from 'react-native-wheel-of-fortune';
// import {set} from 'react-native-reanimated';

// const Earned = () => {
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.earnedContainer}>
//         <View style={styles.firstContainer}>
//           <Image source={localImages.microsoft} style={styles.iconImage} />
//         </View>
//         <View style={styles.secondContainer}>
//           <Text style={styles.itemText}>MICR</Text>
//           <Text style={styles.itemText}>2 Shares</Text>
//         </View>
//         <View style={styles.thirdContainer}>
//           <Text style={styles.itemText1}>20 October 2019</Text>
//         </View>
//       </View>
//       <View style={styles.earnedContainer}>
//         <View style={styles.firstContainer}>
//           <Image source={localImages.microsoft} style={styles.iconImage} />
//         </View>
//         <View style={styles.secondContainer}>
//           <Text style={styles.itemText}>MICR</Text>
//           <Text style={styles.itemText}>2 Shares</Text>
//         </View>
//         <View style={styles.thirdContainer}>
//           <Text style={styles.itemText1}>20 October 2019</Text>
//         </View>
//       </View>
//       <View style={styles.earnedContainer}>
//         <View style={styles.firstContainer}>
//           <Image source={localImages.microsoft} style={styles.iconImage} />
//         </View>
//         <View style={styles.secondContainer}>
//           <Text style={styles.itemText}>MICR</Text>
//           <Text style={styles.itemText}>2 Shares</Text>
//         </View>
//         <View style={styles.thirdContainer}>
//           <Text style={styles.itemText1}>20 October 2019</Text>
//         </View>
//       </View>
//     </View>
//   );
// };
// const Referrals = () => {
//   const [state, setState] = useState({
//     winnerValue: null,
//     winnerIndex: null,
//     isModalVisible: false,
//     isSpinnerStart: false,
//   });

//   const _renderPlayButton = (play) => {
//     return play;
//   };

//   const setIsSpinner = () => {
//     _renderPlayButton();
//     setState({isSpinnerStart: true});
//   };
//   return (
//     <View style={styles.mainContainer}>
//       {/* <View>
//         <Image source={localImages.spinner} style={styles.spinImage} />
//       </View> */}
//       {/* <View
//         style={{
//           width: wp('22%'),
//           height: wp('22'),
//           marginTop: Platform.OS == 'ios' ? 120 : 100,
//           alignSelf: 'center',
//         }}>
//         <WheelOfFortune
//           rewards={[1, 2, 3, 4, 5, 6, 7, 8]}
//           knobSize={10}
//           borderWidth={3}
//           borderColor={'#FFF'}
//           winner={state.winnerValue}
//           backgroundColor={'#fff'}
//           // knoobSource={localImages.spinner}
//           getWinner={(value, index) =>
//             setState({winnerValue: value, winnerIndex: index})
//           }
//           onPlay={(play) => _renderPlayButton(play)}
//           // playButton={() => this._renderPlayButton()}
//           colors={[
//             'red',
//             'green',
//             'red',
//             'green',
//             'red',
//             'green',
//             'red',
//             'green',
//             'red',
//             'green',
//           ]}
//           spinnerImage={localImages.spinner2}
//           // onRef = {ref => this.child = ref}
//           isStart={state.isSpinnerStart}
//         />
//       </View>
//       <View>
//         <Text style={styles.paratext}>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//           interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat
//           sit amet elementum.
//         </Text>
//       </View>
//       <View style={{alignSelf: 'center'}}>
//         <PlainTextInput
//           height={43}
//           backgroundColor={colors.white}
//           width={width - 100}
//           borderRadius={30}
//           marginTop={27}
//           placeholder="Enter your email"
//           label=""
//           labelColor={colors.labelColor}
//           placeholderColor={colors.placeHolderColor}
//           inputTextColor={colors.text}
//           maxLength={50}
//           // iconName={'search_gray_icon'}
//         />
//         <PlainTextInput
//           height={43}
//           backgroundColor={colors.white}
//           width={width - 100}
//           borderRadius={30}
//           marginTop={22}
//           placeholder="Friend's Referral email"
//           label=""
//           labelColor={colors.labelColor}
//           placeholderColor={colors.placeHolderColor}
//           inputTextColor={colors.text}
//           maxLength={50}
//           // iconName={'search_gray_icon'}
//         />
//       </View>
//      */}
//       <View>
//         {/* <View
//           style={{
//             marginTop: hp('5.24'),
//             width: wp('70%'),
//             alignSelf: 'center',
//           }}>
//           <LinearGradient
//             colors={['transparent', colors.blue]}
//             start={{x: 1.3, y: 0}}
//             end={{x: 0, y: 0}}
//             style={styles.linearGradient}>
//             <View>
//               <SwipeButton
//                 disabled={false}
//                 //disable the button by doing true (Optional)
//                 swipeSuccessThreshold={70}
//                 height={45}
//                 //height of the button (Optional)
//                 width={wp('68%')}
//                 //width of the button (Optional)
//                 title="Swipe to Spin"
//                 //Text inside the button (Optional)
//                 thumbIconImageSource={localImages.btn_arrow_color}
//                 //thumbIconStyles = {{resizeMode : "contain"}}
//                 //You can also set your own icon (Optional)
//                 onSwipeSuccess={() => {
//                   setIsSpinner();
//                 }}
//                 shouldResetAfterSuccess={true}
//                 resetAfterSuccessAnimDelay={7000}
//                 //After the completion of swipe (Optional)
//                 railFillBackgroundColor={colors.transparent} //(Optional)
//                 railFillBorderColor={colors.transparent} //(Optional)
//                 thumbIconBackgroundColor={colors.white} //(Optional)
//                 thumbIconBorderColor={colors.white} //(Optional)
//                 railBackgroundColor={colors.transparent} //(Optional)
//                 railBorderColor={colors.transparent} //(Optional)
//                 titleStyles={{
//                   fontSize: 13,
//                   color: colors.white,
//                   fontWeight: 'bold',
//                 }}></SwipeButton>
//             </View>
//           </LinearGradient>
//         </View> */}
//         <View>
//           <Text style={styles.totalNumber}>Total Number of Referrals : 05</Text>
//         </View>
//         <View style={styles.earnedContainer}>
//           <View style={styles.secondContainer}>
//             <Text style={styles.referralText1}>Alison Max</Text>
//             <Text
//               style={[
//                 styles.referralText2,
//                 {fontSize: 12, color: colors.black},
//               ]}>
//               Abc@gmail.com
//             </Text>
//           </View>
//           <View style={[{flex: 1, alignItems: 'flex-end'}]}>
//             <Text style={[styles.referralText1, {color: colors.blue}]}>
//               Completed
//             </Text>
//             <Text style={styles.referralText2}>
//               Referral on 5 September 2020
//             </Text>
//           </View>
//         </View>
//         <View style={styles.earnedContainer}>
//           <View style={styles.secondContainer}>
//             <Text style={styles.referralText1}>Alison Max</Text>
//             <Text
//               style={[
//                 styles.referralText2,
//                 {fontSize: 12, color: colors.black},
//               ]}>
//               Abc@gmail.com
//             </Text>
//           </View>
//           <View style={[{flex: 1, alignItems: 'flex-end'}]}>
//             <Text style={[styles.referralText1, {color: colors.blue}]}>
//               Completed
//             </Text>
//             <Text style={styles.referralText2}>
//               Referral on 5 September 2020
//             </Text>
//           </View>
//         </View>
//         <View style={styles.earnedContainer}>
//           <View style={styles.secondContainer}>
//             <Text style={styles.referralText1}>Alison Max</Text>
//             <Text
//               style={[
//                 styles.referralText2,
//                 {fontSize: 12, color: colors.black},
//               ]}>
//               Abc@gmail.com
//             </Text>
//           </View>
//           <View style={[{flex: 1, alignItems: 'flex-end'}]}>
//             <Text style={[styles.referralText1, {color: colors.blue}]}>
//               Completed
//             </Text>
//             <Text style={styles.referralText2}>
//               Referral on 5 September 2020
//             </Text>
//           </View>
//         </View>
//         <View style={styles.earnedContainer}>
//           <View style={styles.secondContainer}>
//             <Text style={styles.referralText1}>Alison Max</Text>
//             <Text
//               style={[
//                 styles.referralText2,
//                 {fontSize: 12, color: colors.black},
//               ]}>
//               Abc@gmail.com
//             </Text>
//           </View>
//           <View style={[{flex: 1, alignItems: 'flex-end'}]}>
//             <Text style={[styles.referralText1, {color: colors.blue}]}>
//               Completed
//             </Text>
//             <Text style={styles.referralText2}>
//               Referral on 5 September 2020
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };
// const Levels = () => {
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.levelContainer}>
//         <View style={styles.levelFirstContainer}>
//           <Text style={styles.textLevel1}>Level 1</Text>
//           <Text style={styles.textLevel2}>Completed</Text>
//         </View>
//         <View>
//           <Text style={styles.riskLevelText}>Description</Text>
//           <Text style={styles.aggressiveText}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//             interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat
//             sit amet elementum.{' '}
//           </Text>
//         </View>
//         <View style={styles.levelTwoContainer}>
//           <Image
//             source={localImages.checked_light_blue}
//             style={{height: 20, width: 20, marginRight: 10}}
//           />
//           <Text style={[styles.textLevel2, {color: colors.info_color}]}>
//             Reward Earned
//           </Text>
//         </View>
//       </View>
//       <View style={styles.levelContainer}>
//         <View style={styles.levelFirstContainer}>
//           <Text style={styles.textLevel1}>Level 2</Text>
//           <Text style={styles.textLevel2}>Completed</Text>
//         </View>
//         <View>
//           <Text style={styles.riskLevelText}>Description</Text>
//           <Text style={styles.aggressiveText}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//             interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat
//             sit amet elementum.{' '}
//           </Text>
//         </View>
//         <View style={styles.levelTwoContainer}>
//           <Image
//             source={localImages.checked_light_blue}
//             style={{height: 20, width: 20, marginRight: 10}}
//           />
//           <Text style={[styles.textLevel2, {color: colors.info_color}]}>
//             Reward Earned
//           </Text>
//         </View>
//       </View>
//       <View style={styles.levelContainer}>
//         <View style={styles.levelFirstContainer}>
//           <Text style={styles.textLevel1}>Level 3</Text>
//           <Text style={styles.textLevel2}>Completed</Text>
//         </View>
//         <View>
//           <Text style={styles.riskLevelText}>Description</Text>
//           <Text style={styles.aggressiveText}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//             interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat
//             sit amet elementum.{' '}
//           </Text>
//         </View>
//         <View style={styles.levelTwoContainer}>
//           <Image
//             source={localImages.checked_light_blue}
//             style={{height: 20, width: 20, marginRight: 10}}
//           />
//           <Text style={[styles.textLevel2, {color: colors.info_color}]}>
//             Reward Earned
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// class Search extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isEnable: false,
//       currentPosition: 0,
//     };
//   }

//   setPositions = (currentPosition) => {
//     this.setState({currentPosition: currentPosition});
//   };
//   showTabs = () => {
//     if (this.state.currentPosition == 0) {
//       return <Earned />;
//     } else if (this.state.currentPosition == 1) {
//       return <Referrals />;
//     } else if (this.state.currentPosition == 2) {
//       return <Levels />;
//     }
//   };
//   render() {
//     return (
//       <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
//         <HomeHeader
//           Header="My Rewards"
//           backgroundColor={1}
//           labelStyle={styles.labelStyle}
//           onActionLeft={() => null}
//           rightIcon1={'add_green_icon'}
//           rightIcon2={'well_green_icon'}
//           firstOnPress={() =>
//             this.props.navigation.navigate('WatchListRoundIcon')
//           }
//           secondOnPress={() => this.props.navigation.navigate('Notifications')}
//         />
//         <View style={styles.topContainer}>
//           <TouchableOpacity
//             style={
//               this.state.currentPosition == 0
//                 ? styles.buttons2
//                 : styles.buttons1
//             }
//             onPress={() => this.setPositions(0)}>
//             <Text
//               style={
//                 this.state.currentPosition == 0
//                   ? styles.buttonText2
//                   : styles.buttonText1
//               }>
//               Games
//             </Text>
//           </TouchableOpacity>
//           <View style={styles.borderSeperator} />
//           <TouchableOpacity
//             style={
//               this.state.currentPosition == 1
//                 ? styles.buttons4
//                 : styles.buttons1
//             }
//             onPress={() => this.setPositions(1)}>
//             <Text
//               style={
//                 this.state.currentPosition == 1
//                   ? styles.buttonText2
//                   : styles.buttonText1
//               }>
//               Free Stock
//             </Text>
//           </TouchableOpacity>
//           <View style={styles.borderSeperator} />
//           <TouchableOpacity
//             style={
//               this.state.currentPosition == 2
//                 ? styles.buttons3
//                 : styles.buttons1
//             }
//             onPress={() => this.setPositions(2)}>
//             <Text
//               style={
//                 this.state.currentPosition == 2
//                   ? styles.buttonText2
//                   : styles.buttonText1
//               }>
//               Rewards
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <ScrollView>
//           <View>{this.showTabs()}</View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   labelStyle: {
//     fontSize: wp('4.8%'),
//     color: colors.black,
//     fontFamily: fonts.regular,
//     fontWeight: 'bold',
//     lineHeight: 24,
//     alignSelf: 'center',
//   },
//   mainContainer: {
//     flex: 1,
//     marginLeft: wp('7.7%'),
//     marginRight: wp('7.7%'),
//     marginTop: hp('2.39%'),
//     marginBottom: hp('5%'),
//   },
//   buttons: {
//     height: hp('10.94%'),
//     backgroundColor: colors.white,
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: wp('3%'),
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.29,
//     shadowRadius: 4.65,

//     elevation: 7,
//     marginBottom: hp('1.64%'),
//   },

//   buttonText: {
//     fontSize: wp('3.73%'),
//     color: colors.black,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//     textAlign: 'left',
//     //paddingLeft: wp('4.53'),
//   },

//   topContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: wp('7.7%'),
//     marginRight: wp('7.7%'),
//     marginTop: hp('2.39%'),
//     borderRadius: wp('2%'),
//     borderColor: colors.grayColor,
//     borderWidth: 0.4,
//     backgroundColor: colors.white,
//   },
//   buttons1: {
//     //   width: wp('45%'),
//     height: hp('5.84%'),
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   buttons2: {
//     flex: 1,
//     //   width: wp('42%'),
//     height: hp('5.84%'),
//     backgroundColor: colors.blue,
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderTopLeftRadius: wp('2%'),
//     borderBottomLeftRadius: wp('2%'),

//     // marginBottom: hp('1.64%'),
//   },
//   buttons3: {
//     flex: 1,
//     //   width: wp('42%'),
//     height: hp('5.84%'),
//     backgroundColor: colors.blue,
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderTopRightRadius: wp('2%'),
//     borderBottomRightRadius: wp('2%'),
//   },
//   buttons4: {
//     flex: 1,
//     //   width: wp('42%'),
//     height: hp('5.84%'),
//     backgroundColor: colors.blue,
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     // borderTopRightRadius: wp('2%'),
//     // borderBottomRightRadius: wp('2%'),
//   },
//   buttonText1: {
//     fontSize: wp('3%'),
//     color: colors.grayColor,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//     // marginLeft: wp('2.53'),
//   },
//   buttonText2: {
//     fontSize: wp('3%'),
//     color: colors.white,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//     // marginLeft: wp('2.53'),
//   },
//   borderSeperator: {
//     height: 25,
//     borderWidth: Platform.OS == 'android' ? 0.3 : 0.5,
//     borderColor: colors.grayColor,
//   },
//   iconImage: {
//     height: 34,
//     width: 34,
//   },
//   earnedContainer: {
//     backgroundColor: colors.white,
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     borderRadius: wp('1.9%'),
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,

//     elevation: 3,
//     padding: 14,
//     marginBottom: 11,
//   },
//   firstContainer: {width: wp('13%')},
//   secondContainer: {width: wp('30%')},
//   thirdContainer: {
//     flex: 1,
//     height: 50,
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//     marginTop: -8,
//   },
//   itemText: {
//     fontSize: wp('3.2%'),
//     color: colors.black,
//     fontFamily: fonts.semiBold,
//     lineHeight: 20,
//     // marginLeft: wp('2.53'),
//   },
//   itemText1: {
//     fontSize: wp('3.2%'),
//     color: colors.grayColor,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//     // marginLeft: wp('2.53'),
//   },
//   paratext: {
//     fontSize: wp('3.73%'),
//     color: colors.grayColor,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//     textAlign: 'center',
//     marginTop: Platform.OS == 'android' ? 150 : 170,
//     // marginLeft: wp('2.53'),
//   },
//   spinImage: {
//     height: hp('41'),
//     width: hp('41'),
//     alignSelf: 'center',
//     marginTop: 38,
//   },
//   totalNumber: {
//     fontSize: wp('4.26%'),
//     color: colors.black,
//     fontFamily: fonts.regular,
//     lineHeight: 21,
//     textAlign: 'left',
//     // marginTop: 28,
//     marginBottom: 15,
//   },
//   linearGradient: {
//     // flex: 1,
//     //paddingLeft: 15,
//     //paddingRight: 15,
//     // borderRadius: 5,
//     borderRadius: 50,
//   },
//   referralText1: {
//     fontSize: wp('3.73%'),
//     color: colors.black,
//     fontFamily: fonts.semiBold,
//     lineHeight: 20,
//     // marginLeft: wp('2.53'),
//   },
//   referralText2: {
//     fontSize: wp('3.2%'),
//     color: colors.grayColor,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//     // marginLeft: wp('2.53'),
//   },
//   levelContainer: {
//     backgroundColor: colors.white,
//     flex: 1,
//     borderRadius: wp('1.9%'),
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,

//     elevation: 3,
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 14,
//   },
//   levelFirstContainer: {
//     flexDirection: 'row',
//     flex: 1,
//     //   alignItems : "flex-start",
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   levelTwoContainer: {
//     flexDirection: 'row',
//     flex: 1,
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//     marginTop: 10,
//   },
//   textLevel1: {
//     fontSize: wp('3.73%'),
//     color: colors.black,
//     fontFamily: fonts.semiBold,
//     lineHeight: 20,
//   },
//   textLevel2: {
//     fontSize: wp('3.73%'),
//     color: colors.blue,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//   },
//   riskLevelText: {
//     fontSize: wp('2.66%'),
//     color: colors.grayColor,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//   },
//   aggressiveText: {
//     fontSize: wp('3.2%'),
//     color: colors.black,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//   },
// });
// export default Search;
