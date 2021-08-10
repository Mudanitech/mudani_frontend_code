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
import {colors, fonts, localImages} from '../../utils/constant';
import {hp, wp} from '../../utils/responsive';
import {CustomStyles} from '../style/CustomStyles';

const {height, width} = Dimensions.get('window');

class StartYourSignUpJourney2 extends Component {
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
  // componentDidMount=()=>{
  //   console.log("props",this.props.route.params.id)
  // }
  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            Header=""
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView style={{flexGrow: 1}}>
            <View style={{alignSelf: 'center', marginTop: hp('5%')}}>
              <View>
                <Image
                  source={localImages.basket}
                  style={{
                    // marginTop : 50,
                    height: 156,
                    width: 156,
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
                Create your basket
              </Text>
              {/* <Text
                style={{
                  color: colors.info_color,
                  textAlign: 'center',
                  lineHeight: 20,
                  fontSize: 16,
                }}>
                (Optional)
              </Text> */}
              <View style={styles.textContainer}>
                <Text style={styles.btnText}>
                  Choose from a collection of stocks, ETFs, or crypto. In order
                  to add these to your basket, you can tap on the plus sign on
                  the stock card. Don’t want to create one? Just click skip.
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
                bottom: hp('8%'),
              }}>
              <ButtonWithoutShadow
                width={wp('60%')}
                height={43}
                // marginTop={Platform.OS == "android"?hp("9%") :hp("14%")}
                borderRadius={20}
                labelColor={colors.white}
                label="Next"
                backgroundColor={colors.blue}
                onAction={() => this.props.navigate('CreateBasket')}
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
    marginLeft: 46,
    marginRight: 46,
    marginTop: 16,
  },
});

export default StartYourSignUpJourney2;
