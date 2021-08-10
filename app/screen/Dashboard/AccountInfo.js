import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import Dropdown from '../../component/Picker';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {wp, hp} from '../../utils/responsive';
import Spinner from './../../utils/Loader';
import {getAPI, postAPI} from './../../utils/Api';
import ShowToast from '../../component/Toast';
import DataManager from './../../utils/DataManager';
const {height, width} = Dimensions.get('window');
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import PhoneCode from './../../utils/PhoneCode';
import {dobValidation} from './../../component/Validation';

class AccountInfo extends Component {
  constructor(props) {
    super();
    this.state = {
      loadingSpinner: false,
      selectedValue: '',
      lowercasetext: 'State',
      userId: '',
      loadingSpinner: false,
      userDetails: null,
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      countryCode1: '',
      mobileNo: '',
      isDatePickerVisible: false,
      DOB: '',
      countryCode: '',
      SSN: '',
      Address1: '',
      Address2: '',
      zipCode: '',
      State: [],
      PhoneCodeNew: [
        {name: 'India', dial_code: '+91', code: 'IN'},
        {name: 'United States', dial_code: '+1', code: 'US'},
      ],
    };
  }
  onValueChange = value => {
    this.setState({selectedValue: value.name});
  };
  componentDidMount = async () => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);
    this.setState({userId: userDetails._id});
    if (this.state.userId) {
      this.getUserDetails();
      this.getStateList();
    }
  };

  getUserDetails = () => {
    this.setState({loadingSpinner: true});
    getAPI(`getMyAccountInfo/` + `${this.state.userId}`, null)
      .then(response => {
        if (response.status == 200) {
          this.setState({loadingSpinner: false});
          this.setState({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            middleName: response.data.middleName,
            countryCode: response.data.countryCode,
            email: response.data.email,
            mobileNo: response.data.mobileNo,
            SSN: response.data.ssn,
            DOB: response.data.dob,
            Address1: response.data.address1,
            Address2: response.data.address2,
            zipCode: response.data.zipcode,
            selectedValue: response.data.state,
            mobileNumber2: response.data.mobileNo,
          });
          // this.setState({userDetails: response.data});
          console.log('userDetails', JSON.stringify(response.data));
        } else {
          this.setState({loadingSpinner: false});
          // ShowToast('Something went Wrong!');
        }
      })
      .catch(err => {
        this.setState({loadingSpinner: false});
      });
  };
  getStateList = () => {
    const dataToSend = {
      userId: this.state.userId,
    };

    //  console.log("UserId,useEFfect",props.userId);
    postAPI('getStateList', dataToSend)
      .then(response => {
        if (response.status == 200) {
          console.log('states', response);
          this.setState({State: response.data.states});
        } else {
          ShowToast(response.message);
        }
      })
      .catch(error => {
        console.log(error);
        // ShowToast('Something went Wrong!');
      });
  };
  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = date => {
    this.setState({DOB: moment(date).format('DD/MM/YYYY')});
    this.hideDatePicker();
  };

  handleSubmit = async () => {
    if (!this.state.firstName) {
      ShowToast('Please enter first name!');
    } else if (!this.state.lastName) {
      ShowToast('Please enter last name!');
    } else if (!this.state.email) {
      ShowToast('Please enter email!');
    } else if (!this.state.countryCode) {
      ShowToast('Please select country code!');
    } else if (!this.state.mobileNo) {
      ShowToast('Please enter mobile number!');
    } else if (!this.state.SSN) {
      ShowToast('Please enter SSN Number!');
    } else if (!this.state.DOB) {
      ShowToast('Please enter Date of birth!');
    } else if (!dobValidation(this.state.DOB.trim())) {
      ShowToast('Please select valid DOB (DD/MM/YYYY)');
    } else if (!this.state.Address1) {
      ShowToast('Please enter Street Address 1 !');
    } else if (!this.state.Address2) {
      ShowToast('Please enter Street Address 2 !');
    } else if (!this.state.zipCode) {
      ShowToast('Please enter Zipcode!');
    } else if (!this.state.selectedValue) {
      ShowToast('Please enter State!');
    } else {
      // ShowToast('Complete');
      this.setState({loadingSpinner: true});
      const dataToSend = {
        mobileNo: this.state.mobileNo,
        countryCode: this.state.countryCode,

        userId: this.state.userId,
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        lastName: this.state.lastName,
        ssn: this.state.SSN,
        dob: this.state.DOB,
        address1: this.state.Address1,
        address2: this.state.Address2,
        zipcode: this.state.zipCode,
        state: this.state.selectedValue,
      };

      postAPI('updateAccountInfo', dataToSend)
        .then(response => {
          if (response.status == 200) {
            this.setState({loadingSpinner: false});
            console.log('Account Info', JSON.stringify(response.data));
            DataManager.setUserDetail(response.data);
            DataManager.setSignUpDetails(response.data);
            ShowToast(response.message);
            // this.props.navigation.navigate('Home', {screen : 'Dashboard',
            //   params : {id : 7}
            // });
          } else {
            this.setState({loadingSpinner: false});
            ShowToast(response.message);
          }
          console.log(response, response.message);
        })
        .catch(err => {
          this.setState({loadingSpinner: false});
          // ShowToast('Something went wrong!');
          console.log(err);
        });
    }
  };

  onTextChange = text => {
    if (this.state.countryCode == '+1') {
      this.setState({
        mobileNo: text,
      });

      var cleaned = ('' + text).replace(/\D/g, '');
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        var intlCode = match[1] ? '+1 ' : '',
          number = [
            intlCode,
            '(',
            match[2],
            ') ',
            match[3],
            '-',
            match[4],
          ].join('');

        this.setState({
          mobileNumber2: number,
        });

        return;
      }

      this.setState({
        mobileNumber2: text,
      });
    } else {
      this.setState({
        mobileNumber2: text,
        mobileNo: text,
      });
    }
  };

  setSSNMethod = text => {
    var cleaned = ('' + text).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      number = [match[3], '-', match[2], '-', match[4]].join('');

      this.setState({SSN: number});

      return;
    }

    this.setState({SSN: text});
  };

  setDOBText = text => {
    var cleaned = ('' + text).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{2})(\d{2})(\d{4})$/);
    if (match) {
      number = [match[2], '/', match[2], '/', match[4]].join('');

      this.setState({DOB: number});

      return;
    }

    this.setState({DOB: text});
  };

  render() {
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.statusBarColor}
        />
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            Header="Account Info"
            labelStyle={styles.labelStyle}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView>
            <View style={{flex: 1, marginLeft: 40, marginRight: 40}}>
              <View
                style={{
                  marginTop: 19,
                  marginBottom: 50,
                  alignSelf: 'center',
                }}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.heading}>First Name</Text>
                  <PlainTextInput
                    height={43}
                    backgroundColor={colors.white}
                    width={width - 90}
                    borderRadius={30}
                    marginTop={0}
                    placeholder="First Name"
                    label=""
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    maxLength={50}
                    onChangeText={firstName => this.setState({firstName})}
                    value={this.state.firstName}
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.heading}>Last Name</Text>
                  <PlainTextInput
                    height={43}
                    backgroundColor={colors.white}
                    width={width - 90}
                    borderRadius={30}
                    marginTop={0}
                    placeholder="Middle Name"
                    label=""
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    maxLength={50}
                    onChangeText={middleName => this.setState({middleName})}
                    value={this.state.middleName}
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.heading}>Last Name</Text>
                  <PlainTextInput
                    height={43}
                    backgroundColor={colors.white}
                    width={width - 90}
                    borderRadius={30}
                    marginTop={0}
                    placeholder="Last Name"
                    label=""
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    maxLength={50}
                    onChangeText={lastName => this.setState({lastName})}
                    value={this.state.lastName}
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.heading}>Email Address</Text>
                  <PlainTextInput
                    height={43}
                    backgroundColor={colors.white}
                    width={width - 90}
                    borderRadius={30}
                    marginTop={0}
                    placeholder="Email address"
                    label=""
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    maxLength={50}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.heading}>Mobile Number</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: wp('70'),
                      // justifyContent: 'space-between',
                      left: 23,
                    }}>
                    <Dropdown
                      dropdownWidth={Platform.OS == 'ios' ? wp('23') : wp('25')}
                      data={this.state.PhoneCodeNew.map(item => {
                        return {item: item.dial_code, value: item.dial_code};
                      })}
                      selectedValue={this.state.countryCode}
                      onValueChange={(index, item) =>
                        this.setState({countryCode: item.name})
                      }
                      pickerMarginTop={0}
                      value={this.state.countryCode}
                    />
                    <PlainTextInput
                      height={43}
                      backgroundColor={colors.white}
                      width={width - 180}
                      borderRadius={30}
                      marginTop={0}
                      label=""
                      labelColor={colors.labelColor}
                      placeholderColor={colors.placeHolderColor}
                      inputTextColor={colors.text}
                      maxLength={50}
                      onChangeText={value => this.onTextChange(value)}
                      placeholder="Phone number"
                      keyboardType={'number-pad'}
                      value={this.state.mobileNumber2}
                    />
                  </View>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.heading}>
                    {' '}
                    {this.state.countryCode == '+1' ? 'SSN' : 'Adhar Number'}
                  </Text>
                  <PlainTextInput
                    height={43}
                    backgroundColor={colors.white}
                    width={width - 90}
                    borderRadius={30}
                    marginTop={0}
                    placeholder={
                      this.state.countryCode == '+1' ? 'SSN' : 'Adhar Number'
                    }
                    label=""
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    maxLength={50}
                    keyboardType={'number-pad'}
                    onChangeText={SSN => this.setSSNMethod(SSN)}
                    value={this.state.SSN}
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.heading}>Date Of Birth</Text>
                  <PlainTextInput
                    height={43}
                    backgroundColor={colors.white}
                    width={width - 89}
                    borderRadius={30}
                    placeholder="Date Of Birth"
                    label=""
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    maxLength={50}
                    iconName={'calendar'}
                    keyboardType={'number-pad'}
                    onChangeText={value => this.setDOBText(value)}
                    value={this.state.DOB}
                    onIconClick={() => this.showDatePicker()}
                  />
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={date => this.handleConfirm(date)}
                    onCancel={this.hideDatePicker}
                    // date={new Date()}
                    // maximumDate={new Date()}
                    // minimumDate = {12/12/1950}
                  />
                </View>
                <View>
                  <Text style={styles.addressHeading}>Address</Text>

                  <PlainTextInput
                    height={43}
                    backgroundColor={colors.white}
                    width={width - 90}
                    borderRadius={30}
                    marginTop={0}
                    placeholder="Street Address 1"
                    label=""
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    maxLength={50}
                    onChangeText={Address1 => this.setState({Address1})}
                    value={this.state.Address1}
                  />
                  <PlainTextInput
                    height={43}
                    backgroundColor={colors.white}
                    width={width - 90}
                    borderRadius={30}
                    marginTop={17}
                    placeholder="Street Address 2"
                    label=""
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    maxLength={50}
                    onChangeText={Address2 => this.setState({Address2})}
                    value={this.state.Address2}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <PlainTextInput
                      height={43}
                      backgroundColor={colors.white}
                      width={width - wp('64%')}
                      borderRadius={30}
                      marginTop={17}
                      placeholder="Zip Code"
                      label=""
                      labelColor={colors.labelColor}
                      placeholderColor={colors.placeHolderColor}
                      inputTextColor={colors.text}
                      maxLength={50}
                      onChangeText={zipCode => this.setState({zipCode})}
                      value={this.state.zipCode}
                    />
                    <View style={{marginLeft: 5}}>
                      <Dropdown
                        value={'State'}
                        dropdownWidth={wp('38.5')}
                        data={
                          this.state.State.length > 0
                            ? this.state.State.map(item => {
                                return {item: item.id, value: item.name};
                              })
                            : []
                        }
                        selectedValue={this.state.selectedValue}
                        onValueChange={(index, item) =>
                          //this.onValueChange(item.name)
                          this.setState({selectedValue: item.name})
                        }
                        pickerMarginTop={17}
                        value={this.state.selectedValue}
                      />
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <ButtonWithoutShadow
                      width={wp('50%')}
                      height={43}
                      marginTop={30}
                      // marginTop={Platform.OS == "android"?hp("56.97%") :hp("56.97%")}
                      borderRadius={20}
                      labelColor={colors.white}
                      label="Save"
                      backgroundColor={colors.blue}
                      onAction={() => this.handleSubmit()}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <Spinner
            //visibility of Overlay Loading Spinner
            visible={this.state.loadingSpinner}
            //Text with the Spinner
            //Text style of the Spinner Text
            cancelable={true}
            indicatorStyle={{color: colors.red}}
          />
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
  byContinueText: {
    color: colors.black,
    fontSize: wp('3.2%'),
    fontFamily: fonts.regular,
    textAlign: 'center',
    lineHeight: 27,
    textAlign: 'center',
    fontStyle: 'normal',
    // marginBottom : hp("5%")
    marginTop: 51,
  },
  termAndCondition: {
    color: colors.info_color,
    fontSize: wp('4%'),
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'normal',
    marginTop: 9,
  },
  heading: {
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 14,
    marginLeft: 24,
    marginBottom: 4,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  addressHeading: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 21,
    marginTop: 14,
    marginLeft: 0,
    marginBottom: 18,
  },
});

export default AccountInfo;
