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
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {Switch} from 'native-base';

export default class YourPlan extends Component {
  constructor() {
    super();
    this.state = {
      isEnable: false,
      isEnable1: false,
    };
  }

  gotoEnbleTwoStep = () => {
    const {isEnable} = this.state;
    this.setState({isEnable: !isEnable});
    if (isEnable) {
      this.props.navigation.navigate('TwoStepLogin');
    }
  };
  render() {
    return (
      <View style={[CustomStyles.dashboardBoarding]}>
        <SafeAreaView>
          <ScrollView style={{flexGrow: 1}}>
            <HeaderWithBack
              Header="Settings"
              backgroundColor={1}
              labelStyle={styles.labelStyle}
              onActionLeft={() => this.props.navigation.goBack()}
            />

            <View style={styles.mainContainer}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => this.props.navigation.navigate('ResetPassword')}>
                <Text style={styles.buttonText}>Change Password</Text>
                <Image
                  source={localImages.arrowright}
                  style={{height: 11.8, width: 11.8, marginLeft: wp('46.2%')}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() =>
                  this.props.navigation.navigate('LinkedAccount2')
                }>
                <Text style={styles.buttonText}>Roundup Investing</Text>
                <Image
                  source={localImages.arrowright}
                  style={{height: 11.8, width: 11.8, marginLeft: wp('46.2%')}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => this.props.navigation.navigate('Recurring1')}>
                <Text style={styles.buttonText}>Recurring Deposit</Text>
                <Image
                  source={localImages.arrowright}
                  style={{height: 11.8, width: 11.8, marginLeft: wp('46.2%')}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.buttons}>
                <View style={{width: wp('75%')}}>
                  <Text style={styles.buttonText}>2-Step Verification</Text>
                </View>
                <Switch
                  value={this.state.isEnable}
                  trackColor={{true: colors.light_blue, false: colors.blue}}
                  thumbColor={
                    this.state.isEnable ? colors.blue : colors.light_blue
                  }
                  onValueChange={
                    () => this.gotoEnbleTwoStep()
                    // this.setState({
                    //   isEnable: !this.state.isEnable,
                    // })
                  }
                />
              </View>
              <View style={styles.buttons}>
                <View style={{width: wp('75%')}}>
                  <Text style={styles.buttonText}>Notification</Text>
                </View>
                <Switch
                  value={this.state.isEnable1}
                  trackColor={{true: colors.light_blue, false: colors.blue}}
                  thumbColor={
                    this.state.isEnable1 ? colors.blue : colors.light_blue
                  }
                  onValueChange={() =>
                    this.setState({
                      isEnable1: !this.state.isEnable1,
                    })
                  }
                />
              </View>
            </View>

            {/* <View style={{marginBottom: 50, alignSelf: 'center'}}>
          <ButtonWithoutShadow
            width={width - 110}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Next"
            backgroundColor={colors.blue}
            onAction = {()=> null}
          />
        </View> */}
          </ScrollView>
        </SafeAreaView>
      </View>
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
    marginLeft: wp('5.06%'),
    marginRight: wp('5.06%'),
    marginTop: hp('5.39%'),
  },
  buttons: {
    height: hp('8.84%'),
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    flexDirection: 'row',
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
    marginBottom: hp('1.64%'),
  },
  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('4.53'),
  },
});

// // export default StartYourSignUpJourney1
