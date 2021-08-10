import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import SignUpModel from './../../component/SignUpModel';
import {hp, wp} from '../../utils/responsive';
import {color} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

class StartYourSignUpJourney1 extends Component {
  constructor(props) {
    super();
    this.state = {
      isModal: false,
    };
  }

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView style={{flexGrow: 1}}>
            <View style={{alignSelf: 'center'}}>
              <View>
                <Image
                  source={localImages.mudani_logo}
                  style={{
                    borderRadius: 50,
                    height: 63,
                    width: 178,
                    alignSelf: 'center',
                  }}></Image>
              </View>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 20,
                  fontFamily: fonts.bold,
                  marginTop: 54,
                  marginHorizontal: 40,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Lets! Setup your account in 4 simple steps :
              </Text>

              <View style={{alignSelf: 'center'}}>
                <View>
                  <TouchableOpacity
                    style={styles.createBasketBtn1}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'CustomizedPortfolioHome',
                        {id: this.props.route.params.id},
                      )
                    }>
                    <View style={styles.btnInsideView}>
                      <Text style={styles.circleText}>1</Text>
                    </View>
                    <Text style={styles.btnText}>
                      Get a customized portfolio
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.createBasketBtn1}
                    onPress={() =>
                      this.props.navigation.navigate('VerifyYourIdentity', {
                        id: this.props.route.params.id,
                      })
                    }>
                    <View style={styles.btnInsideView}>
                      <Text style={styles.circleText}>2</Text>
                    </View>
                    <Text style={styles.btnText}>Verify your Identity</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.createBasketBtn1}
                    onPress={() =>
                      this.props.navigation.navigate('ChooseAPlan', {
                        id: this.props.route.params.id,
                      })
                    }>
                    <View style={styles.btnInsideView}>
                      <Text style={styles.circleText}>3</Text>
                    </View>
                    <Text style={styles.btnText}>Choose your Plan</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.createBasketBtn1}
                    onPress={() =>
                      this.props.navigation.navigate('LinkYourAccount', {
                        id: this.props.route.params.id,
                      })
                    }>
                    <View style={styles.btnInsideView}>
                      <Text style={styles.circleText}>4</Text>
                    </View>
                    <Text style={styles.btnText}>Link your Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.accordianTextContainer}>
                <TouchableOpacity>
                  <Text style={{fontSize: 16, color: '#a8a8a8'}}>
                    Total time needed{' '}
                    <Text style={styles.footerText}>- 4 minutes</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{marginHorizontal: 40, marginTop: 0, marginBottom: 50}}>
                <ButtonWithoutShadow
                  width={width - 80}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Continue"
                  backgroundColor={colors.blue}
                  onAction={() => this.setState({isModal: true})}
                />
              </View>
            </View>
          </ScrollView>
          <SignUpModel
            isModalVisible={this.state.isModal}
            modalClose={() => this.setState({isModal: false})}>
            <View>
              <TouchableOpacity
                style={{alignItems: 'flex-end'}}
                onPress={() => this.setState({isModal: false})}>
                <Image
                  source={localImages.close_gray}
                  style={{height: 18, width: 18}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View>
                <View>
                  <Text numberOfLines={2} style={styles.thematicText}>
                    Do you want to add
                  </Text>
                  <Text numberOfLines={2} style={styles.thematicText}>
                    "Thematic Baskets in $1"
                  </Text>
                </View>
                <Text numberOfLines={2} style={styles.chooseThematicText}>
                  Choose Thematic Basket
                </Text>
                <View style={styles.thematicContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.investingPortfolioText}>
                      Name of the Thematic Basket
                    </Text>
                    <TouchableOpacity>
                      <Image
                        source={localImages.checked_light_blue}
                        style={[styles.arrowRight1, {marginLeft: wp('10%')}]}
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
                  <Text style={styles.riskLevelText}>Description</Text>
                  <Text style={styles.aggressiveText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec interdum neque sed diam imperdiet mollis. Sed ornare
                    imperdiet erat sit amet elementum.{' '}
                  </Text>

                  <View>
                    <View style={[styles.itemContainer, {marginTop: 16}]}>
                      <Text style={styles.itemText}>U.S Individual Stock</Text>
                      <Text style={styles.itemText1}>20.00%</Text>
                    </View>

                    <View style={[styles.itemContainer]}>
                      <Text style={styles.itemText}>U.S Individual Stock</Text>
                      <Text style={styles.itemText1}>20.00%</Text>
                    </View>

                    <View style={[styles.itemContainer]}>
                      <Text style={styles.itemText}>U.S Individual Stock</Text>
                      <Text style={styles.itemText1}>20.00%</Text>
                    </View>

                    <View style={[styles.itemContainer]}>
                      <Text style={styles.itemText}>U.S Individual Stock</Text>
                      <Text style={styles.itemText1}>20.00%</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.thematicContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.investingPortfolioText}>
                      Name of the Thematic Basket
                    </Text>
                    <TouchableOpacity>
                      <Image
                        source={localImages.add_icon}
                        style={[styles.arrowRight1, {marginLeft: wp('10%')}]}
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
                  <Text style={styles.riskLevelText}>Description</Text>
                  <Text style={styles.aggressiveText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec interdum neque sed diam imperdiet mollis. Sed ornare
                    imperdiet erat sit amet elementum.{' '}
                  </Text>

                  <View>
                    <View style={[styles.itemContainer, {marginTop: 16}]}>
                      <Text style={styles.itemText}>U.S Individual Stock</Text>
                      <Text style={styles.itemText1}>20.00%</Text>
                    </View>

                    <View style={[styles.itemContainer]}>
                      <Text style={styles.itemText}>U.S Individual Stock</Text>
                      <Text style={styles.itemText1}>20.00%</Text>
                    </View>

                    <View style={[styles.itemContainer]}>
                      <Text style={styles.itemText}>U.S Individual Stock</Text>
                      <Text style={styles.itemText1}>20.00%</Text>
                    </View>

                    <View style={[styles.itemContainer]}>
                      <Text style={styles.itemText}>U.S Individual Stock</Text>
                      <Text style={styles.itemText1}>20.00%</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      marginTop: 0,
                      marginBottom: 50,
                      marginTop: 39,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <ButtonWithoutShadow
                      width={width - wp('64.33')}
                      height={43}
                      //   marginTop={22}
                      borderRadius={20}
                      labelColor={colors.blue}
                      label="Skip"
                      backgroundColor={colors.light_blue}
                      onAction={() => this.setState({isModal: true})}
                    />
                    <ButtonWithoutShadow
                      width={width - wp('64.33')}
                      height={43}
                      //   marginTop={22}
                      borderRadius={20}
                      labelColor={colors.white}
                      label="Continue"
                      backgroundColor={colors.blue}
                      onAction={() => this.setState({isModal: true})}
                    />
                  </View>
                </View>
              </View>
            </View>
          </SignUpModel>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  accordianTextContainer: {
    marginTop: 166,
    alignSelf: 'center',
    marginBottom: 23,
  },
  footerText: {
    height: 27,
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#72e2db',
    textAlign: 'center',
  },
  accordianPadding: {
    paddingTop: 8,
  },
  viewSeparator: {
    borderColor: '#707070',
    borderWidth: 0.3,
    width: '100%',
    alignSelf: 'center',
  },
  createBasketBtn: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
  },
  createBasketBtn1: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 29,
  },
  btnInsideView: {
    backgroundColor: '#e0eef8',
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  circleText: {
    fontSize: 15,
    color: '#2b8ecd',
    fontFamily: fonts.regular,
  },
  btnText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
  },
  //ccccccc
  thematicText: {
    fontSize: 16,
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 30,
    textAlign: 'center',
  },
  chooseThematicText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 22,
    marginBottom: 30,
  },
  thematicContainer: {
    //   flex : 1,
    backgroundColor: colors.white,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    padding: 5,
    borderRadius: 10,
  },
  investingPortfolioText: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
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
    marginTop: hp('2.6%'),
    marginBottom: hp('3.89%'),
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginBottom: 8,
  },
  itemText: {
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  itemText1: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
});

export default StartYourSignUpJourney1;
