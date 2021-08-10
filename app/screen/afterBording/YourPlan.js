import React, {useState, Component, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import {HeaderWithBackWhite} from '../../component/Button';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import StepIndicator from 'react-native-step-indicator';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import SignUpModel from './../../component/SignUpModel';
import {FlatList} from 'react-native-gesture-handler';
import DataManager from './../../utils/DataManager';
import {getAPI, postAPI} from './../../utils/Api';
import ShowToast from '../../component/Toast';
import Spinner from './../../utils/Loader';

export default class YourPlan extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      currentPosition: 0,
      labels: ['Cart', 'Delivery Address', 'Order Summary', 'Payment Method'],
      customStyles: {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: colors.blue,
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: colors.blue,
        stepStrokeUnFinishedColor: colors.light_blue,
        separatorFinishedColor: colors.blue,
        separatorUnFinishedColor: colors.light_blue,
        stepIndicatorFinishedColor: colors.blue,
        stepIndicatorUnFinishedColor: colors.light_blue,
        stepIndicatorCurrentColor: colors.blue,
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: colors.white,
        stepIndicatorLabelFinishedColor: colors.white,
        stepIndicatorLabelUnFinishedColor: colors.blue,
        labelColor: colors.white,
        labelSize: 13,
        currentStepLabelColor: colors.white,
      },
      isModal: false,
      checked: false,
      userId: '',
      application_id: '',
      loadingSpinner: false,
      themeticsData: '',
      planId: '',
    };
  }

  goToClientAgreement = () => {
    this.handleSubmit();
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  selectIndex = index => {
    this.setState({planId: this.state.list[index]._id});

    this.setState({
      list: this.state.list.map((item, ind) =>
        ind == index
          ? {
              ...item,
              isSelect: item.isSelect == false ? true : false,
            }
          : {...item, isSelect: false},
      ),
    });
  };

  handleSubmit = async () => {
    this.setState({loadingSpinner: true});
    const dataToSend = {
      userId: this.state.userId,
    };

    postAPI('createApplication', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.setState({loadingSpinner: false});
          DataManager.setApplicationId(response.data.application.id);

          this.createBasket();
        } else {
          this.setState({loadingSpinner: false});
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        // ShowToast('Something went wrong');
        console.log(err);
      });
  };

  createBasket = async () => {
    const {themeticsData} = this.state;

    let basket = [];
    if (themeticsData)
      themeticsData.forEach(elem => {
        if (elem.thematicStatus == 0) {
          basket.push(elem._id);
        }
      });

    if (basket.length == 0) {
      alert('Please select basket!');
      return;
    }
    this.setState({loadingSpinner: true});

    const dataToSend = {
      thematicId: basket.toString(),
      userId: this.state.userId,
    };

    postAPI('createThematicBasket', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.setState({loadingSpinner: false});
          this.setState({isModal: false});
          this.props.navigation.navigate('ClientAgreement', {
            data: this.props.route.params.data,
            id: this.props.route.params.data.id,
          });
        } else {
          this.setState({loadingSpinner: false});
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        this.setState({loadingSpinner: false});
        console.log(err);
      });
  };

  submit = () => {
    if (this.state.planId == '') {
      alert('Please select a Plan');
      return;
    }
    this.state.list.map(item =>
      item.isSelect
        ? this.setState({planId: item._id})
        : console.log('Please select a Plan'),
    );

    console.log(this.state.planId);

    this.setState({loadingSpinner: true});
    const dataToSend = {
      userId: this.state.userId,
      planId: this.state.planId,
    };

    postAPI('choosePlans', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.setState({isModal: true});
          this.setState({loadingSpinner: false});
        } else {
          this.setState({loadingSpinner: false});
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        // ShowToast('Something went wrong');
        console.log(err);
      });

    // this.state.list.map(item =>
    //   item.isSelect ? this.setState({isModal: true}) : alert('Please select a Plan'),
    // );
  };

  skipThemetics = () => {
    this.setState({loadingSpinner: true});
    const dataToSend = {
      userId: this.state.userId,
    };

    postAPI('createApplication', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.setState({loadingSpinner: false});
          this.setState({isModal: false});

          DataManager.setApplicationId(response.data.application.id);
          this.props.navigation.navigate('ClientAgreement', {
            data: this.props.route.params.data,
            id: this.props.route.params.data.id,
          });
          //this.createBasket();
        } else {
          this.setState({loadingSpinner: false});
          ShowToast(response.message);
        }
        this.setState({loadingSpinner: true});

        console.log(response, response.message);
      })
      .catch(err => {
        this.setState({loadingSpinner: true});

        //ShowToast('Something went wrong');
        console.log(err);
      });
  };

  componentDidMount = async () => {
    // console.log('Choose your plan', this.props.route.params.data);
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', this.props.route.params);
    this.setState({userId: userDetails._id});
    this.getPlans();
  };
  getPlans = () => {
    this.setState({loadingSpinner: true});
    const dataToSend = {
      type: this.props.route.params.data.id,
    };
    postAPI(`getPlans`, dataToSend).then(response => {
      if (response.status == 200) {
        this.setState({loadingSpinner: false});

        console.log('Get paln', JSON.stringify(response.data));
        this.setState({
          list: response.data.map(item => {
            return {...item, isSelect: false};
          }),
        });
        this.getThematics();
      } else {
        this.setState({loadingSpinner: false});
        // ShowToast('Something went Wrong!');
      }
    });
  };
  getThematics = () => {
    getAPI(`getThematicBasket`, null).then(response => {
      if (response.status == 200) {
        this.setState({loadingSpinner: false});
        this.setState({themeticsData: response.data});
      } else {
        this.setState({loadingSpinner: false});
        //ShowToast('Something went Wrong!');
      }
    });
  };

  RenderPopup = ({item, index}) => {
    return (
      <View
        style={
          item.isSelect ? styles.basicPlanContainer : styles.basicPlanContainer2
        }>
        <View style={styles.basicPlanSubContainer}>
          <View>
            <Text style={styles.basicPlanText}>{item.name}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.selectIndex(index), this.setState({checked: true});
              }}>
              {item.isSelect ? (
                <Image
                  source={localImages.checked_light_blue}
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                  }}></Image>
              ) : (
                <View
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    borderColor: colors.grayColor,
                    borderWidth: 0.4,
                    borderRadius: 50,
                  }}></View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {item.price != 0 ? (
            <Text style={styles.dollarText}>${item.price}/mo</Text>
          ) : null}

          <Text style={[styles.descriptionText, {marginLeft: 10}]}>
            {item.description}
          </Text>
        </View>
        {/* {item.features.map((item) => (
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <Image
              source={ localImages.tick}
              style={{
                height: 10,
                width: 10,
                resizeMode: 'contain',
                marginTop: 10,
              }}
            />
            <Text style={[styles.descriptionText, {marginLeft: 10}]}>
              {item.description}
            </Text>
          </View>
        ))} */}
      </View>
    );
  };

  onAddTheemetice = index => {
    const {themeticsData} = this.state;
    var localAllThemeticsData = [];
    localAllThemeticsData = themeticsData;
    if (localAllThemeticsData[index].thematicStatus == 1) {
      localAllThemeticsData[index].thematicStatus = 0;
    } else {
      localAllThemeticsData[index].thematicStatus = 1;
    }
    this.setState({themeticsData: localAllThemeticsData});
  };

  RenderThemetics = ({item, index}) => {
    return (
      <View style={styles.thematicContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: wp('70%')}}>
            <Text style={styles.investingPortfolioText}>
              {item.thematicName}
            </Text>
          </View>

          <TouchableOpacity onPress={() => this.onAddTheemetice(index)}>
            <Image
              source={
                item.thematicStatus == 1
                  ? localImages.add_icon
                  : localImages.checked_light_blue
              }
              style={[styles.arrowRight1, {marginLeft: wp('3%')}]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.dollarText, {fontSize: 16}]}>$3/mo</Text>
        <View>
          <Image
            source={{uri: item.thematicImage}}
            style={styles.basket_image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.riskLevelText}>Description</Text>
        <Text style={styles.aggressiveText}>{item.thematicDescription}</Text>
      </View>
    );
  };

  render() {
    const {themeticsData} = this.state;

    return (
      <SafeAreaView style={[CustomStyles.containerbording]}>
        <HeaderWithBackWhite
          Header="Your Plan"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.goBack()}
        />
        <View style={styles.stepperSubContainer}>
          <StepIndicator
            style={{flex: 1}}
            customStyles={this.state.customStyles}
            currentPosition={2}
            // labels={this.state.labels}
            stepCount={4}
          />
        </View>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              width: width - 30,
              alignSelf: 'center',
            }}>
            {/* {this.showSteps()} */}
            <View style={{backgroundColor: colors.authBackGroud}}>
              <View style={{marginTop: 20, left: 10}}>
                <Text style={styles.headingText}>Choose your plan</Text>
                <FlatList
                  data={this.state.list}
                  style={{marginBottom: hp('15')}}
                  renderItem={this.RenderPopup}
                />

                <Spinner
                  visible={this.state.loadingSpinner}
                  cancelable={true}
                  indicatorStyle={{color: colors.red}}
                />
              </View>
              <SignUpModel
                isModalVisible={this.state.isModal}
                modalClose={() => this.setState({isModal: false})}>
                <View>
                  <TouchableOpacity
                    style={{alignItems: 'flex-end'}}
                    onPress={() => this.setState({isModal: false})}>
                    <Image
                      source={localImages.close_gray}
                      style={{height: 18, width: 18, right: 7}}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View>
                    <Text numberOfLines={2} style={styles.chooseThematicText}>
                      Would you like to add a thematic basket managed by Mudani
                      for $3/mo?
                    </Text>

                    <FlatList
                      data={themeticsData}
                      renderItem={this.RenderThemetics}
                    />
                    <Spinner
                      visible={this.state.loadingSpinner}
                      cancelable={true}
                      indicatorStyle={{color: colors.red}}
                    />

                    <View
                      style={{
                        marginTop: 0,
                        marginBottom: 50,
                        marginTop: 39,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <ButtonWithoutShadow
                        width={width - wp('64.33')}
                        height={43}
                        //   marginTop={22}
                        borderRadius={20}
                        labelColor={colors.blue}
                        label="Skip"
                        backgroundColor={colors.light_blue}
                        onAction={() => this.skipThemetics()}
                      />
                      <ButtonWithoutShadow
                        width={width - wp('64.33')}
                        height={43}
                        //   marginTop={22}
                        borderRadius={20}
                        labelColor={colors.white}
                        label="Next"
                        backgroundColor={colors.blue}
                        onAction={() => this.goToClientAgreement()}
                      />
                    </View>
                  </View>
                </View>
              </SignUpModel>
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
            {this.state.currentPosition == 0 ? (
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={wp('60%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Submit"
                  backgroundColor={colors.blue}
                  onAction={
                    () => this.submit()
                    // this.props.navigation.navigate('FundYourAccount')
                  }
                />
              </View>
            ) : (
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={wp('60%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.setState({
                      currentPosition:
                        this.state.currentPosition == 0
                          ? (this.state.currentPosition = 0)
                          : this.state.currentPosition + 1,
                    })
                  }
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
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
    width: '90%',
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
    color: colors.black,
    fontSize: 13,
    fontFamily: fonts.regular,
    marginHorizontal: 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  labelStyle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  textContainer: {
    marginLeft: 46,
    marginRight: 46,
    marginTop: 8,
    width: width - 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer1: {
    // marginLeft: 46,
    // marginRight: 46,
    //marginTop: 8,
    // width: width - 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    marginTop: 28,
    marginLeft: 46,
    marginRight: 46,
    backgroundColor: colors.white,
    // padding : 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: width - 70,
    elevation: 5,
  },
  smallCircle: {
    width: 13,
    height: 13,
    backgroundColor: colors.blue,
    borderRadius: 50,
  },

  stepperBtn: {
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
    backgroundColor: colors.blue,
    width: 120,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 40,
    alignSelf: 'center',
  },
  stepStyle: {
    backgroundColor: colors.blue,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  stepperMainContainer: {
    width: width,
    paddingLeft: 10,
    paddingRight: 10,
    // paddingBottom: 50,
  },
  headingText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 20,
  },
  dollarText: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 4,
  },
  dollarText1: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 15,
  },
  descriptionText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    textAlign: 'left',
    lineHeight: 20,
    marginTop: 4,
  },
  yesAndNoText: {
    marginLeft: 11,
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
  },
  yesAndNoText1: {
    marginLeft: 11,
    fontSize: 14,
    color: colors.blue,
    fontFamily: fonts.regular,
  },
  yesAndNoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  yesAndNoCo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
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
  },
  basicPlanContainer: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 7,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.info_color,
  },
  basicPlanContainer2: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  basicPlanSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  basicPlanText: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  roundUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 47,
  },
  roundUpText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 21,
    // fontWeight: 'bold',
    marginLeft: 15,
  },
  roundUpTextContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginTop: 55,
  },
  stepperSubContainer: {
    width: width,
    height: 35,
    backgroundColor: 'white',
    //position: 'absolute',
  },
  thematicText: {
    fontSize: 16,
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 30,
    textAlign: 'center',
  },
  chooseThematicText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 30,
    textAlign: 'center',
    // marginTop: 10,
    marginBottom: 5,
  },
  thematicContainer: {
    //   flex : 1,
    backgroundColor: colors.white,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
    borderRadius: 7,
  },
  investingPortfolioText: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  arrowRight1: {
    height: 20,
    width: 20,
    marginLeft: wp('3.46'),
  },
  basket_image: {
    height: hp('12.84'),
    width: hp('12.84'),
    alignSelf: 'center',
    marginTop: hp('2.6%'),
    marginBottom: hp('3.89%'),
  },
  riskLevelText: {
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  aggressiveText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginBottom: 8,
  },
  itemText: {
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  itemText1: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
});

// // export default StartYourSignUpJourney1
