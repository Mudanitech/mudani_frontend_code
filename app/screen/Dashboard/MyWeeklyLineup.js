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

const Games = (props) => {
  const [list, setList] = useState([
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Select Power Forward',
      companyImage: localImages.amazon,
    },
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Select Small Forward',
      companyImage: localImages.amazon,
    },
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Select Power Forward',
      companyImage: localImages.amazon,
    },
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Select Small Forward',
      companyImage: localImages.amazon,
    },
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Select Power Forward',
      companyImage: localImages.amazon,
    },
    {
      companyName: 'Amazon',
      value1: '30999.00*',
      value2: '73 (-0.52%)',
      department: 'Select Small Forward',
      companyImage: localImages.amazon,
    },
  ]);

  renderItem = ({item,index}) => {
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
          <View style={{width: wp('20%'), marginLeft: 7}}>
            <Text style={styles.companyName}>{item.companyName}</Text>
          </View>
          <View style={{width: wp('19%'), marginLeft: 7}}>
            <Text
              style={[
                styles.companyName,
                {fontSize: 7, color: colors.grayText, textAlign: 'center'},
              ]}>
              {item.department}
            </Text>
          </View>
          <View
            style={{width: wp('30%'), alignItems: 'flex-end', marginLeft: 5}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.value1}>{item.value1}</Text>
              <Image
                source={index%2 == 0?localImages.download_red_icon:localImages.upload_green_icon}
                style={{
                  height: 10,
                  width: 10,
                  resizeMode: 'contain',
                  marginLeft: 7,
                }}
              />
            </View>
            <Text style={ index%2 == 0? styles.value2:[styles.value2,{color : colors.info_color}]}>-{item.value2}</Text>
          </View>
        </View>
      </View>
    );
  };
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
            My Weekly Lineup
          </Text>
          <TouchableOpacity onPress = {()=> props.navigation.navigate("Leaderboard")}>
          <Text
            style={[
              styles.inTheRedButtonText,
              {
                textAlign: 'center',
                marginBottom: 15,
                fontSize: 16,
                marginRight: 25,
                textDecorationLine: 'underline',
                color: colors.info_color,
                fontStyle: 'italic',
              },
            ]}>
            Leaderboard
          </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{marginTop: 20, marginBottom: 300}}
        data={list}
        renderItem={renderItem}
      />
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
      return <Games {...this.props} />;
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
        <ScrollView style={{backgroundColor: colors.authBackGroud}}>
          <View>{this.showTabs()}</View>
        </ScrollView>
        {this.state.currentPosition == 0 ? (
          <View
            style={{
              backgroundColor: colors.black,
              height: 100,
              width: width,
              position: 'absolute',
              bottom: 55,
              justifyContent: 'center',
              paddingLeft: 25,
              paddingRight: 25,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.white,
                    fontFamily: fonts.bold,
                  }}>
                  Total Gain/Loss %
                </Text>
              </View>
              <View style = {{alignItems : "flex-end"}}>
                <Text
                  style={{
                    fontSize: 22,
                    color: colors.white,
                    fontFamily: fonts.bold,
                  }}>
                  $25656.57
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center',marginTop : 5}}>
                  <Image
                    source={localImages.upload_green_icon}
                    style={{width: 15, height: 15}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.white,
                      fontFamily: fonts.bold,
                      marginLeft: 10,
                    }}>
                    $5656 <Text style = {{color : colors.info_color}}> (25.0%)</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  redContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    // marginTop: 20,
    justifyContent: 'space-between',
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
