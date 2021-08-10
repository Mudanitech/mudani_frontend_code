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
  Platform,
  ImageBackground,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {GameHeader, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';

const Games = () => {
  return (
    <View style={[styles.mainContainer, {marginTop: 0}]}>
      <View style={styles.redMainContaine}>
        <View style={styles.redContainer}>
          <Text
            style={[
              styles.inTheRedButtonText,
              {
                textAlign: 'center',
                marginBottom: 15,
                fontSize: 16,
                marginLeft: 25,
              },
            ]}>
            Green or Red
          </Text>
        </View>
      </View>
      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraphText}>
          Every week, Mudani will release 8 stocks from 8 different market
          sectors.
        </Text>
        <Text style={styles.paragraphText}>
          The user will pick whether the stock will close the week (Mon 9am-Fri
          4pm) at a gain or loss. If you believe the stock will close at a gain,
          please select the green up button. If you believe it will close at a
          loss, please select the red down button.
        </Text>
        <Text style={styles.paragraphText}>
          If you answer 6 (or more) out of the 8 stocks correctly, you're a
          winner.
        </Text>
      </View>
      <View style={styles.redMainContaine}>
        <Text
          style={[
            styles.inTheRedButtonText,
            {
              textAlign: 'center',
              marginBottom: 15,
              marginTop: 10,
              fontSize: 16,
              marginLeft: 25,
            },
          ]}>
          Weekly Stock Fantasy League (SFL)
        </Text>
      </View>
      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraphText}>
          You will select a stock from each stock category (9 categories). You
          will then select your stock "lock" (2x value, which means its worth
          double).
        </Text>
        <Text style={styles.paragraphText}>
          You will then review your fantasy lineup and submit. Once you click
          submit, we will ask you to confirm. Once confirmed, your fantasy stock
          lineup will lock for the week.
        </Text>
        <Text style={styles.paragraphText}>
          Track your fantasy lineup daily as your % gain/ loss score is
          real-time.
        </Text>
        <Text style={styles.paragraphText}>
          Those who finish with the highest gain/loss % are the winners (top
          10).
        </Text>
      </View>
      <View style={styles.redMainContaine}>
        <Text
          style={[
            styles.inTheRedButtonText,
            {
              textAlign: 'center',
              marginBottom: 15,
              marginTop: 10,
              fontSize: 16,
              marginLeft: 25,
            },
          ]}>
          Scoring System
        </Text>
      </View>
      <View style={[styles.paragraphContainer, {marginBottom: 100}]}>
        <Text
          style={[
            styles.paragraphText,
            {fontFamily: fonts.bold, fontWeight: 'bold'},
          ]}>
          Green or Red:
        </Text>
        <Text style={styles.paragraphText}>
          Winners will receive 5 mudani coins.
        </Text>
        <Text style={styles.paragraphText}>
          If you pick 6 (or more) correctly, you're a winner.
        </Text>
        <Text
          style={[
            styles.paragraphText,
            {fontFamily: fonts.bold, fontWeight: 'bold'},
          ]}>
          Stock Fantasy League (SFL):
        </Text>
        <Text style={styles.paragraphText}>
          Winners will receive 10 mudani coins. Top 10% are winners each week.
          (based on aggregate gain/loss%)
        </Text>
        <Text style={styles.paragraphText}>The "Lock" is worth 2x</Text>
        <Text style={[styles.paragraphText, {color: colors.red}]}>
          Chatroom: real-time group chat with fellow players for SFL (send
          message + like message only)
        </Text>
        <Text style={[styles.paragraphText, {fontStyle: 'italic'}]}>
          *in the future: follow other people/investors if this concept starts
          working
        </Text>
      </View>
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

  const _renderPlayButton = play => {
    return play;
  };

  return (
    <ScrollView style={{backgroundColor: colors.authBackGroud}}>
      <View style={[styles.mainContainer, {marginLeft: 30, marginRight: 30}]}>
        <View>
          <View>
            <Text style={styles.totalNumber}>
              Total Number of Referrals : 05
            </Text>
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
    </ScrollView>
  );
};
const Levels = () => {
  return (
    <ScrollView style={{backgroundColor: colors.authBackGroud}}>
      <View style={[styles.mainContainer, {marginLeft: 30, marginRight: 30}]}>
        <View style={styles.levelContainer}>
          <View style={styles.levelFirstContainer}>
            <Text style={styles.textLevel1}>Level 1</Text>
            <Text style={styles.textLevel2}>Completed</Text>
          </View>
          <View>
            <Text style={styles.riskLevelText}>Description</Text>
            <Text style={styles.aggressiveText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              interdum neque sed diam imperdiet mollis. Sed ornare imperdiet
              erat sit amet elementum.{' '}
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
              interdum neque sed diam imperdiet mollis. Sed ornare imperdiet
              erat sit amet elementum.{' '}
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
              interdum neque sed diam imperdiet mollis. Sed ornare imperdiet
              erat sit amet elementum.{' '}
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
    </ScrollView>
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
      return <Levels />;
    }
  };
  render() {
    return (
      <SafeAreaView style={{backgroundColor: colors.black}}>
        <GameHeader
          // Header="My Rewards"
          backgroundColor={1}
          onGoBack={() => this.props.navigation.goBack()}
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
        <ScrollView style={{backgroundColor: colors.authBackGroud}}>
          <View>{this.showTabs()}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  redContainer: {
    flex: 1,
    marginTop: 20,
  },
  redMainContaine: {
    flex: 1,
    backgroundColor: colors.black,
  },
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.white,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
    alignSelf: 'center',
  },
  inTheRedButtonSubText: {
    fontSize: wp('3.73%'),
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
  },
  inTheRedButtonText: {
    fontSize: wp('4.26%'),
    color: colors.white,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
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
    // marginTop: hp('0.39%'),
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
  paragraphText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
  paragraphContainer: {flex: 1, margin: 15},
  totalNumber: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 21,
    textAlign: 'left',
    // marginTop: 28,
    marginBottom: 15,
  },
});
export default Search;
