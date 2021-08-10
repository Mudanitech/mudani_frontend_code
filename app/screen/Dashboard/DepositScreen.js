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
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {wp, hp} from '../../utils/responsive';
import {color} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {TwoButtonModal} from './../../component/confirmModal';
import {postAPI, getAPI} from './../../utils/Api';
import DataManager from './../../utils/DataManager';

class Withdrawal extends Component {
  constructor(props) {
    super();
    this.state = {
      isModal: false,
      amount: '',
      fromActivity: '',
    };
  }

  modalOpen = () => {
    const {fromActivity} = this.state;

    if (fromActivity == '') {
      this.update();
    } else {
      if (fromActivity == 'green_red') {
        this.props.navigation.navigate('MyGame2');
      } else {
        this.props.navigation.navigate('MyGameSFL');
      }
    }
  };

  update = async () => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('updateScreenStatue', userDetails._id);
    const dataToSend = {
      userId: userDetails._id,
      status: 'completed',
    };

    postAPI('updateScreenStatue', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.setState({isModal: true});
        } else {
        }
        console.log(response, response.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalClose = () => {
    if (this.props.route.params !== undefined) {
      this.setState({isModal: false});
      this.props.navigation.navigate('Home', {
        screen: 'Dashboard',
        params: {id: this.props.route.params.id},
      });
    } else {
      this.setState({isModal: false});
      this.props.navigation.navigate('Home', {
        screen: 'Dashboard',
      });
    }
  };

  componentDidMount = () => {
    const {from} = this.props.route.params;
    this.setState({fromActivity: from});
  };
  componentDidUpdate = () => {
    // console.log('props12', this.props.route.params.id);
  };
  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            labelStyle={styles.labelStyle}
            Header={'Deposit'}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView>
            <View>
              <TextInput
                style={styles.textInput}
                value={this.state.amount == '' ? '$25' : this.state.amount}
                onChangeText={amount => this.setState({amount: amount})}
              />
            </View>
            <View style={styles.mainContainer}>
              <View style={styles.itemContainer}>
                <Text style={styles.firstText}>From</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.secondText}>Bank of America</Text>
                  <Image
                    source={localImages.down}
                    style={{
                      height: 7,
                      width: 10,
                      left: 5,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.firstText}>To</Text>
                <Text style={styles.secondText}>Mudani Wallet</Text>
              </View>

              <View style={styles.itemContainer}>
                <Text style={styles.firstText}>Service Fees</Text>
                <Text style={styles.secondText}>$0.00</Text>
              </View>
              <View style={styles.itemContainer}>
                <Text>Total</Text>
                <Text>$25.00</Text>
              </View>

              <View
                style={{
                  marginTop: hp('10.38'),
                  marginBottom: 50,
                  alignSelf: 'center',
                }}>
                <ButtonWithoutShadow
                  width={width - 147}
                  height={43}
                  marginTop={0}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Confirm"
                  backgroundColor={colors.blue}
                  onAction={() => this.modalOpen()}
                />
              </View>
              <TwoButtonModal
                isModalVisible={this.state.isModal}
                modalClose={() => this.modalClose()}>
                <View style={styles.popupMainContainer}>
                  <Image
                    source={localImages.like_small}
                    style={styles.circleDollar}
                  />
                  <Text style={styles.popUpText}>
                    Your deposit has been submitted successfully. Please allow
                    1-2 business days for processing.
                  </Text>
                </View>
                <View style={styles.popupButtonContainer}>
                  <ButtonWithoutShadow
                    width={width - wp('65%')}
                    height={43}
                    // marginTop={22}
                    borderRadius={20}
                    labelColor={colors.white}
                    label="Confirm"
                    backgroundColor={colors.blue}
                    onAction={() => this.modalClose()}
                  />
                </View>
              </TwoButtonModal>
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
  textInput: {
    backgroundColor: colors.authBackGroud,
    flex: 1,
    fontSize: 50,
    width: 100,
    fontFamily: fonts.regular,
    color: colors.blue,
    borderBottomColor: colors.grayColor,
    borderBottomWidth: 2,
    alignSelf: 'center',
    marginTop: 50,
  },
  mainContainer: {
    marginLeft: 29,
    marginRight: 29,
    marginTop: 35,
  },
  itemContainer: {
    backgroundColor: colors.white,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 24,
    paddingRight: 24,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 20,
    marginBottom: 17,
  },
  firstText: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 16,
  },
  secondText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 16,
  },
  thirdText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 16,
  },
  automaticallyText: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 21,
    marginLeft: 10,
  },
  linearGradient: {
    // flex: 1,
    //paddingLeft: 15,
    //paddingRight: 15,
    // borderRadius: 5,
    borderRadius: 50,
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 27,
    width: 250,
  },
  circleDollar: {
    height: 50,
    width: 50,
    marginBottom: 21,
    resizeMode: 'contain',
  },
});

export default Withdrawal;
