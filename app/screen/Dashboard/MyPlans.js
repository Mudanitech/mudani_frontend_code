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
  Platform,
  FlatList,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HeaderWithBack, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {LineChart} from 'react-native-chart-kit';
import {TwoButtonModal} from './../../component/confirmModal';
import Spinner from './../../utils/Loader';
import {getAPI, postAPI} from './../../utils/Api';
import ShowToast from '../../component/Toast';
import DataManager from './../../utils/DataManager';
import SignUpModel from './../../component/SignUpModel';

const Statement = props => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [plans, setPlans] = useState(null);
  const [plansId, setPlansId] = useState(null);

  const [isModal, setState] = useState(false);

  useEffect(() => {
    if (props.userId) getPlans();
  }, []);

  const getPlans = () => {
    console.log('props' + JSON.stringify(props.interestedAccount));

    var type =
      props.interestedAccount == 47 ? 1 : props.interestedAccount == 48 ? 2 : 5;

    setLoadingSpinner(true);
    getAPI(`getMyPlans/` + `${props.userId}` + '/' + type)
      .then(response => {
        if (response.status == 200) {
          setLoadingSpinner(false);
          setPlans(response.data);
          console.log('setPlans', response.data);
        } else {
          setLoadingSpinner(false);
          ShowToast(response.data.message);
        }
      })
      .catch(err => {
        setLoadingSpinner(false);
        //ShowToast('Something went Wrong!');
      });
  };

  const upgradePlan = planId => {
    //setLoadingSpinner(true);
    setState(true);
    setPlansId(planId);
    // const dataToSend = {
    //   userId: props.userId,
    //   planId: planId,
    // };

    // postAPI('upgradePlan', dataToSend)
    //   .then(response => {
    //     if (response.status == 200) {
    //       setLoadingSpinner(false);
    //       DataManager.setUserDetail(response.data);
    //       ShowToast(response.message);
    //       getPlans();
    //     } else {
    //       setLoadingSpinner(false);
    //       ShowToast(response.message);
    //     }
    //   })
    //   .catch(err => {
    //     setLoadingSpinner(false);
    //     console.log(err);
    //   });
  };
  const cancelPlan = planId => {
    setLoadingSpinner(true);
    const dataToSend = {
      userId: props.userId,
      planId: planId,
    };

    postAPI('cancelPlan', dataToSend)
      .then(response => {
        if (response.status == 200) {
          setLoadingSpinner(false);
          DataManager.setUserDetail(response.data);
          ShowToast(response.message);
          getPlans();
        } else {
          setLoadingSpinner(false);
          ShowToast(response.message);
        }
      })
      .catch(err => {
        setLoadingSpinner(false);
        console.log(err);
      });
  };
  const renderAvailablePlans = ({item}) => {
    return (
      <View style={styles.basicPlanContainer2}>
        <View style={styles.basicPlanSubContainer}>
          <View>
            <Text style={styles.basicPlanText}>{item.name}</Text>
          </View>
        </View>
        <View>
          {item.price != 0 ? (
            <Text style={styles.dollarText}>
              $
              <Text style={[styles.dollarText, {fontWeight: '700'}]}>
                {item.price}/{item.duration}
              </Text>
            </Text>
          ) : null}
        </View>
        <View>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <View
          style={{
            width: wp('90%'),
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <ButtonWithoutShadow
            width={width - wp('70%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Upgrade Plan"
            backgroundColor={colors.blue}
            onAction={() => upgradePlan(item._id)}
            fontSize={13}
          />
        </View>
      </View>
    );
  };

  const upgradePlans = () => {
    //setLoadingSpinner(true);

    const dataToSend = {
      userId: props.userId,
      planId: plansId,
    };

    postAPI('upgradePlan', dataToSend)
      .then(response => {
        if (response.status == 200) {
          setState(false);
          setLoadingSpinner(false);
          DataManager.setUserDetail(response.data);
          ShowToast(response.message);
          getPlans();
        } else {
          setLoadingSpinner(false);
          ShowToast(response.message);
        }
      })
      .catch(err => {
        setLoadingSpinner(false);
        console.log(err);
      });
  };
  // console.log("CP",plans.currenPlan);
  return (
    <View
      style={{backgroundColor: colors.dashboard_color, height: height - 100}}>
      <Spinner
        visible={loadingSpinner}
        cancelable={true}
        indicatorStyle={{color: colors.red}}
      />
      <View style={{marginTop: 20}}>
        <Text style={styles.headingText}>My Current Plan</Text>
        {plans == null ? null : plans.currenPlan !== null ? (
          <View
            style={[
              styles.basicPlanContainer2,
              {borderColor: colors.info_color, borderWidth: 1},
            ]}>
            <View style={styles.basicPlanSubContainer}>
              <View>
                <Text style={styles.basicPlanText}>
                  {plans.currenPlan.name}
                </Text>
              </View>
            </View>
            {plans.currenPlan.price != 0 ? (
              <View>
                <Text style={styles.dollarText}>
                  $
                  <Text style={[styles.dollarText, {fontWeight: '700'}]}>
                    {plans.currenPlan.price}/{plans.currenPlan.duration}
                  </Text>
                </Text>
              </View>
            ) : null}

            <View>
              <Text style={styles.descriptionText}>
                {plans.currenPlan.description}
              </Text>
            </View>
            <View
              style={{
                width: wp('90%'),
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              {/* <ButtonWithoutShadow
                width={width - wp('70%')}
                height={43}
                marginTop={22}
                borderRadius={20}
                labelColor={colors.white}
                label="Upgrade Plan"
                backgroundColor={colors.blue}
                onAction={() => props.navigation.navigate('UpgradePlan')}
                fontSize={13}
              /> */}
              <ButtonWithoutShadow
                width={width - wp('70%')}
                height={43}
                marginTop={22}
                borderRadius={20}
                labelColor={colors.white}
                label="Cancel Plan"
                backgroundColor={colors.black}
                onAction={() => cancelPlan(plans.currenPlan._id)}
                fontSize={13}
              />
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.basicPlanContainer2,
              {borderColor: colors.info_color, borderWidth: 1},
            ]}>
            <Text style={styles.descriptionText}>
              No Current Plan is Available!
            </Text>
          </View>
        )}
        <Text style={styles.headingText}>Available Plans</Text>
        <FlatList
          data={
            plans == null
              ? []
              : plans.availablePlan.length > 0
              ? plans.availablePlan
              : []
          }
          renderItem={renderAvailablePlans}
          ListEmptyComponent={() => {
            if (loadingSpinner) {
              return null;
            } else {
              return (
                <View style={[styles.basicPlanContainer2]}>
                  <Text style={styles.descriptionText}>
                    There is no plan is Available!
                  </Text>
                </View>
              );
            }
          }}
        />
      </View>

      <SignUpModel isModalVisible={isModal} modalClose={() => setState(false)}>
        <View>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => setState(false)}>
            <Image
              source={localImages.close_gray}
              style={{height: 18, width: 18, right: 7}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View>
            <View style={styles.mainContainer}>
              <View>
                <Text style={styles.stockText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  nisl ipsum, iaculis eu ipsum vitae, feugiat maximus ex.
                  Curabitur porta sem vehicula nisl mollis, ac volutpat risus
                  fringilla. In dignissim interdum augue, eget tempus purus
                  ornare nec. In at varius nunc. Pellentesque vitae purus
                  lacinia, mattis sapien ac, malesuada arcu. Nunc nisi neque,
                  malesuada nec porttitor ac, cursus eget sapien. Sed tincidunt,
                  leo ut congue fringilla, nisi sem dapibus felis, a rhoncus
                  augue sapien non diam. Morbi molestie metus lectus, vel
                  sodales lectus accumsan sit amet.Nulla commodo sem metus, eu
                  tincidunt diam scelerisque ut. Integer iaculis pulvinar
                  tellus, id tristique dolor iaculis vel.
                </Text>
                <Text style={[styles.stockText, {marginTop: hp('2%')}]}>
                  Duis ut convallis sapien. Etiam justo ligula, facilisis a
                  blandit sed, consectetur id massa. Sed tristique leo a ex
                  tempus, a congue velit sagittis. In hac habitasse platea
                  dictumst. Integer non mauris feugiat, venenatis lacus id,
                  faucibus lectus. Proin commodo orci nec erat suscipit, non
                  rhoncus ligula porttitor. Etiam laoreet, augue nec iaculis
                  bibendum, ante justo aliquam nisi, at faucibus lacus velit et
                  metus. Cras vehicula nisi eu est elementum, id pellentesque
                  odio elementum.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Proin nisl ipsum, iaculis eu ipsum vitae,
                  feugiat maximus ex. Curabitur porta sem vehicula nisl mollis,
                  ac volutpat risus fringilla. In dignissim interdum augue, eget
                  tempus purus ornare nec. In at varius nunc. Pellentesque vitae
                  purus lacinia, mattis sapien ac, malesuada arcu. Nunc nisi
                  neque, malesuada nec porttitor ac, cursus eget sapien. Sed
                  tincidunt, leo ut congue fringilla, nisi sem dapibus felis, a
                  rhoncus augue sapien non diam. Morbi molestie metus lectus,
                  vel sodales lectus accumsan sit amet.
                </Text>
                <Text style={[styles.stockText, {marginTop: hp('2%')}]}>
                  Nulla commodo sem metus, eu tincidunt diam scelerisque ut.
                  Integer iaculis pulvinar tellus, id tristique dolor iaculis
                  vel. Duis ut convallis sapien. Etiam justo ligula, facilisis a
                  blandit sed, consectetur id massa. Sed tristique leo a ex
                  tempus, a congue velit sagittis. In hac habitasse platea
                  dictumst. Integer non mauris feugiat, venenatis lacus id,
                  faucibus lectus. Proin commodo orci nec erat suscipit, non
                  rhoncus ligula porttitor. Etiam laoreet, augue nec iaculis
                  bibendum, ante justo aliquam nisi, at faucibus lacus velit et
                  metus. Cras vehicula nisi eu est elementum, id pellentesque
                  odio elementum.
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View>
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
                  label="Disagree"
                  backgroundColor={colors.light_blue}
                  onAction={() => setState(false)}
                />
                <ButtonWithoutShadow
                  width={width - wp('64.33')}
                  height={43}
                  //   marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Agree"
                  backgroundColor={colors.blue}
                  onAction={() => upgradePlans()}
                />
              </View>
            </View>
          </View>
        </View>
      </SignUpModel>
    </View>
  );
};
const TaxPackages = props => {
  const [isModal2, setState2] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [thematicBasket, setThematicBasket] = useState(null);
  useEffect(() => {
    getThematicBasket();
  }, []);

  const getThematicBasket = () => {
    var type =
      props.interestedAccount == 47 ? 1 : props.interestedAccount == 48 ? 2 : 5;
    setLoadingSpinner(true);
    getAPI(`getMyPlans/` + `${props.userId}` + '/' + type)
      .then(response => {
        if (response.status == 200) {
          setLoadingSpinner(false);
          setThematicBasket(response.data.getThematicResult);
          console.log('thematic Baskets', response.data);
        } else {
          setLoadingSpinner(false);
          ShowToast(response.data.message);
        }
      })
      .catch(err => {
        setLoadingSpinner(false);
        //ShowToast('Something went Wrong!');
      });
  };
  const cancelBasket = basketId => {
    setLoadingSpinner(true);
    const dataToSend = {
      userId: props.userId,
      basketId: basketId,
    };

    postAPI('cancelBasket', dataToSend)
      .then(response => {
        if (response.status == 200) {
          setLoadingSpinner(false);
          DataManager.setUserDetail(response.data);
          ShowToast(response.message);
          getThematicBasket();
        } else {
          setLoadingSpinner(false);
          ShowToast(response.message);
        }
      })
      .catch(err => {
        setLoadingSpinner(false);
        console.log(err);
      });
  };
  const modalOpen2 = (title, companyName) => {
    setState2(true);
    setHeading(title);
    setDescription(companyName);
  };
  const modalClose2 = () => {
    setState2(false);
  };

  const viewModal = () => {
    const IsOpen = isModal2;
    return (
      <TwoButtonModal isModalVisible={IsOpen} modalClose={() => modalClose2()}>
        <View style={styles.popupMainContainer}>
          {/* <Image source={props.image} style={styles.circleDollar} /> */}
          <Text style={styles.popUpText}> {heading}</Text>
          <Text style={[styles.popUpText, {fontWeight: '100', marginTop: 10}]}>
            {' '}
            {
              'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum'
            }
          </Text>
        </View>
        <View style={styles.popupButtonContainer}>
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Dismiss"
            backgroundColor={colors.blue}
            onAction={() => modalClose2()}
          />
        </View>
      </TwoButtonModal>
    );
  };
  const renderHoldings = ({item}) => {
    return (
      <View>
        <View>
          <View style={styles.textContainer2}>
            <View style={{width: wp('28%')}}>
              <Text style={styles.cashText}>{item.holdingType}</Text>
            </View>
            <TouchableOpacity
              onPress={() => modalOpen2(item.holdingType, 'skdjfkl')}>
              <Image
                source={localImages.info_blue_circle}
                style={styles.arrowRight1}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.secondContainer}
          onPress={
            () => null
            //props.navigation.navigate('TrackerScreen', {symbol: item})
          }>
          <View style={styles.imageWidth}>
            <Image
              source={{
                uri: item.tickerImage
                  ? item.tickerImage
                  : localImages.company_icon,
              }}
              style={styles.itemImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainerWidth}>
            <Text
              numberOfLines={1}
              style={(styles.itemText1, [{textTransform: 'capitalize'}])}>
              {item.companyName}
            </Text>
            <Text numberOfLines={1} style={styles.itemText2}>
              {item.symbol}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[styles.itemText1, {color: colors.info_color}]}>
              {item.targetValue}%
            </Text>
            {/* <Text style={[styles.itemText2, {fontSize: wp('4.2%')}]}>3</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderBasket = ({item}) => {
    return (
      <View>
        <View style={styles.statementContainer}>
          <View style={styles.PContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.investingPortfolioText}>
                {item.thematicDetail.thematicName}
              </Text>
              {/* <TouchableOpacity>
                <Image
                  source={localImages.checked_light_blue}
                  style={[styles.arrowRight1, {marginLeft: wp('10%')}]}
                  resizeMode="contain"
                />
              </TouchableOpacity> */}
            </View>
            <Text style={styles.monthText}>
              ${item.modelDetail.maximumDeviationAllowance}/
              {item.modelDetail.adjustedFrequency}
            </Text>

            <Image
              source={{uri: item.thematicDetail.thematicImage}}
              style={styles.basket_image}
              resizeMode="contain"
            />
            <Text style={styles.riskLevelText}>Description</Text>
            <Text style={styles.aggressiveText}>
              {item.thematicDetail.thematicDescription}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.heading}>Holdings</Text>
        </View>
        <View style={styles.statementContainer}>
          {item.modelDetail ? (
            <View style={styles.stocksContainer}>
              <FlatList
                data={item.modelDetail.models}
                renderItem={renderHoldings}
                ItemSeparatorComponent={() => <View style={styles.rowBorder} />}
              />
            </View>
          ) : (
            <Text>No Holding fund!</Text>
          )}
        </View>
        <View style={{marginBottom: 20, alignItems: 'center'}}>
          <ButtonWithoutShadow
            width={width - wp('70%')}
            height={43}
            // marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Cancel Basket"
            backgroundColor={colors.black}
            onAction={() => cancelBasket(item._id)}
            fontSize={13}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.mainContainer, {height: height - 100}]}>
      <Spinner
        visible={loadingSpinner}
        cancelable={true}
        indicatorStyle={{color: colors.red}}
      />
      <FlatList
        data={thematicBasket}
        ListEmptyComponent={() => {
          return (
            <View style={styles.statementContainer}>
              {loadingSpinner ? null : (
                <View style={styles.PContainer}>
                  <Text>No Basket available</Text>
                </View>
              )}
            </View>
          );
        }}
        renderItem={renderBasket}
      />
      {viewModal()}
      <Spinner
        visible={loadingSpinner}
        cancelable={true}
        indicatorStyle={{color: colors.red}}
      />
    </View>
  );
};

class MyPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentPosition: 0,
      userId: '',
      interestedAccount: '',
    };
  }

  setPositions = currentPosition => {
    this.setState({currentPosition: currentPosition});
  };
  componentDidMount = async () => {
    // console.log('Choose your plan', this.props.route.params.data);
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails);
    this.setState({
      userId: userDetails._id,
      interestedAccount: userDetails.interestedAccount,
    });
  };
  showTabs = () => {
    if (this.state.userId) {
      if (this.state.currentPosition == 0) {
        return (
          <Statement
            {...this.props}
            userId={this.state.userId}
            interestedAccount={this.state.interestedAccount}
          />
        );
      } else if (this.state.currentPosition == 1) {
        return (
          <TaxPackages
            {...this.props}
            userId={this.state.userId}
            interestedAccount={this.state.interestedAccount}
          />
        );
      }
    }
  };
  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="My Plans"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
        />

        <View style={styles.topContainer}>
          <TouchableOpacity
            style={
              this.state.currentPosition == 0
                ? styles.buttons2
                : styles.buttons1
            }
            onPress={() => this.setPositions(0)}>
            <Text
              style={
                this.state.currentPosition == 0
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              My Plans
            </Text>
          </TouchableOpacity>
          {/* <View style={styles.borderSeperator} /> */}
          <TouchableOpacity
            style={
              this.state.currentPosition == 1
                ? styles.buttons3
                : styles.buttons1
            }
            onPress={() => this.setPositions(1)}>
            <Text
              style={
                this.state.currentPosition == 1
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              My Baskets
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>{this.showTabs()}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  mainContainer: {
    flex: 1,
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
  },
  buttons: {
    height: hp('10.94%'),
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginBottom: hp('1.64%'),
  },
  statementContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp('1.9%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: hp('5.39%'),
    marginTop: hp('2.24%'),
  },
  statementContainer1: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginBottom: hp('3.39%'),
    marginTop: hp('5.09%'),
  },
  statementSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: hp('3.59%'),
    paddingTop: hp('2.99%'),
    padding: wp('4%'),
  },
  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },
  cashText: {
    fontSize: wp('4.5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
    // paddingLeft: wp('3'),
  },

  accountNumberText: {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('38.6'),
    marginRight: wp('3.3'),
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
    borderRadius: wp('2%'),
    borderColor: colors.grayColor,
    borderWidth: 0.4,
    backgroundColor: colors.white,
  },
  buttons1: {
    //   width: wp('45%'),
    height: hp('5.84%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttons2: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('5.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: wp('2%'),
    borderBottomLeftRadius: wp('2%'),

    // marginBottom: hp('1.64%'),
  },
  buttons3: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('5.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: wp('2%'),
    borderBottomRightRadius: wp('2%'),
  },
  buttonText1: {
    fontSize: wp('3.73%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
  buttonText2: {
    fontSize: wp('3.73%'),
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
  heading: {
    fontSize: wp('5.33%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 27,
    // marginLeft: wp('0.7'),
    // marginTop: hp('2.2'),
    marginBottom: hp('1.24'),
  },
  amountText: {
    fontSize: wp('6,4%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 31,
    //marginLeft: wp('0'),
    marginTop: hp('0.7'),
    // marginBottom: hp('2.24'),
  },
  borderSeperator: {
    height: 30,
    borderWidth: 0.3,
    borderColor: colors.grayColor,
  },
  rowBorder: {
    width: wp('78%'),
    borderWidth: Platform.OS == 'android' ? 0.25 : 0.5,
    borderColor: colors.grayColor,
    marginBottom: 20,
  },
  arrowRight: {
    height: 20,
    width: 20,
    marginLeft: wp('3.46'),
  },
  arrowRight1: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginLeft: wp('3.46'),
  },
  basket_image: {
    height: hp('12.48'),
    width: hp('12.48'),
    alignSelf: 'center',
    marginTop: hp('4.04%'),
    marginBottom: hp('5.69%'),
  },
  icon_up: {
    height: 15,
    width: 15,
  },
  itemImage: {
    height: 30,
    width: 30,
    marginLeft: wp('3.46'),
    marginTop: hp('0.4%'),
  },
  showMoreText: {
    fontSize: wp('4%'),
    color: colors.info_color,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('4.53'),
    marginTop: hp('2.77%'),
    marginBottom: hp('3.44%'),
  },
  itemText1: {
    fontSize: wp('4.8%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  itemText2: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  textContainer2: {
    flex: 1,
    // width: wp('60%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  smallContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.4%'),
  },
  smallText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    // lineHeight: 30,
    marginLeft: wp('2.08%'),
  },
  totolText: {
    fontSize: wp('4.53%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
    //  textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },
  portFolioText: {
    fontSize: wp('4.53%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
  },
  stocksContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // paddingTop: hp('2.99%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    paddingTop: wp('4%'),
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingTop: hp('2.3%'),
    paddingBottom: hp('2.9%'),
  },
  textContainerWidth: {width: wp('56.9%')},
  imageWidth: {width: wp('15%')},
  basketContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: wp('1.79%'),
  },
  myPortfolioContainer: {
    flex: 1,
    marginTop: hp('1.79%'),
  },
  portFolioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.2'),
  },
  addBasketButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('5%'),
    marginTop: hp('5.09%'),
    justifyContent: 'center',
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

  headingText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'normal',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 20,
    marginLeft: 32,
  },
  dollarText: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 10,
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

  basicPlanContainer2: {
    backgroundColor: colors.white,
    padding: 20,
    width: '83%',
    borderRadius: wp('1.9%'),
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
    alignSelf: 'center',
  },

  basicPlanText: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: wp('6,4%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 31,
    //marginLeft: wp('0'),
    marginTop: hp('0.7'),
    // marginBottom: hp('2.24'),
  },
  borderSeperator: {
    height: 30,
    borderWidth: 0.3,
    borderColor: colors.grayColor,
  },

  arrowRight: {
    height: 10,
    width: 10,
    marginLeft: wp('3.46'),
  },
  basket_image: {
    height: hp('14.84'),
    width: hp('14.84'),
    alignSelf: 'center',
    marginTop: hp('1.64%'),
    marginBottom: hp('3.89%'),
  },
  icon_up: {
    height: 15,
    width: 15,
  },
  itemImage: {
    height: 30,
    width: 30,
    marginLeft: wp('3.46'),
    marginTop: hp('0.4%'),
  },
  showMoreText: {
    fontSize: wp('4%'),
    color: colors.info_color,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('4.53'),
    marginTop: hp('2.77%'),
    marginBottom: hp('3.44%'),
  },
  smallContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.4%'),
  },
  smallText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    // lineHeight: 30,
    marginLeft: wp('2.08%'),
  },
  totolText: {
    fontSize: wp('4.53%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
    //  textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },
  portFolioText: {
    fontSize: wp('4.53%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
  },
  stocksContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // paddingTop: hp('2.99%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    paddingTop: wp('4%'),
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingTop: hp('2.3%'),
    paddingBottom: hp('2.9%'),
  },

  imageWidth: {width: wp('15%')},
  basketContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: wp('1.79%'),
  },
  myPortfolioContainer: {
    flex: 1,
    marginTop: hp('1.79%'),
  },
  portFolioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.2'),
  },
  addBasketButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('5%'),
    marginTop: hp('5.09%'),
    justifyContent: 'center',
  },
  PContainer: {
    flex: 1,
    padding: wp('4%'),
    width: wp('85%'),
  },
  investingPortfolioText: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
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
  monthText: {
    fontSize: wp('4.26%'),
    color: colors.blue,
    fontFamily: fonts.regular,
    lineHeight: 20,
    paddingTop: hp('0.8'),
    paddingBottom: hp('2.24'),
  },
  stockItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    //   paddingBottom : hp("0.7%")
  },
  widthforItem: {
    width: wp('50%'),
    paddingLeft: wp('3%'),
  },
  widthforItem1: {
    width: wp('30%'),
    alignItems: 'flex-end',
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: wp('3.46%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subPopupText: {
    fontSize: wp('2.72%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 15,
    marginLeft: 10,
  },
  totalNumber: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 21,
    textAlign: 'left',
    // marginTop: 28,
    marginBottom: 15,
  },
});
export default MyPlans;
