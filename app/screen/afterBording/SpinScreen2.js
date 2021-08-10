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
  ImageBackground,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import SwipeButton from 'rn-swipe-button';
import LinearGradient from 'react-native-linear-gradient';
import {GrayColorPopup} from './../../component/GrayColorPopup';
import {hp, wp} from '../../utils/responsive';
import WheelOfFortune from 'react-native-wheel-of-fortune';
const {height, width} = Dimensions.get('window');
import {CustomStyles} from '../style/CustomStyles';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import ConfirmModal from '../../component/confirmModal';
import {postAPI, getAPI} from './../../utils/Api';
import DataManager from './../../utils/DataManager';
import ShowToast from '../../component/Toast';
let forceResetLastButton = null;

class SpinScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      winnerValue: null,
      winnerIndex: null,
      isModalVisible: false,
      isModalVisible2: false,
      isSpinnerStart: false,
      accountType: [
        {AccountType: 'Individual', text: 'hsdfjkhksjdf'},
        {AccountType: 'Joint', text: 'hsdfjkhksjdf'},
        {AccountType: 'Retirement', text: 'hsdfjkhksjdf'},
      ],
    };
  }
  openModal2 = () => {
    this.setState({isModalVisible2: true});
  };

  update = async () => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    const dataToSend = {
      userId: userDetails._id,
      status:
        this.props.route.params.id == 1
          ? 1
          : this.props.route.params.id == 2
          ? 2
          : 3,
    };

    postAPI('updateJourneyStatus', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.closeModal2();
          this.props.navigation.navigate('Home', {
            screen: 'Dashboard',
            params: {id: this.props.route.params.id},
          });
        } else {
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  closeModal2 = () => {
    this.setState({isModalVisible2: false});
  };
  gotoDashboard = () => {
    this.update();
  };

  openModal = () => {
    this.setState({isModalVisible: true});
  };
  modalClose = () => {
    this.setState({isModalVisible: false});
  };
  _renderPlayButton = play => {
    return play;
  };

  setIsSpinner = () => {
    this._renderPlayButton();
    this.setState({isSpinnerStart: true});
  };

  componentDidMount = () => {
    //console.log('props', this.props.route.params.id);
    this.openModal2();
  };
  gotoDualDashboard = () => {
    // this.props.route.params !== undefined? this.props.route.params.id == 5?()=>{;this.setState({isModalVisible:false})}:this.openModal2():
    if (this.props.route.params !== undefined) {
      if (this.props.route.params.id == 5) {
        this.props.navigation.navigate('TellAboutManagedAccount', {
          id: this.props.route.params.id,
        });
        this.closeModal2();
      }
    }
  };
  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.grayColor}}>
          <HeaderWithBack
            backgroundColor={1}
            Header={' '}
            labelStyle={styles.labelStyle}
            imageArrow={'left_arrow_w'}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView>
            <StatusBar
              barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
              backgroundColor={colors.blue}
            />
            <View style={{flex: 1, marginBottom: 300}}>
              <View style={{alignSelf: 'center'}}></View>
              <GrayColorPopup
                isModalVisible={this.state.isModalVisible2}
                modalClose={this.modalClose2}
                // headerText={'Basket Buy Execution'}
              >
                <View style={styles.container}>
                  <Text style={styles.headerText}>Enable Notifications</Text>
                  <Text style={styles.descriptionText}>
                    Don’t skip a beat. Allow us to share notifications to you
                    for important market alerts, news, and fantasy game updates.
                  </Text>
                  <View style={styles.buttonContainer}>
                    <ButtonWithoutShadow
                      width={wp('35%')}
                      height={38}
                      marginTop={22}
                      borderRadius={20}
                      labelColor={colors.blue}
                      label={"Don't Allow"}
                      backgroundColor={colors.light_blue}
                      onAction={() => this.props.navigation.goBack()}
                    />

                    <ButtonWithoutShadow
                      width={wp('35%')}
                      height={38}
                      marginTop={22}
                      borderRadius={20}
                      labelColor={colors.white}
                      label={'Allow'}
                      backgroundColor={colors.blue}
                      onAction={() =>
                        this.props.route.params.id == 5
                          ? this.gotoDualDashboard()
                          : this.gotoDashboard()
                      }
                    />
                  </View>
                </View>
              </GrayColorPopup>
              {/* <GrayColorPopup
                isModalVisible={this.state.isModalVisible}
                // headerText={'Basket Buy Execution'}
                modalClose={this.modalClose}
                submitAction={() => this.modalClose()}
                // descriptionText={
                //   "You'll receive a free stock when you complete your sign up journey"
                // }
                // nameOnSubmitButton={'Okay'}
                // nameOnIgnoreButton={'Ignore'}
              >
                <View style={styles.container}>
                  <View>
                    <Image
                      source={localImages.account_confirmation}
                      style={{
                        marginTop: 5,
                        height: 122,
                        width: 122,
                        alignSelf: 'center',
                        resizeMode: 'stretch',
                      }}></Image>
                  </View>

                  <Text
                    numberOfLines={3}
                    style={{
                      color: colors.black,
                      fontSize: 20,
                      fontFamily: fonts.bold,
                      marginTop: 30,
                      // marginHorizontal: 40,
                      fontWeight: '600',
                      textAlign: 'center',
                      lineHeight: 30,
                      width: width - 110,
                      alignSelf: 'center',
                    }}>
                    Starbucks Inc.
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      color: colors.black,
                      fontSize: 16,
                      fontFamily: fonts.bold,
                      marginTop: 15,
                      // marginHorizontal: 40,
                      fontWeight: '600',
                      textAlign: 'center',
                      lineHeight: 25,
                      width: width - 110,
                      alignSelf: 'center',
                    }}>
                    Congratulations!
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      color: colors.black,
                      fontSize: 16,
                      fontFamily: fonts.bold,
                      // marginHorizontal: 40,
                      fontWeight: '600',
                      textAlign: 'center',
                      lineHeight: 25,
                      width: width - 110,
                      alignSelf: 'center',
                    }}>
                    You received 1 free share of
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      color: colors.black,
                      fontSize: 16,
                      fontFamily: fonts.bold,
                      // marginHorizontal: 40,
                      fontWeight: '600',
                      textAlign: 'center',
                      lineHeight: 25,
                      width: width - 110,
                      alignSelf: 'center',
                    }}>
                    Starbucks Inc.
                  </Text>
                  <View style={styles.buttonContainer}>
                    <ButtonWithoutShadow
                      width={width - 240}
                      height={38}
                      marginTop={22}
                      borderRadius={20}
                      labelColor={colors.white}
                      label={'Continue'}
                      backgroundColor={colors.blue}
                      onAction={() =>
                        this.props.route.params.id == 5
                          ? this.gotoDualDashboard()
                          : this.openModal2()
                      }
                    />
                  </View>
                </View>
              </GrayColorPopup> */}
            </View>
          </ScrollView>
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
    // alignSelf : "center",
  },
  labelStyle: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.bold,
    // marginTop: 48,
    marginHorizontal: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
  linearGradient: {
    // flex: 1,
    //paddingLeft: 15,
    //paddingRight: 15,
    // borderRadius: 5,
    borderRadius: 50,
  },
  container: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 21,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 15,
  },
  descriptionText2: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    textAlign: 'center',
    // marginTop: 15,
    marginBottom: height / 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default SpinScreen;
