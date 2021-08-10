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
import RadioButtonAccordian from './../../component/RadioButtonAccordian';
import {hp, wp} from '../../utils/responsive';

const {height, width} = Dimensions.get('window');

class FundYourAccount extends Component {
  constructor(props) {
    super();
    this.state = {
      accountType: [
        {AccountType: 'Individual', text: 'hsdfjkhksjdf'},
        {AccountType: 'Joint', text: 'hsdfjkhksjdf'},
        {AccountType: 'Retirement', text: 'hsdfjkhksjdf'},
      ],
    };
  }

  // componentDidUpdate =()=>{
  //   console.log("Props",this.props.route.params.id)
  // }

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <ScrollView style={{flexGrow: 1}}>
            <HeaderWithBack
              backgroundColor={1}
              Header={' '}
              labelStyle={styles.labelStyle}
              onActionLeft={() => this.props.navigation.goBack()}
            />
            <View style={{alignSelf: 'center'}}>
              <View>
                <Image
                  source={localImages.link_your_account_icon}
                  style={{
                    marginTop : 50,
                    height: 146,
                    width: 95.5,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}></Image>
              </View>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 20,
                  fontFamily: fonts.bold,
                  marginTop: 30,
                  marginHorizontal: 40,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Fund your account
              </Text>

              {/* <Text
                style={{
                  color: colors.black,
                  fontSize: 13,
                  fontFamily: fonts.bold,
                  marginTop: 13,
                  marginHorizontal: 40,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Link your account through plaid
              </Text> */}

              <View style={styles.textContainer}>
                <Text style={styles.btnText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  interdum neque sed diam imperdiet mollis. Sed ornare imperdiet
                  erat sit amet elementum. Donec efficitur justo vitae molestie
                  feugiat. Pellentesque vestibulum velit id lectus varius
                  vehicula. Sed lorem mi, blandit ultrices ultrices in, sodales
                  id ex.{' '}
                </Text>
              </View>

             
            </View>
          </ScrollView>
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: hp('0%'),
              height: hp('16%'),
              width: wp('100%'),
              backgroundColor: colors.authBackGroud,
            }}>
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                bottom: hp('2%'),
              }}>
              <View
                style={{
                  // marginHorizontal: 40,
                  // marginTop: 131,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                 <View
                style={{
                  // marginHorizontal: 40,
                  marginTop: 59,
                  alignItems: 'center',
                }}>
                <ButtonWithoutShadow
                  width={wp('60%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  // label="Fund your Account"
                  label="Continue"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.props.navigation.navigate('DepositScreen',{id : this.props.route.params.id})
                  }
                />
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 22,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('Home', {
                      screen: 'Dashboard',
                      params: {id: 1},
                    })}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.info_color,
                      marginLeft: 10,
                      fontWeight : "bold",
                      fontFamily : fonts.bold
                    }}>
                    Skip
                  </Text>
                </TouchableOpacity>
              </View>
              </View>
            </View>
          </View>
       
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  accordianTextContainer: {
    marginTop: 166,
    //flex : 1,
    // height : "60%",
    alignSelf: 'center',
    marginBottom: 23,
  },
  footerText: {
    //width: width - 40,
    height: 27,
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    // marginTop:50,
    //marginStart:40,
    //marginEnd:40,
    color: '#72e2db',
    textAlign: 'center',
  },
  accordianPadding: {
    paddingTop: 8,
    // paddingBottom : 4,
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
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 29,
    width: '80%',
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
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,

    textAlign: 'center',
  },
  textContainer: {
    //width : width -46,
    // alignSelf : "center",
    marginLeft: 46,
    marginRight: 46,
    marginTop: 16,
    // alignSelf : "center",
  },
  labelStyle: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.bold,
    // marginTop: 48,
    marginHorizontal: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FundYourAccount;
