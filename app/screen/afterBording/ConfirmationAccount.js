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
import RadioButtonAccordian from '../../component/RadioButtonAccordian';
import ConfirmModal from '../../component/confirmModal';

const {height, width} = Dimensions.get('window');

class AccountConf extends Component {
  constructor(props) {
    super();
    this.state = {
      isModalVisible: false,
    };
  }

  openModal = () => {
    this.setState({isModalVisible: true});
  };

  closeModal = () => {
    this.setState({isModalVisible: false});
  };
  gotoDashboard = () => {
    this.closeModal();
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <>
        <View style={CustomStyles.containerbording}>
          <SafeAreaView>
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
                    source={localImages.account_confirmation}
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
                  Congratulations!!
                </Text>
                <Text
                  numberOfLines={3}
                  style={{
                    color: colors.black,
                    fontSize: 20,
                    fontFamily: fonts.bold,
                    // marginHorizontal: 40,
                    fontWeight: '600',
                    textAlign: 'center',
                    lineHeight: 30,
                    width: width - 110,
                    alignSelf: 'center',
                  }}>
                  You Received 1 Free Stock.
                </Text>

                <View style={{marginHorizontal: 40, marginTop: 59}}>
                  <ButtonWithoutShadow
                    width={width - 147}
                    height={43}
                    marginTop={22}
                    borderRadius={20}
                    labelColor={colors.white}
                    label="Continue"
                    backgroundColor={colors.blue}
                    onAction={() => this.openModal()}
                  />
                </View>
              </View>
            </ScrollView>
            <ConfirmModal
              isModalVisible={this.state.isModalVisible}
              headerText={'Enable Notifications'}
              modalClose={() => this.closeModal()}
              submitAction={() => this.gotoDashboard()}
              descriptionText={
                'Allow us to share notifications so that no update will be missed.'
              }
              nameOnSubmitButton={'Allow'}
              nameOnIgnoreButton={"Don't Allow"}
            />
          </SafeAreaView>
        </View>
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

export default AccountConf;
