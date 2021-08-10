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
import Spinner from './../../utils/Loader';

const MyComponent = props => {
  const [selectValue, setSelectValue] = useState(undefined);
  const [province, setProvince] = useState(undefined);
  const [streetAddress1, setStreetAddress1] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoader, setLoader] = useState(false);

  const [countries, setContries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (props.userId) {
      getCountriesList();
      getStateList();
    }
  }, [props.userId]);
  const getCountriesList = () => {
    const dataToSend = {
      userId: props.userId,
    };

    //  console.log("UserId,useEFfect",props.userId);

    setLoader(true);
    postAPI('getCountryList', dataToSend)
      .then(response => setContries(response.data.countries, setLoader(false)))
      .catch(error => console.log(error));
  };
  const getStateList = () => {
    const dataToSend = {
      userId: props.userId,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //  console.log("UserId,useEFfect",props.userId);
    postAPI('user/getStateList', formBody, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    })
      .then(response => setStates(response.data.states))
      .catch(error => console.log(error));
  };
  const openModal = () => {
    setIsModalVisible(true);
  };
  const modalClose = () => {
    setIsModalVisible(false);
  };
  const onValueChange = value => {
    setSelectValue(value.name);
    if (value.name == 'United States of America') {
      props.getPlace(value.name);
      return null;
    } else if (value.name == 'India') {
      props.getPlace(value.name);
      return null;
    } else {
      props.getPlace(value.name);
      openModal();
    }
  };
  const onProviceValue = value => {
    setProvince(value.name);
  };

  const getAddress1 = value => {
    setStreetAddress1(value);
  };
  const getAddress2 = value => {
    setStreetAddress2(value);
  };
  const getZipcode = value => {
    setZipcode(value);
  };
  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View
        style={{
          flex: 1,
          marginTop: hp('3.89%'),
          left: 3,
          marginBottom: Platform.OS == 'android' ? hp('20%') : hp('33%'),
        }}>
        <Text style={styles.headingText}>Address</Text>
        <View style={{flex: 1, height: '100%'}}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details) => {
              // 'details' is provided when fetchDetails = true
              const zipCode = details?.address_components.find(
                addressComponent =>
                  addressComponent.types.includes('postal_code'),
              )?.short_name;
              console.log('Google place data', data, details, zipCode);
            }}
            onFail={error => console.error(error)}
            fetchDetails={true}
            query={{
              key: 'AIzaSyACQubkoAABJbvWiEDym3mGETypPTjhhiE', //Mudani Google Place API key
              language: 'en',
            }}
          />
        </View>
        <View style={{width: wp('99%'), marginLeft: -3}}>
          <Dropdown
            //placeholderText={'Select the country you live in'}
            dropdownWidth={'93%'}
            data={countries.map(item => {
              return {item: item.id, value: item.name};
            })}
            selectedValue={selectValue}
            onValueChange={(index, value) => onValueChange(value)}
            value={'Select the country you live in'}
          />
        </View>
        <PlainTextInput
          height={43}
          backgroundColor={colors.white}
          width={width - 35}
          borderRadius={30}
          marginTop={17}
          placeholder="Street Address 1"
          label=""
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          onChangeText={value => getAddress1(value)}
          value={streetAddress1}
          // iconName={'search_gray_icon'}
        />
        <PlainTextInput
          height={43}
          backgroundColor={colors.white}
          width={width - 35}
          borderRadius={30}
          marginTop={17}
          placeholder="Street Address 2"
          label=""
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          onChangeText={value => getAddress2(value)}
          value={streetAddress2}
        />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-evenly',
          }}>
          <View style={{marginLeft: 3}}>
            <PlainTextInput
              height={43}
              backgroundColor={colors.white}
              width={Platform.OS == 'android' ? wp('45') : wp('45')}
              borderRadius={30}
              marginTop={17}
              placeholder="Zip Code"
              label=""
              labelColor={colors.labelColor}
              placeholderColor={colors.placeHolderColor}
              inputTextColor={colors.text}
              maxLength={50}
              onChangeText={value => getZipcode(value)}
              value={zipcode}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Dropdown
              value={'State'}
              dropdownWidth={Platform.OS == 'android' ? wp('42%') : wp('43')}
              data={states.map(item => {
                return {item: item.id, value: item.name};
              })}
              selectedValue={province}
              onValueChange={(index, value) => onProviceValue(value)}
              pickerMarginTop={17}
            />
          </View>
        </View>
      </View>

      <Spinner
        visible={this.state.loadingSpinner}
        cancelable={true}
        indicatorStyle={{color: colors.red}}
      />

      <SingleButtonModal
        isModalVisible={isModalVisible}
        // headerText={'Basket Buy Execution'}
        modalClose={modalClose}
        submitAction={() => modalClose()}
        descriptionText={'Mudani is currently unavailable in your region.'}
        nameOnSubmitButton={'Okay'}
        nameOnIgnoreButton={'Ignore'}
      />
    </View>
  );
};
const MyComponent1 = props => {
  const [checked, setChecked] = useState(false);
  const [SSN, setSSN] = useState('');
  const [DOB, setDOB] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [USCitizen, setUSCitizen] = useState({
    qustion_id: props.pages[0].sections[1].questions[8].id,
    title: props.pages[0].sections[1].questions[8].translations[0].data,
    option1:
      props.pages[0].sections[1].questions[8].options[0].translations[0].data,
    option1Id: props.pages[0].sections[1].questions[8].options[0].id,
    option2:
      props.pages[0].sections[1].questions[8].options[1].translations[0].data,
    option2Id: props.pages[0].sections[1].questions[8].options[1].id,
    yes: false,
    no: false,
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDOB(
      props.countryName == 'United States of America'
        ? moment(date.toLocaleDateString()).format('MM/DD/YYYY')
        : moment(date.toLocaleDateString()).format('MM/DD/YYYY'),
    );
    console.warn(
      'A date has been picked: ',
      moment(date.toLocaleDateString()).format('MM/DD/YYYY'),
    );
    hideDatePicker();
  };

  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View style={{width: width - 25, marginTop: hp(9.8), left: 3}}>
        <PlainTextInput
          height={43}
          backgroundColor={colors.white}
          width={width - 35}
          borderRadius={30}
          marginTop={17}
          placeholder={
            props.countryName == 'United States of America'
              ? 'SSN Social Security Number'
              : 'Adhar Card Number'
          }
          label=""
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          onChangeText={value => setSSN(value)}
          value={SSN}
          // iconName={'search_gray_icon'}
        />
        <PlainTextInput
          height={43}
          backgroundColor={colors.white}
          width={width - 35}
          borderRadius={30}
          marginTop={17}
          placeholder="Date Of Birth"
          label=""
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          iconName={'calendar'}
          onChangeText={value => setDOB(value)}
          value={DOB}
          onIconClick={() => showDatePicker()}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginTop: 35,
          marginLeft: 10,
          // marginBottom: Platform.OS == 'android' ? hp('28%') : hp('36%'),
        }}>
        <TouchableOpacity onPress={() => setChecked(checked ? false : true)}>
          {checked ? (
            <Image
              source={localImages.check_blue}
              style={{
                height: 25,
                width: 25,
                alignSelf: 'center',
              }}></Image>
          ) : (
            <View
              style={{
                height: 25,
                width: 25,
                alignSelf: 'center',
                borderColor: colors.grayColor,
                borderWidth: 0.4,
                borderRadius: 4,
              }}></View>
          )}
        </TouchableOpacity>
        <Text style={styles.btnText}>{USCitizen.title}</Text>
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          marginTop: 70,
          marginLeft: 10,
          marginBottom: Platform.OS == 'android' ? hp('28%') : hp('36%'),
        }}>
        <Text style={styles.faqTextQuest}>
          Why do you need my Social Security Number (SSN)?
        </Text>
        <Text style={styles.faqTextAns}>
          All financial institutions are required by federal law to collect a
          client’s SSN to verify identity when opening an account. We have
          strong privacy controls that secure and protect your personal
          information.
        </Text>
      </View>
    </View>
  );
};

const MyComponent2 = props => {
  const [selectValue, setSelectValue] = useState(undefined);
  const [annualIncome, setAnnualIncome] = useState(undefined);
  const [nameOfEmployer, setNameOfEmployer] = useState('');
  const [zipcode, setZipcode] = useState('');
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

  const onEmployeeStatusValueChange = value => {
    setSelectValue(value.name);
    value == 'America' ? openModal() : null;
    // Alert.alert(String(value.id));
  };
  const onAnnualIncome = value => {
    setAnnualIncome(value.name);
  };
  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View
        style={{
          marginTop: hp(9.8),
          left: 3,
          marginBottom: Platform.OS == 'android' ? hp('30%') : hp('38%'),
        }}>
        <View style={{width: wp('99%'), marginLeft: -3}}>
          <Dropdown
            //placeholderText={'Select the country you live in'}
            dropdownWidth={'93%'}
            data={employmentType}
            selectedValue={selectValue}
            onValueChange={(index, value) => onEmployeeStatusValueChange(value)}
            value={props.pages[0].sections[3].questions[0].translations[0].data}
          />
        </View>
        <PlainTextInput
          height={43}
          backgroundColor={colors.white}
          width={width - 35}
          borderRadius={30}
          marginTop={17}
          placeholder="Name of Employer"
          label=""
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          onChangeText={value => setNameOfEmployer(value)}
          value={nameOfEmployer}
          // iconName={'search_gray_icon'}
        />
        <View style={{width: wp('99%'), marginLeft: -3}}>
          <Dropdown
            dropdownWidth={'93%'}
            data={annualIncomeItem}
            selectedValue={annualIncome}
            onValueChange={(index, value) => onAnnualIncome(value)}
            pickerMarginTop={17}
            value={props.pages[1].sections[2].questions[0].translations[0].data}
          />
        </View>
      </View>
    </View>
  );
};
const MyComponent4 = props => {
  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankCityName, setBankCityName] = useState('');
  const [netWorthLiquid, SetNetWorthLiquid] = useState(undefined);
  const [investmentExp, SetInvestmentExp] = useState(undefined);
  const [investmentObjs, SetInvestmentObjs] = useState(undefined);
  const [liquidityNeedValue, SetLiquidityNeedValue] = useState(undefined);
  const [timeHorizn, SettimeHorizn] = useState(undefined);
  const [addressFrontImage, setAddressFrontImage] = useState('');
  const [addressBackImage, setAddressBacktImage] = useState('');

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
      value:
        props.pages[1].sections[2].questions[1].options[0].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[1].options[1].id,
      value:
        props.pages[1].sections[2].questions[1].options[1].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[1].options[2].id,
      value:
        props.pages[1].sections[2].questions[1].options[2].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[1].options[3].id,
      value:
        props.pages[1].sections[2].questions[1].options[3].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[1].options[4].id,
      value:
        props.pages[1].sections[2].questions[1].options[4].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[1].options[5].id,
      value:
        props.pages[1].sections[2].questions[1].options[5].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[1].options[6].id,
      value:
        props.pages[1].sections[2].questions[1].options[6].translations[0].data,
    },
  ]);
  const [liquidNetWorth, setLiquidNetWorth] = useState([
    {
      item: props.pages[1].sections[2].questions[2].options[0].id,
      value:
        props.pages[1].sections[2].questions[2].options[0].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[2].options[1].id,
      value:
        props.pages[1].sections[2].questions[2].options[1].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[2].options[2].id,
      value:
        props.pages[1].sections[2].questions[2].options[2].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[2].options[3].id,
      value:
        props.pages[1].sections[2].questions[2].options[3].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[2].options[4].id,
      value:
        props.pages[1].sections[2].questions[2].options[4].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[2].options[5].id,
      value:
        props.pages[1].sections[2].questions[2].options[5].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[2].options[6].id,
      value:
        props.pages[1].sections[2].questions[2].options[6].translations[0].data,
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
      item: props.pages[1].sections[2].questions[4].options[1].id,
      value:
        props.pages[1].sections[2].questions[4].options[1].translations[0].data,
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
      item: props.pages[1].sections[2].questions[4].options[4].id,
      value:
        props.pages[1].sections[2].questions[4].options[4].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[4].options[5].id,
      value:
        props.pages[1].sections[2].questions[4].options[5].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[4].options[6].id,
      value:
        props.pages[1].sections[2].questions[4].options[6].translations[0].data,
    },
    {
      item: props.pages[1].sections[2].questions[4].options[7].id,
      value:
        props.pages[1].sections[2].questions[4].options[7].translations[0].data,
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
  const onEmployeeStatusValueChange = value => {
    setSelectValue(value.name);
    value == 'America' ? openModal() : null;
    Alert.alert(String(value.id));
  };
  const onAnnualIncome = value => {
    setAnnualIncome(value.name);
  };
  const getBankName = value => {
    setBankName(value);
  };
  const getBankAccountNumber = value => {
    setBankAccountNumber(value);
  };
  const getBankCityName = value => {
    setBankCityName(value);
  };
  const getLiquidNetworth = value => {
    SetNetWorthLiquid(value.name);
  };
  const getInvestmentExp = value => {
    SetInvestmentExp(value.name);
  };
  const getInvestmentObjs = value => {
    SetInvestmentObjs(value.name);
  };
  const getLiquidityNeed = value => {
    SetLiquidityNeedValue(value.name);
  };
  const getHorizn = value => {
    SettimeHorizn(value.name);
  };

  const onAddressFrontImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      // cropping: true
    }).then(image => {
      console.log(image);
      setAddressFrontImage(image.sourceURL);
    });
  };
  const onAddressFrontBack = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      // cropping: true
    }).then(image => {
      console.log(image);
      setAddressBacktImage(image.sourceURL);
    });
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
        <View style={{width: wp('99%'), marginLeft: -3}}>
          <Dropdown
            dropdownWidth={'93%'}
            data={liquidNetWorth}
            selectedValue={netWorthLiquid}
            onValueChange={(index, value) => getLiquidNetworth(value)}
            pickerMarginTop={17}
            value={props.pages[1].sections[2].questions[2].translations[0].data}
          />
        </View>
        <View style={{width: wp('99%'), marginLeft: -3}}>
          <Dropdown
            dropdownWidth={'93%'}
            data={investmentExperience}
            selectedValue={investmentExp}
            onValueChange={(index, value) => getInvestmentExp(value)}
            pickerMarginTop={17}
            value={props.pages[1].sections[2].questions[3].translations[0].data}
          />
        </View>
        <View style={{width: wp('99%'), marginLeft: -3}}>
          <Dropdown
            dropdownWidth={'93%'}
            data={investmentObjectives}
            selectedValue={investmentObjs}
            onValueChange={(index, value) => getInvestmentObjs(value)}
            pickerMarginTop={17}
            value={props.pages[1].sections[2].questions[4].translations[0].data}
          />
        </View>
        <View style={{width: wp('99%'), marginLeft: -3}}>
          <Dropdown
            dropdownWidth={'93%'}
            data={liquidityNeeds}
            selectedValue={liquidityNeedValue}
            onValueChange={(index, value) => getLiquidityNeed(value)}
            pickerMarginTop={17}
            value={props.pages[1].sections[2].questions[5].translations[0].data}
          />
        </View>
        <View style={{width: wp('99%'), marginLeft: -3}}>
          <Dropdown
            dropdownWidth={'93%'}
            data={timeHorizon}
            selectedValue={timeHorizn}
            onValueChange={(index, value) => getHorizn(value)}
            pickerMarginTop={17}
            value={props.pages[1].sections[2].questions[6].translations[0].data}
          />
        </View>
        <View>
          <View style={styles.documentContainer}>
            <Text style={styles.documentText}>Signature</Text>
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
            <Text style={styles.documentText}>Address Verification (Back)</Text>
            <TouchableOpacity onPress={() => addressBackImage()}>
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
        <View>
          <View style={styles.documentContainer}>
            <Text style={styles.documentText}>Upload your ID or Passport</Text>
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
            <Text style={styles.documentText}>PAN Card Front</Text>
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
      </View>
    </View>
  );
};

const MyComponent3 = props => {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  // console.log("Arrrea",props.pages[0].sections[0].questions[1].id)
  const [list, setList] = useState([
    {
      qustion_id: props.pages[0].sections[0].questions[0].id,
      title: props.pages[0].sections[0].questions[0].translations[0].data,
      option1:
        props.pages[0].sections[0].questions[0].options[0].translations[0].data,
      option1Id: props.pages[0].sections[0].questions[0].options[0].id,
      option2:
        props.pages[0].sections[0].questions[0].options[1].translations[0].data,
      option2Id: props.pages[0].sections[0].questions[0].options[1].id,
      yes: false,
      no: false,
    },
    {
      qustion_id: props.pages[0].sections[0].questions[1].id,
      title: props.pages[0].sections[0].questions[1].translations[0].data,
      option1:
        props.pages[0].sections[0].questions[1].options[0].translations[0].data,
      option1Id: props.pages[0].sections[0].questions[1].options[0].id,
      option2:
        props.pages[0].sections[0].questions[1].options[1].translations[0].data,
      option2Id: props.pages[0].sections[0].questions[1].options[1].id,
      yes: false,
      no: false,
    },
    // {
    //   qustion_id: props.pages[0].sections[1].questions[8].id,
    //   title: props.pages[0].sections[1].questions[8].translations[0].data,
    //   option1:
    //     props.pages[0].sections[1].questions[8].options[0].translations[0].data,
    //   option1Id: props.pages[0].sections[1].questions[8].options[0].id,
    //   option2:
    //     props.pages[0].sections[1].questions[8].options[1].translations[0].data,
    //   option2Id: props.pages[0].sections[1].questions[8].options[1].id,
    //   yes: false,
    //   no: false,
    // },
    {
      qustion_id: props.pages[0].sections[2].questions[9].id,
      title: props.pages[0].sections[2].questions[9].translations[0].data,
      option1:
        props.pages[0].sections[2].questions[9].options[0].translations[0].data,
      option1Id: props.pages[0].sections[2].questions[9].options[0].id,
      option2:
        props.pages[0].sections[2].questions[9].options[1].translations[0].data,
      option2Id: props.pages[0].sections[2].questions[9].options[1].id,
      yes: false,
      no: false,
    },
    {
      qustion_id: props.pages[1].sections[0].questions[0].id,
      title: props.pages[1].sections[0].questions[0].translations[0].data,
      option1:
        props.pages[1].sections[0].questions[0].options[0].translations[0].data,
      option1Id: props.pages[1].sections[0].questions[0].options[0].id,
      option2:
        props.pages[1].sections[0].questions[0].options[1].translations[0].data,
      option2Id: props.pages[1].sections[0].questions[0].options[1].id,
      yes: false,
      no: false,
    },
    {
      qustion_id: props.pages[1].sections[0].questions[2].id,
      title: props.pages[1].sections[0].questions[2].translations[0].data,
      option1:
        props.pages[1].sections[0].questions[2].options[0].translations[0].data,
      option1Id: props.pages[1].sections[0].questions[2].options[0].id,
      option2:
        props.pages[1].sections[0].questions[2].options[1].translations[0].data,
      option2Id: props.pages[1].sections[0].questions[2].options[1].id,
      yes: false,
      no: false,
    },
    {
      qustion_id: props.pages[1].sections[0].questions[4].id,
      title: props.pages[1].sections[0].questions[4].translations[0].data,
      option1:
        props.pages[1].sections[0].questions[4].options[0].translations[0].data,
      option1Id: props.pages[1].sections[0].questions[4].options[0].id,
      option2:
        props.pages[1].sections[0].questions[4].options[1].translations[0].data,
      option2Id: props.pages[1].sections[0].questions[4].options[1].id,
      yes: false,
      no: false,
    },
    {
      qustion_id: props.pages[1].sections[0].questions[6].id,
      title: props.pages[1].sections[0].questions[6].translations[0].data,
      option1:
        props.pages[1].sections[0].questions[6].options[0].translations[0].data,
      option1Id: props.pages[1].sections[0].questions[6].options[0].id,
      option2:
        props.pages[1].sections[0].questions[6].options[1].translations[0].data,
      option2Id: props.pages[1].sections[0].questions[6].options[1].id,
      yes: false,
      no: false,
    },
  ]);
  const selectYesNo = (id, index) => {
    // if (id == 1) {
    setList(
      list.map((item, ind) => {
        if (ind == index && id == 1) {
          return {...item, yes: true, no: false};
        } else if (ind == index && id == 2) {
          return {...item, yes: false, no: true};
        }
      }),
    );
    // } else if (id == 2) {
    //   setList(
    //     list.map((item, ind) =>
    //       ind == index
    //         ? {...item, yes: false, no: true}
    //         : {...item, yes: false, no: true},
    //     ),
    //   );
    // }
  };

  const yesNoRenderItem = ({item, index}) => {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text
            numberOfLines={4}
            style={{
              fontSize: 16,
              color: colors.black,
              fontFamily: fonts.regular,
              textAlign: 'left',
            }}>
            {item.title}
          </Text>
        </View>
        <View style={styles.yesAndNoContainer}>
          <View style={styles.yesAndNoCo}>
            <TouchableOpacity onPress={() => selectYesNo(1, index)}>
              {item.yes ? (
                <Image
                  source={localImages.active_radio_button}
                  style={{
                    height: 20,
                    width: 20,
                    alignSelf: 'center',
                  }}></Image>
              ) : (
                <View
                  style={{
                    height: 20,
                    width: 20,
                    alignSelf: 'center',
                    borderColor: colors.grayColor,
                    borderWidth: 0.4,
                    borderRadius: 50,
                  }}></View>
              )}
            </TouchableOpacity>
            <Text style={styles.yesAndNoText}>{item.option1}</Text>
          </View>

          <View style={[styles.yesAndNoCo, {marginLeft: 10}]}>
            <TouchableOpacity onPress={() => selectYesNo(2, index)}>
              {item.no ? (
                <Image
                  source={localImages.active_radio_button}
                  style={{
                    height: 20,
                    width: 20,
                    alignSelf: 'center',
                  }}></Image>
              ) : (
                <View
                  style={{
                    height: 20,
                    width: 20,
                    alignSelf: 'center',
                    borderColor: colors.grayColor,
                    borderWidth: 0.4,
                    borderRadius: 50,
                  }}></View>
              )}
            </TouchableOpacity>
            <Text style={styles.yesAndNoText}>{item.option2}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View
        style={{
          marginTop: hp('3.89%'),
          alignSelf: 'center',
          marginBottom: hp('20.64%'),
          marginLeft: 5,
        }}>
        <Text style={styles.headingText}>Do any of these apply?</Text>
        <FlatList data={list} renderItem={yesNoRenderItem} />
      </View>
      {/* <Text
        style={{
          fontSize: 12,
          color: colors.grayColor,
          fontFamily: fonts.regular,
          textAlign: 'center',
        }}>
        Lorem ipsum dolor sit amet,
      </Text> */}
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
      loadingSpinner: false,
    };
  }

  getPlace = countryName => {
    this.setState({countryName: countryName});
    console.log('Country Name1111', countryName);
  };

  showSteps = () => {
    this.state.currentPosition + 1;
    if (this.state.currentPosition == 0) {
      // this.openModal()
      return (
        <MyComponent
          {...this.props}
          userId={this.state.userId}
          countryName={this.state.countryName}
          streetAddress1={this.state.streetAddress1}
          getPlace={countryName => this.getPlace(countryName)}
        />
      );
    } else if (this.state.currentPosition == 1) {
      return (
        <MyComponent1
          {...this.props}
          countryName={this.state.countryName}
          pages={this.state.pages}
        />
      );
    } else if (this.state.currentPosition == 2) {
      return <MyComponent2 pages={this.state.pages} />;
    } else if (this.state.currentPosition == 3) {
      return <MyComponent4 pages={this.state.pages} />;
    } else if (this.state.currentPosition == 4) {
      return <MyComponent3 pages={this.state.pages} />;
    }
  };

  openModal = () => {
    if (this.state.currentPosition == 0) {
      this.setState({isModalVisible: true});
      // this.setState({countryName: ''});
    } else {
      return null;
    }
  };
  modalClose = () => {
    this.setState({isModalVisible: false});
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  componentDidMount = async () => {
    this.getFormData();
    // console.log('props', this.props.route.params.id);
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);
    this.setState({userId: userDetails._id});

    if (this.state.userId) {
      if (this.state.pages == 0) this.getFormData();
    }
  };
  componentDidUpdate = prevProps => {
    console.log('country', this.state.countryName);
  };
  getFormData = () => {
    this.setState({loadingSpinner: true});
    getAPI(`getApplicationForm/` + this.state.userId, null).then(response => {
      this.setState({pages: response.data.application_type.pages});
      this.setState({loadingSpinner: false});

      console.log(
        'Arrrea',
        response.data.application_type.pages[0].sections[0].questions,
      );
    });
  };
  render() {
    return (
      <SafeAreaView style={[CustomStyles.containerbording]}>
        <HeaderWithBackWhite
          Header="Verify Your Identity"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() =>
            this.setState({
              currentPosition:
                this.state.currentPosition == 0
                  ? this.goBack()
                  : this.state.currentPosition - 1,
            })
          }
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
        <Spinner
          visible={this.state.loadingSpinner}
          cancelable={true}
          indicatorStyle={{color: colors.red}}
        />

        <ScrollView style={{flexGrow: 1}}>
          <View style={{flex: 1, width: width - 30, alignSelf: 'center'}}>
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
              data: {id: this.props.route.params.id, pages: this.state.pages},
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
          onAction={() => {
            if (
              this.state.countryName == 'India' ||
              this.state.countryName == 'United States of America'
            ) {
              this.setState({
                currentPosition:
                  this.state.currentPosition == 4
                    ? (this.state.currentPosition = 4)
                    : this.state.currentPosition + 1,
              });
            }
          }}
        />
      </View>
    );
  };
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
  documentImag: {height: 20, width: 20},
  documentImageContainer: {
    height: 100,
    width: 275,
    borderWidth: 0.6,
    borderColor: colors.black,
    borderRadius: 5,
  },
});

// class MyComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectValue: undefined,
//       province: undefined,
//       streetAddress1: '',
//       streetAddress2: '',
//       zipcode: '',
//       isModalVisible: false,
//     };
//   }
//   openModal = () => {
//   this.setState({isModalVisible : true})
//   };
//   modalClose = () => {
//     this.setState({isModalVisible : false})
//   };
//   onValueChange = (value) => {
//     this.setState({selectValue :  value.name});
//     if (value.name == 'United States') {
//       this.props.getPlace(value.name);
//       return null;
//     } else if (value.name == 'India') {
//       this.props.getPlace(value.name);
//       return null;
//     } else {
//       this.props.getPlace(value.name);
//       this.openModal();
//     }
//   };
//   onProviceValue = (value) => {
//     this.setState({province : value.name});
//   };
//   render() {
//     return (
//       <View style={{backgroundColor: colors.authBackGroud}}>
//         <View
//           style={{
//             flex: 1,
//             marginTop: hp('3.89%'),
//             left: 3,
//             marginBottom: Platform.OS == 'android' ? hp('20%') : hp('33%'),
//           }}>
//           <Text style={styles.headingText}>Address</Text>
//           <View style={{width: wp('99%'), marginLeft: -3}}>
//             <Dropdown
//               //placeholderText={'Select the country you live in'}
//               dropdownWidth={'93%'}
//               data={CountryList.map((item) => {
//                 return {item: item.name, value: item.name};
//               })}
//               selectedValue={this.state.selectValue}
//               onValueChange={(index, value) => this.onValueChange(value)}
//               value={'Select the country you live in'}
//             />
//           </View>
//           <PlainTextInput
//             height={43}
//             backgroundColor={colors.white}
//             width={width - 35}
//             borderRadius={30}
//             marginTop={17}
//             placeholder="Street Address 1"
//             label=""
//             labelColor={colors.labelColor}
//             placeholderColor={colors.placeHolderColor}
//             inputTextColor={colors.text}
//             maxLength={50}
//             onChangeText={(value) => setStreetAddress1(value)}
//             value={this.state.streetAddress1}
//             // iconName={'search_gray_icon'}
//           />
//           <PlainTextInput
//             height={43}
//             backgroundColor={colors.white}
//             width={width - 35}
//             borderRadius={30}
//             marginTop={17}
//             placeholder="Street Address 2"
//             label=""
//             labelColor={colors.labelColor}
//             placeholderColor={colors.placeHolderColor}
//             inputTextColor={colors.text}
//             maxLength={50}
//             onChangeText={(value) => setStreetAddress2(value)}
//             value={this.state.streetAddress2}
//             // iconName={'search_gray_icon'}
//           />
//           <View
//             style={{
//               flexDirection: 'row',
//               flex: 1,
//               justifyContent: 'space-evenly',
//             }}>
//             <View style={{marginLeft: 3}}>
//               <PlainTextInput
//                 height={43}
//                 backgroundColor={colors.white}
//                 width={Platform.OS == 'android' ? wp('45') : wp('45')}
//                 borderRadius={30}
//                 marginTop={17}
//                 placeholder="Zip Code"
//                 label=""
//                 labelColor={colors.labelColor}
//                 placeholderColor={colors.placeHolderColor}
//                 inputTextColor={colors.text}
//                 maxLength={50}
//                 onChangeText={(value) => setZipcode(value)}
//                 value={this.state.zipcode}
//                 // iconName={'search_gray_icon'}
//               />
//             </View>
//             <View style={{marginLeft: 10}}>
//               <Dropdown
//                 value={'State'}
//                 dropdownWidth={Platform.OS == 'android' ? wp('42%') : wp('43')}
//                 data={[{item: 'New York', value: 'New York'}]}
//                 selectedValue={this.state.province}
//                 onValueChange={(index, value) => this.onProviceValue(value)}
//                 pickerMarginTop={17}
//               />
//             </View>
//           </View>
//         </View>
//         <SingleButtonModal
//           isModalVisible={this.state.isModalVisible}
//           // headerText={'Basket Buy Execution'}
//           modalClose={this.modalClose}
//           submitAction={() => this.modalClose()}
//           descriptionText={'Mudani is currently unavailable in your region.'}
//           nameOnSubmitButton={'Okay'}
//           nameOnIgnoreButton={'Ignore'}
//         />
//       </View>
//     );
//   }
// }
