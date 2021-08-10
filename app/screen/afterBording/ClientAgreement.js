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
  Alert,
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBackWhite} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {hp, wp} from '../../utils/responsive';
import DataManager from './../../utils/DataManager';
import {getAPI, postAPI} from './../../utils/Api';
const {height, width} = Dimensions.get('window');
import ShowToast from './../../component/Toast';
import Spinner from './../../utils/Loader';

class ClientAgreement extends Component {
  constructor(props) {
    super();
    this.state = {
      userId: '',
      orbisToken: '',
      loadingSpinner: false,
    };
  }

  componentDidMount = async () => {
    console.log('Client Agreement', this.props.route.params.data);
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id, userDetails.orbisToken);
    this.setState({userId: userDetails._id});
    this.setState({orbisToken: userDetails.orbisToken});
    var applicationId = await DataManager.getApplicationId();
    applicationId = JSON.parse(applicationId);
    console.log('Appid', applicationId);
    this.setState({application_id: applicationId});

    if (this.props.route.params) {
      this.setState({userDetails: this.props.route.params.data.userDetails});
    }

    var SignUpDetails = await DataManager.getSignUpDetails();
    SignUpDetails = JSON.parse(SignUpDetails);
    console.log('getSignUpDetails', SignUpDetails);
    this.setState({
      accountType: SignUpDetails.accountType,
      email: SignUpDetails.email,
      countryCode: SignUpDetails.countryCode,
      firstName: SignUpDetails.firstName,
      interestedAccount: SignUpDetails.interestedAccount,
      lastName: SignUpDetails.lastName,
      middleName: SignUpDetails.middleName,
      mobileNo: SignUpDetails.mobileNo,
    });
  };

  uploadPancardImage = () => {
    var data = new FormData();
    const panCardImage = {
      name: this.state.userDetails.PancardFront.filename,
      type: this.state.userDetails.PancardFront.mime,
      uri:
        Platform.OS === 'android'
          ? this.state.userDetails.PancardFront.sourceURL
          : this.state.userDetails.PancardFront.sourceURL.replace(
              'file://',
              '',
            ),
    };

    console.log('PanCard image', panCardImage, this.state.orbisToken);
    data.append('application_id', this.state.application_id);
    data.append('question_id', 10116);
    data.append('data', panCardImage);
    fetch('https://accounts-api-sandbox.orbisfn.io/api/applications/answer', {
      //Header Defination
      method: 'POST',
      body: data,
      headers: {
        Authorization: 'bearer' + this.state.orbisToken,
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => {
      console.log('Form Submitted', response);
      if (response.status == 200) {
        this.uploadAddressFrontImage();
        ShowToast('Pan card Image upload successfully.');
      } else {
        ShowToast('Some this went wrong!.');
        this.setState({loadingSpinner: false});
      }
    });
  };

  uploadAddressFrontImage = () => {
    var data = new FormData();
    const addressFrontImage = {
      name: this.state.userDetails.AddressVerificationFront.filename,
      type: this.state.userDetails.AddressVerificationFront.mime,
      uri:
        Platform.OS === 'android'
          ? this.state.userDetails.AddressVerificationFront.sourceURL
          : this.state.userDetails.AddressVerificationFront.sourceURL.replace(
              'file://',
              '',
            ),
    };

    console.log('PanCard image', addressFrontImage, this.state.orbisToken);
    data.append('application_id', this.state.application_id);
    data.append('question_id', 10113);
    data.append('data', addressFrontImage);
    fetch('https://accounts-api-sandbox.orbisfn.io/api/applications/answer', {
      //Header Defination
      method: 'POST',
      body: data,
      headers: {
        Authorization: 'bearer' + this.state.orbisToken,
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => {
      console.log('Form Submitted', response);
      if (response.status == 200) {
        this.uploadAddressBackImage();
        ShowToast('Address front image upload successfully.');
      } else {
        this.setState({loadingSpinner: false});
        ShowToast('Some this went wrong!.');
      }
    });
  };

  uploadAddressBackImage = () => {
    var data = new FormData();
    const addressBackImage = {
      name: this.state.userDetails.AddressVerificationBack.filename,
      type: this.state.userDetails.AddressVerificationBack.mime,
      uri:
        Platform.OS === 'android'
          ? this.state.userDetails.AddressVerificationBack.sourceURL
          : this.state.userDetails.AddressVerificationBack.sourceURL.replace(
              'file://',
              '',
            ),
    };

    console.log('PanCard image', addressBackImage, this.state.orbisToken);
    data.append('application_id', this.state.application_id);
    data.append('question_id', 10114);
    data.append('data', addressBackImage);
    fetch('https://accounts-api-sandbox.orbisfn.io/api/applications/answer', {
      //Header Defination
      method: 'POST',
      body: data,
      headers: {
        Authorization: 'bearer' + this.state.orbisToken,
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => {
      console.log('Form Submitted', response);
      if (response.status == 200) {
        this.uploadSignatureImage();
        ShowToast('Address backside image upload successfully.');
      } else {
        this.setState({loadingSpinner: false});
        ShowToast('Some this went wrong!.');
      }
    });
  };
  uploadSignatureImage = () => {
    var data = new FormData();
    const signatureImage = {
      name: this.state.userDetails.signatureImage.filename,
      type: this.state.userDetails.signatureImage.mime,
      uri:
        Platform.OS === 'android'
          ? this.state.userDetails.signatureImage.sourceURL
          : this.state.userDetails.signatureImage.sourceURL.replace(
              'file://',
              '',
            ),
    };

    console.log('PanCard image', signatureImage, this.state.orbisToken);
    data.append('application_id', this.state.application_id);
    data.append('question_id', 10112);
    data.append('data', signatureImage);
    fetch('https://accounts-api-sandbox.orbisfn.io/api/applications/answer', {
      //Header Defination
      method: 'POST',
      body: data,
      headers: {
        Authorization: 'bearer' + this.state.orbisToken,
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => {
      console.log('Form Submitted', response);
      if (response.status == 200) {
        ShowToast('Signature image upload successfully.');
        this.submitAll();
      } else {
        ShowToast('Some this went wrong!.');
        this.setState({loadingSpinner: false});
      }
    });
  };

  handleSubmit = async () => {
    // this.uploadPancardImage();
    this.setState({loadingSpinner: true});
    this.submitAll();
    // Alert.alert(String(this.state.userDetails.TypeOfDocumentYouAreUploading));
  };

  submitAll = () => {
    var x = this.state.userDetails.address;
    var z = this.state.userDetails.address;
    var we = z
      .split(' ')
      .slice(3, 7)
      .join(' ');
    var xx = this.state.userDetails.address;
    var yy = xx
      .split(' ')
      .slice(7, 10)
      .join(' ');

    var y = x
      .split(' ')
      .slice(0, 3)
      .join(' ');

    const dataToSend = {
      userId: this.state.userId,
      application_id: this.state.application_id,
      answers: JSON.stringify([
        {question_id: 9984, data: this.state.accountType == 1 ? 10355 : 10356}, // Customer type 10355/individual 10356/Joint
        {question_id: 9985, data: 10357}, // Account Type cash/10357 margin/10358
        {question_id: 9986, data: String(this.state.firstName)}, //Account First Name
        {question_id: 9988, data: String(this.state.lastName)}, // Account last name
        {question_id: 9996, data: String(this.state.userDetails.SSNNumber)}, // SSN Number

        {question_id: 9990, data: String(this.state.userDetails.date)}, // Dob
        {question_id: 9991, data: String(this.state.mobileNo)}, // Home Phone number
        {question_id: 9992, data: String(this.state.email)}, // Email Address
        {question_id: 9993, data: String(this.state.userDetails.bankName)}, // bank name
        {
          question_id: 9994,
          data: this.state.userDetails.USCitizen ? 10359 : 10360,
        }, // Citizen of Us 10359/yes no/10360
        {
          question_id: 10002,
          data:
            this.state.userDetails.countryName == 'United States of America'
              ? 10366
              : 10367,
        }, //Is your current address in the United States? yes/10366 no/10367
        {question_id: 10004, data: y}, // Address Line 1
        {question_id: 10005, data: we}, // Address Line 2
        {question_id: 10006, data: yy}, // Address Line 3
        {question_id: 10010, data: String(this.state.userDetails.zipCode)}, // Zip/Postal Code
        {
          question_id: 10011,
          data: this.state.userDetails.isYourMailingSame ? 10368 : 10369,
        }, // Is your mailing address the same as your home address? yes/10368 no/10369
        {question_id: 10021, data: this.state.userDetails.empolymentId}, // What is your employment status?
        {question_id: 10025, data: String(this.state.userDetails.bankName)}, // Bank Name Double
        {question_id: 10026, data: String(this.state.userDetails.bankCityName)}, // City of your bank branch
        {
          question_id: 10027,
          data: String(this.state.userDetails.bankAccountNumber),
        }, // Bank Account Number
        {
          question_id: 10028,
          data: this.state.userDetails.HaveYouAnotherParty ? 10379 : 10380,
        }, // Have you granted trading authorization to another party yes/10379 no/10380
        {
          question_id: 10030,
          data: this.state.userDetails.AccountHolderControlPerson
            ? 10381
            : 10382,
        }, // Is the account holder a control person of a publicly traded company? (Director, Officer, or 10% Stock Holder yes/10381 no/10382
        {
          question_id: 10032,
          data: this.state.userDetails.AnyOneAuthorizeToTradeInYourAcccount
            ? 10383
            : 10384,
        }, // Are you, or anyone authorized to trade in your account, affiliated with or work with or work for a member firm of a stock exchange or FINRA? yes/10383 no/10384
        {
          question_id: 10034,
          data: this.state.userDetails.FormerlyPoliticallyExposedPerson
            ? 10385
            : 10386,
        }, // Is the account maintained for a current or former politically exposed person or public official? yes/10385 no/10386
        {question_id: 10041, data: 10391}, //Do you agree to Form CRS and Reg BI disclosures presented to you? checkbox : 10391 if true
        {question_id: 10043, data: 10393}, // legat disclosure checkbox : 10393
        {question_id: 10045, data: this.state.userDetails.annualIncomeId}, //Annual income
        {question_id: 10046, data: this.state.userDetails.totalNetWorth}, // Total Net Worth
        {question_id: 10047, data: this.state.userDetails.liquidNetWorth}, // Liquid net worth
        {question_id: 10048, data: this.state.userDetails.investmentExp}, // Investment Experience
        {question_id: 10049, data: this.state.userDetails.investmentObjs}, //Investment Objective
        {question_id: 10050, data: this.state.userDetails.liquidityNeeds}, // Liquidity Needs
        {question_id: 10051, data: this.state.userDetails.timeHorizn}, // Time Horizon
        {question_id: 10111, data: 10454}, // "data": "I agree to the above and electronically sign the agreement",
        // {"question_id": 10112,"data": this.state.userDetails.signatureImage.data }, // Signature Image upload
        // {"question_id": 10113,"data": this.state.userDetails.AddressVerificationFront.filename}, // Address verification (front) image
        // {"question_id": 10114,"data": this.state.userDetails.AddressVerificationBack}, // Address verification (back)
        {
          question_id: 10115,
          data: this.state.userDetails.docType,
        }, //Type of ID document you are uploading
        // {"question_id": 10116,"data": this.state.userDetails.PancardFront}, //PAN Card front
      ]),
    };

    postAPI('giveMultipleAnswer', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.props.navigation.navigate('FundYourAccount', {
            id: this.props.route.params.data.id,
          });

          this.setState({loadingSpinner: false});
        } else {
          this.setState({loadingSpinner: false});
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        this.setState({loadingSpinner: false});
      });
  };
  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBackWhite
            backgroundColor={1}
            Header="Client Agreement"
            labelStyle={styles.labelStyle}
            onActionLeft={() => this.props.navigation.goBack()}
          />

          <ScrollView>
            <View style={{padding: 29}}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 16,
                  fontFamily: fonts.bold,
                  // marginTop: 29,
                  marginBottom: 22,
                  // marginHorizontal: 40,
                  fontWeight: '600',
                  // textAlign  : "left"
                }}>
                Kindly Review the agreement & Disclosure
              </Text>
              <View style={[styles.textContainer]}>
                <Text style={[styles.btnText, {marginBottom: 10}]}>
                  {
                    this.props.route.params.data.pages[1].sections[1]
                      .questions[1].translations[0].data
                  }
                </Text>
                <Text style={styles.btnText}>
                  {
                    this.props.route.params.data.pages[3].sections[3]
                      .questions[1].translations[0].data
                  }
                </Text>
                {/* <Text
                  style={[
                    styles.btnText,
                    {marginTop: Platform.OS == 'android' ? 10 : 10},
                  ]}>
                  {
                    this.props.route.params.data.pages[3].sections[3]
                      .questions[1].options[0].translations[0].data
                  }
                </Text> */}
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
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                }}>
                <ButtonWithoutShadow
                  width={width - 250}
                  height={43}
                  borderRadius={20}
                  labelColor={colors.blue}
                  label="Disagree"
                  backgroundColor={colors.light_blue}
                  onAction={() =>
                    alert("We can't open your account until you agree")
                  }
                />
                <ButtonWithoutShadow
                  width={width - 250}
                  height={43}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Agree"
                  backgroundColor={colors.blue}
                  marginLeft={10}
                  onAction={
                    () => this.handleSubmit()
                    // this.props.navigation.navigate('FundYourAccount', {
                    //   id: this.props.route.params.data.id,
                    // })
                  }
                />
              </View>
            </View>
          </View>
          <Spinner
            visible={this.state.loadingSpinner}
            cancelable={true}
            indicatorStyle={{color: colors.red}}
          />
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

    textAlign: 'left',
    marginLeft: 5,
  },
  textContainer: {
    backgroundColor: colors.white,
    padding: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 5,
    elevation: 7,
    marginBottom: 150,
  },
  labelStyle: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fonts.bold,
    // marginTop: 54,
    marginHorizontal: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ClientAgreement;
