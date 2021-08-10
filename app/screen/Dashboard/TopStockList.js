import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBackWhite} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import StepIndicator from 'react-native-step-indicator';

const {width, height} = Dimensions.get('window');
import {colors, fonts, localImages} from '../../utils/constant';
import ShowToast from '../../component/Toast';

import {CustomStyles} from '../style/CustomStyles';
import {getAPI, postAPI} from './../../utils/Api';
import DataManager from './../../utils/DataManager';
import Spinner from './../../utils/Loader';

class TopStockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        selectedData: '',
      },
      userId: '',
      loadingSpinner: false,
    };
  }
  componentDidMount = async () => {
    const {selectedData} = this.props.route.params;
    this.setState({selectedData: selectedData});
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils987', userDetails);
    console.log('From', this.props.route.params);
    this.setState({userId: userDetails._id});
  };
  stockApiCalling = () => {
    const {selectedData} = this.state;
    const dataToSend = {
      userId: this.state.userId,
      basket: JSON.stringify(selectedData),
    };
    this.setState({loadingSpinner: true});
    postAPI('createBasket', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.setState({isModal: false});
          this.setState({loadingSpinner: false});

          this.props.navigation.navigate('BasketCreatedView', {
            id: this.props.route.params.id,
            from: this.props.route.params.from,
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

  onRemoveItem = (item, index) => {
    const {selectedData} = this.state;

    var localEntitySlected = Object.assign([], selectedData);
    let parentIndex = localEntitySlected
      .map(it => {
        return it._id;
      })
      .indexOf(item._id);
    localEntitySlected.splice(parentIndex, 1);
    this.setState({selectedData: localEntitySlected});
  };

  _renderItemComp1 = ({item, index}) => {
    return (
      <View
        style={{
          width: '90%',
          height: width / 5,
          borderRadius: 6,
          backgroundColor: 'white',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',

            alignSelf: 'center',
          }}>
          <Image
            style={{height: 50, width: 100, resizeMode: 'contain'}}
            source={{
              uri:
                item.tickerImage != undefined
                  ? item.tickerImage
                  : item.ticker_image,
            }}
          />

          <TouchableOpacity
            onPress={() => this.onRemoveItem(item, index)}
            style={{
              justifyContent: 'center',
            }}>
            <Image
              source={localImages.minus_light_blue}
              style={{
                resizeMode: 'contain',
                height: 35,
                width: 35,
              }}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderSeparator = () => (
    <View
      style={{
        backgroundColor: colors.deliverySlot,
        height: 1,
      }}
    />
  );
  render() {
    const {selectedData} = this.state;

    console.log('dadad hai' + JSON.stringify(selectedData));
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.authBackGroud}}>
        <HeaderWithBackWhite
          Header="Create your Basket"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
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

        {/* <SafeAreaView>
          <ScrollView style={{flexGrow: 1}}> */}

        <View
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            padding: width / 20,
            paddingBottom: 0,
            borderRadius: width / 40,
            flex: 1,
          }}>
          <FlatList
            keyExtractor={item => item.id}
            data={selectedData}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={this._renderItemComp1}
          />

          <Spinner
            visible={this.state.loadingSpinner}
            cancelable={true}
            indicatorStyle={{color: colors.red}}
          />

          <View style={{alignSelf: 'center'}}>
            <ButtonWithoutShadow
              width={wp('60%')}
              height={43}
              marginTop={22}
              borderRadius={20}
              marginBottom={20}
              labelColor={colors.white}
              label="Next"
              backgroundColor={colors.blue}
              onAction={this.stockApiCalling}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default TopStockList;

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
