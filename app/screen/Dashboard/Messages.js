import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {HeaderWithBack,ButtonWithoutShadow} from '../../component/Button';
import {colors, fonts} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {wp, hp} from '../../utils/responsive';

const {height, width} = Dimensions.get('window');

class Messages extends Component {
  constructor(props) {
    super();
    this.state = {
      showPassword: true,
      text : ''
    };
  }

  render() {
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.statusBarColor}
        />
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            Header="Messages"
            labelStyle={styles.labelStyle}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView>
            <View style={{flex: 1, marginLeft: 20, marginRight: 20}}>
              <View
                style={{
                  marginTop: 19,
                  marginBottom: 50,
                }}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.addressHeading}>General Inquiry</Text>
                  <View style={styles.textAreaContainer}>
                    <TextInput
                      style={styles.textArea}
                      underlineColorAndroid="transparent"
                      placeholder="Type your message here..."
                      placeholderTextColor="grey"
                      value = {this.state.text}
                    //   numberOfLines={10}
                      multiline={true}
                      onChangeText = {(value)=> this.setState({text :value })}
                    />
                  </View>
                </View>
                <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 29,
                }}>
                <ButtonWithoutShadow
                  width={width - 147}
                  height={43}
                  marginTop={14}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Submit"
                  backgroundColor={colors.blue}
                  onAction={() =>null}
                />
              </View>
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
  byContinueText: {
    color: colors.black,
    fontSize: wp('3.2%'),
    fontFamily: fonts.regular,
    textAlign: 'center',
    lineHeight: 27,
    textAlign: 'center',
    fontStyle: 'normal',
    // marginBottom : hp("5%")
    marginTop: 51,
  },
  termAndCondition: {
    color: colors.info_color,
    fontSize: wp('4%'),
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'normal',
    marginTop: 9,
  },
  heading: {
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 14,
    marginLeft: 24,
    marginBottom: 4,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  addressHeading: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 21,
    marginTop: 14,
    marginLeft: 0,
    marginBottom: 18,
  },
  textAreaContainer: {
      flex : 1,
    borderColor: colors.white,
    borderWidth: 7,
    height : 242,
    borderRadius : 10,
    backgroundColor : colors.light_blue
  },
  textArea: {
    justifyContent: 'flex-start',
    padding : 10
  },
});

export default Messages;
