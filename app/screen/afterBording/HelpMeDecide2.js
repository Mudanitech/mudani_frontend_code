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
  FlatList,
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import RadioButtonAccordian from './../../component/RadioButtonAccordian';
import {hp, wp} from '../../utils/responsive';
import HelpMeDecideAccordian from './../../component/HelpMeDecideAccordian';
import ShowToast from '../../component/Toast';
const {height, width} = Dimensions.get('window');
class HelpMeDecide extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [
        {
          title: 'Do you want to invest & trade stocks on your own?',
          data: 'Yes',
          data1: 'No',
          isTrueYes: null,
          isTrueNo: false,
        },
        {
          title:
            'Do you want Mudani to create you a customized portfolio and manage it daily so you don’t have to?',
          data: 'Yes',
          data1: 'No',
          isTrueYes: null,
          isTrueNo: false,
        },
        {
          title:
            'Just want to play our stock games to win rewards and learn the stock market better?',
          data: 'Yes',
          data1: 'No',
          isTrueYes: null,
          isTrueNo: false,
        },
      ],
    };
  }

  onClickItemYes = index => {
    const {data} = this.state;
    var localData = [];
    localData = data;

    for (var i = 0; i < data.length; i++) {
      localData[i].isTrueNo = false;
    }
    localData[index].isTrueNo = true;

    if (localData[index].isTrueNo == true) {
      localData[index].isTrueNo = false;
    } else {
      localData[index].isTrueNo = true;
    }
    if (localData[index].isTrueYes == true) {
      localData[index].isTrueYes = false;
    } else {
      localData[index].isTrueYes = true;
    }
    this.setState({data: localData});
  };

  toggleExpand = index => {
    console.log('kasdksj');
    const {data} = this.state;
    var localData = Object.assign([], data);

    // for (var i = 0; i < data.length; i++) {
    //   localData[i].isTrueNo = false;
    // }

    if (localData[index].isTrueNo == true) {
      localData[index].isTrueNo = false;
    } else {
      localData[index].isTrueNo = true;
    }

    this.setState({data: localData});
  };

  accordianRenderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.renderItemContainer}>
        <View style={styles.renderItemSubContainer}>
          <View>
            <Text style={styles.questionText1}>{index + 1}</Text>
          </View>
          <View>
            <Text style={styles.questionText}>{item.title}</Text>
          </View>
        </View>
        {/* <View>
          <Text style={styles.answerText}>Your Answer</Text>
        </View> */}
        <View style={{marginTop: 5}}>
          <HelpMeDecideAccordian
            title={
              item.isTrueYes == null
                ? 'select'
                : item.isTrueYes == true
                ? 'Yes'
                : 'No'
            }
            onClickItemYes={() => this.onClickItemYes(index)}
            toggleExpand={() => this.toggleExpand(index)}
            data={item.data}
            item={item}
            data1={item.data1}></HelpMeDecideAccordian>
        </View>
      </View>
    );
  };

  gotoNextScreen = () => {
    const {data} = this.state;

    if (
      data[0].isTrueYes == null ||
      data[1].isTrueYes == null ||
      data[2].isTrueYes == null
    ) {
      ShowToast('Select options');
      return;
    }

    var selectOption = [];
    data.forEach(item => {
      if (item.isTrueYes === true) {
        itemYouWant = item;
        selectOption.push(item.isTrueYes);
      } else {
        selectOption.push(item.isTrueYes);
      }
    });
    console.log(JSON.stringify(selectOption));

    this.props.navigation.navigate('HelpMeDecide', {
      selectOption: selectOption,
    });
  };

  render() {
    const {data} = this.state;
    return (
      <>
        <View style={CustomStyles.containerbording}>
          <SafeAreaView style={{flex: 1}}>
            <HeaderWithBack
              backgroundColor={1}
              Header={'Help me decide'}
              labelStyle={styles.labelStyle}
              onActionLeft={() => this.props.navigation.goBack()}
            />
            <ScrollView style={{flexGrow: 1}}>
              <View style={{alignSelf: 'center', marginBottom: hp('20%')}}>
                {/* <Text
                  numberOfLines={2}
                  style={{
                    color: colors.blue,
                    fontSize: 16,
                    fontFamily: fonts.bold,
                    marginTop: hp('1%'),
                    // marginHorizontal: 40,
                    fontWeight: '600',
                    textAlign: 'center',
                    lineHeight: 21,
                    width: width - 140,
                    alignSelf: 'center',
                  }}>
                  Based on your answer we will Suggest you the account
                </Text> */}
                <FlatList
                  style={{marginTop: hp('1.19%')}}
                  data={data}
                  renderItem={this.accordianRenderItem}
                />
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
                  onAction={this.gotoNextScreen}
                />
              </View>
            </View>
          </SafeAreaView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  accordianTextContainer: {
    marginTop: 50,
    // flex : 1,
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
    flex: 1,
  },
  viewSeparator: {
    borderColor: '#707070',
    borderWidth: 0.3,
    width: '80%',
    alignSelf: 'center',
  },
  renderItemContainer: {
    alignSelf: 'center',
    width: wp('84.53%'),
    paddingLeft: wp('3%'),
    paddingRight: wp('4%'),
    // paddingTop: hp('1.79%'),
    // paddingBottom: hp('4.64%'),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: wp('1.5%'),
    marginBottom: hp('1.7%'),
  },
  renderItemSubContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('1.79%'),
  },
  questionText: {
    fontSize: wp('3.73%'),
    fontStyle: 'normal',
    fontFamily: fonts.regular,
    color: colors.black,
    lineHeight: 20,
    marginLeft: wp('2%'),
  },
  questionText1: {
    fontSize: wp('3.73%'),
    fontStyle: 'normal',
    fontFamily: fonts.semiBold,
    color: colors.black,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: wp('2.4%'),
    fontStyle: 'normal',
    fontFamily: fonts.semiBold,
    color: colors.grayColor,
    lineHeight: 20,
    fontWeight: '100',
    marginTop: hp('1.9%'),
    marginBottom: hp('1.345'),
    marginLeft: 10,
  },
  labelStyle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});

export default HelpMeDecide;
