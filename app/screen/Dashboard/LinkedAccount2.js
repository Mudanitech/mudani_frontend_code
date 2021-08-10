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

export default class LinkedAccount extends Component {
  constructor() {
    super();
    this.state = {
      isEnable: false,
      isOpen: false,
      isEnable2: false,
      isEnable3: false,
      isEnable4: false,
      isEnable5: false,


    };
  }

  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="Roundup Investing"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{flexGrow: 1}}>
          <Text numberOfLines = {3} style = {[styles.buttonText,{width : wp("90%"),textAlign : "center"}]}>Lorem Inpsum Lorem Inpsum Lorem Inpsum Lorem Inpsum Lorem Inpsum Lorem Inpsum Lorem Inpsum</Text>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.buttons1}
              onPress={() => null}>
              <Image
                source={localImages.add_blue}
                style={{height: 11.8, width: 11.8}}
                resizeMode="contain"
              />
              <Text style={styles.buttonText1}>Add Account</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <Text style={styles.heading}>Saved Bank Accounts</Text>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.buttons}>
              <View style={{width: wp('60.2%')}}>
                <Text style={styles.buttonText}>Bank of America</Text>
                <Text style={styles.accountNumberText}>
                  **** **** **** 6224
                </Text>
              </View>
              <TouchableOpacity>
                <Image
                  source={localImages.delete_red}
                  style={{height: 21, width: 21, right: 5}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={localImages.edit_gray}
                  style={{height: 21, width: 21}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{left: 7}}>
                <Switch
                  value={this.state.isEnable}
                  trackColor={{true: colors.light_blue, false: colors.blue}}
                  thumbColor={
                    this.state.isEnable ? colors.blue : colors.light_blue
                  }
                  onValueChange={() =>
                    this.setState({
                      isEnable: this.state.isEnable
                        ? false
                        : this.state.isEnable == false
                        ? true
                        : false,
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.buttons}>
              <View style={{width: wp('60.2%')}}>
                <Text style={styles.buttonText}>Bank of America</Text>
                <Text style={styles.accountNumberText}>
                  **** **** **** 6224
                </Text>
              </View>
              <TouchableOpacity>
                <Image
                  source={localImages.delete_red}
                  style={{height: 21, width: 21, right: 5}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={localImages.edit_gray}
                  style={{height: 21, width: 21}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{left: 7}}>
                <Switch
                  value={this.state.isEnable2}
                  trackColor={{true: colors.light_blue, false: colors.blue}}
                  thumbColor={
                    this.state.isEnable2 ? colors.blue : colors.light_blue
                  }
                  onValueChange={() =>
                    this.setState({
                      isEnable2: this.state.isEnable2
                        ? false
                        : this.state.isEnable2 == false
                        ? true
                        : false,
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.buttons}>
              <View style={{width: wp('60.2%')}}>
                <Text style={styles.buttonText}>Bank of America</Text>
                <Text style={styles.accountNumberText}>
                  **** **** **** 6224
                </Text>
              </View>
              <TouchableOpacity>
                <Image
                  source={localImages.delete_red}
                  style={{height: 21, width: 21, right: 5}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={localImages.edit_gray}
                  style={{height: 21, width: 21}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{left: 7}}>
                <Switch
                  value={this.state.isEnable3}
                  trackColor={{true: colors.light_blue, false: colors.blue}}
                  thumbColor={
                    this.state.isEnable3? colors.blue : colors.light_blue
                  }
                  onValueChange={() =>
                    this.setState({
                      isEnable3: this.state.isEnable3
                        ? false
                        : this.state.isEnable3 == false
                        ? true
                        : false,
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.buttons}>
              <View style={{width: wp('60.2%')}}>
                <Text style={styles.buttonText}>Bank of America</Text>
                <Text style={styles.accountNumberText}>
                  **** **** **** 6224
                </Text>
              </View>
              <TouchableOpacity>
                <Image
                  source={localImages.delete_red}
                  style={{height: 21, width: 21, right: 5}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={localImages.edit_gray}
                  style={{height: 21, width: 21}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{left: 7}}>
                <Switch
                  value={this.state.isEnable4}
                  trackColor={{true: colors.light_blue, false: colors.blue}}
                  thumbColor={
                    this.state.isEnable4 ? colors.blue : colors.light_blue
                  }
                  onValueChange={() =>
                    this.setState({
                      isEnable4: this.state.isEnable4
                        ? false
                        : this.state.isEnable4 == false
                        ? true
                        : false,
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.buttons}>
              <View style={{width: wp('60.2%')}}>
                <Text style={styles.buttonText}>Bank of America</Text>
                <Text style={styles.accountNumberText}>
                  **** **** **** 6224
                </Text>
              </View>
              <TouchableOpacity>
                <Image
                  source={localImages.delete_red}
                  style={{height: 21, width: 21, right: 5}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={localImages.edit_gray}
                  style={{height: 21, width: 21}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{left: 7}}>
                <Switch
                  value={this.state.isEnable5}
                  trackColor={{true: colors.light_blue, false: colors.blue}}
                  thumbColor={
                    this.state.isEnable5 ? colors.blue : colors.light_blue
                  }
                  onValueChange={() =>
                    this.setState({
                      isEnable5: this.state.isEnable5
                        ? false
                        : this.state.isEnable5 == false
                        ? true
                        : false,
                    })
                  }
                />
              </View>
            </View>
           
            </View>
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
    marginLeft: wp('5.06%'),
    marginRight: wp('5.06%'),
    marginTop: hp('2.39%'),
  },
  buttons: {
    height: hp('10.94%'),
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
  accountNumberText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('4.53'),
  },
  topContainer: {
    alignItems: 'center',
    marginLeft: wp('5.06%'),
    marginRight: wp('5.06%'),
    marginTop: hp('2.39%'),
  },
  buttons1: {
    width: wp('88%'),
    height: hp('8.84%'),
    backgroundColor: colors.white,
    justifyContent: 'center',
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
  buttonText1: {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
  heading: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
});

// // export default StartYourSignUpJourney1

// import React, {useState, Component, useEffect} from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Animated,
// } from 'react-native';
// import {colors, fonts, localImages} from '../../utils/constant';
// import {CustomStyles} from '../style/CustomStyles';
// const {height, width} = Dimensions.get('window');
// import {HeaderWithBack} from '../../component/Button';
// import {hp, wp} from '../../utils/responsive';
// import {ButtonWithoutShadow} from '../../component/Button';
// import {Switch} from 'native-base';

// class LinkedAccount2 extends Component {
//   constructor(props) {
//     super();
//     this.state = {
//       isOpen: false,
//       isEnable: false,
//     };
//   }

//   render() {
//     return (
//       <>
//         <SafeAreaView style={CustomStyles.containerbording}>
//           <HeaderWithBack
//             backgroundColor={1}
//             labelStyle={styles.labelStyle}
//             Header={'Linked Account'}
//             onActionLeft={() => this.props.navigation.goBack()}
//           />
//           <ScrollView style={{flex: 1}}>
//             <View style={{alignSelf: 'center', marginTop: 75}}>
//               <View style={styles.buttons}>
//                 <View style={{width: wp('60%')}}>
//                   <Text style={styles.buttonText}>Lorem Ipsum</Text>
//                 </View>
//                 <Switch
//                   value={this.state.isEnable}
//                   trackColor={{true: colors.light_blue, false: colors.blue}}
//                   thumbColor={
//                     this.state.isEnable ? colors.blue : colors.light_blue
//                   }
//                   onValueChange={() =>
//                     this.setState({
//                       isEnable: this.state.isEnable
//                         ? false
//                         : this.state.isEnable == false
//                         ? true
//                         : false,
//                     })
//                   }
//                 />
//               </View>
//               {this.state.isEnable ? (
//                 <View style={styles.hideContainer}>
//                   <Text style={styles.itemText}>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Duis rhoncus id felis non mollis. Mauris quis mattis velit.
//                     Donec at mi sapien. Sed hendrerit tincidunt ligula, at
//                     tempor purus vehicula in. Cras facilisis, diam dignissim
//                     porta consequat, lectus leo ullamcorper urna, tempor
//                     consectetur nunc odio in arcu. Morbi vitae tortor dolor.
//                   </Text>
//                 </View>
//               ) : null}
//               <TouchableOpacity
//                 style={styles.accountButton}
//                 onPress={() =>
//                   this.setState({isOpen: this.state.isOpen ? false : true})
//                 }>
//                 <Text style={styles.activeText}>Linked Account (0)</Text>
//                 <Image
//                   source={this.state.isOpen ? localImages.up : localImages.down}
//                   style={{height: 10, width: 14}}
//                 />
//               </TouchableOpacity>
//               {this.state.isOpen ? (
//                 <View style={styles.hideContainer}>
//                   <Text style={styles.itemText}>DU3403460</Text>
//                   <Text style={styles.itemText}>A/c Type : Individual</Text>
//                   <Text style={styles.itemText}>Balance: $6746.67</Text>
//                 </View>
//               ) : null}
//               <View style={styles.borderSeperator} />
//               <View
//                 style={{marginBottom: 50, marginTop: 273, alignSelf: 'center'}}>
//                 <ButtonWithoutShadow
//                   width={width - 140}
//                   height={43}
//                   marginTop={22}
//                   borderRadius={20}
//                   labelColor={colors.white}
//                   label="Save"
//                   backgroundColor={colors.blue}
//                   onAction={() => null}
//                 />
//               </View>
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   labelStyle: {
//     fontSize: wp('4.8%'),
//     color: colors.black,
//     fontFamily: fonts.bold,
//     fontWeight: 'bold',
//     lineHeight: 24,
//   },
//   accountButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: wp('70%'),
//     paddingTop: 10,
//     paddingBottom: 10,
//     height: 47,
//   },
//   buttonText: {
//     fontSize: wp('4.26%'),
//     color: colors.black,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//   },
//   activeText: {
//     fontSize: wp('4.26%'),
//     color: colors.blue,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//   },
//   itemText: {
//     fontSize: wp('3.72%'),
//     color: colors.black,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//   },
//   hideContainer: {
//     // flex: 1,
//     padding: 13,
//     backgroundColor: colors.white,
//     width: wp('72%'),
//     alignSelf: 'center',
//   },
//   topContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // marginLeft: wp('7.7%'),
//     // marginRight: wp('7.7%'),
//     marginTop: hp('2.39%'),
//     borderRadius: wp('2%'),
//     borderColor: colors.grayColor,
//     borderWidth: 0.4,
//     backgroundColor: colors.white,
//     width: wp('80%'),
//     alignSelf: 'center',
//   },
//   buttons1: {
//     //   width: wp('45%'),
//     height: hp('5.84%'),
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   buttons2: {
//     flex: 1,
//     //   width: wp('42%'),
//     height: hp('5.84%'),
//     backgroundColor: colors.blue,
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderTopLeftRadius: wp('2%'),
//     borderBottomLeftRadius: wp('2%'),

//     // marginBottom: hp('1.64%'),
//   },
//   buttons3: {
//     flex: 1,
//     //   width: wp('42%'),
//     height: hp('5.84%'),
//     backgroundColor: colors.blue,
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderTopRightRadius: wp('2%'),
//     borderBottomRightRadius: wp('2%'),
//   },
//   buttonText1: {
//     fontSize: wp('3.73%'),
//     color: colors.grayColor,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//     marginLeft: wp('2.53'),
//   },
//   buttonText2: {
//     fontSize: wp('3.73%'),
//     color: colors.white,
//     fontFamily: fonts.regular,
//     lineHeight: 20,
//     marginLeft: wp('2.53'),
//   },
//   itemContainer: {
//     flex: 1,
//     width: wp('70%'),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     alignSelf: 'center',
//   },
//   buttons: {
//     height: hp('8.84%'),
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('1.64%'),
//   },
//   borderSeperator: {
//     borderBottomColor: colors.grayColor,
//     borderWidth: 0.5,
//     marginTop: 20,
//   },
// });

// export default LinkedAccount2;
