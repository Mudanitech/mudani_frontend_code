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
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HomeHeader, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';

const Games = () => {
  return (
    <View style={styles.mainContainer}>
      {/* <ImageBackground source={localImages.carasoul_bg} style={{width : width,height : height}}> */}
        <View>
          <Text style={styles.fantasyText}>Weekly Stock Fantasy Games</Text>
          <Text style={[styles.fantasySubText, {marginTop: hp('1%')}]}>
            Fantasy meets Finance. Play today to win
          </Text>
          <Text style={styles.fantasySubText}>
            free stocks, gift cards, and Mudani cash.
          </Text>
          <TouchableOpacity style={[styles.inTheRedButton, {marginTop: 50,flex : 1}]}>
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
                Pick Whether a stock will close up or down for the weekly
                winners.
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
          <TouchableOpacity style={[styles.inTheRedButton, {marginTop: 10}]}>
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
                Pick Whether a stock will close up or down for the weekly
                winners.
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

  const _renderPlayButton = (play) => {
    return play;
  };

  const setIsSpinner = () => {
    _renderPlayButton();
    setState({isSpinnerStart: true});
  };
  return (
    <View style={[styles.mainContainer,{marginLeft : 30,marginRight : 30}]}>
      <View>
        <View>
          <Text style={styles.totalNumber}>Total Number of Referrals : 05</Text>
        </View>
        <View style={styles.earnedContainer}>
          <View style={styles.secondContainer}>
            <Text style={styles.referralText1}>Alison Max</Text>
            <Text
              style={[
                styles.referralText2,
                {fontSize: 12, color: colors.black},
              ]}>
              Abc@gmail.com
            </Text>
          </View>
          <View style={[{flex: 1, alignItems: 'flex-end'}]}>
            <Text style={[styles.referralText1, {color: colors.blue}]}>
              Completed
            </Text>
            <Text style={styles.referralText2}>
              Referral on 5 September 2020
            </Text>
          </View>
        </View>
        <View style={styles.earnedContainer}>
          <View style={styles.secondContainer}>
            <Text style={styles.referralText1}>Alison Max</Text>
            <Text
              style={[
                styles.referralText2,
                {fontSize: 12, color: colors.black},
              ]}>
              Abc@gmail.com
            </Text>
          </View>
          <View style={[{flex: 1, alignItems: 'flex-end'}]}>
            <Text style={[styles.referralText1, {color: colors.blue}]}>
              Completed
            </Text>
            <Text style={styles.referralText2}>
              Referral on 5 September 2020
            </Text>
          </View>
        </View>
        <View style={styles.earnedContainer}>
          <View style={styles.secondContainer}>
            <Text style={styles.referralText1}>Alison Max</Text>
            <Text
              style={[
                styles.referralText2,
                {fontSize: 12, color: colors.black},
              ]}>
              Abc@gmail.com
            </Text>
          </View>
          <View style={[{flex: 1, alignItems: 'flex-end'}]}>
            <Text style={[styles.referralText1, {color: colors.blue}]}>
              Completed
            </Text>
            <Text style={styles.referralText2}>
              Referral on 5 September 2020
            </Text>
          </View>
        </View>
        <View style={styles.earnedContainer}>
          <View style={styles.secondContainer}>
            <Text style={styles.referralText1}>Alison Max</Text>
            <Text
              style={[
                styles.referralText2,
                {fontSize: 12, color: colors.black},
              ]}>
              Abc@gmail.com
            </Text>
          </View>
          <View style={[{flex: 1, alignItems: 'flex-end'}]}>
            <Text style={[styles.referralText1, {color: colors.blue}]}>
              Completed
            </Text>
            <Text style={styles.referralText2}>
              Referral on 5 September 2020
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const Levels = () => {
  return (
    <View style={[styles.mainContainer,{marginLeft : 30,marginRight : 30}]}>
      <View style={styles.levelContainer}>
        <View style={styles.levelFirstContainer}>
          <Text style={styles.textLevel1}>Level 1</Text>
          <Text style={styles.textLevel2}>Completed</Text>
        </View>
        <View>
          <Text style={styles.riskLevelText}>Description</Text>
          <Text style={styles.aggressiveText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat
            sit amet elementum.{' '}
          </Text>
        </View>
        <View style={styles.levelTwoContainer}>
          <Image
            source={localImages.checked_light_blue}
            style={{height: 20, width: 20, marginRight: 10}}
          />
          <Text style={[styles.textLevel2, {color: colors.info_color}]}>
            Reward Earned
          </Text>
        </View>
      </View>
      <View style={styles.levelContainer}>
        <View style={styles.levelFirstContainer}>
          <Text style={styles.textLevel1}>Level 2</Text>
          <Text style={styles.textLevel2}>Completed</Text>
        </View>
        <View>
          <Text style={styles.riskLevelText}>Description</Text>
          <Text style={styles.aggressiveText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat
            sit amet elementum.{' '}
          </Text>
        </View>
        <View style={styles.levelTwoContainer}>
          <Image
            source={localImages.checked_light_blue}
            style={{height: 20, width: 20, marginRight: 10}}
          />
          <Text style={[styles.textLevel2, {color: colors.info_color}]}>
            Reward Earned
          </Text>
        </View>
      </View>
      <View style={styles.levelContainer}>
        <View style={styles.levelFirstContainer}>
          <Text style={styles.textLevel1}>Level 3</Text>
          <Text style={styles.textLevel2}>Completed</Text>
        </View>
        <View>
          <Text style={styles.riskLevelText}>Description</Text>
          <Text style={styles.aggressiveText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat
            sit amet elementum.{' '}
          </Text>
        </View>
        <View style={styles.levelTwoContainer}>
          <Image
            source={localImages.checked_light_blue}
            style={{height: 20, width: 20, marginRight: 10}}
          />
          <Text style={[styles.textLevel2, {color: colors.info_color}]}>
            Reward Earned
          </Text>
        </View>
      </View>
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

  setPositions = (currentPosition) => {
    this.setState({currentPosition: currentPosition});
  };
  showTabs = () => {
    if (this.state.currentPosition == 0) {
      return <Games {...this.props} />;
    } else if (this.state.currentPosition == 1) {
      return <Referrals />;
    } else if (this.state.currentPosition == 2) {
      return <Levels />;
    }
  };
  render() {
    return (
    <ImageBackground source={localImages.game_bg} style={{width : width,height : height}}>
      <SafeAreaView>
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
          secondOnPress={() => this.props.navigation.navigate('Notifications')}
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
              Refer
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
    backgroundColor: '#edf1f5',
    width: width,
    alignSelf: 'center',
    height: hp('10%'),
    opacity  : 0.7,
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
    fontSize: wp('3%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  buttonText2: {
    fontSize: wp('3%'),
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
});
export default Search;
