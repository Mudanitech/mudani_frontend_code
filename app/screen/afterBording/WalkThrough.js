import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {hp, wp} from '../../utils/responsive';
import {CustomStyles} from '../style/CustomStyles';
import Accordian from './../../component/Accordian';
import {postAPI, getAPI} from './../../utils/Api';
import ShowToast from './../../component/Toast';
import DataManager from './../../utils/DataManager';
import Spinner from './../../utils/Loader';

const {height, width} = Dimensions.get('window');

class WalkThrough extends Component {
  constructor(props) {
    super();
    this.state = {
      index: '',
      accountSelectedId: 1,
      isSelected: false,
      isSelectedIndex: null,
      data: [
        {
          heading: 'Mudani Invest',
          text: (
            <Text>
              Do it yourself. A{' '}
              <Text style={{fontWeight: 'bold'}}>Mudani Invest</Text>
               brokerage account is one in which you have complete control over
              how you invest & trade stocks. Mudani offers a free and premium
              version.
            </Text>
          ),
          isSelect: false,
        },
        {
          heading: 'Mudani Robo',
          text: (
            <Text>
              We do it for you. Our{' '}
              <Text style={{fontWeight: 'bold'}}>Mudani Robo</Text> is a
              robo-advised solution that generates a customized investment
              portfolio for you and manages it on a daily basis. The account is
              overseen by our team of expert financial advisors. Mudani offers
              this solution for a small monthly fee.
            </Text>
          ),
          isSelect: false,
        },
        {
          heading: 'Dual Journey',
          text: (
            <Text>
              A <Text style={{fontWeight: 'bold'}}>dual journey</Text> account
              lets you do both - trade yourself and have a
              professionally-managed portfolio.
            </Text>
          ),
          isSelect: false,
        },
      ],
      pages: [],
      userId: '',
      loadingSpinner: false,
    };
  }

  onClick = index => {
    this.setState({isSelectedIndex: index});
    this.setState(prev => ({
      data: prev.data.map((val, i) =>
        i === index
          ? {...val, isSelect: val.isSelect ? false : true}
          : {...val, isSelect: false},
      ),
    }));
  };

  renderItemP = ({item, index}) => {
    return (
      <View
        style={[
          styles.AccordianTextContainer,
          !item.isSelect
            ? {borderColor: colors.white}
            : {borderColor: colors.info_color},
        ]}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.onClick(index)}>
          {item.isSelect ? (
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
          <View style={{width: wp('60%')}}>
            <Text style={{marginLeft: 10}}>{item.heading}</Text>
          </View>
        </TouchableOpacity>

        <View>
          <Text style={styles.accordianText}>{item.text}</Text>
        </View>
      </View>
    );
  };
  // handleSubmit = () => {
  //   // this.props.navigation.navigate('SelectAccountType');

  //   const {isSelectedIndex} = this.state;

  //   console.log('Position' + isSelectedIndex);

  //   if (isSelectedIndex == null) {
  //     ShowToast('Please select one option!');
  //     return;
  //   }

  //   const dataToSend1 = {
  //     email: this.props.route.params.userDetails.email,
  //     userName: this.props.route.params.userDetails.userName,
  //     firstName: this.props.route.params.userDetails.firstName,
  //     middleName: this.props.route.params.userDetails.middleName,
  //     lastName: this.props.route.params.userDetails.lastName,
  //     countryCode: this.props.route.params.userDetails.countryCode,
  //     mobileNumber: this.props.route.params.userDetails.mobileNumber,
  //     confirmPassword: this.props.route.params.userDetails.confirmPassword,
  //     interestedAccount:
  //       isSelectedIndex == 0 ? 1 : isSelectedIndex == 1 ? 2 : 3,
  //     otp: this.props.route.params.userDetails.otp,
  //   };
  //   this.props.navigation.navigate('SelectAccountTypeForSelfRedirected', {
  //     userDetails: dataToSend1,
  //     id: isSelectedIndex == 0 ? 1 : isSelectedIndex == 1 ? 2 : 5,
  //   });
  // };

  handleSubmit = () => {
    const {isSelectedIndex, accountSelectedId} = this.state;
    const {id} = this.props.route.params;

    if (isSelectedIndex == null) {
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
          isSelectedIndex == 0 ? 47 : isSelectedIndex == 1 ? 48 : 49,
        accountType: accountSelectedId == 0 ? 1 : 2,
        deviceType: Platform.OS == 'android' ? 'Android' : 'Ios',
        deviceId: 'sjdflkjdsklfjkldsf',
        deviceToken: 'jkljkljkljkljkljkl',
        // otp: this.props.route.params.userDetails.otp,
      };

      this.setState({loadingSpinner: true});
      postAPI('createUser', dataToSend)
        .then(response => {
          if (response.status == 200) {
            this.setState({loadingSpinner: false});
            DataManager.setUserDetail(response.data);
            DataManager.setSignUpDetails(response.data);
            //ShowToast(response.message);

            this.getFormData(response.data._id);
            if (isSelectedIndex == 0) {
              this.props.navigation.navigate('StartYourSignUpJourney1', {
                id: 1,
              });
            } else if (isSelectedIndex == 1) {
              this.props.navigation.navigate('ManagedAccount', {id: 2});
            } else {
              this.props.navigation.navigate('DualCreateBasket', {
                id: 5,
              });
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
          ShowToast('Something went wrong!');
        });
    }
  };

  getFormData = id => {
    getAPI(`getApplicationForm/` + id, null).then(response => {
      if (response.data.application_type) {
        DataManager.setPages(response.data.application_type.pages);
        this.setState({pages: response.data.application_type.pages});
        console.log('Arrrea', response.data.application_type);
      }
    });
  };

  componentDidUpdate = () => {
    console.log('Log', this.state.index);
  };
  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <Text
            style={{
              color: colors.blue,
              fontSize: 23,
              fontFamily: fonts.bold,
              marginTop: 30,
              fontWeight: '600',
              marginLeft: 40,
            }}>
            What are you interested in?
          </Text>
          <ScrollView>
            <View
              style={{
                flex: 1,
                marginLeft: 40,
                marginRight: 30,
                height: hp('100%'),
              }}>
              <View>
                <View style={styles.accordianTextContainer}>
                  <FlatList
                    data={this.state.data}
                    renderItem={this.renderItemP}
                  />
                </View>
                <Spinner
                  visible={this.state.loadingSpinner}
                  cancelable={true}
                  indicatorStyle={{color: colors.red}}
                />
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
                bottom: 0,
              }}>
              <ButtonWithoutShadow
                width={wp('60')}
                height={43}
                // marginTop={Platform.OS == "android"?hp("3%") :hp("18%")}
                borderRadius={20}
                labelColor={colors.white}
                label="Next"
                backgroundColor={colors.blue}
                onAction={() => null}
                onAction={() => this.handleSubmit()}
              />
              <View style={styles.accordianTextContainer}>
                <TouchableOpacity
                  style={{top: -11}}
                  onPress={() =>
                    this.props.navigation.navigate('HelpMeDecide2')
                  }>
                  <Text style={styles.footerText}>Help Me Decide</Text>
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
    marginTop: 20,
    // marginBottom: 20,
    // marginTop: 40,
    // flex : 1,
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
    // marginTop:50,
    //marginStart:40,
    //marginEnd:40,
    color: '#72e2db',
    textAlign: 'center',
    // marginBottom: 30,
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
  },
  title1: {
    fontSize: 16,
    fontFamily: fonts.extraBold,
    color: colors.blue,
    marginRight: 5,
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
    borderColor: colors.GREEN,
  },
  btnInActive: {
    borderColor: colors.DARKGRAY,
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    minHeight: 50,
    width: width - 40,
    // paddingLeft: 15,
    marginLeft: 5,
    // marginBottom: 10,
    paddingRight: 18,
    alignItems: 'center',
    //backgroundColor: colors.authBackGroud,
    padding: 5,
  },
  childRow: {
    flexDirection: 'row',
    width: width - 40,
    marginLeft: 5,
    paddingVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  parentHr: {
    color: colors.white,
    width: '100%',
  },
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
    // // flex : 1,
    width: width - 70,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  accordianText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.regularRoman,
    padding: 13,
    lineHeight: 20,
    //marginLeft: 20
  },
});

export default WalkThrough;
