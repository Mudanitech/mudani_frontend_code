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
import {ButtonWithoutShadow, HeaderWithBackWhite} from '../../component/Button';
import {SearchTextInput} from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';

import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import StepIndicator from 'react-native-step-indicator';
import {hp, wp} from '../../utils/responsive';
import {getAPI, postAPI} from './../../utils/Api';

import ShowToast from '../../component/Toast';
import DataManager from './../../utils/DataManager';
import Spinner from './../../utils/Loader';



/* Define your class */
export default class CreateBasket extends Component {
  constructor() {
    super();
    this.state = {
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
      selectedData: [],
      userId: '',
      loadingSpinner: false,
      EntiityData: '',
      tickerData: [],
      isEntityView: true,
      searchItem: '',
    };
  }

  componentDidMount = async () => {
    // console.log('Choose your plan', this.props.route.params.data);
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);
    console.log('From Data', this.props.route.params);
    this.setState({userId: userDetails._id});
    this.getPopularStocks();
  };

  getPopularStocks = async () => {
    // const {loadingSpinner} = props.stateData;

    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils');
    this.setState({loadingSpinner: true});

    getAPI(`getPopularStock/` + userDetails._id, null).then(response => {
      if (response.status == 200) {
        this.setState({EntiityData: response.data.allData});
        console.log('Isssss', JSON.stringify(response.data.allData));

        this.setState({loadingSpinner: false});
      } else {
        this.setState({loadingSpinner: false});

        //ShowToast('Something went Wrong!');
      }
    });
  };

  renderSeparator = () => (
    <View
      style={{
        backgroundColor: colors.deliverySlot,
        height: 1,
      }}
    />
  );

  _renderItem = (parentIndex, {item, index}) => {
    return (
      <View
        style={{
          width: 94,
          height: 94,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          backgroundColor: 'white',
          shadowColor: '#000',
          borderWidth: item.status === 1 ? 0 : 1,
          borderColor: '#1CCBBF',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          borderRadius: 5,
        }}>
        <TouchableOpacity
          style={{
            height: 13,
            width: 13,
            position: 'absolute',
            top: 3,
            right: 3,
          }}
          onPress={() => this.onParentItemClick(item, index, parentIndex)}>
          <Image
            source={
              item.status === 1
                ? localImages.add_icon
                : localImages.checked_light_blue
            }
            style={{
              height: 13,
              width: 13,
              position: 'absolute',
              right: 2,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <Image
          source={
              localImages.logo
                
            }
          style={{height: 40, width: 50, marginTop: 6}}
          resizeMode="stretch"
        />
        <Text numberOfLines={1} style={{marginTop: 10}}>
          {item.symbol}
        </Text>
      </View>
    );
  };

  onParentItemClick = (item, index, parentData) => {
    const {EntiityData, selectedData} = this.state;
    for (var i = 0; i < EntiityData.length; i++) {
      if (EntiityData[i].title == parentData.title) {
        var localEntity = Object.assign([], EntiityData);
        if (localEntity[i].popularStock[index].status == 1) {
          localEntity[i].popularStock[index].status = 0;
          selectedData.push(item);
        } else {
          localEntity[i].popularStock[index].status = 1;
          var localEntitySlected = Object.assign([], selectedData);
          let parentIndex = localEntitySlected
            .map(it => {
              return it._id;
            })
            .indexOf(item._id);
          localEntitySlected.splice(parentIndex, 1);
          this.setState({selectedData: localEntitySlected});
        }
        this.setState({EntiityData: localEntity});
      } else {
        //console.log(i);
      }
    }
  };

  onParentItemTickerClick = (item, index) => {
    const {selectedData, tickerData} = this.state;
    var localTickerFirst = Object.assign([], tickerData);

    if (localTickerFirst[index].status == 1) {
      localTickerFirst[index].status = 0;
      selectedData.push(item);
    } else {
      localTickerFirst[index].status = 1;

      var localEntitySlected = Object.assign([], selectedData);

      let parentIndex = localEntitySlected
        .map(it => {
          return it._id;
        })
        .indexOf(item._id);
      localEntitySlected.splice(parentIndex, 1);

      this.setState({selectedData: localEntitySlected});
    }

    this.setState({tickerData: localTickerFirst});
  };

  _renderTickerItem = ({item, index}) => {
    return (
      <View
        style={{
          width: 94,
          height: 94,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          borderWidth: item.status === 1 ? 0 : 1,
          borderColor: '#1CCBBF',
          shadowRadius: 2.22,

          elevation: 3,
          borderRadius: 5,
        }}>
        <TouchableOpacity
          style={{
            height: 13,
            width: 13,
            position: 'absolute',
            top: 3,
            right: 3,
          }}
          onPress={() => this.onParentItemTickerClick(item, index)}>
          <Image
            source={
              item.status == 1
                ? localImages.add_icon
                : localImages.checked_light_blue
            }
            style={{
              height: 13,
              width: 13,
              position: 'absolute',
              right: 2,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <Image
          source={{uri: item.tickerImage}}
          style={{height: 40, width: 50, marginTop: 6}}
          resizeMode="stretch"
        />
        <Text numberOfLines={1} style={{marginTop: 10}}>
          {item.symbol}
        </Text>
      </View>
    );
  };

  searchPopular = search => {
    this.setState({searchItem: search});
    var n = search.length;

    if (search == '') {
      this.setState({tickerData: [], isEntityView: true});
    }
  };

  onSubmitEditing = () => {
    const {searchItem} = this.state;
    if (searchItem == '') {
      this.setState({tickerData: [], isEntityView: true});
    } else {
      this.getTicker(searchItem);
      this.setState({isEntityView: false});
    }
  };

  getTicker = results => {
    const dataToSend = {
      ticker: results,
    };
    this.setState({loadingSpinner: true});

    postAPI('searchTicker', dataToSend)
      .then(response => {
        if (response.status == 200) {
          console.log(JSON.stringify(response));
          this.setState({loadingSpinner: false});

          const newArr2 = response.data.map((v, index) =>
            Object.assign(v, {_id: index, status: 1}),
          );
          this.setState({tickerData: newArr2}, () => {
            console.log('JavaScript', this.state.tickerData);
          });
        } else {
          this.setState({loadingSpinner: false});
        }
        console.log(response, response.message);
      })
      .catch(err => {
        this.setState({loadingSpinner: false});

        //ShowToast('Something went wrong');
        console.log(err);
      });
  };

  showSteps = () => {
    const {tickerData, EntiityData, isEntityView, loadingSpinner} = this.state;
    return (
      <View
        style={{
          backgroundColor: colors.authBackGroud,
          marginBottom: hp('20%'),
        }}>
        <View>
          <SearchTextInput
            height={38}
            backgroundColor={colors.white}
            width={width - 30}
            borderRadius={30}
            // marginTop={30}
            placeholder="Search 6000+ Stocks & Funds..."
            //  label="Password"
            labelColor={colors.labelColor}
            placeholderColor={colors.placeHolderColor}
            inputTextColor={colors.text}
            maxLength={50}
            iconName={'search_gray_icon'}
            onChangeText={this.searchPopular}
            onSubmitEditing={this.onSubmitEditing}
            iconName={'search_gray_icon'}
            keyboardType={'web-search'}
          />

          {!isEntityView ? (
            <FlatList
              horizontal={true}
              data={tickerData}
              renderItem={this._renderTickerItem}
              ListEmptyComponent={() => {
                if (loadingSpinner) {
                  return null;
                } else {
                  return (
                    <View
                      style={{
                        flex: 1,
                        height: 500,
                        width: width,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>No data found!</Text>
                    </View>
                  );
                }
              }}
              style={{backgroundColor: colors.authBackGroud}}
            />
          ) : (
            <FlatList
              data={EntiityData}
              renderItem={({item}) => (
                <View>
                  <Text style={styles.heading}>{item.title}</Text>
                  <FlatList
                    horizontal={true}
                    data={item.popularStock}
                    renderItem={this._renderItem.bind(this, item)}
                    style={{
                      backgroundColor: colors.authBackGroud,
                    }}
                  />
                </View>
              )}
            />
          )}
        </View>
      </View>
    );
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  nextView = () => {
    const {selectedData} = this.state;
    if (selectedData.length == 0) {
      ShowToast('Please select stocks & Founds... ');
      return;
    }
    this.props.navigation.navigate('TopStockList', {
      selectedData: selectedData,
      id: this.props.route.params.id,
      from: this.props.route.params.from,
    });
  };

  stockApiCalling = () => {
    const {selectedData} = this.state;
    const cnames = selectedData.map(({_id}) => _id).join(', ');
    const dataToSend = {
      userId: this.state.userId,
      basket: JSON.stringify(selectedData),
    };

    console.log('Request data' + JSON.stringify(dataToSend));
    this.setState({loadingSpinner: true});
    postAPI('createBasket', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.setState({isModal: false});
          this.setState({loadingSpinner: false});
          this.setState({
            currentPosition:
              this.state.currentPosition == 2
                ? (this.state.currentPosition = 2)
                : this.state.currentPosition + 1,
          });
        } else {
          this.setState({loadingSpinner: false});
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        //ShowToast('Something went wrong');
        console.log(err);
      });
  };

  onSkip = () => {
    if (this.props.route.params.from == 'dashBord') {
      this.props.navigation.navigate('Home', {
        screen: 'Dashboard',
        params: {id: 5},
      });
    } else {
      this.props.navigation.navigate('VerifyYourIdentity', {
        id: this.props.route.params.id,
      });
    }
  };
  render() {
    return (
      // <View style={[CustomStyles.containerbording]}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.authBackGroud}}>
        <Spinner
          visible={this.state.loadingSpinner}
          cancelable={true}
          indicatorStyle={{color: colors.red}}
        />
        <HeaderWithBackWhite
          Header="Create your Basket"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() =>
            this.setState({
              currentPosition:
                this.state.currentPosition == 0
                  ? this.goBack()
                  : this.state.currentPosition - 1,
            })
          }
        />
        <View style={styles.stepperSubContainer}>
          <StepIndicator
            style={{flex: 1}}
            customStyles={this.state.customStyles}
            currentPosition={0}
            // labels={this.state.labels}
            stepCount={4}
            //renderStepIndicator={(state)=>{this.putTickIndicator(state)}}
          />
        </View>

        <ScrollView style={{width: wp('100%'), height: hp('100%')}}>
          <View
            style={{
              flex: 1,
              width: width - 30,
              alignSelf: 'center',
            }}>
            {this.showSteps()}
          </View>
        </ScrollView>
        <View
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: hp('0%'),
            height: hp('18%'),
            width: wp('100%'),
            backgroundColor: colors.authBackGroud,
          }}>
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: this.state.currentPosition == 0 ? hp('4%') : hp('8%'),
            }}>
            {this.state.currentPosition == 0 ? (
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={wp('60%')}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={this.nextView}
                />
                <TouchableOpacity onPress={this.onSkip}>
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
            ) : this.state.currentPosition == 2 ? (
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={wp('60%')}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.props.navigation.navigate('VerifyYourIdentity', {
                      id: this.props.route.params.id,
                    })
                  }
                />
              </View>
            ) : (
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={wp('60%')}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={this.stockApiCalling}
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  // accordianTextContainer: {
  //   marginTop: 166,
  //   //flex : 1,
  //   // height : "60%",
  //   alignSelf: 'center',
  //   marginBottom: 23,
  // },
  footerText: {
    //width: width - 40,
    fontFamily: fonts.regular,
    fontSize: 16,
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
    borderWidth: 0.5,
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
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 16,
    marginLeft: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    width: wp('80%'),
  },
  smallCircle: {
    width: 13,
    height: 13,
    backgroundColor: colors.blue,
    borderRadius: 50,
  },
  plusBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.light_blue,
    borderWidth: 1,
    backgroundColor: colors.light_blue,
    marginRight: 20,
    borderRadius: 50,
  },
  plusBtnText: {
    fontSize: 18,
    color: colors.blue,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  percentCountContainer: {
    height: 24,
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.grayColor,
    borderWidth: 0.5,
    backgroundColor: colors.white,
    marginLeft: 5,
    borderRadius: 4,
  },
  percentCountText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'normal',
    lineHeight: 24,
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
  },
  stepStyle: {
    backgroundColor: colors.light_blue,
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
    paddingBottom: 50,
  },
  stepperSubContainer: {
    width: width,
    height: 35,
    backgroundColor: 'white',
  },
  selectAllocationImage: {
    borderRadius: 50,
    height: 120,
    width: 120,
    alignSelf: 'center',
    marginBottom: hp('4.04%'),
  },
  button: {
    margin: 3,
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: '#ccc',
    opacity: 0.9,
  },
  buttonSelected: {
    opacity: 1,
    backgroundColor: colors.blue,
  },
  buttons: {
    //height: 10,
    marginTop: 20,
    // marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  popularThemesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  heading: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fonts.bold,
    marginTop: hp('3.7%'),
    marginHorizontal: 0,
    // fontWeight: "600",
    textAlign: 'left',
    marginBottom: hp('2.2%'),
    marginLeft: 5,
  },
  infoIcon: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.bold,
    marginHorizontal: 0,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoContainer: {
    height: 16.5,
    width: 16.5,
    marginTop: hp('4%'),
    marginLeft: wp('2.4'),
    // backgroundColor: colors.info_color,
    borderRadius: wp('50%'),
  },
  microsoftIcon: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginBottom: 15,
  },
  minusImage: {
    height: 29,
    width: 29,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 50,
  },
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
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
});

// export default StartYourSignUpJourney1
