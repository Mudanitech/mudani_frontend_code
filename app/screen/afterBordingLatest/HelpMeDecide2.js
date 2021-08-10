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
  TextInput,
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import RadioButtonAccordian from './../../component/RadioButtonAccordian';
import {hp, wp} from '../../utils/responsive';
import HelpMeDecideAccordian from './../../component/HelpMeDecideAccordian';
import {color} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

class HelpMeDecide extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [
        {
          title: ' ',
          data: 'sjdhfldjsfjlsdkjfkldjsklf',
        },
        {
          title:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque.',
          data: 'sjdhfldjsfjlsdkjfkldjsklf',
        },
        {
          title:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque.',
          data: 'sjdhfldjsfjlsdkjfkldjsklf',
        },
        {
          title:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque.',
          data: 'sjdhfldjsfjlsdkjfkldjsklf',
        },
        {
          title:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque.',
          data: 'sjdhfldjsfjlsdkjfkldjsklf',
        },
      ],
    };
  }

  accordianRenderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.renderItemContainer}>
        <View style={styles.renderItemSubContainer}>
          <View>
            <Text style={styles.questionText1}>1</Text>
          </View>
          <View>
            <Text style={styles.questionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              interdum neque.
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.answerText}>Your Answer</Text>
        </View>
        <View>
          <TextInput style={styles.textInput} multiline={true}></TextInput>
        </View>
      </View>
    );
  };
  render() {
    return (
      <>
        <View style={CustomStyles.containerbording}>
          <SafeAreaView style={{flex: 1}}>
            <HeaderWithBack
              backgroundColor={1}
              Header={'Help Me Decide'}
              labelStyle={styles.labelStyle}
              onActionLeft={() =>
                this.props.navigation.navigate('HelpMeDecide')
              }
            />
            <ScrollView style={{flexGrow: 1}}>
              <View style={{alignSelf: 'center'}}>
                <Text
                  numberOfLines={2}
                  style={{
                    color: colors.blue,
                    fontSize: 16,
                    fontFamily: fonts.bold,
                    marginTop: hp('5.24%'),
                    // marginHorizontal: 40,
                    fontWeight: '600',
                    textAlign: 'center',
                    lineHeight: 21,
                    width: width - 140,
                    alignSelf: 'center',
                  }}>
                  Based on your answer we will Suggest you the account
                </Text>
                <FlatList
                  style={{marginTop: hp('5.19%')}}
                  data={this.state.data}
                  renderItem={this.accordianRenderItem}
                />

                <View
                  style={{
                    marginTop: hp('6.5%'),
                    alignSelf: 'center',
                    marginTop: 103,
                    marginBottom: hp('6.5%'),
                  }}>
                  <ButtonWithoutShadow
                    width={width - 120}
                    height={43}
                    //  marginTop={22}
                    borderRadius={20}
                    labelColor={colors.white}
                    label="Next"
                    backgroundColor={colors.blue}
                    onAction={() =>
                      this.props.navigation.navigate('HelpMeDecide')
                    }
                  />
                </View>
              </View>
            </ScrollView>
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
    paddingTop: hp('1.79%'),
    paddingBottom: hp('4.64%'),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    borderRadius: wp('3%'),
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
    fontFamily: fonts.semiBold,
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
  },
  labelStyle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  textInput: {
    height: 60,
    width: 282,
    backgroundColor: colors.light_blue,
  },
});

export default HelpMeDecide;
