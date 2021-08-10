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
import {wp, hp} from '../../utils/responsive';
import {CustomStyles} from '../style/CustomStyles';
import {postAPI} from './../../utils/Api';
import ShowToast from './../../component/Toast';


import RadioButtonAccordian from './../../component/RadioButtonAccordian';

const {height, width} = Dimensions.get('window');

class LinkYourAccount extends Component {
  
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
  componentDidMount = async() => {
    console.log('props', this.props.route.params.id);

    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);
    this.setState({userId: userDetails._id});
  };



openPayment=()=>{


  this.props.navigation.navigate('PlaidLink')


}
  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            Header={''}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView style={{flexGrow: 1}}>
            <View
              style={{
                alignSelf: 'center',
                marginTop: Platform.OS == 'android' ? 50 : 50,
              }}>
              <View>
                <Image
                  source={localImages.link_your_account_icon}
                  style={{
                    borderRadius: 50,
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
                Link your account
              </Text>

             

              <View style={styles.textContainer}>
                <Text style={styles.btnText}>
                  Link your bank account to deposit funds. We use the highest
                  bank-grade security available.
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
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={wp('60%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}

                  onAction={this.openPayment}
                  // onAction={() =>
                  //   this.props.navigation.navigate('Plaid', {
                  //     id: this.props.route.params.id,
                  //   })
                  //}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Home', { screen : "Dashboard" ,params : {
                      id: this.props.route.params.id,}
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      color: '#a8a8a8',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontFamily: fonts.bold,
                    }}>
                    <Text style={styles.footerText}>Skip</Text>
                  </Text>
                </TouchableOpacity>
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
});

export default LinkYourAccount;
