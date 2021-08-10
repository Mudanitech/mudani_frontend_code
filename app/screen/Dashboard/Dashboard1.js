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
  Platform,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HomeHeader, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {LineChart} from 'react-native-chart-kit';
const Statement = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>Total Account Value</Text>
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
            (25.0 %)
          </Text>
        </View>
      </View>
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
          yAxisInterval={1} // optional, defaults to 1
          withInnerLines={false}
          chartConfig={{
            backgroundColor: colors.authBackGroud,
            backgroundGradientFrom: colors.authBackGroud,
            backgroundGradientTo: colors.authBackGroud,
            decimalPlaces: 2, // optional, defaults to 2dp
            // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            color : (opacity = 1) => `rgb(0, 93, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgb(0, 93, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
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
      <View style={styles.statementContainer}>
        <View style={styles.stocksContainer}>
          <View style={styles.textContainer2}>
            <View>
              <Text style={styles.cashText}>Stocks</Text>
            </View>
            <Image
              source={localImages.info_blue_circle}
              style={styles.arrowRight1}
              resizeMode="contain"
            />
          </View>
          <View>
            <Image
              source={localImages.down}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.secondContainer}
          onPress={() => props.navigation.navigate('TrackerScreen')}>
          <View style={styles.imageWidth}>
            <Image
              source={localImages.image_amazon}
              style={styles.itemImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainerWidth}>
            <Text numberOfLines={1} style={styles.itemText1}>
              Amazon
            </Text>
            <Text numberOfLines={1} style={styles.itemText2}>
              AMZ
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[styles.itemText1, {color: colors.info_color}]}>
              $ 535.76
            </Text>
            <Text style={[styles.itemText2, {fontSize: wp('4.2%')}]}>3</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <View style={styles.stocksContainer}>
          <View style={styles.textContainer2}>
            <View>
              <Text style={styles.cashText}>ETF</Text>
            </View>
            <Image
              source={localImages.info_blue_circle}
              style={styles.arrowRight1}
              resizeMode="contain"
            />
          </View>
          <View>
            <Image
              source={localImages.down}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.secondContainer}
          onPress={() => props.navigation.navigate('TrackerScreen')}>
          <View style={styles.imageWidth}>
            <Image
              source={localImages.image_amazon}
              style={styles.itemImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainerWidth}>
            <Text numberOfLines={1} style={styles.itemText1}>
              Amazon
            </Text>
            <Text numberOfLines={1} style={styles.itemText2}>
              AMZ
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[styles.itemText1, {color: colors.info_color}]}>
              $ 535.76
            </Text>
            <Text style={[styles.itemText2, {fontSize: wp('4.2%')}]}>3</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <View style={styles.stocksContainer}>
          <View style={styles.textContainer2}>
            <View>
              <Text style={styles.cashText}>Cryptocurrency</Text>
            </View>
            <Image
              source={localImages.info_blue_circle}
              style={styles.arrowRight1}
              resizeMode="contain"
            />
          </View>
          <View>
            <Image
              source={localImages.down}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.secondContainer}
          onPress={() => props.navigation.navigate('TrackerScreen')}>
          <View style={styles.imageWidth}>
            <Image
              source={localImages.image_amazon}
              style={styles.itemImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainerWidth}>
            <Text numberOfLines={1} style={styles.itemText1}>
              Amazon
            </Text>
            <Text numberOfLines={1} style={styles.itemText2}>
              AMZ
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[styles.itemText1, {color: colors.info_color}]}>
              $ 535.76
            </Text>
            <Text style={[styles.itemText2, {fontSize: wp('4.2%')}]}>3</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.rowBorder} /> */}
      </View>

      <View>
        <View style={styles.statementContainer1}>
          <TouchableOpacity
            style={styles.statementSubContainer}
            onPress={() => props.navigation.navigate('TrackerScreen')}>
            <View style={styles.textContainer2}>
              <View>
                <Text style={styles.cashText}>Cash</Text>
              </View>
              <Image
                source={localImages.info_blue_circle}
                style={styles.arrowRight1}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.totolText}>$25,656.57</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statementSubContainer}>
            <View style={styles.textContainer2}>
              <View>
                <Text style={styles.cashText}>Debts</Text>
              </View>
              <Image
                source={localImages.info_blue_circle}
                style={styles.arrowRight1}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.totolText}>$25,656.57</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statementSubContainer}>
            <View style={styles.textContainer2}>
              <View>
                <Text style={styles.cashText}>Net Worth</Text>
              </View>
              <Image
                source={localImages.info_blue_circle}
                style={styles.arrowRight1}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.totolText}>$25,656.57</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const TaxPackages = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>Total Account Value</Text>
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
            (25.0 %)
          </Text>
        </View>
      </View>
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
          yAxisInterval={1} // optional, defaults to 1
          withInnerLines={false}
          chartConfig={{
            backgroundColor: colors.authBackGroud,
            backgroundGradientFrom: colors.authBackGroud,
            backgroundGradientTo: colors.authBackGroud,
            decimalPlaces: 2, // optional, defaults to 2dp
            // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            color : (opacity = 1) => `rgb(0, 93, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgb(0, 93, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
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
      <View style={styles.portFolioContainer}>
        <Text style={[styles.heading, {marginTop: 0}]}>My Portfolio:</Text>
        <Image
          source={localImages.info_blue_circle}
          style={styles.arrowRight1}
          resizeMode="contain"
        />
      </View>
      <View style={styles.myPortfolioContainer}>
        <View style={styles.basketContainer}>
          <Text style={styles.portFolioText}>Portfolio Name :  </Text>
          <Text style={[styles.portFolioText, {color: colors.info_color}]}>
            Portfolio
          </Text>
        </View>
        <View style={styles.basketContainer}>
          <Text style={styles.portFolioText}>Risk Level :  </Text>
          <Text style={[styles.portFolioText, {color: colors.info_color}]}>
            Conservative
          </Text>
        </View>
      </View>
      <Image
        source={localImages.basket}
        style={styles.basket_image}
        resizeMode="contain"
      />
      <View style={{alignSelf: 'center'}}>
        <ButtonWithoutShadow
          width={width - 147}
          height={43}
          // marginTop={22}
          borderRadius={20}
          labelColor={colors.white}
          label="View Portfolio"
          backgroundColor={colors.blue}
          onAction={() => props.navigation.navigate('NameOfThePortfolio')}
        />
      </View>
      <View style={styles.portFolioContainer}>
        <Text style={[styles.heading, {marginTop: 0}]}>My Basket:</Text>
        <Image
          source={localImages.info_blue_circle}
          style={styles.arrowRight1}
          resizeMode="contain"
        />
      </View>
      <View style={styles.myPortfolioContainer}>
        <View style={styles.basketContainer}>
          <Text style={styles.portFolioText}>ESG Basket</Text>
        </View>
      </View>
      <Image
        source={localImages.esg_basket1}
        style={styles.basket_image}
        resizeMode="contain"
      />
      <View style={{alignSelf: 'center', marginBottom: 10}}>
        <ButtonWithoutShadow
          width={width - 147}
          height={43}
          // marginTop={22}
          borderRadius={20}
          labelColor={colors.white}
          label="View Basket"
          backgroundColor={colors.blue}
          onAction={() => null}
        />
      </View>
      <View style={styles.myPortfolioContainer}>
        <View style={styles.basketContainer}>
          <Text style={styles.portFolioText}>ESG Basket</Text>
        </View>
      </View>
      <Image
        source={localImages.esg_basket2}
        style={styles.basket_image}
        resizeMode="contain"
      />
      <View style={{alignSelf: 'center'}}>
        <ButtonWithoutShadow
          width={width - 147}
          height={43}
          // marginTop={22}
          borderRadius={20}
          labelColor={colors.white}
          label="View Basket"
          backgroundColor={colors.blue}
          onAction={() => null}
        />
      </View>
      <TouchableOpacity style={styles.addBasketButton}>
        <Image
          source={localImages.add_green_color}
          style={{height: 20, width: 20}}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.portFolioText,
            {color: colors.info_color, fontSize: 12, paddingLeft: 5},
          ]}>
          Add Basket
        </Text>
      </TouchableOpacity>
      <View>
        <View style={styles.statementContainer1}>
          <TouchableOpacity
            style={styles.statementSubContainer}
            onPress={() => props.navigation.navigate('NameOfThePortfolio')}>
            <View style={styles.textContainer2}>
              <View>
                <Text style={styles.cashText}>Cash</Text>
              </View>
              <Image
                source={localImages.info_blue_circle}
                style={styles.arrowRight1}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.totolText}>$25,656.57</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statementSubContainer}>
            <View style={styles.textContainer2}>
              <View>
                <Text style={styles.cashText}>Debts</Text>
              </View>
              <Image
                source={localImages.info_blue_circle}
                style={styles.arrowRight1}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.totolText}>$25,656.57</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statementSubContainer}>
            <View style={styles.textContainer2}>
              <View>
                <Text style={styles.cashText}>Net Worth</Text>
              </View>
              <Image
                source={localImages.info_blue_circle}
                style={styles.arrowRight1}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.totolText}>$25,656.57</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

class Dashboard extends Component {
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
      return <Statement {...this.props} />;
    } else if (this.state.currentPosition == 1) {
      return <TaxPackages {...this.props} />;
    }
  };
  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HomeHeader
          Header=""
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
              Self Direct A/c
            </Text>
          </TouchableOpacity>
          {/* <View style={styles.borderSeperator} /> */}
          <TouchableOpacity
            style={
              this.state.currentPosition == 1
                ? styles.buttons3
                : styles.buttons1
            }
            onPress={() => this.setPositions(1)}>
            <Text
              style={
                this.state.currentPosition == 1
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              Managed A/c
            </Text>
          </TouchableOpacity>
        </View>
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
    textAlign: 'center',
    width: wp('60%'),
    alignSelf: 'center',
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
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    //   marginBottom: hp('3.39%'),
    marginTop: hp('5.09%'),
  },
  statementContainer1: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
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
    marginBottom: hp('3.39%'),
    marginTop: hp('5.09%'),
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
    fontSize: wp('5%'),
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
    height: 20,
    width: 20,
    marginLeft: wp('3.46'),
  },
  basket_image: {
    height: hp('20.48'),
    width: hp('20.48'),
    alignSelf: 'center',
    marginTop: hp('4.04%'),
    marginBottom: hp('5.69%'),
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
    fontFamily: fonts.regular,
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
    fontSize: wp('4%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
    fontWeight :"bold",
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
  textContainerWidth: {width: wp('45.9%')},
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
});
export default Dashboard;
