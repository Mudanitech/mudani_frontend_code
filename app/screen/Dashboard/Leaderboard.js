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
import {fallbacks} from 'i18n-js';

const Games = (props) => {
  const [isModal, setState] = useState(false);
  const [list, setList] = useState([
    {
      name: 'Abdul Rehman Saliman',
      price: '4.56%',
      isIcon: false,
    },
    {
      name: 'Abdul Rehman Saliman',
      price: '4.56%',
      isIcon: false,
    },
    {
      name: 'Abdul Rehman Saliman',
      price: '4.56%',
      isIcon: false,
    },
    {
      name: 'Abdul Rehman Saliman',
      price: '4.56%',
      isIcon: false,
    },
    {
      name: 'Abdul Rehman Saliman',
      price: '4.56%',
      isIcon: false,
    },
    {
      name: 'Abdul Rehman Saliman',
      price: '4.56%',
      isIcon: false,
    },
    {
      name: 'Abdul Rehman Saliman',
      price: '4.56%',
      isIcon: false,
    },
    {
      name: 'Abdul Rehman Saliman',
      price: '4.56%',
      isIcon: false,
    },
    {
      name: 'Abdul Rehman Saliman',
      price: '4.56%',
      isIcon: false,
    },
  ]);

  const modalOpen = () => {
    setState(true);
  };
  const modalClose = () => {
    setState(false);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.belowContainer1}>
        <View style={styles.belowContainer}>
          <View style={{width: wp('5%'), marginLeft: 10}}>
            <Text style={styles.companyName}>{index + 1}</Text>
          </View>
          <View
            style={{
              width: wp('63%'),
              marginLeft: 7,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.companyName}>{item.name}</Text>
            {item.isIcon ? (
              <Image
                source={localImages.golden_cup}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  marginLeft: 5,
                }}
              />
            ) : null}
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.subTitle}>Lorem Ipsum Lorem Ipsum</Text>
        </View> */}
          </View>
          <View
            style={{width: wp('28%'), alignItems: 'flex-start', marginLeft: 5}}>
            <Text
              style={[
                styles.companyName,
                {color: colors.info_color, fontWeight: 'bold'},
              ]}>
              {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.mainContainer, {marginTop: 0}]}>
      <View style={styles.redMainContaine}>
        <View style={styles.redContainer}>
          <View style={{width: wp('90%'), paddingBottom: 20, marginLeft: 25}}>
            <Text numberOfLines={2} style={styles.inTheRedButtonText}>
              Leaderboard
            </Text>
            <Text numberOfLines={5} style={styles.inTheRedButtonSubText}>
              Select a stock from each category. Select your stock lock (2x
              value). Submit your fantasy lineup for the week and track the
              leaderboard to see if you're a winner.
            </Text>
          </View>
        </View>
      </View>
     <View style = {{marginLeft : 20,marginTop : 20}}>
     <Text style = {{fontSize : 16, color : colors.black}}>Members : <Text style = {{fontSize : 16, color : colors.blue}}>1028</Text></Text>
     </View>
      <FlatList
        style={{marginTop: 0, marginBottom: 100}}
        data={list}
        renderItem={renderItem}
      />
      {/* Buttons */}
      <TwoButtonModal isModalVisible={isModal} modalClose={() => modalClose()}>
        <View style={styles.popupMainContainer}>
          <Text style={styles.popUpText}>Lock</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: wp('75%'),
              marginTop: 10,
            }}>
            <Text style={styles.subPopupText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              interdum neque sed diam imperdiet mollis. Sed ornare imperdiet
              erat sit amet elementum. Donec efficitur justo vitae molestie
              feugiat. Pellentesque vestibulum velit id lectus varius vehicula.
              Sed lorem mi, blandit ultrices ultrices in, sodales id ex.
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
            label="Close"
            backgroundColor={colors.black}
            onAction={() => modalClose()}
          />
        </View>
      </TwoButtonModal>
      {/* <View style={{marginBottom: 100, alignItems: 'center'}}>
        <ButtonWithoutShadow
          width={wp('60%')}
          height={43}
          marginTop={14}
          borderRadius={20}
          labelColor={colors.white}
          label="Submit"
          backgroundColor={colors.black}
          onAction={() => null}
        />
      </View> */}
    </View>
  );
};

const LastWeek = (props) => {
    const [isModal, setState] = useState(false);
    const [list, setList] = useState([
      {
        name: 'Abdul Rehman Saliman',
        price: '4.56%',
        isIcon: true,
      },
      {
        name: 'Abdul Rehman Saliman',
        price: '4.56%',
        isIcon: false,
      },
      {
        name: 'Abdul Rehman Saliman',
        price: '4.56%',
        isIcon: false,
      },
      {
        name: 'Abdul Rehman Saliman',
        price: '4.56%',
        isIcon: false,
      },
      {
        name: 'Abdul Rehman Saliman',
        price: '4.56%',
        isIcon: false,
      },
      {
        name: 'Abdul Rehman Saliman',
        price: '4.56%',
        isIcon: false,
      },
      {
        name: 'Abdul Rehman Saliman',
        price: '4.56%',
        isIcon: false,
      },
      {
        name: 'Abdul Rehman Saliman',
        price: '4.56%',
        isIcon: false,
      },
      {
        name: 'Abdul Rehman Saliman',
        price: '4.56%',
        isIcon: false,
      },
    ]);
  
    const modalOpen = () => {
      setState(true);
    };
    const modalClose = () => {
      setState(false);
    };
  
    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity style={[styles.belowContainer1,{borderColor : item.isIcon ?'#a0ee90':'white',borderWidth : 3}]}>
          <View style={styles.belowContainer}>
            <View style={{width: wp('5%'), marginLeft: 10}}>
              <Text style={styles.companyName}>{index + 1}</Text>
            </View>
            <View
              style={{
                width: wp('63%'),
                marginLeft: 7,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.companyName}>{item.name}</Text>
              {item.isIcon ? (
                <Image
                  source={localImages.golden_cup}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    marginLeft: 5,
                  }}
                />
              ) : null}
              {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.subTitle}>Lorem Ipsum Lorem Ipsum</Text>
          </View> */}
            </View>
            <View
              style={{width: wp('28%'), alignItems: 'flex-start', marginLeft: 5}}>
              <Text
                style={[
                  styles.companyName,
                  {color: colors.info_color, fontWeight: 'bold'},
                ]}>
                {item.price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={[styles.mainContainer, {marginTop: 0}]}>
        <View style={styles.redMainContaine}>
          <View style={styles.redContainer}>
            <View style={{width: wp('90%'), paddingBottom: 20, marginLeft: 25}}>
              <Text numberOfLines={2} style={styles.inTheRedButtonText}>
                Leaderboard
              </Text>
              <Text numberOfLines={5} style={styles.inTheRedButtonSubText}>
                Select a stock from each category. Select your stock lock (2x
                value). Submit your fantasy lineup for the week and track the
                leaderboard to see if you're a winner.
              </Text>
            </View>
          </View>
        </View>
        <View style = {{marginLeft : 20,marginTop : 20}}>
     <Text style = {{fontSize : 16, color : colors.black}}>Members : <Text style = {{fontSize : 16, color : colors.blue}}>1028</Text></Text>
     </View>
        <FlatList
          style={{marginTop: 0, marginBottom: 100}}
          data={list}
          renderItem={renderItem}
        />
        {/* Buttons */}
        <TwoButtonModal isModalVisible={isModal} modalClose={() => modalClose()}>
          <View style={styles.popupMainContainer}>
            <Text style={styles.popUpText}>Lock</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: wp('75%'),
                marginTop: 10,
              }}>
              <Text style={styles.subPopupText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                interdum neque sed diam imperdiet mollis. Sed ornare imperdiet
                erat sit amet elementum. Donec efficitur justo vitae molestie
                feugiat. Pellentesque vestibulum velit id lectus varius vehicula.
                Sed lorem mi, blandit ultrices ultrices in, sodales id ex.
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
              label="Close"
              backgroundColor={colors.black}
              onAction={() => modalClose()}
            />
          </View>
        </TwoButtonModal>
        {/* <View style={{marginBottom: 100, alignItems: 'center'}}>
          <ButtonWithoutShadow
            width={wp('60%')}
            height={43}
            marginTop={14}
            borderRadius={20}
            labelColor={colors.white}
            label="Submit"
            backgroundColor={colors.black}
            onAction={() => null}
          />
        </View> */}
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
      return <LastWeek />;
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
              Current
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
              Last Week
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
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
  },
  inTheRedButtonText: {
    fontSize: wp('5'),
    color: colors.white,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 7,
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
    // marginTop: 30,
    // marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 7,
  },
  companyName: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  subTitle: {
    fontSize: wp('3.72%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
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
    fontWeight: 'bold',
    marginTop: 10,
  },
  subPopupText: {
    fontSize: wp('2.72%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 15,
    marginLeft: 10,
    textAlign: 'center',
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
