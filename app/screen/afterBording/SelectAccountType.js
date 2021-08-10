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
import {postAPI} from './../../utils/Api';
const {height, width} = Dimensions.get('window');
import Spinner from './../../utils/Loader';
import DataManager from './../../utils/DataManager';

class SelectAccountType extends Component {
  constructor(props) {
    super();
    this.state = {
      loadingSpinner: false,
      value: null,
      index: [],
      accountType: [
        // {
        //   qustion_id: this.state.Pages[0].sections[0].questions[0].id,
        //   title: this.state.Pages[0].sections[0].questions[0].translations[0].data,
        //   option1:
        //   this.state.Pages[0].sections[0].questions[0].options[0].translations[0].data,
        //   option1Id: this.state.pages[0].sections[0].questions[0].options[0].id,
        //   option2:
        //   this.state.Pages[0].sections[0].questions[0].options[1].translations[0].data,
        //   option2Id: this.state.Pages[0].sections[0].questions[0].options[1].id,
        //   yes: false,
        //   no: false,
        // },
        // {
        //   AccountType: 'Individual',
        //   text:
        //     'An individual brokerage account has the name of one account owner.',
        // },
        // {
        //   AccountType: 'Joint',
        //   text:
        //     'A joint brokerage account is shared by two or more individuals. Joint brokerage accounts are most commonly held by spouses.',
        // },
        // {AccountType: 'Retirement', text: 'A retirement account, such as an IRA, is a brokerage account built specifically for retirement. The most common types are Traditional and Roth IRAs.'},
      ],
      Pages: [],
    };
  }

  componentDidMount = async () => {
    const Pages = await DataManager.getPages();
    // Pages = JSON.parse(Pages)
    this.setState({Pages: JSON.parse(Pages)});

    const pages = JSON.parse(Pages);
    if (this.state.accountType.length == 0) {
      this.setState({
        accountType: [
          {
            AccountType:
              pages[0].sections[0].questions[1].options[0].translations[0].data,
            text:
              'An individual brokerage account has the name of one account owner.',
            optionId: pages[0].sections[0].questions[1].options[0].id,
            qustion_id: pages[0].sections[0].questions[1].id,
          },
          {
            AccountType:
              pages[0].sections[0].questions[1].options[1].translations[0].data,
            text:
              'A joint brokerage account is shared by two or more individuals. Joint brokerage accounts are most commonly held by spouses.',
            optionId: pages[0].sections[0].questions[1].options[1].id,
            qustion_id: pages[0].sections[0].questions[1].id,
          },
        ],
      });
    }
    // console.log("Select Account Type" ,pages[0].sections[0].questions[1].options[0] )
  };
  onClick = async index => {
    this.setState(prev => ({
      accountType: prev.accountType.map((val, i) =>
        i === index
          ? {...val, value: val.value ? false : true, id: i}
          : {...val, value: false},
      ),
    }));
  };
  componentDidUpdate = () => {
    console.log('WalkThrough', this.state.Pages, this.state.accountType);
  };

  handleSubmit = () => {
    this.props.navigation.navigate('ManagedAccount', {id: 2});
    // this.state.accountType.map((val, i) => {
    //   if (val.value == true) {

    //       const dataToSend = {
    //         email: this.props.route.params.userDetails.email,
    //         userName: this.props.route.params.userDetails.userName,
    //         firstName: this.props.route.params.userDetails.firstName,
    //         middleName: this.props.route.params.userDetails.middleName
    //           ? this.props.route.params.userDetails.middleName
    //           : '',
    //         lastName: this.props.route.params.userDetails.lastName,
    //         countryCode: this.props.route.params.userDetails.countryCode,
    //         mobileNo: this.props.route.params.userDetails.mobileNumber,
    //         password: this.props.route.params.userDetails.confirmPassword,
    //         interestedAccount: 2,
    //         accountType: i==0?"1":"2",
    //         deviceType: Platform.OS == 'android' ? 'Android' : 'Ios',
    //         deviceId: 'sjdflkjdsklfjkldsf',
    //         deviceToken: 'jkljkljkljkljkljkl',

    //       };
    //       this.setState({loadingSpinner: true});
    //     console.log('Params Data',dataToSend)

    //       postAPI('createUser', dataToSend)
    //         .then((response) => {
    //           if (response.status == 200) {
    //             this.setState({loadingSpinner: false});
    //             DataManager.setUserDetail(response.data)
    //             DataManager.setSignUpDetails(dataToSend)
    //             ShowToast(response.message);
    //             this.props.navigation.navigate('ManagedAccount', {id: 2});
    //           } else {
    //             this.setState({loadingSpinner: false});
    //             ShowToast(response.message);
    //           }
    //           console.log(response, response.message);
    //         })
    //         .catch((err) => {
    //           this.setState({loadingSpinner: true});
    //           console.log(err)});
    //           ShowToast('Something went wrong!');

    //   } else {
    //     ShowToast('Please select one option!');
    //   }
    // });
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
                {/* Select Account Type : */}
                {this.state.Pages.length > 0
                  ? this.state.Pages[0].sections[0].questions[0].translations[0]
                      .data
                  : ''}
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
                  () => this.handleSubmit()
                  // this.props.navigation.navigate('ManagedAccount',{id:2})
                }
              />
            </View>
            <Spinner
              //visibility of Overlay Loading Spinner
              visible={this.state.loadingSpinner}
              //Text with the Spinner
              //Text style of the Spinner Text
              cancelable={true}
              indicatorStyle={{color: colors.red}}
            />
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
