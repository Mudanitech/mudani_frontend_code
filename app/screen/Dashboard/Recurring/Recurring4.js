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
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../../component/Button';
import {colors, fonts, localImages} from '../../../utils/constant';
import {CustomStyles} from '../../style/CustomStyles';
import {wp, hp} from '../../../utils/responsive';
const {height, width} = Dimensions.get('window');
import {Container, Header, Content, Icon, Picker, Form} from 'native-base';

class Recurring4 extends Component {
  constructor(props) {
    super();
    this.state = {
      index: '',
      // itemList: ['Apple', 'Orange', 'Peach', 'Strawberries', 'Pineapple'],
      // selectedItem: 2,
      selected: undefined,
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            labelStyle={styles.labelStyle}
            Header={'Schedule'}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView style={{flexGrow: 1}}>
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: 20,
                  fontFamily: fonts.semiBold,
                  marginTop: 70,
                  marginHorizontal: 40,
                  fontWeight: '600',
                  textAlign: 'center',
                  lineHeight: 27,
                }}>
                How often would you like to make this recurring deposit?
              </Text>
              {/* <Content >
                <Form> */}
              <Picker
                mode="dialog"
                iosIcon={
                  <Image
                    source={localImages.down}
                    style={{height: 10, width: 20, resizeMode: 'contain'}}
                  />
                }
                placeholder="Select"
                value="Select"
                placeholderStyle={{color: colors.black}}
                placeholderIconColor="#007aff"
                style={{width: 200, alignSelf: 'center', marginTop: 70}}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
                itemTextStyle={{color: colors.black}}
                textStyle={{color: colors.black}}>
                <Picker.Item label="Weekly" value="key0" />
                <Picker.Item label="Monthly" value="key1" />
                <Picker.Item label="Quarterly" value="key2" />
              </Picker>
              {/* </Form>
              </Content> */}
              <Text style={styles.paratext}>
                This deposit will be initiated on the 1st of every month (Monthly), or 1st day of the business week (Monday).
              </Text>

              <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 50,
                }}>
                <ButtonWithoutShadow
                  width={width - 146}
                  height={43}
                  marginTop={20}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Set Schedule"
                  backgroundColor={colors.blue}
                  onAction={() => this.props.navigation.navigate('Recurring5')}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    lineHeight: 24,
  },
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
  },
  paratext: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    width: 250,
    alignSelf: 'center',
    marginTop: 210,
  },
});

export default Recurring4;
