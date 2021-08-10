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
import {color} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import {TwoButtonModal} from './../../component/confirmModal';

const Games = () => {
  const [isModal, setState] = useState(false);

  const [list, setList] = useState([
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Information Technology',
      companyImage: localImages.amazon,
    },
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Information Technology',
      companyImage: localImages.amazon,
    },
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Information Technology',
      companyImage: localImages.amazon,
    },
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Information Technology',
      companyImage: localImages.amazon,
    },
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Information Technology',
      companyImage: localImages.amazon,
    },
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Information Technology',
      companyImage: localImages.amazon,
    },
  ]);
  const modalOpen = () => {
    setState(true);
  };
  const modalClose = () => {
    setState(false);
  };
  useEffect(() => {
    modalOpen();
  }, []);
  renderItem = ({item}) => {
    return (
      <View style={styles.belowContainer1}>
        <View style={styles.belowContainer}>
          <View style={{width: wp('11%')}}>
            <Image
              source={item.companyImage}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{width: wp('50%'), marginLeft: 7}}>
            <Text style={styles.companyName}>{item.companyName}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.value1}>
                {item.value1} <Text style={styles.value2}>-{item.value2}</Text>
              </Text>
              <Image
                source={localImages.download_red_icon}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  marginLeft: 7,
                }}
              />
            </View>
          </View>
          <View
            style={{width: wp('28%'), alignItems: 'flex-start', marginLeft: 5}}>
            <Text numberOfLines={2} style={styles.department}>
              {item.department}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.infoColorButton}>
            <Image
              source={localImages.up_white}
              style={{
                height: 13,
                width: 13,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.redColorButton}>
            <Image
              source={localImages.donw_white}
              style={{
                height: 13,
                width: 13,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.mainContainer, {marginTop: 0}]}>
      <View style={styles.redMainContaine}>
        <View style={styles.redContainer}>
          <Image
            source={localImages.red_green_white}
            style={{
              height: 60,
              width: 60,
              marginRight: 15,
              resizeMode: 'contain',
              marginLeft: 20,
            }}
          />
          <View style={{width: wp('75')}}>
            <Text numberOfLines={2} style={styles.inTheRedButtonText}>
              <Text
                style={[styles.inTheRedButtonText, {color: colors.greenColor}]}>
                Green
              </Text>{' '}
              or{' '}
              <Text style={[styles.inTheRedButtonText, {color: colors.red}]}>
                Red
              </Text>{' '}
            </Text>
            <Text numberOfLines={5} style={styles.inTheRedButtonSubText}>
              Pick whether the stock below are going to close in the green (up)
              or in red (down) for week. We list a stock from each sector of the
              stock market.
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.inTheRedButtonText,
            {
              textAlign: 'center',
              marginTop: 10,
              marginBottom: 15,
              fontSize: 16,
            },
          ]}>
          Pick 6 or more correcly to win!
        </Text>
      </View>
      <FlatList
        style={{marginTop: 20, marginBottom: 200}}
        data={list}
        renderItem={renderItem}
      />
      {/* <View style={{marginBottom: 100, alignItems: 'center'}}>
        <ButtonWithoutShadow
          width={wp('60%')}
          height={43}
          marginTop={14}
          borderRadius={20}
          labelColor={colors.white}
          label="Submit"
          backgroundColor={colors.black}
          onAction={() => modalOpen()}
        />
      </View> */}
      <TwoButtonModal isModalVisible={isModal} modalClose={() => modalClose()}>
        <View style={styles.popupMainContainer}>
        <Image
            source={localImages.mudani_yellow_logo}
            style={{
              height: 50,
              width: 50,
              resizeMode: 'contain',
              marginTop : 10,
              marginBottom : 20,
            }}
          />
          <Text style={styles.popUpText}>Congrats! You’re a winner</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: wp('60%'),
              marginTop: 10,
            }}>
            <Text style={styles.subPopupText}>
              We’ve deposited 5 Mudani Coins into your rewards wallet.
            </Text>
          </View>
        </View>
        <View style={styles.popupButtonContainer}>
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Okay"
            backgroundColor={colors.black}
            onAction={() => modalClose()}
          />
        </View>
      </TwoButtonModal>
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

  return (
    <View style={[styles.mainContainer, {marginLeft: 30, marginRight: 30}]}>
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
      <SafeAreaView style={{backgroundColor: colors.black}}>
        <GameHeader
          // Header="My Rewards"
          backgroundColor={1}
          onGoBack = {()=>this.props.navigation.goBack()}
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
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
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
  belowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 7,
  },
  belowContainer1: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: colors.white,
    marginTop: 10,
    marginBottom: 10,
    margin: 20,
    paddingBottom: 0,
    borderRadius: 7,
  },
  companyName: {
    fontSize: 20,
    color: colors.blue,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  value1: {
    fontSize: wp('3.72%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  value2: {
    fontSize: wp('3.72%'),
    color: colors.red,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  department: {
    fontSize: 14,
    color: colors.info_color,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  infoColorButton: {
    flex: 1,
    backgroundColor: colors.info_color,
    borderBottomStartRadius: 7,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redColorButton: {
    flex: 1,
    backgroundColor: colors.red,
    borderBottomEndRadius: 7,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // circleDollar: {
  //   height: 40,
  //   width: 40,
  //   marginBottom: 21,
  //   resizeMode: 'contain',
  // },
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
    fontWeight: 'bold',
  },
  subPopupText: {
    fontSize: wp('2.72%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 15,
    textAlign : "center"
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
});
export default Search;
