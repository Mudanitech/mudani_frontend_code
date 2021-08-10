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
  Platform,
} from 'react-native';
import {HeaderWithBackWhite} from '../../component/Button';
import {PlainTextInput} from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import Dropdown from './../../component/Picker';
import StepIndicator from 'react-native-step-indicator';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {SingleButtonModal} from './../../component/confirmModal';
import {uses24HourClock} from 'react-native-localize';
import {FlatList} from 'react-native-gesture-handler';
import CountryList from './../../utils/CountryList';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DataManager from './../../utils/DataManager';
import {getAPI, postAPI} from './../../utils/Api';
import ImagePicker from 'react-native-image-crop-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DeviceInfo from 'react-native-device-info';
import ShowToast from '../../component/Toast';

const MyComponent4 = props => {
  const [bankName, setBankName] = useState('');

  const [signatureName, setSignatureName] = useState('');

  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankCityName, setBankCityName] = useState('');
  const [netWorthLiquid, SetNetWorthLiquid] = useState(undefined);
  const [investmentExp, SetInvestmentExp] = useState(undefined);
  const [investmentObjs, SetInvestmentObjs] = useState(undefined);
  const [liquidityNeedValue, SetLiquidityNeedValue] = useState(undefined);
  const [timeHorizn, SettimeHorizn] = useState(undefined);
  const [addressFrontImage, setAddressFrontImage] = useState('');
  const [addressBackImage, setAddressBacktImage] = useState('');
  const [signatureImg, setSignatureImg] = useState('');
  const [typeOfDocument, settypeOfDocument] = useState('');
  const [panCardImg, setPancard] = useState('');
  const [isSignature, setSignature] = useState(true);
  const [docType, setDocType] = useState(undefined);

  const [totalNetWrth, setTotalNetWrth] = useState(undefined);

  const [annualIncome, setAnnualIncome] = useState(undefined);

  const [employmentType, setEmployementType] = useState([
    {
      item: props.pages[0].sections[3].questions[0].options[0].id,
      value:
        props.pages[0].sections[3].questions[0].options[0].translations[0].data,
    },
    {
      item: props.pages[0].sections[3].questions[0].options[1].id,
      value:
        props.pages[0].sections[3].questions[0].options[1].translations[0].data,
    },
    {
      item: props.pages[0].sections[3].questions[0].options[2].id,
      value:
        props.pages[0].sections[3].questions[0].options[2].translations[0].data,
    },
    {
      item: props.pages[0].sections[3].questions[0].options[3].id,
      value:
        props.pages[0].sections[3].questions[0].options[3].translations[0].data,
    },
  ]);
  const [annualIncomeItem, setAnnualIncomeItem] = useState([
    {
      item: props.pages[1].sections[2].questions[0].options[0].id,
      value:
        props.pages[1].sections[2].questions[0].options[0].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[0].options[1].id,
      value:
        props.pages[1].sections[2].questions[0].options[1].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[0].options[2].id,
      value:
        props.pages[1].sections[2].questions[0].options[2].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[0].options[3].id,
      value:
        props.pages[1].sections[2].questions[0].options[3].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[0].options[4].id,
      value:
        props.pages[1].sections[2].questions[0].options[4].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[0].options[5].id,
      value:
        props.pages[1].sections[2].questions[0].options[5].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[0].options[6].id,
      value:
        props.pages[1].sections[2].questions[0].options[6].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[0].options[7].id,
      value:
        props.pages[1].sections[2].questions[0].options[7].translations[0].data,
    },
  ]);
  const [totalNetWorth, setTotalNetWorth] = useState([
    {
      item: props.pages[1].sections[2].questions[1].options[0].id,
      // value:
      //   props.pages[1].sections[2].questions[1].options[0].translations[0].data,

      value:
        props.pages[1].sections[2].questions[1].options[0].translations[0].data.split(
          ' ',
        )[0] +
        ' to ' +
        Number(
          props.pages[1].sections[2].questions[1].options[0].translations[0].data
            .split(' ')[1]
            .substring(1),
        )
          .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          .split('.')[0],
    },
    {
      item: props.pages[1].sections[2].questions[1].options[1].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[1].options[1].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[1].options[2].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[1].options[2].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[1].options[3].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[1].options[3].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[1].options[4].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[1].options[4].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[1].options[5].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[1].options[5].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[1].options[6].id,
      // value:
      //   props.pages[1].sections[2].questions[1].options[6].translations[0].data,

      value:
        props.pages[1].sections[2].questions[1].options[6].translations[0].data.split(
          ' ',
        )[0] +
        ' ' +
        Number(
          props.pages[1].sections[2].questions[1].options[6].translations[0].data
            .split(' ')[1]
            .substring(1),
        )
          .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          .split('.')[0],
    },
  ]);
  const [liquidNetWorth, setLiquidNetWorth] = useState([
    {
      item: props.pages[1].sections[2].questions[2].options[0].id,
      // value:
      //   props.pages[1].sections[2].questions[2].options[0].translations[0].data,

      value:
        props.pages[1].sections[2].questions[2].options[0].translations[0].data.split(
          ' ',
        )[0] +
        ' to ' +
        Number(
          props.pages[1].sections[2].questions[1].options[0].translations[0].data
            .split(' ')[1]
            .substring(1),
        )
          .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          .split('.')[0],
    },
    {
      item: props.pages[1].sections[2].questions[2].options[1].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[2].options[1].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[2].options[2].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[2].options[2].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[2].options[3].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[2].options[3].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[2].options[4].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[2].options[4].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[2].options[5].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[2].options[5].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[2].options[6].id,
      // value:
      //   props.pages[1].sections[2].questions[2].options[6].translations[0].data,

      value:
        props.pages[1].sections[2].questions[2].options[6].translations[0].data.split(
          ' ',
        )[0] +
        ' ' +
        Number(
          props.pages[1].sections[2].questions[2].options[6].translations[0].data
            .split(' ')[1]
            .substring(1),
        )
          .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          .split('.')[0],
    },
  ]);
  const [investmentExperience, setInvestmentExperience] = useState([
    {
      item: props.pages[1].sections[2].questions[3].options[0].id,
      value:
        props.pages[1].sections[2].questions[3].options[0].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[3].options[1].id,
      value:
        props.pages[1].sections[2].questions[3].options[1].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[3].options[2].id,
      value:
        props.pages[1].sections[2].questions[3].options[2].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[3].options[3].id,
      value:
        props.pages[1].sections[2].questions[3].options[3].translations[0].data,
    },
  ]);
  const [investmentObjectives, SetInvestmentObjectives] = useState([
    {
      item: props.pages[1].sections[2].questions[4].options[0].id,
      value:
        props.pages[1].sections[2].questions[4].options[0].translations[0].data,
    },

    {
      item: props.pages[1].sections[2].questions[4].options[2].id,
      value:
        props.pages[1].sections[2].questions[4].options[2].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[4].options[3].id,
      value:
        props.pages[1].sections[2].questions[4].options[3].translations[0].data,
    },

    {
      item: props.pages[1].sections[2].questions[4].options[6].id,
      value:
        props.pages[1].sections[2].questions[4].options[6].translations[0].data,
    },
  ]);
  const [liquidityNeeds, SetILiquidityNeedsObjectives] = useState([
    {
      item: props.pages[1].sections[2].questions[5].options[0].id,
      value:
        props.pages[1].sections[2].questions[5].options[0].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[5].options[1].id,
      value:
        props.pages[1].sections[2].questions[5].options[1].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[5].options[2].id,
      value:
        props.pages[1].sections[2].questions[5].options[2].translations[0].data,
    },
  ]);
  const [timeHorizon, SetTimeHorizon] = useState([
    {
      item: props.pages[1].sections[2].questions[6].options[0].id,
      value:
        props.pages[1].sections[2].questions[6].options[0].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[6].options[1].id,
      value:
        props.pages[1].sections[2].questions[6].options[1].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[6].options[2].id,
      value:
        props.pages[1].sections[2].questions[6].options[2].translations[0].data,
    },
  ]);

  const [documentType, SetDocumentType] = useState(
    props.pages[3].sections[4] != undefined
      ? [
          {
            item: props.pages[3].sections[4].questions[2].options[0].id,
            value:
              props.pages[3].sections[4].questions[2].options[0].translations[0]
                .data,
          },
          {
            item: props.pages[3].sections[4].questions[2].options[1].id,
            value:
              props.pages[3].sections[4].questions[2].options[1].translations[0]
                .data,
          },
          {
            item: props.pages[3].sections[4].questions[2].options[2].id,
            value:
              props.pages[3].sections[4].questions[2].options[2].translations[0]
                .data,
          },
        ]
      : [],
  );

  function convertNumber(number) {
    var res = number.split(' to ');

    console.log('IS Split', res);

    return (
      Number(number.split(' to ')[0].substring(1))
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
        .split('.')[0] +
      ' to ' +
      Number(number.split(' to ')[1].substring(1))
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
        .split('.')[0]
    );
  }

  const getBankName = value => {
    setBankName(value);
    props.getBankName(value);
  };

  const getSignatureName = value => {
    setSignatureName(value);
    props.getSignatureName(value);
  };

  useEffect(() => {
    this.getUserDetails();
  }, []);

  getUserDetails = async () => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('User Details', JSON.stringify(userDetails));
    // setSignatureName(userDetails.firstName + ' ' + userDetails.lastName);
  };

  const getBankAccountNumber = value => {
    setBankAccountNumber(value);
    props.getBankAccountNumber(value);
  };
  const getBankCityName = value => {
    setBankCityName(value);
    props.getBankCityName(value);
  };
  const getLiquidNetworth = value => {
    SetNetWorthLiquid(value.name);
    props.getLiquidNetWorth(value.id);
  };
  const getInvestmentExp = value => {
    SetInvestmentExp(value.name);
    props.getInvestmentExp(value.id);
  };
  const getInvestmentObjs = value => {
    SetInvestmentObjs(value.name);
    props.getInvestmentObjs(value.id);
  };
  const getLiquidityNeed = value => {
    SetLiquidityNeedValue(value.name);
    props.getLiquidityNeeds(value.id);
  };
  const getHorizn = value => {
    SettimeHorizn(value.name);
    props.getTimeHorizn(value.id);
  };
  const getTotalNetworth = value => {
    setTotalNetWrth(value.name);
    props.getTotalNetWorth(value.id);
  };
  const onAddressFrontImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeBase64: true,
      // cropping: true
    }).then(image => {
      var img = image;
      let fileName = image.filename;
      if (
        Platform.OS === 'ios' &&
        (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))
      ) {
        fileName = `${fileName.split('.')[0]}.JPG`;
        return {img, filename: fileName};
      }
      props.getAddressVerificationFront(img);
      setAddressFrontImage(img.sourceURL);
    });
  };
  const onAddressBack = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      includeBase64: true,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      compressImageQuality: Platform.OS == 'android' ? 1 : 0.8,
      // cropping: true
    }).then(image => {
      var img = image;
      let fileName = image.filename;
      if (
        Platform.OS === 'ios' &&
        (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))
      ) {
        fileName = `${fileName.split('.')[0]}.JPG`;
        return {img, filename: fileName};
      }
      setAddressBacktImage(img.sourceURL);
      props.getAddressVerificationBack(img);
    });
  };
  const onSignatureImage = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      includeBase64: true,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      compressImageQuality: Platform.OS == 'android' ? 1 : 0.8,
      // cropping: true
    }).then(image => {
      var img = image;
      let fileName = image.filename;
      if (
        Platform.OS === 'ios' &&
        (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))
      ) {
        fileName = `${fileName.split('.')[0]}.JPG`;
        return {img, filename: fileName};
      }
      setSignatureImg(img.sourceURL);
      props.getSignatureImage(img);
    });
  };
  const onTypeOfDocument = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      includeBase64: true,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      compressImageQuality: Platform.OS == 'android' ? 1 : 0.8,
      // cropping: true
    }).then(image => {
      var img = image;
      let fileName = image.filename;
      if (
        Platform.OS === 'ios' &&
        (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))
      ) {
        fileName = `${fileName.split('.')[0]}.JPG`;
        return {img, filename: fileName};
      }
      settypeOfDocument(img.sourceURL);
      props.getTypeOfDocumentYouAreUploading(img);
    });
  };
  const onPanCardFront = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      compressImageQuality: Platform.OS == 'android' ? 1 : 0.8,
      includeBase64: true,
      // cropping: true
    }).then(image => {
      var img = image;
      let fileName = image.filename;
      if (
        Platform.OS === 'ios' &&
        (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))
      ) {
        fileName = `${fileName.split('.')[0]}.JPG`;
        return {img, filename: fileName};
      }
      setPancard(img.sourceURL);
      props.getPancardFront(img);
    });
  };
  const getDocumentType = value => {
    setDocType(value.name);
    props.getDocType(value.id);
  };

  const onSinature = () => {
    if (isSignature) {
      setSignature(false);
    } else {
      setSignature(true);
    }
  };
  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View
        style={{
          marginTop: hp(9.8),
          left: 3,
          marginBottom: Platform.OS == 'android' ? hp('30%') : hp('38%'),
        }}>
        <Text style={[styles.headingText, {marginTop: -40, marginBottom: 0}]}>
          Financial Profile
        </Text>
        {/* {props.countryName != 'United States' ? (
          <View>
            <PlainTextInput
              height={43}
              backgroundColor={colors.white}
              width={width - 35}
              borderRadius={30}
              marginTop={17}
              placeholder={'Bank Name'}
              label=""
              labelColor={colors.labelColor}
              placeholderColor={colors.placeHolderColor}
              inputTextColor={colors.text}
              maxLength={50}
              onChangeText={value => getBankName(value)}
              value={bankName}
              // iconName={'search_gray_icon'}
            />
            <PlainTextInput
              height={43}
              backgroundColor={colors.white}
              width={width - 35}
              borderRadius={30}
              marginTop={17}
              placeholder={'Bank Account Number'}
              label=""
              labelColor={colors.labelColor}
              placeholderColor={colors.placeHolderColor}
              inputTextColor={colors.text}
              maxLength={50}
              onChangeText={value => getBankAccountNumber(value)}
              value={bankAccountNumber}
            />
            <PlainTextInput
              height={43}
              backgroundColor={colors.white}
              width={width - 35}
              borderRadius={30}
              marginTop={17}
              placeholder={'City of Your Bank'}
              label=""
              labelColor={colors.labelColor}
              placeholderColor={colors.placeHolderColor}
              inputTextColor={colors.text}
              maxLength={50}
              onChangeText={value => getBankCityName(value)}
              value={bankCityName}
            />
          </View>
        ) : null} */}

        {totalNetWorth.length != 0 ? (
          <View style={{width: wp('99%'), marginLeft: -3}}>
            <Dropdown
              dropdownWidth={'93%'}
              data={totalNetWorth}
              selectedValue={totalNetWrth}
              onValueChange={(index, value) => getTotalNetworth(value)}
              pickerMarginTop={17}
              value={
                props.pages[1].sections[2].questions[1].translations[0].data
              }
            />
          </View>
        ) : null}

        {liquidNetWorth.length != 0 ? (
          <View style={{width: wp('99%'), marginLeft: -3}}>
            <Dropdown
              dropdownWidth={'93%'}
              data={liquidNetWorth}
              selectedValue={netWorthLiquid}
              onValueChange={(index, value) => getLiquidNetworth(value)}
              pickerMarginTop={17}
              value={
                props.pages[1].sections[2].questions[2].translations[0].data
              }
            />
          </View>
        ) : null}

        {investmentExperience.length != 0 ? (
          <View style={{width: wp('99%'), marginLeft: -3}}>
            <Dropdown
              dropdownWidth={'93%'}
              data={investmentExperience}
              selectedValue={investmentExp}
              onValueChange={(index, value) => getInvestmentExp(value)}
              pickerMarginTop={17}
              value={
                props.pages[1].sections[2].questions[3].translations[0].data
              }
            />
          </View>
        ) : null}

        {investmentObjectives.length != 0 ? (
          <View style={{width: wp('99%'), marginLeft: -3}}>
            <Dropdown
              dropdownWidth={'93%'}
              data={investmentObjectives}
              selectedValue={investmentObjs}
              onValueChange={(index, value) => getInvestmentObjs(value)}
              pickerMarginTop={17}
              value={
                props.pages[1].sections[2].questions[4].translations[0].data
              }
            />
          </View>
        ) : null}

        {liquidityNeeds.length != 0 ? (
          <View style={{width: wp('99%'), marginLeft: -3}}>
            <Dropdown
              dropdownWidth={'93%'}
              data={liquidityNeeds}
              selectedValue={liquidityNeedValue}
              onValueChange={(index, value) => getLiquidityNeed(value)}
              pickerMarginTop={17}
              value={
                props.pages[1].sections[2].questions[5].translations[0].data
              }
            />
          </View>
        ) : null}

        {timeHorizon.length != 0 ? (
          <View style={{width: wp('99%'), marginLeft: -3}}>
            <Dropdown
              dropdownWidth={'93%'}
              data={timeHorizon}
              selectedValue={timeHorizn}
              onValueChange={(index, value) => getHorizn(value)}
              pickerMarginTop={17}
              value={
                props.pages[1].sections[2].questions[6].translations[0].data
              }
            />
          </View>
        ) : null}

        <View style={{width: wp('99%'), marginLeft: -3}}>
          {documentType.length != 0 ? (
            <Dropdown
              dropdownWidth={'93%'}
              data={documentType}
              selectedValue={docType}
              onValueChange={(index, value) => getDocumentType(value)}
              pickerMarginTop={17}
              // value={props.pages[3].sections[4].questions[2].translations[0].data}
            />
          ) : null}
        </View>

        {/* <View>
          <View style={styles.documentContainer}>
            <Text style={styles.documentText}>Signature</Text>
            <TouchableOpacity onPress={() => onSignatureImage()}>
              <Image
                source={localImages.upload_green_icon}
                style={styles.documentImag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.documentImageContainer}>
            <Image
              source={{uri: signatureImg}}
              style={{height: 100, width: 275, borderRadius: 5}}
            />
          </View>
        </View> */}
        {/* {props.countryName != 'United States' ? (
          <View>
            <View>
              <View style={styles.documentContainer}>
                <Text style={styles.documentText}>
                  Address Verification (Front)
                </Text>
                <TouchableOpacity onPress={() => onAddressFrontImage()}>
                  <Image
                    source={localImages.upload_green_icon}
                    style={styles.documentImag}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.documentImageContainer}>
                <Image
                  source={{uri: addressFrontImage}}
                  style={{height: 100, width: 275, borderRadius: 5}}
                />
              </View>
            </View>
            <View>
              <View style={styles.documentContainer}>
                <Text style={styles.documentText}>
                  Address Verification (Back)
                </Text>
                <TouchableOpacity onPress={() => onAddressBack()}>
                  <Image
                    source={localImages.upload_green_icon}
                    style={styles.documentImag}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.documentImageContainer}>
                <Image
                  source={{uri: addressBackImage}}
                  style={{height: 100, width: 275, borderRadius: 5}}
                />
              </View>
            </View>
          </View>
        ) : null} */}

        <View>
          <View style={styles.documentContainer}>
            <Text style={styles.documentText}>
              Upload your ID or Passport
              {/* {docType != undefined
                ? 'Type of Identification: ' + docType
                : 'Type of Id Document You are Uploading'} */}
            </Text>
            <TouchableOpacity onPress={() => onTypeOfDocument()}>
              <Image
                source={localImages.upload_green_icon}
                style={styles.documentImag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.documentImageContainer}>
            <Image
              source={{uri: typeOfDocument}}
              style={{height: 100, width: 275, borderRadius: 5}}
            />
          </View>
        </View>

        {/* {props.countryName != 'United States' ? (
          <View>
            <View style={styles.documentContainer}>
              <Text style={styles.documentText}>PAN Card Front</Text>
              <TouchableOpacity onPress={() => onPanCardFront()}>
                <Image
                  source={localImages.upload_green_icon}
                  style={styles.documentImag}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.documentImageContainer}>
              <Image
                source={{uri: panCardImg}}
                style={{height: 100, width: 275, borderRadius: 5}}
              />
            </View>
          </View>
        ) : null} */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 50,
            marginRight: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => onSinature()}>
            {isSignature ? (
              <Image
                source={localImages.check_blue}
                style={{
                  height: 25,
                  width: 25,
                  marginRight: 10,
                  resizeMode: 'contain',
                }}></Image>
            ) : (
              <View
                style={{
                  height: 25,
                  width: 25,
                  alignSelf: 'center',
                  marginRight: 10,
                  borderColor: colors.grayColor,
                  borderWidth: 0.4,
                  borderRadius: 4,
                }}></View>
            )}
          </TouchableOpacity>
          <PlainTextInput
            height={43}
            backgroundColor={colors.white}
            width={width - 75}
            borderRadius={10}
            placeholder={'Signature'}
            label=""
            labelColor={colors.labelColor}
            placeholderColor={colors.placeHolderColor}
            inputTextColor={colors.text}
            maxLength={50}
            editable={isSignature}
            onChangeText={value => getSignatureName(value)}
            value={signatureName}
            // iconName={'search_gray_icon'}
          />
        </View>
      </View>
    </View>
  );
};

/* Define your class */
export default class VerifyYourIdentiyStep extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      currentPosition: 0,
      labels: ['Cart', 'Delivery Address', 'Order Summary', 'Payment Method'],
      customStyles: {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: colors.blue,
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: colors.blue,
        stepStrokeUnFinishedColor: colors.light_blue,
        separatorFinishedColor: colors.blue,
        separatorUnFinishedColor: colors.light_blue,
        stepIndicatorFinishedColor: colors.blue,
        stepIndicatorUnFinishedColor: colors.light_blue,
        stepIndicatorCurrentColor: colors.blue,
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: colors.white,
        stepIndicatorLabelFinishedColor: colors.white,
        stepIndicatorLabelUnFinishedColor: colors.blue,
        labelColor: colors.white,
        labelSize: 13,
        currentStepLabelColor: colors.white,
      },
      countryName: undefined,
      streetAddress1: '',
      pages: [],
      userId: '',
      bankName: '',
      bankAccountNumber: '',
      bankCityName: '',
      liquidNetWorth: undefined,
      investmentExp: undefined,
      investmentObjs: undefined,
      liquidityNeeds: undefined,
      timeHorizn: '33',
      signatureImage: null,
      AddressVerificationFront: null,
      AddressVerificationBack: null,
      TypeOfDocumentYouAreUploading: null,
      PancardFront: null,
      docType: undefined,
      totalNetWorth: undefined,
      signatureName: '',
    };
  }

  getPlace = countryName => {
    this.setState({countryName: countryName});
    console.log('Country Name1111', countryName);
  };

  getBankName = bankName => {
    this.setState({bankName: bankName});
  };

  getSignatureName = signatureName => {
    this.setState({signatureName: signatureName});
  };

  getBankAccountNumber = bankAccountNumber => {
    this.setState({bankAccountNumber: bankAccountNumber});
  };
  getBankCityName = bankCityName => {
    this.setState({bankCityName: bankCityName});
  };
  getLiquidNetWorth = liquidNetWorth => {
    this.setState({liquidNetWorth: liquidNetWorth});
  };
  getInvestmentExp = investmentExp => {
    this.setState({investmentExp: investmentExp});
  };
  getInvestmentObjs = investmentObjs => {
    this.setState({investmentObjs: investmentObjs});
  };
  getLiquidityNeeds = liquidityNeeds => {
    this.setState({liquidityNeeds: liquidityNeeds});
  };
  getTimeHorizn = timeHorizn => {
    this.setState({timeHorizn: timeHorizn});
  };
  getSignatureImage = signatureImage => {
    this.setState({signatureImage: signatureImage});
  };
  getAddressVerificationFront = AddressVerificationFront => {
    this.setState({
      AddressVerificationFront: AddressVerificationFront,
    });
  };
  getAddressVerificationBack = AddressVerificationBack => {
    this.setState({
      AddressVerificationBack: AddressVerificationBack,
    });
  };
  getTypeOfDocumentYouAreUploading = TypeOfDocumentYouAreUploading => {
    this.setState({
      TypeOfDocumentYouAreUploading: TypeOfDocumentYouAreUploading,
    });
  };
  getPancardFront = PancardFront => {
    this.setState({PancardFront: PancardFront});
  };
  getDocType = docType => {
    this.setState({docType: docType});
  };
  getTotalNetWorth = totalNetWorth => {
    this.setState({totalNetWorth: totalNetWorth});
  };
  showSteps = () => {
    if (this.state.pages.length > 0)
      return (
        <MyComponent4
          getBankName={bankName => this.getBankName(bankName)}
          getSignatureName={signatureName =>
            this.getSignatureName(signatureName)
          }
          getBankAccountNumber={bankAccountNumber =>
            this.getBankAccountNumber(bankAccountNumber)
          }
          getBankCityName={bankCityName => this.getBankCityName(bankCityName)}
          getLiquidNetWorth={liquidNetWorth =>
            this.getLiquidNetWorth(liquidNetWorth)
          }
          getInvestmentExp={investmentExp =>
            this.getInvestmentExp(investmentExp)
          }
          getTotalNetWorth={totalNetWorth =>
            this.getTotalNetWorth(totalNetWorth)
          }
          getInvestmentObjs={investmentObjs =>
            this.getInvestmentObjs(investmentObjs)
          }
          getLiquidityNeeds={liquidityNeeds =>
            this.getLiquidityNeeds(liquidityNeeds)
          }
          getTimeHorizn={timeHorizn => this.getTimeHorizn(timeHorizn)}
          getSignatureImage={signatureImage =>
            this.getSignatureImage(signatureImage)
          }
          getAddressVerificationFront={AddressVerificationFront =>
            this.getAddressVerificationFront(AddressVerificationFront)
          }
          getAddressVerificationBack={AddressVerificationBack =>
            this.getAddressVerificationBack(AddressVerificationBack)
          }
          getTypeOfDocumentYouAreUploading={TypeOfDocumentYouAreUploading =>
            this.getTypeOfDocumentYouAreUploading(TypeOfDocumentYouAreUploading)
          }
          getPancardFront={PancardFront => this.getPancardFront(PancardFront)}
          getDocType={docType => this.getDocType(docType)}
          pages={this.state.pages}
          countryName={this.state.countryName}
        />
      );
  };

  goBack = () => {
    this.props.navigation.goBack();
  };
  handleSubmit = () => {
    // if (this.state.countryName != 'United States' && !this.state.bankName) {
    //   ShowToast('Please enter bank name!');
    // } else if (
    //   this.state.countryName != 'United States' &&
    //   !this.state.bankAccountNumber.trim()
    // ) {
    //   ShowToast('Please enter bank account number!');
    // } else if (
    //   this.state.countryName != 'United States' &&
    //   !this.state.bankCityName
    // ) {
    //   ShowToast('Please enter bank city name!');
    // } else 
    
    
    if (!this.state.totalNetWorth) {
      ShowToast('Please select total networth!');
    } else if (!this.state.liquidNetWorth) {
      ShowToast('Please select liquidity networth!');
    } else if (!this.state.investmentExp) {
      ShowToast('Please select investment experience!');
    } else if (!this.state.investmentObjs) {
      ShowToast('Please select investment objectives!');
    } else if (!this.state.liquidityNeeds) {
      ShowToast('Please select liquidity needs!');
    } else if (!this.state.timeHorizn) {
      ShowToast('Please select time horizon!');
    } else if (this.state.docType != undefined) {
      ShowToast('Please select type of document for identity!');
    }
    // else if (!this.state.signatureName) {
    //   ShowToast('Please enter signature!');
    // }
    // else if (
    //   this.state.countryName != 'United States' &&
    //   !this.state.AddressVerificationFront
    // ) {
    //   ShowToast('Please select Address verification front image!');
    // } else if (
    //   this.state.countryName != 'United States' &&
    //   !this.state.AddressVerificationBack
    // ) {
    //   ShowToast('Please select Address verification back image!');
    // } else if (!this.state.TypeOfDocumentYouAreUploading) {
    //   ShowToast('Please select type of document you are uploading!');
    // } else if (
    //   this.state.countryName != 'United States' &&
    //   !this.state.PancardFront
    // ) {
    //   ShowToast('Please select pancard image!');
    // } 
    
    
    else {
      const dataToSend = {
        SSNNumber: this.props.route.params.data.userDetails.SSNNumber,
        date: this.props.route.params.data.userDetails.date,
        zipCode: this.props.route.params.data.userDetails.zipCode,
        USCitizen: this.props.route.params.data.userDetails.USCitizen,
        countryName: this.props.route.params.data.userDetails.countryName,
        stateName: this.props.route.params.data.userDetails.stateName,
        zipCode: this.props.route.params.data.userDetails.zipCode,
        isYourMailingSame: this.props.route.params.data.userDetails
          .isYourMailingSame,
        empolymentId: this.props.route.params.data.userDetails.empolymentId,
        nameOfEmployer: this.props.route.params.data.userDetails.nameOfEmployer,
        annualIncomeId: this.props.route.params.data.userDetails.annualIncomeId,
        bankName: this.state.bankName,
        signatureName: this.state.signatureName,
        bankAccountNumber: this.state.bankAccountNumber,
        bankCityName: this.state.bankCityName,
        liquidNetWorth: this.state.liquidNetWorth,
        investmentExp: this.state.investmentExp,
        investmentObjs: this.state.investmentObjs,
        liquidityNeeds: this.state.liquidityNeeds,
        timeHorizn: this.state.timeHorizn,
        signatureImage: this.state.signatureImage,
        AddressVerificationFront: this.state.AddressVerificationFront,
        AddressVerificationBack: this.state.AddressVerificationBack,
        TypeOfDocumentYouAreUploading: this.state.TypeOfDocumentYouAreUploading,
        PancardFront: this.state.PancardFront,
        docType: this.state.docType,
        address: this.props.route.params.data.userDetails.address,
        totalNetWorth: this.state.totalNetWorth,
      };
      this.props.navigation.navigate('VerifyYourIdentityStep5', {
        id: this.props.route.params.id,
        data: {
          id: this.props.route.params.data.id,
          userDetails: dataToSend,
        },
      });
    }
  };

  componentDidMount = async () => {
    const Pages = await DataManager.getPages();
    const {countryName} = this.props.route.params.data.userDetails;

    this.setState({countryName: countryName});

    this.setState({Pages: JSON.parse(Pages)});
    const pages = JSON.parse(Pages);
    if (this.state.pages.length == 0) {
      this.setState({pages: pages});
    }
  };
  componentDidUpdate = prevProps => {
    console.log('country', this.props.route.params.data);
  };

  render() {
    return (
      <SafeAreaView style={[CustomStyles.containerbording]}>
        <HeaderWithBackWhite
          Header="Verify Your Identity"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.goBack()}
        />

        <View style={styles.stepperSubContainer}>
          <StepIndicator
            style={{flex: 1}}
            customStyles={this.state.customStyles}
            currentPosition={1}
            // labels={this.state.labels}
            stepCount={4}
          />
        </View>
        <ScrollView style={{flexGrow: 1}}>
          <View
            style={{
              flex: 1,
              width: width - 30,
              alignSelf: 'center',
            }}>
            {this.showSteps()}
          </View>

          <SingleButtonModal
            isModalVisible={this.state.isModalVisible}
            // headerText={'Basket Buy Execution'}
            modalClose={this.modalClose}
            submitAction={() => this.modalClose()}
            descriptionText={'Mudani is currently unavailable in your region.'}
            nameOnSubmitButton={'Okay'}
            nameOnIgnoreButton={'Ignore'}
          />
        </ScrollView>
        <View
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: hp('0%'),
            height: hp('21%'),
            width: wp('100%'),
            backgroundColor: colors.authBackGroud,
          }}>
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: hp('8%'),
            }}>
            {this.nextButton()}
          </View>
        </View>
      </SafeAreaView>
    );
  }
  nextButton = () => {
    return this.state.currentPosition == 4 ? (
      <View style={{alignSelf: 'center'}}>
        {this.state.currentPosition == 4 ? (
          <Text
            style={{
              fontSize: 12,
              color: colors.grayColor,
              fontFamily: fonts.regular,
              textAlign: 'center',
            }}>
            Lorem ipsum dolor sit amet,
          </Text>
        ) : null}
        <ButtonWithoutShadow
          width={wp('60%')}
          height={43}
          marginTop={22}
          borderRadius={20}
          labelColor={colors.white}
          label="Next"
          backgroundColor={colors.blue}
          onAction={() =>
            this.props.navigation.navigate('ChooseAPlan', {
              id: this.props.route.params.id,
              data: {
                id: this.props.route.params.id,
                pages: this.state.pages,
              },
            })
          }
        />
      </View>
    ) : (
      <View style={{alignSelf: 'center'}}>
        <ButtonWithoutShadow
          width={wp('60%')}
          height={43}
          marginTop={22}
          borderRadius={20}
          labelColor={colors.white}
          label="Next"
          backgroundColor={colors.blue}
          onAction={() => this.handleSubmit()}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  accordianTextContainer: {
    marginTop: 166,
    alignSelf: 'center',
    marginBottom: 23,
  },
  footerText: {
    height: 27,
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#72e2db',
    textAlign: 'center',
  },
  accordianPadding: {
    paddingTop: 8,
  },
  viewSeparator: {
    borderColor: '#707070',
    borderWidth: 0.3,
    width: '90%',
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
    color: colors.black,
    fontSize: 13,
    fontFamily: fonts.regular,
    marginHorizontal: 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  faqTextQuest: {
    color: colors.black,
    fontSize: 13,
    fontFamily: fonts.bold,
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 5,
  },
  faqTextAns: {
    color: colors.black,
    fontSize: 13,
    fontFamily: fonts.regular,
    textAlign: 'left',
    lineHeight: 20,
  },
  labelStyle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  textContainer: {
    marginLeft: 46,
    marginRight: 46,
    marginTop: 8,
    width: width - 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer1: {
    // marginLeft: 46,
    // marginRight: 46,
    //marginTop: 8,
    // width: width - 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    marginTop: 28,
    marginLeft: 46,
    marginRight: 46,
    backgroundColor: colors.white,
    // padding : 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: width - 70,
    elevation: 5,
  },
  smallCircle: {
    width: 13,
    height: 13,
    backgroundColor: colors.blue,
    borderRadius: 50,
  },

  stepperBtn: {
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
    backgroundColor: colors.blue,
    width: 120,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 40,
    alignSelf: 'center',
  },
  stepStyle: {
    backgroundColor: colors.blue,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  stepperMainContainer: {
    width: width,
    paddingLeft: 10,
    paddingRight: 10,
    // paddingBottom: 50,
  },
  headingText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 20,
  },
  dollarText: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 4,
  },
  dollarText1: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 15,
  },
  descriptionText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    textAlign: 'left',
    lineHeight: 20,
    marginTop: 4,
  },
  yesAndNoText: {
    marginLeft: 11,
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
  },
  yesAndNoText1: {
    marginLeft: 11,
    fontSize: 14,
    color: colors.blue,
    fontFamily: fonts.regular,
  },
  yesAndNoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  yesAndNoCo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 7,
    width: '98%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

    marginBottom: 15,
  },
  basicPlanContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.blue,
  },
  basicPlanContainer2: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  basicPlanSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  basicPlanText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  roundUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 47,
  },
  roundUpText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 21,
    // fontWeight: 'bold',
    marginLeft: 15,
  },
  roundUpTextContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginTop: 55,
  },
  stepperSubContainer: {
    width: width,
    height: 35,
    backgroundColor: 'white',
  },
  documentContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  documentText: {fontSize: 16, fontFamily: fonts.bold},
  documentImag: {height: 16, width: 16, resizeMode: 'contain'},
  documentImageContainer: {
    height: 100,
    width: 275,
    borderWidth: 0.6,
    borderColor: colors.black,
    borderRadius: 5,
  },
});
