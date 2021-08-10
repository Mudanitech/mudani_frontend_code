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
} from 'react-native';
import {ButtonWithoutShadow, CrossButtonHeader} from '../../component/Button';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {wp, hp} from '../../utils/responsive';
import {color} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
import SwipeButton from 'rn-swipe-button';
import LinearGradient from 'react-native-linear-gradient';
class PurchaseDetails extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <CrossButtonHeader
            backgroundColor={1}
            onActionLeft={() =>
              this.props.navigation.navigate('StartYourSignUpJourney1')
            }
          />
          <ScrollView>
            <View style={styles.mainContainer}>
            <TextInput style={styles.textInput} value={'$2'} />
            <Text style = {styles.orderSummary}>Order Summary</Text>
            <Text numberOfLines = {2} style = {styles.paratext}>You are buying $2.00 of BABA based on
the current market price</Text>

            
              <View style={{marginTop: hp('3%'),marginBottom : 50,}}>
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
    marginTop : 197,
  },
  mainContainer: {
    marginLeft: 29,
    marginRight: 29,
  },
  
  orderSummary: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 16,
    textAlign : "center",
    marginTop :248,
  },
  paratext: {
    fontSize: wp('3.2%%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 16,
    marginLeft : 2,
    textAlign : "center",
    width : 200,
    alignSelf : "center"
  },
  linearGradient: {
    // flex: 1,
    //paddingLeft: 15,
    //paddingRight: 15,
    // borderRadius: 5,
    borderRadius: 50,
    width : Platform.OS == "ios"? wp("72%") : wp("68%"),
    alignSelf : "center"
  },
});

export default PurchaseDetails
