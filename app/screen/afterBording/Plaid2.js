import React, {useState, Component, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {HeaderWithBackWhite} from '../../component/Button';
import {PlainTextInput} from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import Stepper from 'react-native-stepper-ui';
const {height, width} = Dimensions.get('window');
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MyComponent = (props) => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View style={{marginTop: 20, left: 10}}>
        <View style={styles.basicPlanContainer}>
          <View style={styles.basicPlanSubContainer}>
            <View>
              <Image
                source={localImages.secure_blue}
                style={{
                  height: 36,
                  width: 36,
                  alignSelf: 'center',
                }}></Image>
            </View>

            <View>
              <Text style={styles.basicPlanText}>Secure</Text>
            </View>
            <View></View>
          </View>

          <View>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              nisl ipsum, iaculis eu ipsum vitae, feugiat maximus ex.
            </Text>
          </View>
        </View>

        <View style={styles.basicPlanContainer}>
          <View style={styles.basicPlanSubContainer}>
            <View>
              <Image
                source={localImages.private_blue}
                style={{
                  height: 36,
                  width: 36,
                  alignSelf: 'center',
                }}></Image>
            </View>

            <View>
              <Text style={styles.basicPlanText}>Private</Text>
            </View>
            <View></View>
          </View>

          <View>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              nisl ipsum, iaculis eu ipsum vitae, feugiat maximus ex.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

/* Define your class */
export default class Plaid2 extends Component {
  constructor() {
    super();
    this.state = {};
  }

  showSteps = () => {
    return <MyComponent />;
  };
//   componentDidMount=()=>{
//     console.log("props",this.props.route.params.id)
//   }
  render() {
    return (
      <SafeAreaView style={[CustomStyles.containerbording]}>
        <HeaderWithBackWhite
          Header="Plaid"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
        />
        <Image
          source={localImages.plaid_screen}
          style={{
            height: hp('12%'),
            width: wp('100%'),
            resizeMode: 'contain',
            // marginTop: 45,
            top : -10
          }}
        />
        <ScrollView style={{flex: 1,marginBottom : 150}}>
          <View style={{flex: 1, width: width - 30, alignSelf: 'center'}}>
            {this.showSteps()}
          </View>

          <View style={{marginTop: 15,marginBottom : 30}}>
            <Text style={styles.clickText}>
              By Clicking on Continuing you are agree to the
            </Text>
            <Text
              style={[
                styles.termAndConditionText,
                {marginTop: Platform.OS == 'ios' ? -16 : 0},
              ]}>
              Plaid End User
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('TermsAndConditions')
              }>
              <Text style={styles.termAndConditionText}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
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
            <View style={{ alignSelf: 'center'}}>
              <ButtonWithoutShadow
                width={wp('60%')}
                height={43}
                marginTop={77}
                borderRadius={20}
                labelColor={colors.white}
                label="Continue"
                backgroundColor={colors.blue}
                onAction={() => this.props.navigation.navigate('LinkedAccount')}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  basicPlanContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 5,
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
  },
  basicPlanSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  basicPlanText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  clickText: {
    fontSize: 12,
    color: colors.grayText,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 5,
  },
  termAndConditionText: {
    fontSize: 15,
    color: colors.info_color,
    fontFamily: fonts.extraBold,
    lineHeight: 20,
    textAlign: 'center',
  },
  labelStyle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});

// // export default StartYourSignUpJourney1
