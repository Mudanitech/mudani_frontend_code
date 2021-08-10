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
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import RadioButtonAccordian from './../../component/RadioButtonAccordian';

const {height, width} = Dimensions.get('window');

class FundYourAccount extends Component {
  constructor(props) {
    super();
    this.state = {
      accountType: [
        {AccountType: 'Individual', text: 'hsdfjkhksjdf'},
        {AccountType: 'Joint', text: 'hsdfjkhksjdf'},
        {AccountType: 'Retirement', text: 'hsdfjkhksjdf'},
      ],
    };
  }
  componentDidMount = () => {
    // console.log('props', this.props.route.params.id);
  };

  gotoSpinScreenThree = () => {
    var degree = 1800;
    var clicks = 0;

    function randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }

    let n = randomNumber(0, 360);

    setTimeout(() => {
      clicks++;
      var newDegree = degree * clicks;
      var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
      let totalDegree = newDegree + extraDegree;
      //Calculate result index:
      var win_num = 6 - Math.floor(((totalDegree % 360) + 30) / 60);
      const rndInt = Math.floor(Math.random() * 5) + 1;
      console.log(rndInt);

      console.log('Position' + win_num);
      this.props.navigation.navigate('SpinScreen3', {
        id: this.props.route.params.id,
        spinnerIndex: rndInt,
      });
    }, 700);
  };

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <ScrollView style={{flexGrow: 1}}>
            <HeaderWithBack
              backgroundColor={1}
              Header={' '}
              labelStyle={styles.labelStyle}
              onActionLeft={() => this.props.navigation.goBack()}
            />
            <View style={{alignSelf: 'center'}}>
              <View>
                <Image
                  source={localImages.like_small}
                  style={{
                    marginTop: 100,
                    height: 122,
                    width: 122,
                    alignSelf: 'center',
                    resizeMode: 'stretch',
                  }}></Image>
              </View>
              <Text
                numberOfLines={3}
                style={{
                  color: colors.black,
                  fontSize: 20,
                  fontFamily: fonts.bold,
                  marginTop: 48,
                  // marginHorizontal: 40,
                  fontWeight: '600',
                  textAlign: 'center',
                  lineHeight: 30,
                  width: width - 110,
                  alignSelf: 'center',
                }}>
                As promised, your free stock will be revealed next.
              </Text>

              <View style={{marginHorizontal: 40, marginTop: 59}}>
                <ButtonWithoutShadow
                  width={width - 140}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  // label="Fund your Account"
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={this.gotoSpinScreenThree}
                />
                {/* <ButtonWithoutShadow
                    width={width - 80}
                    height={43}
                    marginTop={17}
                    borderRadius={20}
                    labelColor={colors.blue}
                    label="Skip"
                    backgroundColor={colors.light_blue}
                    onAction = {()=>this.props.navigation.navigate("StartYourSignUpJourney1")}
                  /> */}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
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
    //width : width -46,
    // alignSelf : "center",
    marginLeft: 46,
    marginRight: 46,
    marginTop: 16,
    // alignSelf : "center",
  },
  labelStyle: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.bold,
    // marginTop: 48,
    marginHorizontal: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FundYourAccount;
