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
import {hp, wp} from '../../utils/responsive';

const {height, width} = Dimensions.get('window');

class StartYourSignUpJourney1 extends Component {
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
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView style={{flex: 1}}>
            <View style={{alignSelf: 'center', marginBottom: 150}}>
              <View>
                <Image
                  source={localImages.mudani_logo}
                  style={{
                    // marginTop : 32,
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
                Let’s set up your account in
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 20,
                  fontFamily: fonts.bold,
                  marginHorizontal: 40,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                5 simple steps :
              </Text>
              <View style={{alignSelf: 'center', marginTop: 20}}>
                <View>
                  <TouchableOpacity style={styles.createBasketBtn1}>
                    <View style={styles.btnInsideView}>
                      <Text style={styles.circleText}>1</Text>
                    </View>
                    <Text style={styles.btnText}>
                      Create your Basket{' '}
                      <Text style={{color: colors.info_color}}>(Optional)</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={styles.createBasketBtn1}>
                    <View style={styles.btnInsideView}>
                      <Text style={styles.circleText}>2</Text>
                    </View>
                    <Text style={styles.btnText}>Verify your Identity</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={styles.createBasketBtn1}>
                    <View style={styles.btnInsideView}>
                      <Text style={styles.circleText}>3</Text>
                    </View>
                    <Text style={styles.btnText}>Choose your Plan</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={styles.createBasketBtn1}>
                    <View style={styles.btnInsideView}>
                      <Text style={styles.circleText}>4</Text>
                    </View>
                    <Text style={styles.btnText}>
                      Link your Bank Account
                      {/* <Text style={{color: colors.info_color}}>
                        {' '}
                        (Optional)
                      </Text> */}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={styles.createBasketBtn1}>
                    <View style={styles.btnInsideView}>
                      <Text style={styles.circleText}>5</Text>
                    </View>
                    <Text style={styles.btnText}>Get a Free Stock</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: hp('0%'),
              height: hp('22%'),
              width: wp('100%'),
              backgroundColor: colors.authBackGroud,
            }}>
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                bottom: hp('8%'),
              }}>
              <View style={styles.accordianTextContainer}>
                <TouchableOpacity>
                  <Text style={{fontSize: 16, color: '#a8a8a8'}}>
                    Total time needed
                    <Text style={styles.footerText}> - 4 minutes</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <ButtonWithoutShadow
                width={wp('60%')}
                height={43}
                // marginTop={Platform.OS == "android"?hp("9%") :hp("14%")}
                borderRadius={20}
                labelColor={colors.white}
                label="Next"
                backgroundColor={colors.blue}
                onAction={() =>
                  this.props.navigation.navigate('StartYourSignUpJourney2', {
                    id: this.props.route.params.id,
                  })
                }
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
    // marginTop: Platform.OS == 'android' ? hp('15%') : hp('22%'),
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
    marginTop: 25,
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
    fontWeight: 'bold',
  },
  btnText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
  },
});

export default StartYourSignUpJourney1;
