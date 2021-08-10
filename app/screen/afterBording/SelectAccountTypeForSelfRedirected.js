import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {hp, wp} from '../../utils/responsive';
import ShowToast from './../../component/Toast';
import {postAPI, getAPI} from './../../utils/Api';
const {height, width} = Dimensions.get('window');
import DataManager from './../../utils/DataManager';
import Spinner from './../../utils/Loader';

class SelectAccountType extends Component {
  constructor(props) {
    super();
    this.state = {
      loadingSpinner: false,
      value: null,
      index: [],
      accountSelectedId: null,
      accountType: [
        {
          AccountType: 'Cash',
          optionId: '10357',
          qustion_id: '9985',
          text:
            'An individual brokerage account has the name of one account owner.',
        },
        {
          AccountType: 'Magin',
          optionId: '10358',
          qustion_id: '9985',
          text:
            'A joint brokerage account is shared by two or more individuals. Joint brokerage accounts are most commonly held by spouses.',
        },
      ],
      Pages: [],
    };
  }

  onClick = async index => {
    console.log('Position' + index);
    this.setState({accountSelectedId: index});

    this.setState(prev => ({
      accountType: prev.accountType.map((val, i) =>
        i === index
          ? {...val, value: val.value ? false : true, id: i}
          : {...val, value: false},
      ),
    }));
  };

  componentDidMount = () => {
    console.log('this.props.route.params.id' + this.props.route.params.id);
  };

  handleSubmit = () => {
    const {accountSelectedId} = this.state;
    const {id} = this.props.route.params;

    if (this.state.accountSelectedId == null) {
      ShowToast('Please select one option!');
      console.log('Yess');
    } else {
      const dataToSend = {
        email: this.props.route.params.userDetails.email,
        userName: this.props.route.params.userDetails.userName,
        firstName: this.props.route.params.userDetails.firstName,
        middleName: this.props.route.params.userDetails.middleName
          ? this.props.route.params.userDetails.middleName
          : '',
        lastName: this.props.route.params.userDetails.lastName,
        countryCode: this.props.route.params.userDetails.countryCode,
        mobileNo: this.props.route.params.userDetails.mobileNumber,
        password: this.props.route.params.userDetails.confirmPassword,
        interestedAccount:
          this.props.route.params.userDetails.interestedAccount == 1
            ? 47
            : this.props.route.params.userDetails.interestedAccount == 2
            ? 48
            : 49,
        accountType: accountSelectedId == 0 ? 1 : 2,
        deviceType: Platform.OS == 'android' ? 'Android' : 'Ios',
        deviceId: 'sjdflkjdsklfjkldsf',
        deviceToken: 'jkljkljkljkljkljkl',
        // otp: this.props.route.params.userDetails.otp,
      };

      console.log('Is Prams' + JSON.stringify(dataToSend));
      this.setState({loadingSpinner: true});
      postAPI('createUser', dataToSend)
        .then(response => {
          if (response.status == 200) {
            this.setState({loadingSpinner: false});
            DataManager.setUserDetail(response.data);
            DataManager.setSignUpDetails(response.data);
            //ShowToast(response.message);

            this.getFormData(response.data._id);
            if (this.props.route.params.id == 1) {
              this.props.navigation.navigate('StartYourSignUpJourney1', {
                id: 1,
              });
            } else if (this.props.route.params.id == 2) {
              this.props.navigation.navigate('ManagedAccount', {id: 2});
            } else {
              this.props.navigation.navigate('DualCreateBasket', {id: 5});
            }
          } else {
            this.setState({loadingSpinner: false});
            ShowToast(response.message);
          }
          console.log(response, response.message);
        })
        .catch(err => {
          this.setState({loadingSpinner: false});
          console.log(err);
          // ShowToast('Something went wrong!');
        });
    }
  };

  getFormData = id => {
    console.log('is Id hai' + this.props.route.params);
    getAPI(`getApplicationForm/` + id, null).then(response => {
      if (response.data.application_type) {
        DataManager.setPages(response.data.application_type.pages);
        this.setState({pages: response.data.application_type.pages});
        console.log('Arrrea', response.data.application_type);
      }
    });
  };

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            onActionLeft={() => this.props.navigation.navigate('WalkThrough')}
          />
          <ScrollView>
            <View
              style={{
                flex: 1,
                marginLeft: 40,
                marginRight: 30,
              }}>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: 23,
                  fontFamily: fonts.bold,
                  marginTop: 50,
                  fontWeight: '600',
                  marginHorizontal: 3,
                }}>
                Select Account Type :
              </Text>

              <View style={styles.accordianTextContainer}>
                <View style={styles.accordianPadding}>
                  <View
                    style={{
                      marginBottom: 10,
                      borderRadius: 8,
                      alignSelf: 'center',
                    }}>
                    <View style={{width: '100%'}}>
                      <FlatList
                        data={this.state.accountType}
                        numColumns={1}
                        scrollEnabled={false}
                        renderItem={({item, index}) => (
                          //console.log("item",item)
                          <View
                            style={{
                              borderBottomWidth:
                                Platform.OS == 'android' ? 0.4 : 0.25,
                              borderBottomColor: colors.grayColor,
                            }}>
                            <TouchableOpacity
                              style={[
                                styles.childRow,
                                item.value
                                  ? styles.btnActive
                                  : styles.btnInActive,
                              ]}
                              onPress={() => this.onClick(index)}>
                              {item.value ? (
                                <Image
                                  source={localImages.active_radio_button}
                                  style={{
                                    // borderRadius: 50,
                                    height: 20,
                                    width: 20,
                                    // alignSelf: 'center',
                                  }}></Image>
                              ) : (
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 50,
                                    borderColor: 'gray',
                                    borderWidth: 0.4,
                                  }}></View>
                              )}
                              <View style={{width: wp('45%')}}>
                                <Text
                                  style={
                                    item.value ? styles.title1 : styles.title
                                  }>
                                  {item.AccountType}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: wp('20%'),
                                  alignItems: 'flex-end',
                                }}>
                                <Image
                                  source={
                                    item.value
                                      ? localImages.up
                                      : localImages.down
                                  }
                                  style={{
                                    height: 14,
                                    width: 14,
                                    resizeMode: 'contain',
                                  }}></Image>
                              </View>
                            </TouchableOpacity>
                            {item.value ? (
                              <View style={styles.AccordianTextContainer}>
                                <Text style={styles.accordianText}>
                                  {item.text}
                                </Text>
                              </View>
                            ) : null}
                          </View>
                        )}
                      />

                      <Spinner
                        //visibility of Overlay Loading Spinner
                        visible={this.state.loadingSpinner}
                        cancelable={true}
                        indicatorStyle={{color: colors.red}}
                      />
                    </View>

                    <View style={styles.parentHr} />
                    {}
                  </View>
                </View>
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
                onAction={
                  this.handleSubmit
                  // this.props.navigation.navigate('ManagedAccount',{id:2})
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
    marginTop: 30,
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
    borderWidth: 0,
    width: '100%',
    alignSelf: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.extraBold,
    color: colors.text,
    marginRight: 5,
    marginLeft: wp('10%'),
  },
  title1: {
    fontSize: 16,
    fontFamily: fonts.extraBold,
    color: colors.blue,
    marginRight: 5,
    marginLeft: wp('8%'),
  },
  itemActive: {
    fontSize: 16,
    color: colors.faqAn,
    fontFamily: fonts.regularRoman,
    marginLeft: 20,
  },
  itemInActive: {
    fontSize: 16,
    color: colors.faqAn,
    fontFamily: fonts.regularRoman,
    marginLeft: 20,
  },
  btnActive: {
    backgroundColor: colors.white,
  },
  btnInActive: {
    backgroundColor: colors.DARKGRAY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 50,
    width: width - 40,
    paddingLeft: 15,
    marginLeft: 5,
    // marginBottom: 10,
    // paddingRight: 18,
    alignItems: 'center',
    backgroundColor: colors.authBackGroud,
    //padding: 5,
  },
  childRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    minHeight: 50,
    width: width - 80,
    paddingLeft: 15,
    // marginLeft: 5,
    // marginBottom: 10,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: colors.authBackGroud,
    padding: 5,
  },
  //   parentHr: {
  //     color: colors.white,
  //     width: '100%',
  //   },
  childHr: {
    height: 1,
    backgroundColor: colors.LIGHTGRAY,
    width: '100%',
  },
  colorActive: {
    borderColor: colors.GREEN,
  },
  colorInActive: {
    borderColor: colors.DARKGRAY,
  },
  AccordianTextContainer: {
    backgroundColor: colors.white,
    // flex : 1,
    width: width - 80,
    alignSelf: 'center',
    padding: 5,
  },
  accordianText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.regularRoman,
    padding: 13,
    lineHeight: 20,
    //marginLeft: 20
    marginLeft: 48,
  },
  viewSeparator: {
    borderColor: '#707070',
    borderWidth: 0.3,
    width: '100%',
    alignSelf: 'center',
  },
});

export default SelectAccountType;

// import React, {Component} from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
// import InputBox from '../../component/InputBox';
// import {colors, fonts} from '../../utils/constant';
// import {CustomStyles} from '../style/CustomStyles';
// import RadioButtonAccordian from './../../component/RadioButtonAccordian';
// import {hp, wp} from '../../utils/responsive';

// const {height, width} = Dimensions.get('window');

// class SelectAccountType extends Component {
//   constructor(props) {
//     super();
//     this.state = {
//       accountType: [
//         {AccountType: 'Individual', text: 'An individual brokerage account has the name of one account owner.'},
//         {AccountType: 'Joint', text: 'A joint brokerage account is shared by two or more individuals. Joint brokerage accounts are most commonly held by spouses.'},
//         {AccountType: 'Retirement', text: 'A retirement account, such as an IRA, is a brokerage account built specifically for retirement. The most common types are Traditional and Roth IRAs.'},
//       ],
//     };
//   }

//   render() {
//     return (
//       <>
//         <SafeAreaView style={CustomStyles.containerbording}>
//           <HeaderWithBack
//             backgroundColor={1}
//             onActionLeft={() => this.props.navigation.navigate('WalkThrough')}
//           />
//           <ScrollView>
//             <View style={{
//                 flex: 1,
//                 marginLeft: 40,
//                 marginRight: 30,
//               }}>
//               <Text
//                 style={{
//                   color: colors.blue,
//                   fontSize: 23,
//                   fontFamily: fonts.bold,
//                   marginTop: 50,
//                   fontWeight: '600',
//                   marginHorizontal : 3,
//                 }}>
//                 Select Account Type :
//               </Text>

//               <View style={styles.accordianTextContainer}>
//                 <View style={styles.accordianPadding}>
//                   <RadioButtonAccordian
//                     data={this.state.accountType}></RadioButtonAccordian>
//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//           <View
//             style={{
//               alignSelf: 'center',
//               position: 'absolute',
//               bottom: hp('0%'),
//               height: hp('16%'),
//               width: wp('100%'),
//               backgroundColor: colors.authBackGroud,
//             }}>
//             <View
//               style={{
//                 alignSelf: 'center',
//                 position: 'absolute',
//                 bottom: hp('8%'),
//               }}>
//                 <ButtonWithoutShadow
//                   width={wp('60%')}
//                   height={43}
//                   // marginTop={Platform.OS == "android"?hp("9%") :hp("14%")}
//                   borderRadius={20}
//                   labelColor={colors.white}
//                   label="Next"
//                   backgroundColor={colors.blue}
//                   onAction={() =>
//                     this.props.navigation.navigate('StartYourSignUpJourney1',{id : 1})
//                   }
//                 />
//               </View>
//               </View>
//         </SafeAreaView>
//       </>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   accordianTextContainer: {
//     marginTop: 30,
//   },
//   footerText: {
//     //width: width - 40,
//     height: 27,
//     fontFamily: fonts.regular,
//     fontSize: 16,
//     fontWeight: 'bold',
//     fontStyle: 'normal',
//     lineHeight: 19,
//     letterSpacing: 0,
//     textAlign: 'left',
//     // marginTop:50,
//     //marginStart:40,
//     //marginEnd:40,
//     color: '#72e2db',
//     textAlign: 'center',
//   },
//   accordianPadding: {
//     paddingTop: 8,
//     // paddingBottom : 4,
//   },
//   viewSeparator: {
//     borderColor: '#707070',
//     borderWidth: 0,
//     width: '100%',
//     alignSelf: 'center',
//   },
// });

// export default SelectAccountType;
