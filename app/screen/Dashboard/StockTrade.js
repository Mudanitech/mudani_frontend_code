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
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HeaderWithBack, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {LineChart} from 'react-native-chart-kit';
import {TwoButtonModal} from './../../component/confirmModal';
const Statement = props => {
  const [isModal2, setState2] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    console.log('Stock images', JSON.stringify(props.route.params));
  }, []);

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
          <Text style={[styles.popUpText, {marginBottom: 10}]}> {heading}</Text>
          <Text
            style={[styles.popUpText, {fontWeight: '100', marginBottom: 10}]}>
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
  return (
    <View style={styles.mainContainer}>
      <View style={styles.aboveContainer}>
        <View>
          <Text style={styles.stockText}>Amazon.com, Inc.</Text>
          <Text style={styles.stockText1}>Nasdaq: AMZN</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              source={localImages.amazon}
              // style={styles.icon_up}
              style={{height: 50, width: 100}}
              // resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
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
          <Text style={styles.amountText}>$5,656.57</Text>
        </View>
        <View>
          <Text
            style={[
              styles.smallText,
              {color: colors.info_color, marginTop: 10},
            ]}>
            +0.73 (+0.52%)
          </Text>
        </View>
      </View>
      {/* <View style={styles.smallContainer}>
        <View>
          <Text style={[styles.smallText, {marginLeft: 25}]}>
            Closed: 25 Nov, 8:17 am GMT-5 · Disclaimer Pre-market 3,125.06{' '}
            <Text style={[styles.smallText, {color: colors.info_color}]}>
              +7.00 (0.22%)
            </Text>
          </Text>
        </View>
      </View> */}
      <View>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width - wp('15%')} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          withHorizontalLabels={false}
          withVerticalLabels={false}
          yAxisInterval={1} // optional, defaults to 1
          withShadow={false}
          withOuterLines={false}
          withInnerLines={false}
          chartConfig={{
            backgroundColor: colors.authBackGroud,
            backgroundGradientFrom: colors.authBackGroud,
            backgroundGradientTo: colors.authBackGroud,
            decimalPlaces: 2, // optional, defaults to 2dp
            // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            color: (opacity = 1) => `rgb(8, 43, 60, 1)`,
            labelColor: (opacity = 1) => `rgb(0, 93, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '',
              strokeWidth: '2',
              stroke: 'red',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 5,
            marginTop: hp('5%'),
          }}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.status}>Stats</Text>
        <TouchableOpacity onPress={() => modalOpen2('Stats', 'Stats')}>
          <Image
            source={localImages.info_blue_circle}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.belowContainer}>
        <View style={styles.firstContainer}>
          <Text style={styles.listText}>Open</Text>
          <Text style={styles.listText}>High</Text>
          <Text style={styles.listText}>Low</Text>
          <Text style={styles.listText}>52 Wk High</Text>
          <Text style={styles.listText}>52 Wk Low</Text>
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.listText}>123.65</Text>
          <Text style={styles.listText}>124.65</Text>
          <Text style={styles.listText}>125.65</Text>
          <Text style={styles.listText}>155.65</Text>
          <Text style={styles.listText}>15.65</Text>
        </View>
        <View style={styles.thirdContainer}>
          <Text style={styles.listText}>Volume</Text>
          <Text style={styles.listText}>Avg Vol</Text>
          <Text style={styles.listText}>Mkt Cap</Text>
          <Text style={styles.listText}>P/E Ration</Text>
          <Text style={styles.listText}>Div/Yeild</Text>
        </View>
        <View style={styles.fourthContainer}>
          <Text style={styles.listText}>75.65M</Text>
          <Text style={styles.listText}>119M.65</Text>
          <Text style={styles.listText}>2.05T</Text>
          <Text style={styles.listText}>31.65</Text>
          <Text style={styles.listText}>0.68</Text>
        </View>
      </View>
      {/* <View style={styles.statsContainer}>
        <Text style={styles.recentReview}>Recent News</Text>
      </View> */}
      {viewModal()}
    </View>
  );
};

class StockTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentPosition: 0,
      isModal: false,
      isModal2: false,
    };
  }

  modalOpen = () => {
    this.setState({isModal: true});
  };
  modalClose = () => {
    this.setState({isModal: false});
  };

  modalOpen2 = () => {
    this.setState({isModal2: true});
  };
  modalClose2 = () => {
    this.setState({isModal2: false});
  };

  setPositions = currentPosition => {
    this.setState({currentPosition: currentPosition});
  };
  showTabs = () => {
    return <Statement {...this.props} />;
  };
  buyInDollars = () => {
    this.modalClose();
    this.props.navigation.navigate('ReviewScreen');
  };

  buyInShares = () => {
    this.modalClose();
    this.props.navigation.navigate('BuyDetails');
  };

  SellInDollars = () => {
    this.modalClose2();
    this.props.navigation.navigate('SaleReviewScreen');
  };

  SellInShares = () => {
    this.modalClose2();
    this.props.navigation.navigate('SaleShareDetails');
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
          <View
            style={{
              marginBottom: 50,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <ButtonWithoutShadow
              width={width - wp('60%')}
              height={43}
              // marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label="Buy"
              backgroundColor={colors.info_color}
              onAction={() => this.modalOpen()}
              // onAction = {()=>this.props.navigation.navigate("ReviewScreen")}
            />
            <ButtonWithoutShadow
              width={width - wp('60%')}
              height={43}
              // marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label="Sell"
              backgroundColor={colors.black}
              onAction={() => this.modalOpen2()}
            />
          </View>
        </ScrollView>
        <TwoButtonModal
          isModalVisible={this.state.isModal}
          modalClose={() => this.modalClose()}>
          <View style={styles.popupMainContainer}>
            <Image
              source={localImages.circle_dollar}
              style={styles.circleDollar}
            />
            <Text style={styles.popUpText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              interdum neque sed diam imperdiet
            </Text>
          </View>
          <View style={styles.popupButtonContainer}>
            <ButtonWithoutShadow
              width={width - wp('65%')}
              height={43}
              // marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label="Buy in Dollars"
              backgroundColor={colors.blue}
              onAction={() => this.buyInDollars()}
            />
            <ButtonWithoutShadow
              width={width - wp('65%')}
              height={43}
              // marginTop={22}
              borderRadius={20}
              labelColor={colors.blue}
              label="Buy in Shares"
              backgroundColor={colors.light_blue}
              onAction={() => this.buyInShares()}
            />
          </View>
        </TwoButtonModal>
        <TwoButtonModal
          isModalVisible={this.state.isModal2}
          modalClose={() => this.modalClose2()}>
          <View style={styles.popupMainContainer}>
            <Image
              source={localImages.circle_dollar}
              style={styles.circleDollar}
            />
            <Text style={styles.popUpText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              interdum neque sed diam imperdiet
            </Text>
          </View>
          <View style={styles.popupButtonContainer}>
            <ButtonWithoutShadow
              width={width - wp('65%')}
              height={43}
              // marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label="Sell in Dollars"
              backgroundColor={colors.black}
              onAction={() => this.SellInDollars()}
            />
            <ButtonWithoutShadow
              width={width - wp('65%')}
              height={43}
              // marginTop={22}
              borderRadius={20}
              labelColor={colors.black}
              label="Sell in Shares"
              backgroundColor={colors.grayDot}
              onAction={() => this.SellInShares()}
            />
          </View>
        </TwoButtonModal>
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
  cashText: {
    fontSize: wp('4.5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
    // paddingLeft: wp('3'),
  },
  amountText: {
    fontSize: wp('6.4%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 36,
    //marginLeft: wp('0'),
    marginTop: hp('0.7'),
    // marginBottom: hp('2.24'),
  },
  stockText: {
    fontSize: wp('4.8%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  stockText1: {
    fontSize: wp('2.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  icon_up: {
    height: 30,
    width: 15,
    marginRight: 8,
  },

  smallContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.4%'),
  },
  smallText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    // lineHeight: 30,
    marginLeft: wp('2.08%'),
  },

  aboveContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  belowContainer: {
    flex: 1,
    flexDirection: 'row',
    //   alignItems : "center",
    justifyContent: 'flex-start',
    // marginTop: hp('5.54%'),
    marginBottom: hp('2.49%'),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 10,
    padding: 10,
  },
  firstContainer: {
    width: wp('23%'),
    paddingLeft: 10,
  },
  thirdContainer: {
    width: wp('20%'),
    alignItems: 'flex-start',
  },
  fourthContainer: {
    width: wp('20%'),
    alignItems: 'flex-start',
  },
  secondContainer: {
    width: wp('20%'),
    alignItems: 'flex-start',
  },
  listText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginBottom: 10,
  },
  circleDollar: {
    height: 40,
    width: 40,
    marginBottom: 21,
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 27,
  },
  recentReview: {
    fontSize: wp('5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    paddingLeft: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  status: {
    fontSize: wp('5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    paddingLeft: 3,
  },
});
export default StockTrade;
