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
import {HeaderWithBack,ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {LineChart} from 'react-native-chart-kit';

const TaxPackages = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
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
      <View style={styles.statementContainer}>
          <View style ={styles.PContainer}>
          <View style = {{flexDirection : "row"}}>
          <Text style = {styles.investingPortfolioText}>Name of the Thematic Basket</Text>
         <TouchableOpacity>
         <Image
              source={localImages.checked_light_blue}
              style={[styles.arrowRight1,{marginLeft : wp("10%")}]}
              resizeMode="contain"
            />
         </TouchableOpacity>
          </View>
           <View>
           <Image
              source={localImages.esg_basket1}
              style={styles.basket_image}
              resizeMode="contain"
            />
           </View>
            <Text style = {styles.riskLevelText}>Description</Text>
            <Text style = {styles.aggressiveText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat sit amet elementum. </Text>
          </View>
          <View style = {styles.stockItemContainer}>
              <View style = {styles.widthforItem}>
                  <Text style = {styles.riskLevelText}>U.S Individual Stock</Text>
              </View>
              <View style = {styles.widthforItem1}>
                  <Text style = {styles.aggressiveText}>20.00%</Text>
              </View>
          </View>
          <View style = {styles.stockItemContainer}>
              <View style = {styles.widthforItem}>
                  <Text style = {styles.riskLevelText}>U.S Stock ETF</Text>
              </View>
              <View style = {styles.widthforItem1}>
                  <Text style = {styles.aggressiveText}>20.00%</Text>
              </View>
          </View>
          <View style = {styles.stockItemContainer}>
              <View style = {styles.widthforItem}>
                  <Text style = {styles.riskLevelText}>U.S Bond ETF</Text>
              </View>
              <View style = {styles.widthforItem1}>
                  <Text style = {styles.aggressiveText}>20.00%</Text>
              </View>
          </View>
          <View style = {[styles.stockItemContainer,{paddingBottom : 10}]}>
              <View style = {styles.widthforItem}>
                  <Text style = {styles.riskLevelText}>International ETF</Text>
              </View>
              <View style = {styles.widthforItem1}>
                  <Text style = {styles.aggressiveText}>20.00%</Text>
              </View>
          </View>
       </View>
      <View>
        <Text style={styles.heading}>Holdings</Text>
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
         
        </View>
        <View style={styles.secondContainer}>
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
            38%
            </Text>
            {/* <Text style={[styles.itemText2, {fontSize: wp('4.2%')}]}>3</Text> */}
          </View>
        </View>
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
        </View>
        <View style={styles.secondContainer}>
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
            38%
            </Text>
            {/* <Text style={[styles.itemText2, {fontSize: wp('4.2%')}]}>3</Text> */}
          </View>
        </View>
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
        </View>
        <View style={styles.secondContainer}>
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
              38%
            </Text>
            {/* <Text style={[styles.itemText2, {fontSize: wp('4.2%')}]}>3</Text> */}
          </View>
        </View>
        {/* <View style={styles.rowBorder} /> */}
      </View>
      </View>
      </View>
  );
};

class MyPlans extends Component {
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
        return <TaxPackages />;
  };
  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="Thematic Basket"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => null}
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
    marginTop: hp('1%'),
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
    fontSize: wp('5.33%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 27,
    // marginLeft: wp('0.7'),
    // marginTop: hp('2.2'),
    marginBottom: hp('2.24'),
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
    height: 20,
    width: 20,
    marginLeft: wp('3.46'),
  },
  arrowRight1: {
    height: 20,
    width: 20,
    marginLeft: wp('3.46'),
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
    color: colors.black,
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
    marginBottom : 22,
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
  portFolioText : {
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
  textContainerWidth: {width: wp('56.9%')},
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
  portFolioContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.2'),
  },
  addBasketButton : {alignSelf : "center",flexDirection : "row",alignItems : "center",height : hp("5%"),marginTop : hp("5.09%"),justifyContent : "center"},
  textContainer: {
    marginLeft: 46,
    marginRight: 46,
    marginTop: 8,
    width: width - 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    marginTop: 28,
    marginLeft: 46,
    marginRight: 46,
    backgroundColor: colors.white,
    // padding : 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: width - 70,
    elevation: 5,
  },
  smallCircle: {
    width: 13,
    height: 13,
    backgroundColor: colors.blue,
    borderRadius: 50,
  },

  stepperBtn: {
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
    backgroundColor: colors.blue,
    width: 120,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 40,
    alignSelf : "center"
  },
  stepStyle: {
    backgroundColor: colors.blue,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  
  headingText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'normal',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 20,
    marginLeft : 32,
  },
  dollarText: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 4,
  },
  descriptionText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    textAlign: 'left',
    lineHeight: 20,
    marginTop: 4,
  },


  basicPlanContainer2: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 5,
    width: '83%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.white,
    alignSelf : "center"
  },
  
  basicPlanText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    fontWeight: 'bold',
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
    height: hp("14.84"),
    width: hp("14.84"),
    alignSelf : "center",
    marginTop : hp("2.6%"),
    marginBottom : hp("3.89%")
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
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  itemText2: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
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
  portFolioText : {
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
  portFolioContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.2'),
  },
  addBasketButton : {alignSelf : "center",flexDirection : "row",alignItems : "center",height : hp("5%"),marginTop : hp("5.09%"),justifyContent : "center"},
  PContainer : {
      flex : 1,
      padding : wp("4%"),
  },
  investingPortfolioText : {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  riskLevelText :{
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  aggressiveText :{
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  monthText :{
    fontSize: wp('5.33%'),
    color: colors.info_color,
    fontFamily: fonts.regular,
    lineHeight: 20,
    paddingTop : hp("0.8"),
    paddingBottom : hp("2.24")
  },
  stockItemContainer : {
    flex : 1,
      flexDirection : "row",
      alignItems : 'center',
      alignSelf : "flex-start",
    //   paddingBottom : hp("0.7%")
  },
  widthforItem : {
      width : wp("50%"),
      paddingLeft : wp("3%")
  },
  widthforItem1 : {
    width : wp("30%"),
    alignItems : "flex-end"
}
});
export default MyPlans;
