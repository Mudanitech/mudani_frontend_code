import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {wp, hp} from '../../utils/responsive';
const {height, width} = Dimensions.get('window');
import SwipeButton from 'rn-swipe-button';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from 'native-base';
import {ButtonWithoutShadow} from '../../component/Button';

class PurchaseDetails extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <View style={[styles.drawerHeaderWithoutCard, {width: width}]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                marginLeft: 20,
                height: 40,
                width: 40,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={localImages.cross_black}
                style={{height: 20, width: 20}}></Image>
            </TouchableOpacity>
            <View style={{width: wp('30%')}}>
              <Picker
                note
                mode="dropdown"
                value={'dollar'}
                style={{
                  width: wp('30%'),
                  height: 43,
                  borderColor: '#333333',
                  //backgroundColor: '#fff',
                  color: colors.black,
                  alignSelf: 'center',
                  transform: [{scaleX: 0.8}, {scaleY: 0.8}],
                }}
                iosIcon={
                  <Image
                    source={localImages.down}
                    style={{
                      width: 10,
                      height: 10,
                      right: 10,
                    }}
                  />
                }
                //    selectedValue={props.selectedValue}
                //     onValueChange={[props.onValueChange]
                //     }
                itemTextStyle={{color: colors.black}}
                textStyle={{color: colors.black}}>
                <Picker.Item label={'Share'} />
                <Picker.Item label="Rupees" value="Bank of India" />
                <Picker.Item label="Euro" value="SBI" />
              </Picker>
            </View>
          </View>
          <ScrollView>
            <View style={styles.mainContainer}>
              <TextInput style={styles.textInput} value={'$2'} />
              <View style={styles.marketPriceContainer}>
                <View style={styles.markerSubContainer}>
                  <View style={styles.imgContainer}>
                    <Text style={styles.textFirst}>Market Price</Text>
                    <Image
                      source={localImages.question_circle_blue}
                      style={styles.icon}
                    />
                  </View>
                  <Text style={styles.textSecond}>$0</Text>
                </View>
                <View style={styles.borderSeparator} />
                <View style={styles.markerSubContainer}>
                  <View style={styles.imgContainer}>
                    <Text style={styles.textThird}>Estimate Cost</Text>
                    <Image
                      source={localImages.question_circle_blue}
                      style={styles.icon}
                    />
                  </View>
                  <Text style={styles.textSecond}>$0</Text>
                </View>
              </View>
              <Text numberOfLines={2} style={styles.paratext}>
                $0 available to sell BABA{' '}
              </Text>
              <View style={{marginTop: hp('1.5%'), marginBottom: 50}}>
                <LinearGradient
                  colors={['transparent', colors.blue]}
                  start={{x: 1.3, y: 0}}
                  end={{x: 0, y: 0}}
                  style={styles.linearGradient}>
                  <View>
                    <SwipeButton
                      disabled={false}
                      //disable the button by doing true (Optional)
                      swipeSuccessThreshold={50}
                      height={45}
                      //height of the button (Optional)
                      width={width - 130}
                      //width of the button (Optional)
                      title="swipe right to confirm"
                      //Text inside the button (Optional)
                      thumbIconImageSource={localImages.btn_arrow_color}
                      //thumbIconStyles = {{resizeMode : "contain"}}
                      //You can also set your own icon (Optional)
                      onSwipeSuccess={() => {
                        //this.openModal();
                      }}
                      //After the completion of swipe (Optional)
                      railFillBackgroundColor={colors.transparent} //(Optional)
                      railFillBorderColor={colors.transparent} //(Optional)
                      thumbIconBackgroundColor={colors.white} //(Optional)
                      thumbIconBorderColor={colors.white} //(Optional)
                      railBackgroundColor={colors.transparent} //(Optional)
                      railBorderColor={colors.transparent} //(Optional)
                      titleStyles={{
                        fontSize: 13,
                        color: colors.white,
                        fontWeight: 'bold',
                      }}></SwipeButton>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.authBackGroud,
    flex: 1,
    fontSize: 50,
    width: 70,
    fontFamily: fonts.regular,
    color: colors.blue,
    borderBottomColor: colors.grayColor,
    borderBottomWidth: 2,
    alignSelf: 'center',
    marginTop: 197,
  },
  mainContainer: {
    marginLeft: 29,
    marginRight: 29,
  },
  paratext: {
    fontSize: wp('3.2%%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 16,
    marginLeft: 2,
    textAlign: 'center',
    width: 200,
    alignSelf: 'center',
    marginTop: 73,
  },
  linearGradient: {
    // flex: 1,
    //paddingLeft: 15,
    //paddingRight: 15,
    // borderRadius: 5,
    borderRadius: 50,
    width: Platform.OS == 'ios' ? wp('72%') : wp('68%'),
    alignSelf: 'center',
  },
  drawerHeaderWithoutCard: {
    flexDirection: 'row',
    height: 60,
    width: width,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'space-between',
  },
  marketPriceContainer: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 17,
  },
  markerSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 16,
    width: 16,
    marginLeft: 5,
  },
  textFirst: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
  },
  textSecond: {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    textAlign: 'center',
  },
  textThird: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    textAlign: 'center',
  },
  borderSeparator: {
    borderBottomWidth: 0.5,
    marginTop: 16,
    marginBottom: 16,
    borderBottomColor: colors.grayColor,
  },
});

export default PurchaseDetails;
