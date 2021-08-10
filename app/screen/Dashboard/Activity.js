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
  ImageBackground,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HeaderWithBack, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {TwoButtonModal} from './../../component/confirmModal';
import {Container, Header, Content, Icon, Picker, Form} from 'native-base';

const Order = (props) => {
  const [isModal, setState] = useState(false);
  const [selected,setSelected] = useState(undefined)
  const modalOpen = () => {
    setState(true);
  };
  const modalClose = () => {
    setState(false);
  };
  const onValueChange = (value)=> {
    setSelected(value);
  }
  return (
    <View style={styles.mainContainer}>
      <View >
      <View style={[styles.orderFirstContainer,{marginBottom : 10,}]}>
        <View>
          <Text style = {[styles.heading]}>Recent</Text>
        </View>
        <View>
          <TouchableOpacity onPress = {()=> modalOpen()}>
          <Image
            source={localImages.filter_blue_icon}
            style={{height: 15, width: 15}}
          />
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.orderContainer}>
      <View style={styles.orderSecondContainer}>
        <View style={[styles.orderFirstContainer,{marginBottom : 2 }]}>
          <View>
            <Text style = {styles.pendingText}>Pending</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text numberOfLines = {2} style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
     
      <View style={styles.orderSecondContainer}>
        <View style={styles.orderFirstContainer}>
          <View>
            <Text style = {styles.pendingText}>Pending</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
      </View>
     </View>
     <View >
      <View style={styles.orderFirstContainer}>
        <View>
          <Text style = {styles.heading}>Past Days</Text>
        </View>
      </View>
      <View style = {styles.orderContainer}>
      <View style={styles.orderSecondContainer}>
        <View style={[styles.orderFirstContainer,{marginBottom : 2 }]}>
          <View>
            <Text style = {[styles.pendingText,{color:colors.blue}]}>Completed</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
     
      <View style={styles.orderSecondContainer}>
        <View style={styles.orderFirstContainer}>
          <View>
            <Text style = {[styles.pendingText,{color:colors.blue}]}>Completed</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
      </View>
     </View>
     <TwoButtonModal isModalVisible={isModal} modalClose={() => modalClose()}>
        <View style={styles.popupMainContainer}>
          {/* <Image source={props.image} style={styles.circleDollar} /> */}
          <Image
            source={localImages.black_filter_icon}
            style={{height: 35, width: 35}}
          />

          <Text style={[styles.popUpText,{fontWeight : "bold",fontSize : 14}]}>Filter</Text>
        </View>
        <View style = {{flexDirection : "row", justifyContent : "space-between",marginTop : 20,marginBottom : 10}}>
        <TouchableOpacity style={{height : 40,width : 80,borderWidth : Platform.OS == "android"?0.5:0.3,borderColor : colors.black,alignItems : "center",justifyContent : "center",borderRadius : 20}}>
          <Text style = {{fontSize : 14,color : colors.grayColor}}>1 Month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor : colors.info_color,height : 40,width : 80,borderWidth : Platform.OS == "android"?0.5:0.3,borderColor : colors.grayColor,alignItems : "center",justifyContent : "center",borderRadius : 20}}>
          <Text style = {{fontSize : 14,color : colors.white}}>6 Month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height : 40,width : 80,borderWidth : Platform.OS == "android"?0.5:0.3,borderColor : colors.black,alignItems : "center",justifyContent : "center",borderRadius : 20}}>
          <Text style = {{fontSize : 14,color : colors.grayColor}}>1 Year</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.popupButtonContainer}>
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Apply"
            backgroundColor={colors.blue}
            onAction={() => modalClose()}
          />
        </View>
      </TwoButtonModal>
   
    </View>
  );
};
const Transfer = (props) => {
  const [isModal, setState] = useState(false);
  const [selected,setSelected] = useState(undefined)
  const modalOpen = () => {
    setState(true);
  };
  const modalClose = () => {
    setState(false);
  };
  const onValueChange = (value)=> {
    setSelected(value);
  }
  return (
    <View style={styles.mainContainer}>
      <View >
      <View style={[styles.orderFirstContainer,{marginBottom : 10,}]}>
        <View>
          <Text style = {styles.heading}>Recent</Text>
        </View>
        <View>
          <TouchableOpacity onPress = {()=> modalOpen()}>
          <Image
            source={localImages.filter_blue_icon}
            style={{height: 15, width: 15}}
          />
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.orderContainer}>
      <View style={styles.orderSecondContainer}>
        <View style={[styles.orderFirstContainer,{marginBottom : 2 }]}>
          <View>
            <Text style = {styles.pendingText}>Pending</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text numberOfLines = {2} style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
     
      <View style={styles.orderSecondContainer}>
        <View style={styles.orderFirstContainer}>
          <View>
            <Text style = {styles.pendingText}>Pending</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
      </View>
     </View>
     <View >
      <View style={styles.orderFirstContainer}>
        <View>
          <Text style = {styles.heading}>Past Days</Text>
        </View>
      </View>
      <View style = {styles.orderContainer}>
      <View style={styles.orderSecondContainer}>
        <View style={[styles.orderFirstContainer,{marginBottom : 2 }]}>
          <View>
            <Text style = {[styles.pendingText,{color:colors.blue}]}>Completed</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
     
      <View style={styles.orderSecondContainer}>
        <View style={styles.orderFirstContainer}>
          <View>
            <Text style = {[styles.pendingText,{color:colors.blue}]}>Completed</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
      </View>
     </View>
     <TwoButtonModal isModalVisible={isModal} modalClose={() => modalClose()}>
        <View style={styles.popupMainContainer}>
          <Image source={props.image} style={styles.circleDollar} />
          <Image
            source={localImages.black_filter_icon}
            style={{height: 35, width: 35}}
          />

          <Text style={[styles.popUpText,{fontWeight : "bold",fontSize : 14}]}>Filter</Text>
        </View>
        <View style = {{flexDirection : "row", justifyContent : "space-between",marginTop : 20,marginBottom : 10}}>
        <TouchableOpacity style={{height : 40,width : 80,borderWidth : Platform.OS == "android"?0.5:0.3,borderColor : colors.black,alignItems : "center",justifyContent : "center",borderRadius : 20}}>
          <Text style = {{fontSize : 14,color : colors.grayColor}}>1 Month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor : colors.info_color,height : 40,width : 80,borderWidth : Platform.OS == "android"?0.5:0.3,borderColor : colors.grayColor,alignItems : "center",justifyContent : "center",borderRadius : 20}}>
          <Text style = {{fontSize : 14,color : colors.white}}>6 Month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height : 40,width : 80,borderWidth : Platform.OS == "android"?0.5:0.3,borderColor : colors.black,alignItems : "center",justifyContent : "center",borderRadius : 20}}>
          <Text style = {{fontSize : 14,color : colors.grayColor}}>1 Year</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.popupButtonContainer}>
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Apply"
            backgroundColor={colors.blue}
            onAction={() => modalClose()}
          />
        </View>
      </TwoButtonModal>
   
    </View>
  );
};
const Dividends = (props) => {
  const [isModal, setState] = useState(false);
  const [selected,setSelected] = useState(undefined)
  const modalOpen = () => {
    setState(true);
  };
  const modalClose = () => {
    setState(false);
  };
  const onValueChange = (value)=> {
    setSelected(value);
  }
  return (
    <View style={styles.mainContainer}>
      <View >
      <View style={[styles.orderFirstContainer,{marginBottom : 10,}]}>
        <View>
          <Text style = {styles.heading}>Recent</Text>
        </View>
        <View>
          <TouchableOpacity onPress = {()=> modalOpen()}>
          <Image
            source={localImages.filter_blue_icon}
            style={{height: 15, width: 15}}
          />
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.orderContainer}>
      <View style={styles.orderSecondContainer}>
        <View style={[styles.orderFirstContainer,{marginBottom : 2 }]}>
          <View>
            <Text style = {styles.pendingText}>Pending</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text numberOfLines = {2} style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
     
      <View style={styles.orderSecondContainer}>
        <View style={styles.orderFirstContainer}>
          <View>
            <Text style = {styles.pendingText}>Pending</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
      </View>
     </View>
     <View >
      <View style={styles.orderFirstContainer}>
        <View>
          <Text style = {styles.heading}>Past Days</Text>
        </View>
      </View>
      <View style = {styles.orderContainer}>
      <View style={styles.orderSecondContainer}>
        <View style={[styles.orderFirstContainer,{marginBottom : 2 }]}>
          <View>
            <Text style = {[styles.pendingText,{color:colors.blue}]}>Completed</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
     
      <View style={styles.orderSecondContainer}>
        <View style={styles.orderFirstContainer}>
          <View>
            <Text style = {[styles.pendingText,{color:colors.blue}]}>Completed</Text>
          </View>
          <View>
            <Text style = {styles.dateText}>20 December 2019</Text>
          </View>
        </View>
        <View>
        <Text style = {styles.paraText}>Lorem ipsum dolor sit amet, consectetu adipiscing elit. Donec interdum neque.</Text>
        </View>
        <View>
        <Text style = {styles.dollarText}>$10</Text>
        </View>
      </View>
      </View>
     </View>
     <TwoButtonModal isModalVisible={isModal} modalClose={() => modalClose()}>
        <View style={styles.popupMainContainer}>
          <Image source={props.image} style={styles.circleDollar} />
          <Image
            source={localImages.black_filter_icon}
            style={{height: 35, width: 35}}
          />

          <Text style={[styles.popUpText,{fontWeight : "bold",fontSize : 14}]}>Filter</Text>
        </View>
        <View style = {{flexDirection : "row", justifyContent : "space-between",marginTop : 20,marginBottom : 10}}>
        <TouchableOpacity style={{height : 40,width : 80,borderWidth : Platform.OS == "android"?0.5:0.3,borderColor : colors.black,alignItems : "center",justifyContent : "center",borderRadius : 20}}>
          <Text style = {{fontSize : 14,color : colors.grayColor}}>1 Month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor : colors.info_color,height : 40,width : 80,borderWidth : Platform.OS == "android"?0.5:0.3,borderColor : colors.grayColor,alignItems : "center",justifyContent : "center",borderRadius : 20}}>
          <Text style = {{fontSize : 14,color : colors.white}}>6 Month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height : 40,width : 80,borderWidth : Platform.OS == "android"?0.5:0.3,borderColor : colors.black,alignItems : "center",justifyContent : "center",borderRadius : 20}}>
          <Text style = {{fontSize : 14,color : colors.grayColor}}>1 Year</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.popupButtonContainer}>
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Apply"
            backgroundColor={colors.blue}
            onAction={() => modalClose()}
          />
        </View>
      </TwoButtonModal>
   
    </View>
  );
};

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentPosition: 0,
    };
  }

  setPositions = (currentPosition) => {
    this.setState({currentPosition: currentPosition});
  };
  showTabs = () => {
    if (this.state.currentPosition == 0) {
      return <Order  {...this.props} />;
    } else if (this.state.currentPosition == 1) {
      return <Transfer {...this.props}  />;
    } else if (this.state.currentPosition == 2) {
      return <Dividends {...this.props} />;
    }
  };
  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="Activity"
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
              Order
            </Text>
          </TouchableOpacity>
          <View style={styles.borderSeperator} />
          <TouchableOpacity
            style={
              this.state.currentPosition == 1
                ? styles.buttons4
                : styles.buttons1
            }
            onPress={() => this.setPositions(1)}>
            <Text
              style={
                this.state.currentPosition == 1
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              Transfer
            </Text>
          </TouchableOpacity>
          <View style={styles.borderSeperator} />
          <TouchableOpacity
            style={
              this.state.currentPosition == 2
                ? styles.buttons3
                : styles.buttons1
            }
            onPress={() => this.setPositions(2)}>
            <Text
              style={
                this.state.currentPosition == 2
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              Dividends
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
    marginBottom: hp('5%'),
  },

  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
    //paddingLeft: wp('4.53'),
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
  buttons4: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('5.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopRightRadius: wp('2%'),
    // borderBottomRightRadius: wp('2%'),
  },
  buttonText1: {
    fontSize: wp('3%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  buttonText2: {
    fontSize: wp('3%'),
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  borderSeperator: {
    height: 30,
    borderWidth: Platform.OS == 'android' ? 0.3 : 0.5,
    borderColor: colors.grayColor,
  },
  orderFirstContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    
  },
  orderSecondContainer: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: wp('1.9%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    padding : 10,
    marginBottom : 14,
    borderRadius : 7,
  },
pendingText : {
  fontSize: wp('3.73%'),
  color: colors.grayColor,
  fontFamily: fonts.regular,
  lineHeight: 20,
  // marginLeft: wp('2.53'),
},
dateText : {
    fontSize: wp('2.4%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  paraText : {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign : "auto"
  },

  dollarText : {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    marginTop : 10,
    // marginLeft: wp('2.53'),
  },
  heading : {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  orderContainer :{
      marginTop : 15
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
  },
});
export default Activity;
