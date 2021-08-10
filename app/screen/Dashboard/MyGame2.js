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
  Alert,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {GameHeader, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {color} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import {TwoButtonModal} from './../../component/confirmModal';

const Games = (props) => {
  const [isModal, setState] = useState(false);
  const [isModal2, setState2] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');

  const [list, setList] = useState([
    {
      companyName: 'Amazon',
      value1: '30999.00',
      value2: '73 (-0.52%)',
      department: 'Energy',
      companyImage: localImages.amazon,
      description : 'The energy sector includes companies engaged in exploration and production of oil and other hydrocarbons, refining, the transportation of oil and gas, and production of oil and gas equipment.'
    },
    {
      companyName: 'Amazon',
      value1: '30999.00',
      value2: '73 (-0.52%)',
      department: 'Materials',
      companyImage: localImages.amazon,
      description : 'The materials sector includes companies that produce chemicals, glass, paper, forestry products, metals, packaging, construction materials and steel.'
    },
    {
      companyName: 'Amazon',
      value1: '30999.00',
      value2: '73 (-0.52%)',
      department: 'Industrials',
      companyImage: localImages.amazon,
      description : 'The industrials sector includes companies that manufacture aerospace and defense products, electrical equipment and construction equipment.'
    },
    {
      companyName: 'Amazon',
      value1: '30999.00',
      value2: '73 (-0.52%)',
      department: 'Consumer Discretionary/Staples',
      companyImage: localImages.amazon,
      description : 'The consumer discretionary sector includes companies that produce cars, durable goods, clothing and leisure equipment. It also includes restaurants, hotels and consumer retailing, among others. The consumer staples sector includes companies that produce food, drinks and tobacco, and non-durable household goods as well as those retailers that sell food and drugs, including retailing supercenters.'
    },
    {
      companyName: 'Amazon',
      value1: '30999.00',
      value2: '73 (-0.52%)',
      department: 'Healthcare',
      companyImage: localImages.amazon,
      description : 'The health care sector includes companies that provide health care services, as well as health care equipment and technology. It includes companies at all stages of pharmaceutical and biotech research, development and production.'
    },
    {
      companyName: 'Amazon',
      value1: '30999.00',
      value2: '73 (-0.52%)',
      department: 'Financials',
      companyImage: localImages.amazon,
      description : 'The financials sector consists of companies involved in banking, including mortgage and consumer finance, as well as investment banks, brokerage firms and insurance companies.'

    },
    {
      companyName: 'Amazon',
      value1: '30999.00',
      value2: '73 (-0.52%)',
      department: 'Information Technology',
      companyImage: localImages.amazon,
      description : 'The information technology sector includes companies that produce software and other IT products and services. It also contains companies that manufacture hardware such as communications equipment, mobile phones, computers and semiconductor equipment.'

    },
    {
      companyName: 'Amazon',
      value1: '30999.00',
      value2: '73 (-0.52%)',
      department: 'Communication Services',
      companyImage: localImages.amazon,
      description : 'The communication services sector includes telecommunication and media companies, entertainment companies and those producing content and interactive games.'
    },
    {
      companyName: 'Amazon',
      value1: '30999.00',
      value2: '73 (-0.52%)',
      department: 'Utilities',
      companyImage: localImages.amazon,
      description : 'The utilities sector includes companies providing electricity, gas and water (from conventional and environmentally friendly sources) as well as energy traders and distributors of energy. '

    },
  ]);
  const modalOpen = () => {
    setState(true);
  };
  const modalClose = () => {
    setState(false);
  };

  const modalOpen2 = () => {
    setState2(true);
  };
  const modalClose2 = () => {
    setState2(false);
  };
  const onSelectedIndex = (index,description) => {
    modalOpen2();
    setHeading(index);
    setDescription(description)
  };

  const viewModal = () => {
    const IsOpen = isModal2;
    return (
      <TwoButtonModal isModalVisible={IsOpen} modalClose={() => modalClose2()}>
        <View style={styles.popupMainContainer}>
          {/* <Image source={props.image} style={styles.circleDollar} /> */}
          <Text style={styles.popUpText}> {heading}</Text>
          <Text style={[styles.popUpText,{fontWeight : "100",marginTop : 10}]}> {description}</Text>

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
            onAction={() => modalClose2()}
          />
        </View>
      </TwoButtonModal>
    );
  };
  renderItem = ({item, index}) => {
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
          <View style={{width: wp('45%'), marginLeft: 7}}>
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
            style={{
              width: wp('30%'),
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginLeft: 10,
            }}>
            <TouchableOpacity onPress={() => onSelectedIndex(item.department,item.description)}>
              <Text numberOfLines={3} style={styles.department}>
                {item.department}
              </Text>
            </TouchableOpacity>
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
        {viewModal()}
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
                style={[styles.inTheRedButtonText, {color: colors.info_color}]}>
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
      <FlatList style={{marginTop: 20}} data={list} renderItem={renderItem} />
      <View style={{marginBottom: 100, alignItems: 'center'}}>
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
      </View>
      <TwoButtonModal isModalVisible={isModal} modalClose={() => modalClose()}>
        <View style={styles.popupMainContainer}>
          <Text style={styles.popUpText}>Are you sure ?</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: wp('60%'),
              marginTop: 10,
            }}>
            <Image
              source={localImages.unchecked_icon}
              style={{width: 10, height: 10, resizeMode: 'contain'}}
            />
            <Text style={styles.subPopupText}>
              Once you submit, your lineup will be locked for the week. Please
              confirm.
            </Text>
          </View>
        </View>
        <View style={styles.popupButtonContainer}>
        <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.black}
            label="No"
            backgroundColor={colors.grayColor}
            onAction={() => modalClose()}
          />
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Yes"
            backgroundColor={colors.black}
            onAction={() => {
              modalClose(), props.navigation.navigate('MyRewards', {id: 100});
            }}
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
    // marginTop: 40,
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
    // alignSelf: 'center',
    textAlign: 'center',
  },
  inTheRedButtonSubText: {
    fontSize: wp('3.73%'),
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
    marginBottom: 5,
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
    fontSize: 12,
    color: colors.info_color,
    fontFamily: fonts.bold,
    // lineHeight: 24,
    // borderBottomColor : colors.info_color,
    // borderBottomWidth : 1
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
    marginLeft: 10,
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
