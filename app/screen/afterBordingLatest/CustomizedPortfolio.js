import React, {Component, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {hp, wp} from './../../utils/responsive';
const {height, width} = Dimensions.get('window');
import {CustomStyles} from '../style/CustomStyles';
import Dropdown from '../../component/Picker2';
import {HeaderWithBackWhite, ButtonWithoutShadow} from '../../component/Button';
import StepIndicator from 'react-native-step-indicator';
const MyComponent = props => {
  return (
    <View style={{marginBottom: hp('23.83%')}}>
      <View style={styles.portfolioContainer}>
        <Image style={styles.basketImag} source={localImages.basket} />
        <View style={styles.portfolioSubContainer}>
          <Text style={styles.levelText}>PIMCO</Text>
          <Text style={[styles.levelText, {color: colors.blue}]}>38%</Text>
        </View>
        <View style={styles.portfolioSubContainer}>
          <Text style={styles.levelText}>AMZN</Text>
          <Text style={[styles.levelText, {color: colors.blue}]}>40%</Text>
        </View>
        <View style={styles.portfolioSubContainer}>
          <Text style={styles.levelText}>APL</Text>
          <Text style={[styles.levelText, {color: colors.blue}]}>20%</Text>
        </View>
        <View style={{marginRight: 16, alignItems: 'flex-end'}}>
          <ButtonWithoutShadow
            width={139}
            height={43}
            backgroundColor={colors.blue}
            label="Select"
            labelColor={colors.white}
            //   marginLeft={0}
            // marginRight = {16}
            marginTop={25}
            borderRadius={20}
            marginBottom={26}
          />
        </View>
      </View>
      <View style={{marginLeft: 29, marginRight: 29, marginTop: 14}}>
        <Dropdown value={'More Options'} />
      </View>
    </View>
  );
};
const MyComponent1 = props => {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.ageContainer}>
      <View>
        <Text style={styles.oldText}>How old are you?</Text>
      </View>
      <View style={styles.ageSubContainer}>
        <View style={styles.conditionContainer}>
          <TouchableOpacity onPress={() => setChecked(checked ? false : true)}>
            {checked ? (
              <Image
                source={localImages.active_radio_button}
                style={{
                  height: 18,
                  width: 18,
                }}></Image>
            ) : (
              <Image
                source={localImages.unselect}
                style={{
                  height: 18,
                  width: 18,
                }}></Image>
            )}
          </TouchableOpacity>
          <Text style={styles.yearText}>18-25 years</Text>
        </View>
        <View style={styles.conditionContainer}>
          <TouchableOpacity onPress={() => setChecked(checked ? false : true)}>
            {checked ? (
              <Image
                source={localImages.active_radio_button}
                style={{
                  height: 18,
                  width: 18,
                }}></Image>
            ) : (
              <Image
                source={localImages.unselect}
                style={{
                  height: 18,
                  width: 18,
                }}></Image>
            )}
          </TouchableOpacity>
          <Text style={styles.yearText}>18-25 years</Text>
        </View>
        <View style={styles.conditionContainer}>
          <TouchableOpacity onPress={() => setChecked(checked ? false : true)}>
            {checked ? (
              <Image
                source={localImages.active_radio_button}
                style={{
                  height: 18,
                  width: 18,
                }}></Image>
            ) : (
              <Image
                source={localImages.unselect}
                style={{
                  height: 18,
                  width: 18,
                }}></Image>
            )}
          </TouchableOpacity>
          <Text style={styles.yearText}>18-25 years</Text>
        </View>
      </View>
    </View>
  );
};
const MyComponent2 = props => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.headingAgressive}>Your Suggested Portfolio1</Text>
        <View style={styles.statementContainer}>
          <View style={styles.PContainer}>
            <Text style={styles.investingPortfolioText}>
              Investing Portfolio
            </Text>
            <Text style={styles.riskLevelText}>Risk Level</Text>
            <Text style={styles.aggressiveText}>Aggressive </Text>
            <Text style={styles.riskLevelText}>Description</Text>
            <Text style={styles.aggressiveText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              interdum neque sed diam imperdiet mollis. Sed ornare imperdiet
              erat sit amet elementum.{' '}
            </Text>
            <Image
              source={localImages.basket}
              style={styles.basket_image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.stockItemContainer}>
            <View>
              <Image
                source={localImages.rectangle_1}
                style={styles.arrowRight}
                resizeMode="contain"
              />
            </View>
            <View style={styles.widthforItem}>
              <Text style={styles.riskLevelText}>U.S Individual Stock</Text>
            </View>
            <View style={styles.widthforItem1}>
              <Text style={styles.aggressiveText}>20.00%</Text>
            </View>
          </View>
          <View style={styles.stockItemContainer}>
            <View>
              <Image
                source={localImages.rectangle_1}
                style={styles.arrowRight}
                resizeMode="contain"
              />
            </View>
            <View style={styles.widthforItem}>
              <Text style={styles.riskLevelText}>U.S Individual Stock</Text>
            </View>
            <View style={styles.widthforItem1}>
              <Text style={styles.aggressiveText}>20.00%</Text>
            </View>
          </View>
          <View style={styles.stockItemContainer}>
            <View>
              <Image
                source={localImages.rectangle_1}
                style={styles.arrowRight}
                resizeMode="contain"
              />
            </View>
            <View style={styles.widthforItem}>
              <Text style={styles.riskLevelText}>U.S Individual Stock</Text>
            </View>
            <View style={styles.widthforItem1}>
              <Text style={styles.aggressiveText}>20.00%</Text>
            </View>
          </View>
          <View style={styles.stockItemContainer}>
            <View>
              <Image
                source={localImages.rectangle_1}
                style={styles.arrowRight}
                resizeMode="contain"
              />
            </View>
            <View style={styles.widthforItem}>
              <Text style={styles.riskLevelText}>U.S Individual Stock</Text>
            </View>
            <View style={styles.widthforItem1}>
              <Text style={styles.aggressiveText}>20.00%</Text>
            </View>
          </View>
          <View style={{alignSelf: 'flex-end', marginRight: 16}}>
            <ButtonWithoutShadow
              marginBottom={hp('2%')}
              marginTop={16}
              width={139}
              height={43}
              borderRadius={20}
              labelColor={colors.white}
              label="Select"
              backgroundColor={colors.blue}
              onAction={() => null}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.headingAgressive, {marginTop: 20}]}>
          More Conservative Portfolio
        </Text>
        <View style={{marginTop: 14, marginBottom: 173}}>
          <Dropdown value={'View Options closest to your Risk Tolerance'} />
        </View>
      </View>
    </View>
  );
};
const MyComponent3 = props => {
  return (
    <View style={{marginBottom: hp('39.13%')}}>
      <View style={{marginTop: hp('5.69%')}}>
        <Text style={styles.customized}>Your Customized Portfolio</Text>
      </View>
      <View style={{marginTop: hp('5.39%'), alignItems: 'center'}}>
        <Image source={localImages.basket} style={{width: 115, height: 116}} />
      </View>
      <View style={{marginTop: hp('8.09%'), alignSelf: 'center'}}>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat
          sit amet eleme ntum. Donec efficitur justo vitae molestie feugiat.
          Pellentesque vestibulum .
        </Text>
      </View>
    </View>
  );
};
export default class CustomizedPortfolio extends Component {
  constructor() {
    super();
    this.state = {
      currentPosition: 0,
      customStyles: {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: colors.blue,
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: colors.blue,
        stepStrokeUnFinishedColor: colors.light_blue,
        separatorFinishedColor: colors.blue,
        separatorUnFinishedColor: colors.light_blue,
        stepIndicatorFinishedColor: colors.blue,
        stepIndicatorUnFinishedColor: colors.light_blue,
        stepIndicatorCurrentColor: colors.blue,
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: colors.white,
        stepIndicatorLabelFinishedColor: colors.white,
        stepIndicatorLabelUnFinishedColor: colors.blue,
        labelColor: colors.white,
        labelSize: 13,
        currentStepLabelColor: colors.white,
      },
    };
  }

  showSteps = () => {
    this.state.currentPosition + 1;
    console.log(this.state.currentPosition);
    if (this.state.currentPosition == 0) {
      return <MyComponent />;
    } else if (this.state.currentPosition == 1) {
      return <MyComponent1 />;
    } else if (this.state.currentPosition == 2) {
      return <MyComponent2 />;
    } else if (this.state.currentPosition == 3) {
      return <MyComponent3 />;
    }
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <HeaderWithBackWhite
          Header="Get a Customized Portfolio"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() =>
            this.setState({
              currentPosition:
                this.state.currentPosition == 0
                  ? (this.state.currentPosition = 0)
                  : this.state.currentPosition - 1,
            })
          }
        />
        <View style={styles.stepperSubContainer}>
          <StepIndicator
            style={{flex: 1}}
            customStyles={this.state.customStyles}
            currentPosition={this.state.currentPosition}
            stepCount={4}
          />
        </View>
        <ScrollView>
          <View style={{flex: 1, width: '100%'}}>{this.showSteps()}</View>
          {this.state.currentPosition == 3 ? (
            <View style={{alignSelf: 'center'}}>
              <ButtonWithoutShadow
                marginBottom={hp('5.84%')}
                width={228}
                height={43}
                borderRadius={20}
                labelColor={colors.white}
                label="Submit"
                backgroundColor={colors.blue}
                onAction={() =>
                  this.props.navigation.navigate('StartYourSignUpJourney1')
                }
              />
            </View>
          ) : (
            <View style={{alignSelf: 'center'}}>
              <ButtonWithoutShadow
                marginBottom={hp('5.84%')}
                width={228}
                height={43}
                borderRadius={20}
                labelColor={colors.white}
                label="Next"
                backgroundColor={colors.blue}
                onAction={() =>
                  this.setState({
                    currentPosition:
                      this.state.currentPosition == 3
                        ? (this.state.currentPosition = 3)
                        : this.state.currentPosition + 1,
                  })
                }
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 24,
  },
  stepperSubContainer: {
    width: width,
    height: 35,
    backgroundColor: 'white',
    position: 'relative',
  },
  portfolioContainer: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    backgroundColor: colors.white,
    borderRadius: 10,
    margin: 29,
  },
  basketImag: {
    height: 86,
    width: 86,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 21,
    marginBottom: 26,
  },
  portfolioSubContainer: {
    flex: 1,
    backgroundColor: colors.light_blue,
    //   alignSelf : "flex-start",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 16,
    marginRight: 16,
    padding: 12,
    marginBottom: 8,
  },
  levelText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  ageContainer: {
    flex: 1,
    marginLeft: 29,
    marginRight: 29,
    marginTop: 36,
  },
  oldText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 21,
  },
  ageSubContainer: {
    flex: 1,
    padding: 19,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 22,
    marginBottom: 337,
  },
  conditionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  yearText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: 11,
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
    marginBottom: hp('1%'),
    marginTop: hp('2.9%'),
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
    marginBottom: 8,
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
    marginBottom: 8,
  },
  stockItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    //   paddingBottom : hp("0.7%")
  },
  widthforItem: {
    width: wp('44%'),
    paddingLeft: wp('2%'),
  },
  widthforItem1: {
    width: wp('30%'),
    alignItems: 'flex-end',
  },
  editButton: {
    height: hp('3.74%'),
    width: wp('14.13%'),
    backgroundColor: colors.grayDot,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  headingAgressive: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    textAlign: 'center',
  },
  customized: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    height: 21,
    color: colors.blue,
    textAlign: 'center',
  },
  paragraph: {
    fontFamily: fonts.regular,
    fontSize: 12,
    height: 20,
    color: colors.black,
    textAlign: 'center',
    height: 250,
    width: 282,
  },
});
