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
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HomeHeader} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';

export default class LinkedAccount extends Component {
  constructor() {
    super();
    this.state = {
      isEnable: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HomeHeader
          Header="My Account"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => null}
          rightIcon1={'add_green_icon'}
          rightIcon2={'well_green_icon'}
          firstOnPress={() =>
            this.props.navigation.navigate('WatchListRoundIcon')
          }
          secondOnPress={() => this.props.navigation.navigate('Notifications')}
        />
        <ScrollView style={{flex: 1, marginBottom: 50}}>
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => this.props.navigation.navigate('MyProfiles')}>
            <View style={styles.textHeading}>
              <Text>My Profile</Text>
            </View>
            <View>
              <Image
                source={localImages.arrowright}
                style={{height: 12, width: 12, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => this.props.navigation.navigate('Activity')}>
            <View style={styles.textHeading}>
              <Text>Activity</Text>
            </View>
            <View>
              <Image
                source={localImages.arrowright}
                style={{height: 12, width: 12, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() =>
              this.props.navigation.navigate('DocumentAndStatement')
            }>
            <View style={styles.textHeading}>
              <Text>Documents</Text>
            </View>
            <View>
              <Image
                source={localImages.arrowright}
                style={{height: 12, width: 12, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => this.props.navigation.navigate('LinkedAccount')}>
            <View style={styles.textHeading}>
              <Text>Linked Account</Text>
            </View>
            <View>
              <Image
                source={localImages.arrowright}
                style={{height: 12, width: 12, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => this.props.navigation.navigate('Help')}>
            <View style={styles.textHeading}>
              <Text>Help</Text>
            </View>
            <View>
              <Image
                source={localImages.arrowright}
                style={{height: 12, width: 12, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => this.props.navigation.navigate('FAQ')}>
            <View style={styles.textHeading}>
              <Text>FAQ's</Text>
            </View>
            <View>
              <Image
                source={localImages.arrowright}
                style={{height: 12, width: 12, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => this.props.navigation.navigate('ReferAFriend')}>
            <View style={styles.textHeading}>
              <Text>Refer</Text>
            </View>
            <View>
              <Image
                source={localImages.arrowright}
                style={{height: 12, width: 12, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() =>
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Settings'}],
              })
            }>
            <View style={styles.textHeading}>
              <Text>Settings</Text>
            </View>
            <View>
              <Image
                source={localImages.arrowright}
                style={{height: 12, width: 12, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style = {styles.mainContainer} onPress = {()=>this.props.navigation.navigate("MyGameResult")}>
            <View style = {styles.textHeading}>
              <Text>My Games</Text>
            </View>
            <View>
              <Image
                source={localImages.arrowright}
                style={{height: 12, width: 12,resizeMode : "contain"}}
              />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <View style={styles.textHeading}>
              <Text>Logout</Text>
            </View>
            <View>
              <Image
                source={localImages.arrowright}
                style={{height: 12, width: 12, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
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
    alignSelf: 'center',
  },

  textHeading: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 46,
    marginRight: 46,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grayColor,
  },
});

// // export default StartYourSignUpJourney1
