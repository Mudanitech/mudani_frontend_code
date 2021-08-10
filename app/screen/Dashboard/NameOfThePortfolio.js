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
  FlatList,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HeaderWithBack, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {LineChart} from 'react-native-chart-kit';
import {TwoButtonModal} from './../../component/confirmModal';
import Pie from 'react-native-pie';

const Statement = props => {
  const [isModal2, setState2] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [portfolio, setPortfolio] = useState(null);
  const [orbisComponent, setOrbisComponent] = useState([]);
  const getRandomColor = () => {
    return (
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')'
    );
  };
  useEffect(() => {
    if (portfolio == null) {
      setPortfolio(props.route.params.portfolio);

      console.log('Data', JSON.stringify(props.route.params.portfolio));

      if (props.route.params.portfolio.orbisModel.length != 0) {
        setOrbisComponent(
          props.route.params.portfolio.orbisModel[0].components.map(item =>
            item ? {...item, color: getRandomColor()} : [],
          ),
        );
      }
    }
  });
  const modalOpen2 = (title, companyName) => {
    setState2(true);
    setHeading(title);
    setDescription(companyName);
  };
  const modalClose2 = () => {
    setState2(false);
  };

  const viewModal = () => {
    const IsOpen = isModal2;
    return (
      <TwoButtonModal isModalVisible={IsOpen} modalClose={() => modalClose2()}>
        <View style={styles.popupMainContainer}>
          {/* <Image source={props.image} style={styles.circleDollar} /> */}
          <Text style={styles.popUpText}> {heading}</Text>
          <Text style={[styles.popUpText, {fontWeight: '100', marginTop: 10}]}>
            {' '}
            {
              'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum'
            }
          </Text>
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

  const renderHoldings = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.secondContainer}
          onPress={
            () => null
            //props.navigation.navigate('TrackerScreen', {symbol: item})
          }>
          <View style={styles.imageWidth}>
            <Image
              source={{
                uri: item.tickerImage
                  ? item.tickerImage
                  : localImages.company_icon,
              }}
              style={styles.itemImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainerWidth}>
            <Text
              numberOfLines={1}
              style={(styles.itemText1, [{textTransform: 'capitalize'}])}>
              {item.companyName}
            </Text>
            <Text numberOfLines={1} style={styles.itemText2}>
              {item.symbol}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[styles.itemText1, {color: colors.info_color}]}>
              {item.targetValue}%
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>Account Value</Text>
        <Text style={styles.amountText}>$0</Text>
      </View>
      <View style={styles.smallContainer}>
        <View>
          <Image
            source={localImages.icon_up}
            style={styles.icon_up}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.smallText}>$0</Text>
        </View>
        <View>
          <Text style={[styles.smallText, {color: colors.info_color}]}>
            (0 %)
          </Text>
        </View>
      </View>
      {portfolio ? (
        portfolio.orbisModel.length > 0 ? (
          <View style={styles.statementContainer}>
            <View style={styles.PContainer}>
              <Text style={styles.investingPortfolioText}>
                {portfolio.orbisModel[0].title}
              </Text>
              <Text style={styles.riskLevelText}>Risk Level</Text>
              <Text style={styles.aggressiveText}>
                {portfolio.getPortfolio.riskLevel}{' '}
              </Text>
              <Text style={styles.riskLevelText}>Description</Text>
              <Text style={styles.aggressiveText}>
                {portfolio.orbisModel[0].description}
              </Text>
            </View>
          </View>
        ) : null
      ) : null}
      <View>
        <Text style={styles.heading}>Holdings</Text>
      </View>
      <View style={[portfolio ? styles.statementContainer : null]}>
        <FlatList
          data={

            [
              {
                "holdingType": "Mutual Funds",
                "targetValue": "45",
                "symbol": "AAPL",
                "tickerImage": "https://viewlogo.s3.amazonaws.com/63588/conversions/aapl-thumbnail.png",
                "companyName": "APPLE INC",
                "latestPrice": 200,
                "upperValue": 0,
                "lowerupperValue": 0
              },
              {
                "holdingType": "Crypto",
                "targetValue": "21",
                "symbol": "AMZN",
                "tickerImage": "https://viewlogo.s3.amazonaws.com/60878/conversions/amzn-thumbnail.png",
                "companyName": "AMAZON COM INC",
                "latestPrice": 200,
                "upperValue": 0,
                "lowerupperValue": 0
              },
              {
                "holdingType": "ETF",
                "targetValue": "24",
                "symbol": "SBUX",
                "tickerImage": "https://viewlogo.s3.amazonaws.com/68529/CiNnNX94.jpg",
                "companyName": "STARBUCKS CORP",
                "latestPrice": 200,
                "upperValue": 0,
                "lowerupperValue": 0
              }
            ]
            // portfolio
            //   ? portfolio.getModels
            //     ? portfolio.getModels.models
            //     : []
            //   : []
          }
          renderItem={renderHoldings}
          ItemSeparatorComponent={() => <View style={styles.rowBorder} />}
          ListEmptyComponent={() => (
            <View style={{alignItems: 'center', marginTop: width / 5}}>
              <Text>No Holdings found!</Text>
            </View>
          )}
        />
      </View>
      {viewModal()}
    </View>
  );
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentPosition: 0,
      portfolio: null,
    };
  }

  setPositions = currentPosition => {
    this.setState({currentPosition: currentPosition});
  };
  showTabs = () => {
    return <Statement {...this.props} portfolio={this.state.portfolio} />;
  };

  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header=" "
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <View>{this.showTabs()}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  mainContainer: {
    flex: 1,
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
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
  statementContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp('1.7%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: hp('3.39%'),
    marginTop: hp('3.5%'),
    paddingBottom: hp('.5%'),
  },

  statementSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: hp('3.59%'),
    paddingTop: hp('2.99%'),
    padding: wp('4%'),
  },
  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },
  cashText: {
    fontSize: wp('4.5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
    // paddingLeft: wp('3'),
  },
  cashText: {
    fontSize: wp('4.5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
    // paddingLeft: wp('3'),
  },
  accountNumberText: {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('38.6'),
    marginRight: wp('3.3'),
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
    borderRadius: wp('2%'),
    borderColor: colors.grayColor,
    borderWidth: 0.4,
    backgroundColor: colors.white,
  },
  buttons1: {
    //   width: wp('45%'),
    height: hp('5.84%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttons2: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('5.84%'),
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
    height: hp('5.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: wp('2%'),
    borderBottomRightRadius: wp('2%'),
  },
  buttonText1: {
    fontSize: wp('3.73%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
  buttonText2: {
    fontSize: wp('3.73%'),
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
  heading: {
    fontSize: wp('5.33%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 27,
    // marginLeft: wp('0.7'),
    marginTop: hp('2.2'),
    // marginBottom: hp('2.24'),
  },
  amountText: {
    fontSize: wp('6,4%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 31,
    //marginLeft: wp('0'),
    marginTop: hp('0.7'),
    // marginBottom: hp('2.24'),
  },
  borderSeperator: {
    height: 30,
    borderWidth: 0.3,
    borderColor: colors.grayColor,
  },
  rowBorder: {
    width: wp('78%'),
    borderWidth: Platform.OS == 'android' ? 0.25 : 0.5,
    borderColor: colors.grayColor,
  },
  arrowRight: {
    height: 10,
    width: 10,
    marginLeft: wp('3.46'),
  },
  arrowRight1: {
    height: 15,
    width: 15,
    marginLeft: wp('3.46'),
  },
  basket_image: {
    height: hp('14.84'),
    width: hp('14.84'),
    alignSelf: 'center',
    marginTop: hp('1.64%'),
    marginBottom: hp('3.89%'),
  },
  icon_up: {
    height: 15,
    width: 15,
  },
  itemImage: {
    height: 30,
    width: 30,
    marginLeft: wp('3.46'),
    marginTop: hp('0.4%'),
  },
  showMoreText: {
    fontSize: wp('4%'),
    color: colors.info_color,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('4.53'),
    marginTop: hp('2.77%'),
    marginBottom: hp('3.44%'),
  },
  itemText1: {
    fontSize: wp('4.8%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  itemText2: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  textContainer2: {
    flex: 1,
    // width: wp('60%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  smallContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.4%'),
  },
  smallText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    // lineHeight: 30,
    marginLeft: wp('2.08%'),
  },
  totolText: {
    fontSize: wp('4.53%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
    //  textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },
  portFolioText: {
    fontSize: wp('4.53%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
  },
  stocksContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // paddingTop: hp('2.99%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    paddingTop: wp('4%'),
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingTop: hp('2.3%'),
    paddingBottom: hp('2.9%'),
  },
  textContainerWidth: {width: wp('55.9%')},
  imageWidth: {width: wp('15%')},
  basketContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: wp('1.79%'),
  },
  myPortfolioContainer: {
    flex: 1,
    marginTop: hp('1.79%'),
  },
  portFolioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.2'),
  },
  addBasketButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('5%'),
    marginTop: hp('5.09%'),
    justifyContent: 'center',
  },
  PContainer: {
    flex: 1,
    padding: wp('4%'),
  },
  investingPortfolioText: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
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
  stockItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingBottom: hp('0.7%'),
  },
  widthforItem: {
    width: wp('44%'),
    paddingLeft: wp('2%'),
  },
  widthforItem1: {
    width: wp('30%'),
    alignItems: 'flex-end',
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
export default Dashboard;
