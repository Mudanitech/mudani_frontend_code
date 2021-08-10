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
  Platform,
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {hp,wp} from '../../utils/responsive';
import {CustomStyles} from '../style/CustomStyles';

const {height, width} = Dimensions.get('window');

class TellAboutManagedAccount extends Component {
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
  componentDidUpdate = () =>{
    console.log("props12",this.props.route.params.id)
  }
  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            Header={''}
            onActionLeft={() =>
              this.props.navigation.goBack()
            }
          />
          <ScrollView style={{flexGrow: 1}}>
            <View style={{alignSelf: 'center', marginTop: Platform.OS == "ios"?hp('4%') : hp("0")}}>
              <View>
              <Text
                  style={{
                    color: colors.black,
                    fontSize: 20,
                    fontFamily: fonts.bold,
                    marginHorizontal: 40,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  Tell us about you,
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 20,
                    fontFamily: fonts.bold,
                    marginBottom: 30,
                    marginHorizontal: 40,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  get a customized portfolio.
                </Text>
                <Image
                  source={localImages.basket}
                  style={{
                    height: 146,
                    width: 146,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}></Image>
              </View>
              {/* <Text
                style={{
                  color: colors.black,
                  fontSize: 20,
                  fontFamily: fonts.bold,
                  marginTop: 30,
                  marginHorizontal: 40,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Get a customized portfolio
              </Text> */}

              <View style={styles.textContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.btnText}>
                  We’ll ask you a short series of questions to determine your
                  financial profile, risk tolerance, and time horizon.
                </Text>
                <Text style={[styles.btnText,{marginTop : 10}]}>
                  Our robo-advisor will then generate a customized portfolio for
                  you consisting of stocks, ETF’s, and even crypto.
                </Text>
              </View>
              </View>

              {/* <View
                style={{
                  marginHorizontal: 40,
                  marginTop: Platform.OS == "ios" ? 131 : 5,
                  marginBottom: 50,
                }}>
                <ButtonWithoutShadow
                  width={width - 80}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Continue"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.props.navigation.navigate('CustomizedPortfolio')
                  }
                />
              </View> */}
            </View>
          </ScrollView>
          <View style={{
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: hp('0%'),
                  height : hp("16%"),
                  width : wp("100%"),
                  backgroundColor : colors.authBackGroud
                }}>
              <View
                style={{
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: hp('8%'),
                }}>
                   <ButtonWithoutShadow
                  width={width - 147}
                  height={43}
                  //   marginTop={366}
                  // marginTop={Platform.OS == "android"?hp("37.03%") :hp("37.03")}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Continue"
                  backgroundColor={colors.blue}
                  onAction={() => this.props.navigation.navigate('AddManagedAccount',{id:this.props.route.params.id})}
                />
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
    marginTop : 30,
    //width : width -46,
    // alignSelf : "center",
    marginLeft: 46,
    marginRight: 46,
    marginTop: 16,
    // alignSelf : "center",
  },
});

export default TellAboutManagedAccount;
