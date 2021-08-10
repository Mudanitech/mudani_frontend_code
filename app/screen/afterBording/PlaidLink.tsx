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
  Platform,
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {wp, hp} from '../../utils/responsive';
import {CustomStyles} from '../style/CustomStyles';
import {postAPI,getAPI} from './../../utils/Api';
import DataManager from './../../utils/DataManager';
import Spinner from './../../utils/Loader';


import {SingleButtonModal} from './../../component/confirmModal';
import {
  PlaidLink,
  usePlaidEmitter,
  LinkExit,
  LinkSuccess,
} from 'react-native-plaid-link-sdk';

import {useNavigation} from '@react-navigation/native';

const AppButton = (props: any) => {
  return (
    <View style={{borderRadius:20, backgroundColor:colors.blue,  width:wp('60%'),
    height:43, justifyContent:'center',
    alignItems:'center'}}>
      <Text style={styles.appButtonText}>{props.title}</Text>
    </View>
  );
};

const PlaidComponent = (props: any) => {
  const navigation = useNavigation();
  usePlaidEmitter((event: LinkEvent) => {
    console.log('event data' + event);
  });

  const [LinkToken, setLinkToken] = React.useState('');

  const [isModal, setModal] = React.useState(false);
    const [loadingSpinner, setLoadingSpinner] = React.useState(false);

  const modalClose=()=>{

    setTimeout(()=>{
    props.navigation.navigate('SpinScreen2',{id:props.route.params.id})

    },1000)
    setModal(false)
  }


 const update=async() =>{
      var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('updateScreenStatue', userDetails._id);
      const dataToSend = {
        userId: userDetails._id,
        status: props.route.params.id==5?'uncompleted':'completed'
      };
      
      postAPI('updateScreenStatue', dataToSend)
        .then((response) => {
          if (response.status == 200) {
          setModal(true)
          } else {
          
          }
          console.log(response, response.message);
        })
        .catch((err) => {
        
          console.log(err)});
  }

  React.useEffect(() => {
    setLoadingSpinner(true)
    const url = 'http://mudani.com:3006/api/v1/user/createPlaidToken';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        userId: '123456',
      }),
    })
      .then(response => response.json())
      .then(responseData => {
         setLoadingSpinner(false)


        console.log('Plaid Link', responseData.data.link_token);

        setLinkToken(responseData.data.link_token);
      })

      .catch(error => {
         setLoadingSpinner(false)
        console.error(error);
      });
  }, []);

  console.log('Token hai' + LinkToken);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        
        backgroundColor: colors.authBackGroud,
      }}>
      <HeaderWithBack
        backgroundColor={1}
        Header={''}
        onActionLeft={() => props.navigation.goBack()}
      />

      <ScrollView style={{flexGrow: 1}}>
        <View
          style={{
            alignSelf: 'center',
            marginTop: Platform.OS == 'android' ? 50 : 50,
          }}>
          <View>
            <Image
              source={localImages.link_your_account_icon}
              style={{
                borderRadius: 50,
                height: 146,
                width: 95.5,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}></Image>
          </View>
          <Text
            style={{
              color: colors.black,
              fontSize: 20,
              fontFamily: fonts.bold,
              marginTop: 30,
              marginHorizontal: 40,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Link your account
          </Text>

          <View style={styles.textContainer}>
            <Text style={styles.btnText}>
              Link your bank account to deposit funds. We use the highest
              bank-grade security available.
            </Text>
          </View>
        </View>


        <SingleButtonModal
                  isModalVisible={isModal}
                  // headerText={'Basket Buy Execution'}
                  modalClose={modalClose}
                  submitAction={modalClose}
                  descriptionText={
                    "Congratulations! you have successfuly linked your account."
                  }
                  nameOnSubmitButton={'Okay'}
                  nameOnIgnoreButton={'Ignore'}
                />
      </ScrollView>


      
      <PlaidLink
        tokenConfig={{
          token: LinkToken,
        }}
        onSuccess={(success: LinkSuccess) => {
          update()
          //navigation.navigate('SuccessScreen', success);
          console.log('Yess ' + success);
         
        }}
        onExit={(exit: LinkExit) => {
          navigation.navigate('ExitScreen', exit);
        }}>
        <AppButton title="Next" />
      </PlaidLink>

      <TouchableOpacity
                  onPress={() =>
                   
                     props.navigation.navigate('SpinScreen2',{id:props.route.params.id})
                    
                  }>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      color: '#a8a8a8',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontFamily: fonts.bold,
                    }}>
                    <Text style={styles.footerText}>Skip</Text>
                  </Text>
                </TouchableOpacity>

                 <Spinner
        //visibility of Overlay Loading Spinner
        visible={loadingSpinner}
        //Text with the Spinner
        //Text style of the Spinner Text
        cancelable={true}
        indicatorStyle={{color: colors.red}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 4,
    backgroundColor: '#000',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
   
    alignSelf: 'center',
    fontFamily: fonts.regular,
  
  }, footerText: {
    //width: width - 40,
    height: 27,
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,

    
    
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
});

export default PlaidComponent;
