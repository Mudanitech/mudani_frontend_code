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
import {ButtonWithoutShadow, HeaderWithBack} from '../../../component/Button';
import {colors, fonts, localImages} from '../../../utils/constant';
import {CustomStyles} from '../../style/CustomStyles';
import {wp, hp} from '../../../utils/responsive';

const {height, width} = Dimensions.get('window');

class Recurring3 extends Component {
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

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            labelStyle={styles.labelStyle}
            Header={'Recurring Deposit'}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView style={{flexGrow: 1}}>
            <View style={{alignSelf: 'center', marginTop: 80}}>
              <View>
                <Image
                  source={localImages.choose_a_plan_icon}
                  style={{
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
                Automatic Deposit
              </Text>
              <View style = {{width : wp("80%"),marginTop : 30}}>
              <Text style = {styles.textPara}>
                Automatic deposits allow you to set a regular, recurring deposit
                from your bank account to your Mudani account. When setting up
                an automatic deposit, you’ll select an amount, and schedule that
                works best for you.
              </Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 120,
                  marginBottom: 50,
                }}>
                <ButtonWithoutShadow
                  width={wp("60%")}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Continue"
                  backgroundColor={colors.blue}
                  onAction={() => this.props.navigation.navigate('Recurring4')}
                  // onAction={() => null}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    lineHeight: 24,
  },
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
  textPara : {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.regular,
    textAlign: 'center',
    lineHeight : 25
  }
});

export default Recurring3;
