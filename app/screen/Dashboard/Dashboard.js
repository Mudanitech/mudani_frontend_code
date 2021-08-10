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
  Platform,
  BackHandler,
  FlatList,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HomeHeader, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {LineChart} from 'react-native-chart-kit';
import SignUpModel from './../../component/SignUpModel';
import ConfirmModal from '../../component/confirmModal';
import {TwoButtonModal} from './../../component/confirmModal';
import Spinner from './../../utils/Loader';
import {getAPI, postAPI} from './../../utils/Api';
import DataManager from './../../utils/DataManager';
import ShowToast from '../../component/Toast';

const Statement = props => {
  let basket = [];
  const [isModal, setState] = useState(false);
  const [isModal2, setModal] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  const [list, setList] = useState(null);
  const selectIndex = async id => {
    setList(
      list.map((item, ind) => {
        if (item._id == id) {
          return {...item, isSelected: item.isSelected ? false : true};
        } else {
          return {...item};
        }
      }),
    );
  };
  useEffect(() => {
    if (list == null) getThematicBasket();
    if (props.applicationStatus) {
      setApplicationStatus(props.applicationStatus);
    }
  }, [list, props.applicationStatus]);
  useEffect(() => {
    if (list)
      list.forEach(elem => {
        if (elem.isSelected == true) {
          basket.push(elem._id);
        }
      });
    console.log('List selected item', basket);
  });

  const getThematicBasket = () => {
    setLoadingSpinner(true);
    getAPI(`getThematicBasket`, null)
      .then(response => {
        if (response.status == 200) {
          setLoadingSpinner(false);
          setList(
            response.data.map((item, ind) => ({...item, isSelected: false})),
          );
          console.log('thematic Baskets', response.data);
        } else {
          setLoadingSpinner(false);
          ShowToast(response.message);
        }
      })
      .catch(err => {
        setLoadingSpinner(false);
        //ShowToast('Something went Wrong!');
      });
  };

  const openModal2 = () => {
    setModal(true);
  };

  const closeModal2 = () => {
    setModal(false);
  };

  const openModal = () => {
    closeModal2();
    setState(true);
  };

  const closeModal = () => {
    setState(false);
  };
  const goToThematicBasketAgreement = () => {
    if (basket.length > 0) {
      //handleSubmit(basket);
      props.navigation.navigate('ThematicBasketClientAgreement', {
        basket,
      });
    } else {
      Alert.alert('Please Select at least one basket!');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <View style={styles.thematicContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: wp('70%')}}>
              <Text style={styles.investingPortfolioText}>
                {item.thematicName}
              </Text>
            </View>
            <TouchableOpacity onPress={() => selectIndex(item._id)}>
              <Image
                source={
                  item.isSelected
                    ? localImages.checked_light_blue
                    : localImages.add_icon
                }
                style={[styles.arrowRight1]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={{uri: item.thematicImage}}
              style={styles.basket_image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.riskLevelText}>Description</Text>
          <Text style={styles.aggressiveText}>{item.thematicDescription}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      {/* {applicationStatus ? (
        applicationStatus.is_submitted == 0 ? (
          <View style={{alignSelf: 'center'}}>
            <ButtonWithoutShadow
              width={wp('60%')}
              height={43}
              marginTop={hp('30%')}
              borderRadius={20}
              labelColor={colors.white}
              label="Fill you details"
              backgroundColor={colors.blue}
              onAction={() => props.navigation.navigate('VerifyYourIdentity',{id : 1})}
            />
          </View>
        ) : ( */}
      <View>
        <View style={{alignSelf: 'center'}}>
          <ButtonWithoutShadow
            width={wp('60%')}
            height={43}
            marginTop={hp('30%')}
            borderRadius={20}
            labelColor={colors.white}
            label="Add Mudani Invest"
            backgroundColor={colors.blue}
            onAction={() =>
              props.navigation.navigate('CreateBasket', {
                id: 1,
                from: 'dashBord',
              })
            }
          />
        </View>
        {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 22,
          }}
          onPress={() => openModal()}>
          <Image
            source={localImages.add_green_color}
            style={{height: 20, width: 20, resizeMode: 'contain'}}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.regular,
              color: colors.info_color,
              marginLeft: 10,
            }}>
            Add Thematic Basket
          </Text>
        </TouchableOpacity> */}
      </View>
      {/* )
      ) : null} */}

      <SignUpModel isModalVisible={isModal} modalClose={() => setState(false)}>
        <View>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => setState(false)}>
            <Image
              source={localImages.close_gray}
              style={{height: 18, width: 18, right: 7}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View>
            <Text numberOfLines={2} style={styles.chooseThematicText}>
              Would you like to add a thematic basket managed by Mudani for
              $3/mo?
            </Text>
            <FlatList data={list} renderItem={renderItem} />
            <View>
              <View
                style={{
                  marginTop: 0,
                  marginBottom: 50,
                  marginTop: 39,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <ButtonWithoutShadow
                  width={width - wp('64.33')}
                  height={43}
                  //   marginTop={22}
                  borderRadius={20}
                  labelColor={colors.blue}
                  label="Skip"
                  backgroundColor={colors.light_blue}
                  onAction={() => goToThematicBasketAgreement()}
                />
                <ButtonWithoutShadow
                  width={width - wp('64.33')}
                  height={43}
                  //   marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Continue"
                  backgroundColor={colors.blue}
                  onAction={() => goToThematicBasketAgreement()}
                />
              </View>
            </View>
          </View>
        </View>
      </SignUpModel>
    </View>
  );
};
const TaxPackages = props => {
  let basket = [];
  const [isModal, setState] = useState(false);
  const [isModal2, setModal] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [list, setList] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);

  const selectIndex = async id => {
    setList(
      list.map((item, ind) => {
        if (item._id == id) {
          return {...item, isSelected: item.isSelected ? false : true};
        } else {
          return {...item};
        }
      }),
    );
  };
  useEffect(() => {
    if (list == null) getThematicBasket();
    if (props.applicationStatus) {
      setApplicationStatus(props.applicationStatus);
    }
  }, [list, props.applicationStatus]);
  useEffect(() => {
    if (list)
      list.forEach(elem => {
        if (elem.isSelected == true) {
          basket.push(elem._id);
        }
      });
    console.log('List selected item', basket);
  });

  const getThematicBasket = () => {
    setLoadingSpinner(true);
    getAPI(`getThematicBasket`, null)
      .then(response => {
        if (response.status == 200) {
          setLoadingSpinner(false);
          setList(
            response.data.map((item, ind) => ({...item, isSelected: false})),
          );
          console.log('thematic Baskets', response.data);
        } else {
          setLoadingSpinner(false);
          ShowToast(response.message);
        }
      })
      .catch(err => {
        setLoadingSpinner(false);
        // ShowToast('Something went Wrong!');
      });
  };
  const openModal2 = () => {
    // setState(false);
    setModal(true);
  };

  const closeModal2 = () => {
    setModal(false);
    // setState(true);
  };

  const openModal = () => {
    // closeModal2();
    setState(true);
  };
  const goToThematicBasketAgreement = () => {
    if (basket.length > 0) {
      //closeModal();
      //handleSubmit(basket);
      props.navigation.navigate('ThematicBasketClientAgreement', {
        basket,
      });
    } else {
      // ShowToast("Please Select at least one basket!")
      Alert.alert('Please Select at least one basket!');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <View style={styles.thematicContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: wp('70%')}}>
              <Text style={styles.investingPortfolioText}>
                {item.thematicName}
              </Text>
            </View>
            <TouchableOpacity onPress={() => selectIndex(item._id)}>
              <Image
                source={
                  item.isSelected
                    ? localImages.checked_light_blue
                    : localImages.add_icon
                }
                style={[styles.arrowRight1]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={{uri: item.thematicImage}}
              style={styles.basket_image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.riskLevelText}>Description</Text>
          <Text style={styles.aggressiveText}>{item.thematicDescription}</Text>
        </View>
      </View>
    );
  };
  const closeModal = () => {
    setState(false);
  };

  return (
    <View style={styles.mainContainer1}>
      <View>
        <View style={{alignSelf: 'center'}}>
          <ButtonWithoutShadow
            width={wp('60%')}
            height={43}
            marginTop={hp('30%')}
            borderRadius={20}
            labelColor={colors.white}
            label="Add Mudani Robo"
            backgroundColor={colors.blue}
            onAction={() =>
              props.navigation.navigate('ManagedAccount', {
                id: 2,
                from: 'dashBord',
              })
            }
          />
        </View>
        {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 22,
          }}
          onPress={() => openModal()}>
          <Image
            source={localImages.add_green_color}
            style={{height: 20, width: 20, resizeMode: 'contain'}}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.regular,
              color: colors.info_color,
              marginLeft: 10,
            }}>
            Add Thematic Basket
          </Text>
        </TouchableOpacity> */}
      </View>
      {/* )
      ) : null} */}

      <SignUpModel isModalVisible={isModal} modalClose={() => setState(false)}>
        <View>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => setState(false)}>
            <Image
              source={localImages.close_gray}
              style={{height: 18, width: 18, right: 7}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View>
            <Text numberOfLines={2} style={styles.chooseThematicText}>
              Would you like to add a thematic basket managed by Mudani for
              $3/mo?
            </Text>
            <FlatList data={list} renderItem={renderItem} />
            <View>
              <View
                style={{
                  marginTop: 0,
                  marginBottom: 50,
                  marginTop: 39,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <ButtonWithoutShadow
                  width={width - wp('64.33')}
                  height={43}
                  //   marginTop={22}
                  borderRadius={20}
                  labelColor={colors.blue}
                  label="Skip"
                  backgroundColor={colors.light_blue}
                  onAction={() => goToThematicBasketAgreement()}
                />
                <ButtonWithoutShadow
                  width={width - wp('64.33')}
                  height={43}
                  //   marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Continue"
                  backgroundColor={colors.blue}
                  onAction={() => goToThematicBasketAgreement()}
                />
              </View>
            </View>
          </View>
        </View>
      </SignUpModel>

      <ScrollView>
        <View>
          <ConfirmModal
            isModalVisible={isModal2}
            headerText={'Enable Notifications'}
            modalClose={() => closeModal2()}
            submitAction={() => openModal()}
            descriptionText={
              'You must agree to terms and conditions of mudani.'
            }
            nameOnSubmitButton={'Agree'}
            nameOnIgnoreButton={'Disagree'}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const Statement1 = props => {
  const [isModal2, setState2] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [isColor, setColor] = useState(`rgb(8, 43, 60, 1)`);
  const [isColorTab, setColorTab] = useState('#082B3C');

  const [chartData, setChartData] = useState([
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    30,
    10,
    20,
    20,
    30,
    40,
    30,
    40,
    50,
    60,
    60,
    10,
    20,
    20,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    30,
    40,
    50,
    60,
    60,
    10,
    20,
    20,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    30,
    40,
    10,
    20,
  ]);
  const [labelChart, setLabelChart] = useState([
    {
      lable: '1D',
      isSelected: true,
      color: '#082B3C',
    },
    {
      lable: '5D',
      isSelected: false,
      color: '#0091da',
    },
    {
      lable: '1M',
      isSelected: false,
      color: '#1CCBBF',
    },
    {
      lable: '3M',
      isSelected: false,
      color: '#082B3C',
    },
    {
      lable: '1Y',
      isSelected: false,
      color: '#0091da',
    },
    {
      lable: 'All',
      isSelected: false,

      color: '#1CCBBF',
    },
  ]);
  const [list, setList] = useState([]);

  const onSelectIndex = index => {
    var localEntity = Object.assign([], list);

    if (localEntity[index].isSelected) {
      localEntity[index].isSelected = false;
    } else {
      localEntity[index].isSelected = true;
    }
    setList(localEntity);
  };
  useEffect(() => {
    if (props.DashboardData) {
      setList(
        props.DashboardData.userBasket.map(item =>
          item ? {...item, isSelected: true} : {...item, isSelected: true},
        ),
      );
    }
  }, [props.DashboardData]);
  const modalOpen2 = (title, companyName) => {
    setState2(true);
    setHeading(title);
    setDescription(companyName);
  };
  const modalClose2 = () => {
    setState2(false);
  };
  const viewModal = () => {
    const IsOpen = isModal2;
    return (
      <TwoButtonModal isModalVisible={IsOpen} modalClose={() => modalClose2()}>
        <View style={styles.popupMainContainer}>
          {/* <Image source={props.image} style={styles.circleDollar} /> */}
          <Text style={styles.popUpText}> {heading}</Text>
          <Text style={[styles.popUpText, {fontWeight: '100', marginTop: 10}]}>
            {' '}
            {
              'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum'
            }
          </Text>
        </View>
        <View style={styles.popupButtonContainer}>
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Dismiss"
            backgroundColor={colors.blue}
            onAction={() => modalClose2()}
          />
        </View>
      </TwoButtonModal>
    );
  };

  const capitalize = str => {
    return str.replace(/^\w/, c => c.toUpperCase());
  };
  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.stocksContainer,
            {paddingBottom: item.isSelected ? 0 : 15},
          ]}>
          <View
            style={
              ([styles.textContainer2],
              {
                width: width / 1.3,

                justifyContent: 'space-between',
                flexDirection: 'row',
              })
            }>
            <View
              style={{
                // width: wp('50%'),

                alignItems: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: wp('30%')}}>
                <Text style={[styles.cashText]}>{capitalize(item.title)}</Text>
              </View>
              <TouchableOpacity
                onPress={() => modalOpen2(item.title, item.title)}>
                <Image
                  source={localImages.info_blue_circle}
                  style={styles.arrowRight1}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{padding: 15}}
                onPress={() => onSelectIndex(index)}>
                <Image
                  source={item.isSelected ? localImages.up : localImages.down}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        {item.isSelected ? (
          <FlatList
            data={item.popularStock}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.secondContainer}
                  onPress={() =>
                    props.navigation.navigate('TrackerScreen', {
                      symbol: item,
                      from: 'Deshbord',
                    })
                  }>
                  <View style={styles.imageWidth}>
                    <Image
                      source={
                        item.tickerImage
                          ? {uri: item.tickerImage}
                          : localImages.company_icon
                      }
                      style={styles.itemImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.textContainerWidth}>
                    <Text
                      numberOfLines={1}
                      style={[styles.itemText1, {textTransform: 'capitalize'}]}>
                      {capitalize(item.companyName)}
                    </Text>
                    <Text numberOfLines={1} style={styles.itemText2}>
                      {item.symbol}
                    </Text>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Text
                      style={[styles.itemText1, {color: colors.info_color}]}>
                      $0
                    </Text>
                    <Text style={[styles.itemText2]}>0 Shares</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View style={{marginBottom: 10, marginTop: 10}}>
                  <Text>No data found!</Text>
                </View>
              );
            }}
          />
        ) : null}
        {viewModal()}
        {/* <View style={styles.rowBorder} /> */}
      </View>
    );
  };

  const onClickDate = index => {
    var localData = [];
    localData = labelChart;
    for (var i = 0; i < labelChart.length; i++) {
      localData[i].isSelected = false;
    }
    localData[index].isSelected = true;
    setLabelChart(localData);
    setChartData(
      index == 0
        ? [
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 1
        ? [
            30,
            30,
            20,
            20,
            60,
            80,
            40,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 2
        ? [
            40,
            30,
            20,
            50,
            70,
            90,
            30,
            10,
            30,
            20,
            40,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 3
        ? [
            10,
            30,
            20,
            50,
            60,
            40,
            60,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 4
        ? [
            90,
            40,
            20,
            90,
            50,
            70,
            50,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : [
            40,
            80,
            24,
            15,
            76,
            16,
            29,
            10,
            35,
            20,
            43,
            93,
            22,
            10,
            16,
            35,
            25,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            49,
            50,
            29,
            12,
            10,
            32,
            23,
            40,
            92,
            22,
            1,
            13,
            32,
            22,
            42,
            9,
            2,
            17,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ],
    );

    if (index == 0 || index == 3) {
      setColor(`rgb(8 ,43, 60, 1)`);
      setColorTab('#082B3C');
    } else if (index == 2 || index == 5) {
      setColor(`rgb(28,203, 218, 191)`);
      setColorTab('#1CCBBF');
    } else if (index == 1 || index == 4) {
      setColor(`rgb(90,159, 218, 1)`);
      setColorTab('#0091da');
    }
  };

  const renderlabel = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onClickDate(index)}>
        <View
          style={[
            {
              justifyContent: 'center',
              borderRadius: 8,
              paddingRight: 10,
              paddingLeft: 10,
              paddingTop: 6,
              paddingBottom: 6,
            },
            item.isSelected ? {backgroundColor: item.color} : null,
          ]}>
          <Text
            style={[
              {fontSize: 14, fontWeight: '600'},
              item.isSelected ? {color: 'white'} : {color: isColorTab},
            ]}>
            {item.lable}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  console.log('Dada hai', JSON.stringify(list));
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>Total Account Value</Text>
        <Text style={styles.amountText}>$0</Text>
      </View>
      <View style={styles.smallContainer}>
        <View>
          <Image
            source={localImages.icon_up}
            style={styles.icon_up}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.smallText}>$0</Text>
        </View>
        <View>
          <Text style={[styles.smallText, {color: colors.info_color}]}>
            (0 %)
          </Text>
        </View>
      </View>
      <View>
        <LineChart
          onDataPointClick={({value}) => {
            console.log('masoud' + value);
          }}
          data={{
            labels: [],
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={width / 1.2} // from react-native
          height={190}
          // yAxisLabel="$"
          //yAxisSuffix="k"
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withDots={false}
          withInnerLines={false}
          shadowOffset={false}
          withShadow={false}
          withOuterLines={false}
          chartConfig={{
            withShadow: false,
            withOuterLines: false,
            backgroundColor: colors.authBackGroud,
            backgroundGradientFrom: colors.authBackGroud,
            backgroundGradientTo: colors.authBackGroud,
            decimalPlaces: 1, // optional, defaults to 2dp
            // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            color: (opacity = 0) => isColor,
            labelColor: (opacity = 0) => `rgb(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 1,
            },

            propsForDots: {
              r: '0',
              strokeWidth: '1',
              stroke: 'red',
            },
          }}
          bezier
          style={{
            marginVertical: 20,
            borderRadius: 5,
            paddingRight: 0,
            //marginRight: 100,
            //marginTop: hp('5%'),
          }}
        />

        <FlatList
          numColumns={6}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-between',
          }}
          data={labelChart}
          renderItem={renderlabel}
        />
      </View>
      <View style={styles.statementContainer}>
        <View>
          <FlatList
            data={list}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.rowBorder} />}
            ListEmptyComponent={() => {
              return (
                <View style={{marginBottom: 10, marginTop: 10}}>
                  <Text>No Basket available!</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View>
        <View style={styles.statementContainer1}>
          <TouchableOpacity
            style={styles.statementSubContainer}
            onPress={() => null}>
            <View style={styles.textContainer2}>
              <View style={{width: wp('29%')}}>
                <Text style={styles.cashText}>Cash</Text>
              </View>
              <TouchableOpacity onPress={() => modalOpen2('Cash', 'skdjfkl')}>
                <Image
                  source={localImages.info_blue_circle}
                  style={styles.arrowRight1}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.totolText}>$0</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={styles.statementSubContainer}>
            <View style={styles.textContainer2}>
              <View style={{width: wp('29%')}}>
                <Text style={styles.cashText}>Debt</Text>
              </View>
              <TouchableOpacity onPress={() => modalOpen2('Debt', 'skdjfkl')}>
                <Image
                  source={localImages.info_blue_circle}
                  style={styles.arrowRight1}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.totolText}>$0</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={styles.statementSubContainer}>
            <View style={styles.textContainer2}>
              <View style={{width: wp('29%')}}>
                <Text style={styles.cashText}>Net Worth</Text>
              </View>
              <TouchableOpacity
                onPress={() => modalOpen2('Net Worth', 'skdjfkl')}>
                <Image
                  source={localImages.info_blue_circle}
                  style={styles.arrowRight1}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.totolText}>$0</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  //   }
  // } else {
  //   return null;
  // }
};
const TaxPackages1 = props => {
  let basket = [];
  const [isModal, setState] = useState(false);
  const [isModal2, setState2] = useState(false);
  const [heading, setHeading] = useState('');
  const [isColor, setColor] = useState(`rgb(8, 43, 60, 1)`);
  const [isColorTab, setColorTab] = useState('#082B3C');

  const [description, setDescription] = useState('');
  const [DashboardData, setDashboardData] = useState(null);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const [chartData, setChartData] = useState([
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    20,
    30,
    40,
    50,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    50,
    60,
    10,
    20,
    20,
    30,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    10,
    20,
  ]);
  const [labelChart, setLabelChart] = useState([
    {
      lable: '1D',
      isSelected: true,
      color: '#082B3C',
    },
    {
      lable: '5D',
      isSelected: false,
      color: '#0091da',
    },
    {
      lable: '1M',
      isSelected: false,
      color: '#1CCBBF',
    },
    {
      lable: '3M',
      isSelected: false,
      color: '#082B3C',
    },
    {
      lable: '1Y',
      isSelected: false,
      color: '#0091da',
    },
    {
      lable: 'All',
      isSelected: false,

      color: '#1CCBBF',
    },
  ]);

  const [list, setList] = useState([
    {
      isSelected: true,
      nameofBasket: 'ESG & Socially Responsible',
      image: localImages.esg_basket1,
      text:
        'Environmental, Social, and Corporate Governance refers to the three central factors in measuring the sustainability and societal impact of an investment in a company. Socially responsible investing, "green" or ethical investing, is any investment strategy which seeks to consider both financial return and social/environmental good to bring about social change',
    },
    {
      isSelected: false,
      nameofBasket: 'Blockchain & Cryptocurrency',
      image: localImages.bit,
      text:
        'Blockchain technology is simply defined as a decentralized, distributed ledger that records transactions of a digital asset. Blockchains are used for recording transactions made with cryptocurrencies, such as Bitcoin, and have many other applications.',
    },
    {
      isSelected: false,
      nameofBasket: 'Cannabis',
      image: localImages.leaf,
      text:
        'Cannabis investing is highly speculative, however, it’s growth potential cannot be underestimated. Our thematic portfolio invests in companies across the cannabis industry. This includes companies involved in the legal production, growth and distribution of cannabis and industrial hemp, as well as pharmaceutical applications of cannabis, cannabidiol (i.e., CBD), or other related uses.',
    },
    {
      isSelected: false,
      nameofBasket: 'Sports Betting & E-Gaming',
      image: localImages.basket_image,
      text:
        'Between the recent legalization of sports betting and improving technology, sports betting is becoming more accessible than ever before. This will help drive growth in the U.S. gaming industry and create interesting investment opportunities. We believe sports betting is here to stay, and we believe it may reward companies with the ability to pivot and tap into legalized online gambling. uses.',
    },
    {
      isSelected: false,
      nameofBasket: 'Cybersecurity',
      image: localImages.shield,
      text:
        'Hackers are everywhere and they will only get better. Hacks, data breaches, and cyber-fraud have rapidly increased, fueling the need to take steps to protect people online.',
    },
    {
      isSelected: false,
      nameofBasket: 'SPACs',
      image: localImages.setting_green,
      text:
        'A special purpose acquisition company (SPAC) is a "blank check" shell corporation designed to take companies public without going through the traditional IPO process. SPACs allow retail investors to invest in private equity type transactions, particularly leveraged buyouts.',
    },
  ]);
  const selectIndex = async id => {
    setList(
      list.map((item, ind) => {
        if (item._id == id) {
          return {...item, isSelected: item.isSelected ? false : true};
        } else {
          return {...item};
        }
      }),
    );
  };

  useEffect(() => {
    if (props.DashboardData) {
      setDashboardData(props.DashboardData);
      getThematicBasket();
    }
  }, [props.DashboardData]);

  useEffect(() => {
    if (list)
      list.forEach(elem => {
        if (elem.isSelected == true) {
          basket.push(elem._id);
        }
      });
    console.log('List selected item', basket);
  });
  const getThematicBasket = () => {
    setLoadingSpinner(true);
    getAPI(`getThematicBasket`, null)
      .then(response => {
        if (response.status == 200) {
          setLoadingSpinner(false);
          setList(
            response.data.map((item, ind) => ({...item, isSelected: false})),
          );
          console.log('thematic Baskets', response.data);
        } else {
          setLoadingSpinner(false);
          ShowToast(response.message);
        }
      })
      .catch(err => {
        setLoadingSpinner(false);
        //ShowToast('Something went Wrong!');
      });
  };
  const modalOpen2 = (title, companyName) => {
    setState2(true);
    setHeading(title);
    setDescription(companyName);
  };
  const modalClose2 = () => {
    setState2(false);
  };
  const viewModal = () => {
    const IsOpen = isModal2;
    return (
      <TwoButtonModal isModalVisible={IsOpen} modalClose={() => modalClose2()}>
        <View style={styles.popupMainContainer}>
          {/* <Image source={props.image} style={styles.circleDollar} /> */}
          <Text style={styles.popUpText}> {heading}</Text>
          <Text style={[styles.popUpText, {fontWeight: '100', marginTop: 10}]}>
            {' '}
            {
              'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum'
            }
          </Text>
        </View>
        <View style={styles.popupButtonContainer}>
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Dismiss"
            backgroundColor={colors.blue}
            onAction={() => modalClose2()}
          />
        </View>
      </TwoButtonModal>
    );
  };

  const goToThematicBasketAgreement = () => {
    if (basket.length > 0) {
      closeModal();
      //handleSubmit(basket);
      props.navigation.navigate('ThematicBasketClientAgreement', {
        basket,
      });
    } else {
      // ShowToast("Please Select at least one basket!")
      Alert.alert('Please Select at least one basket!');
    }
    // closeModal();
  };

  const openModal = () => {
    // closeModal2();
    setState(true);
  };
  const closeModal = () => {
    setState(false);
  };

  const onClickDate = index => {
    var localData = [];
    localData = labelChart;
    for (var i = 0; i < labelChart.length; i++) {
      localData[i].isSelected = false;
    }
    localData[index].isSelected = true;
    setLabelChart(localData);
    setChartData(
      index == 0
        ? [
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 1
        ? [
            30,
            30,
            20,
            20,
            60,
            80,
            40,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 2
        ? [
            40,
            30,
            20,
            50,
            70,
            90,
            30,
            10,
            30,
            20,
            40,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 3
        ? [
            10,
            30,
            20,
            50,
            60,
            40,
            60,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 4
        ? [
            90,
            40,
            20,
            90,
            50,
            70,
            50,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : [
            40,
            80,
            24,
            15,
            76,
            16,
            29,
            10,
            35,
            20,
            43,
            93,
            22,
            10,
            16,
            35,
            25,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            49,
            50,
            29,
            12,
            10,
            32,
            23,
            40,
            92,
            22,
            1,
            13,
            32,
            22,
            42,
            9,
            2,
            17,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ],
    );

    if (index == 0 || index == 3) {
      setColor(`rgb(8 ,43, 60, 1)`);
      setColorTab('#082B3C');
    } else if (index == 2 || index == 5) {
      setColor(`rgb(28,203, 218, 191)`);
      setColorTab('#1CCBBF');
    } else if (index == 1 || index == 4) {
      setColor(`rgb(90,159, 218, 1)`);
      setColorTab('#0091da');
    }
  };

  const renderlabel = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onClickDate(index)}>
        <View
          style={[
            {
              justifyContent: 'center',
              borderRadius: 8,
              paddingRight: 10,
              paddingLeft: 10,
              paddingTop: 6,
              paddingBottom: 6,
            },
            item.isSelected ? {backgroundColor: item.color} : null,
          ]}>
          <Text
            style={[
              {fontSize: 14, fontWeight: '600'},
              item.isSelected ? {color: 'white'} : {color: isColorTab},
            ]}>
            {item.lable}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <View style={styles.thematicContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: wp('70%')}}>
              <Text style={styles.investingPortfolioText}>
                {item.thematicName}
              </Text>
              <Text style={[styles.dollarText, {fontSize: 16}]}>$3/mo</Text>
            </View>
            <TouchableOpacity onPress={() => selectIndex(item._id)}>
              <Image
                source={
                  item.isSelected
                    ? localImages.checked_light_blue
                    : localImages.add_icon
                }
                style={[styles.arrowRight1]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={{uri: item.thematicImage}}
              style={styles.basket_image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.riskLevelText}>Description</Text>
          <Text style={styles.aggressiveText}>{item.thematicDescription}</Text>
        </View>
      </View>
    );
  };

  const renderBasketShow = ({item}) => {
    return (
      <View>
        <View style={styles.myPortfolioContainer}>
          <View style={styles.basketContainer}>
            <Text style={styles.portFolioText}>
              {item.thematicDetail.thematicName}
            </Text>
          </View>
        </View>
        <Image
          source={
            item.thematicDetail.thematicImage
              ? {uri: item.thematicDetail.thematicImage}
              : localImages.company_icon
          }
          style={styles.basket_image}
          resizeMode="contain"
        />
        <View style={{alignSelf: 'center', marginBottom: 10}}>
          <ButtonWithoutShadow
            width={width - 147}
            height={43}
            // marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="View Basket"
            backgroundColor={colors.blue}
            onAction={() =>
              props.navigation.navigate('BasketShow', {basketItem: item})
            }
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>Total Account Value</Text>
        <Text style={styles.amountText}>$0</Text>
      </View>
      <View style={styles.smallContainer}>
        <View>
          <Image
            source={localImages.icon_up}
            style={styles.icon_up}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.smallText}>$0</Text>
        </View>
        <View>
          <Text style={[styles.smallText, {color: colors.info_color}]}>
            (0 %)
          </Text>
        </View>
      </View>

      <View>
        <LineChart
          data={{
            labels: [
              {
                data: chartData,
              },
            ],
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={Dimensions.get('window').width - wp('15%')} // from react-native
          height={190}
          yAxisLabel="$"
          yAxisSuffix="k"
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withOuterLines={false}
          withInnerLines={false}
          withDots={false}
          withShadow={false}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: '#F5F5F5',
            backgroundGradientTo: '#F5F5F5',
            color: (opacity = 0) => isColor,
            labelColor: (opacity = 1) => `rgb(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              color: 'pink',
            },
            propsForHorizontalLabels: {
              color: 'pink',
            },
            propsForDots: {
              r: '0',
              strokeWidth: '2',
              stroke: 'red',
            },
          }}
          bezier
          style={{
            paddingRight: 0,

            // borderRadius: 5,
          }}
        />
        <FlatList
          numColumns={6}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-between',
          }}
          data={labelChart}
          renderItem={renderlabel}
        />
      </View>
      <View style={styles.portFolioContainer}>
        <View>
          <Text style={[styles.heading, {marginTop: 0}]}>My Portfolio:</Text>
        </View>
        <TouchableOpacity onPress={() => modalOpen2('My Portfolio')}>
          <Image
            source={localImages.info_blue_circle}
            style={styles.arrowRight1}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {DashboardData ? (
        props.DashboardData.getPortfolio ? (
          <View>
            <View style={styles.myPortfolioContainer}>
              {/* <View style={styles.basketContainer}>
              <Text style={styles.portFolioText}>Portfolio Name : </Text>
              <Text style={[styles.portFolioText, {color: colors.info_color}]}>
                Portfolio
              </Text>
            </View> */}
              <View style={styles.basketContainer}>
                <Text style={styles.portFolioText}> Portfolio name : </Text>
                <Text
                  style={[styles.portFolioText, {color: colors.info_color}]}>
                  {DashboardData.getPortfolio.name}
                </Text>
              </View>
              <View style={styles.basketContainer}>
                <Text style={styles.portFolioText}>Risk Level : </Text>
                <Text
                  style={[styles.portFolioText, {color: colors.info_color}]}>
                  {DashboardData.getPortfolio.riskLevel}
                </Text>
              </View>
            </View>
            <Image
              source={localImages.basket}
              style={styles.basket_image}
              resizeMode="contain"
            />
            <View style={{alignSelf: 'center'}}>
              <ButtonWithoutShadow
                width={width - 147}
                height={43}
                // marginTop={22}
                borderRadius={20}
                labelColor={colors.white}
                label="View Portfolio"
                backgroundColor={colors.blue}
                onAction={() =>
                  props.navigation.navigate('NameOfThePortfolio', {
                    portfolio: props.DashboardData,
                  })
                }
              />
            </View>
          </View>
        ) : (
          <View style={styles.basketContainer}>
            <Text style={styles.portFolioText}> Portfolio not available! </Text>
          </View>
        )
      ) : (
        <View style={styles.basketContainer}>
          <Text style={styles.portFolioText}> Portfolio not found! </Text>
        </View>
      )}

      <View style={styles.portFolioContainer}>
        <View>
          <Text style={[styles.heading, {marginTop: 0}]}>My Basket:</Text>
        </View>
        <TouchableOpacity onPress={() => modalOpen2('My Basket')}>
          <Image
            source={localImages.info_blue_circle}
            style={styles.arrowRight1}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={
          DashboardData
            ? DashboardData.thematicData.length > 0
              ? DashboardData.thematicData
              : []
            : []
        }
        ListEmptyComponent={() => (
          <View>
            <Text style={[styles.portFolioText, {textAlign: 'center'}]}>
              No basket found!
            </Text>
          </View>
        )}
        renderItem={renderBasketShow}
      />
      <TouchableOpacity
        style={styles.addBasketButton}
        onPress={() => openModal()}>
        <Image
          source={localImages.add_green_color}
          style={{height: 20, width: 20}}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.portFolioText,
            {color: colors.info_color, fontSize: 12, paddingLeft: 5},
          ]}>
          Add Basket
        </Text>
      </TouchableOpacity>
      <View>
        <View style={styles.statementContainer1}>
          <View style={styles.statementSubContainer} onPress={() => null}>
            <View style={styles.textContainer2}>
              <View style={{width: wp('25%')}}>
                <Text style={styles.cashText}>Cash</Text>
              </View>
              <TouchableOpacity onPress={() => modalOpen2('Cash')}>
                <Image
                  source={localImages.info_blue_circle}
                  style={styles.arrowRight1}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.totolText}>$0</Text>
            </View>
          </View>
          <View style={styles.statementSubContainer}>
            <View style={styles.textContainer2}>
              <View style={{width: wp('25%')}}>
                <Text style={styles.cashText}>Debt</Text>
              </View>
              <TouchableOpacity onPress={() => modalOpen2('Debt')}>
                <Image
                  source={localImages.info_blue_circle}
                  style={styles.arrowRight1}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.totolText}>$0</Text>
            </View>
          </View>
          <View style={styles.statementSubContainer}>
            <View style={styles.textContainer2}>
              <View style={{width: wp('25%')}}>
                <Text style={styles.cashText}>Net Worth</Text>
              </View>
              <TouchableOpacity onPress={() => modalOpen2('Net Worth')}>
                <Image
                  source={localImages.info_blue_circle}
                  style={styles.arrowRight1}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.totolText}>$0</Text>
            </View>
          </View>
        </View>
      </View>
      {viewModal()}
      <SignUpModel isModalVisible={isModal} modalClose={() => setState(false)}>
        <View>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => setState(false)}>
            <Image
              source={localImages.close_gray}
              style={{height: 18, width: 18, right: 7}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View>
            <Text numberOfLines={2} style={styles.chooseThematicText}>
              Would you like to add a thematic basket managed by Mudani for
              $3/mo?
            </Text>
            <FlatList data={list} renderItem={renderItem} />
            <View>
              <View
                style={{
                  marginTop: 0,
                  marginBottom: 50,
                  marginTop: 39,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <ButtonWithoutShadow
                  width={width - wp('64.33')}
                  height={43}
                  //   marginTop={22}
                  borderRadius={20}
                  labelColor={colors.blue}
                  label="Skip"
                  backgroundColor={colors.light_blue}
                  onAction={() => goToThematicBasketAgreement()}
                />
                <ButtonWithoutShadow
                  width={width - wp('64.33')}
                  height={43}
                  //   marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Continue"
                  backgroundColor={colors.blue}
                  onAction={() => goToThematicBasketAgreement()}
                />
              </View>
            </View>
          </View>
        </View>
      </SignUpModel>
    </View>
  );
  //   }
  // } else {
  //   return null;
  // }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentPosition: 0,
      userId: '',
      applicationId: '',
      DashboardData: null,
      loadingSpinner: false,
      applicationStatus: null,
    };
  }

  setPositions = currentPosition => {
    this.setState({currentPosition: currentPosition});
  };

  showTabs = () => {
    if (!this.state.loadingSpinner) {
      if (this.state.applicationStatus) {
        if (this.state.DashboardData) {
          if (this.props.route.params !== undefined) {
            if (this.props.route.params.id == 1) {
              if (this.state.currentPosition == 0) {
                return (
                  <Statement1
                    {...this.props}
                    userId={this.state.userId}
                    DashboardData={this.state.DashboardData}
                    applicationStatus={this.state.applicationStatus}
                  />
                );
              } else if (this.state.currentPosition == 1) {
                return (
                  <TaxPackages
                    {...this.props}
                    userId={this.state.userId}
                    DashboardData={this.state.DashboardData}
                    applicationStatus={this.state.applicationStatus}
                  />
                );
              }
            } else if (this.props.route.params.id == 2) {
              if (this.state.currentPosition == 0) {
                return (
                  <Statement
                    {...this.props}
                    DashboardData={this.state.DashboardData}
                    userId={this.state.userId}
                    applicationStatus={this.state.applicationStatus}
                  />
                );
              } else if (this.state.currentPosition == 1) {
                return (
                  <TaxPackages1
                    {...this.props}
                    userId={this.state.userId}
                    DashboardData={this.state.DashboardData}
                    applicationStatus={this.state.applicationStatus}
                  />
                );
              }
            } else if (this.props.route.params.id == 7) {
              if (this.state.currentPosition == 0) {
                return (
                  <Statement
                    {...this.props}
                    userId={this.state.userId}
                    DashboardData={this.state.DashboardData}
                    applicationStatus={this.state.applicationStatus}
                  />
                );
              } else if (this.state.currentPosition == 1) {
                return (
                  <TaxPackages
                    {...this.props}
                    userId={this.state.userId}
                    DashboardData={this.state.DashboardData}
                    applicationStatus={this.state.applicationStatus}
                  />
                );
              }
            } else if (this.props.route.params.id == 6) {
              if (this.state.currentPosition == 1) {
                return (
                  <TaxPackages1
                    {...this.props}
                    DashboardData={this.state.DashboardData}
                    applicationStatus={this.state.applicationStatus}
                  />
                );
              } else if (this.state.currentPosition == 0) {
                return (
                  <Statement1
                    {...this.props}
                    DashboardData={this.state.DashboardData}
                    applicationStatus={this.state.applicationStatus}
                  />
                );
              }
            } else if (this.props.route.params.id == 5) {
              if (this.state.currentPosition == 0) {
                return (
                  <Statement1
                    {...this.props}
                    DashboardData={this.state.DashboardData}
                    applicationStatus={this.state.applicationStatus}
                  />
                );
              } else if (this.state.currentPosition == 1) {
                return (
                  <TaxPackages1
                    {...this.props}
                    DashboardData={this.state.DashboardData}
                    applicationStatus={this.state.applicationStatus}
                  />
                );
              }
            }
          } else {
            if (this.state.currentPosition == 0) {
              return (
                <Statement1
                  {...this.props}
                  DashboardData={this.state.DashboardData}
                  applicationStatus={this.state.applicationStatus}
                />
              );
            } else if (this.state.currentPosition == 1) {
              return (
                <TaxPackages1
                  {...this.props}
                  DashboardData={this.state.DashboardData}
                  applicationStatus={this.state.applicationStatus}
                />
              );
            }
          }
        }
      }
    }
  };

  componentDidMount = async () => {
    if (this.props.route.params !== undefined) {
      if (this.props.route.params.id == 6) {
        this.setState({currentPosition: 1});
      } else if (this.props.route.params.id == 2) {
        this.setState({currentPosition: 1});
      } else if (this.props.route.params.id == 5) {
        this.setState({currentPosition: 0});
      }
    }
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails);
    this.setState({userId: userDetails._id});
    this.setState({applicationId: userDetails.applicationId});
    if (userDetails._id) {
      this.getApplicationStatus(userDetails.applicationId, userDetails._id);
      this.getDashboardData(userDetails._id);
    }
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.getApplicationStatus(userDetails.applicationId, userDetails._id);
      this.getDashboardData(userDetails._id);
    });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressed,
    );
  }

  onBackButtonPressed() {
    return true;
  }

  getDashboardData = async userId => {
    this.setState({loadingSpinner: true});
    getAPI(`userDashboard/` + `${userId}`, null)
      .then(response => {
        if (response.status == 200) {
          this.setState({loadingSpinner: false});
          console.log('Dashboard', response.data);
          this.setState({DashboardData: response.data});
        } else {
          this.setState({loadingSpinner: false});
          ShowToast(response.message);
        }
      })
      .catch(err => {
        this.setState({loadingSpinner: false});
        //ShowToast('Something went Wrong!');
      });
  };
  getApplicationStatus = async (applicationId, userId) => {
    var applicationIdd = await DataManager.getApplicationId();

    this.setState({loadingSpinner: true});
    getAPI(
      `getApplicationStatus/` +
        `${applicationId == 0 ? applicationIdd : applicationId}/` +
        `${userId}`,
      null,
    )
      .then(response => {
        if (response.status == 200) {
          this.setState({loadingSpinner: false});
          console.log('Application status', response.data);
          this.setState({applicationStatus: response.data.application});
        } else {
          this.setState({loadingSpinner: false});
          ShowToast(response.message);
        }
      })
      .catch(err => {
        this.setState({loadingSpinner: false});
        //ShowToast('Something went Wrong!');
      });
  };
  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <Spinner
          visible={this.state.loadingSpinner}
          cancelable={true}
          indicatorStyle={{color: colors.red}}
        />
        <HomeHeader
          Header=""
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
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={
              this.state.currentPosition == 0
                ? styles.buttons2
                : styles.buttons1
            }
            onPress={() => this.setPositions(0)}>
            <Text
              style={
                this.state.currentPosition == 0
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              Mudani Invest
            </Text>
          </TouchableOpacity>
          {/* <View style={styles.borderSeperator} /> */}
          <TouchableOpacity
            style={
              this.state.currentPosition == 1
                ? styles.buttons3
                : styles.buttons1
            }
            onPress={() => this.setPositions(1)}>
            <Text
              style={
                this.state.currentPosition == 1
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              Mudani Robo
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>{this.showTabs()}</View>
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
    textAlign: 'center',
    width: wp('60%'),
    alignSelf: 'center',
  },
  mainContainer1: {
    flex: 1,
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
  },
  buttons: {
    height: hp('10.94%'),
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginBottom: hp('1.64%'),
  },
  statementContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp('1.5%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    //   marginBottom: hp('3.39%'),
    marginTop: hp('5.09%'),
  },
  statementContainer1: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp('1.5%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: hp('3.39%'),
    marginTop: hp('5.09%'),
  },
  statementSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: hp('3.59%'),
    paddingTop: hp('2.99%'),
    padding: wp('4%'),
  },
  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },
  cashText: {
    fontSize: wp('4.5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
    // paddingLeft: wp('3'),
  },
  cashText: {
    fontSize: wp('4.5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
    // paddingLeft: wp('3'),
  },
  accountNumberText: {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('38.6'),
    marginRight: wp('3.3'),
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
    borderRadius: wp('2%'),
    borderColor: colors.grayColor,
    borderWidth: 0.4,
    backgroundColor: colors.white,
  },
  buttons1: {
    //   width: wp('45%'),
    height: hp('4.84%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttons2: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('4.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: wp('2%'),
    borderBottomLeftRadius: wp('2%'),

    // marginBottom: hp('1.64%'),
  },
  buttons3: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('4.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: wp('2%'),
    borderBottomRightRadius: wp('2%'),
  },
  buttonText1: {
    fontSize: wp('3.73%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
  buttonText2: {
    fontSize: wp('3.73%'),
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
  heading: {
    fontSize: wp('5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 27,
    // marginLeft: wp('0.7'),
    marginTop: hp('2.2'),
    // marginBottom: hp('2.24'),
  },
  amountText: {
    fontSize: wp('6,4%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 31,
    //marginLeft: wp('0'),
    marginTop: hp('0.7'),
    // marginBottom: hp('2.24'),
  },
  borderSeperator: {
    height: 30,
    borderWidth: 0.3,
    borderColor: colors.grayColor,
  },
  rowBorder: {
    width: wp('80%'),
    borderWidth: Platform.OS == 'android' ? 0.25 : 0.5,
    borderColor: colors.grayColor,
  },
  arrowRight: {
    height: 12,
    width: 12,
    marginLeft: wp('3.46'),
    padding: 5,
  },
  arrowRight1: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginLeft: wp('3.46'),
  },
  basket_image: {
    height: hp('20.48'),
    width: hp('20.48'),
    alignSelf: 'center',
    marginTop: hp('4.04%'),
    marginBottom: hp('5.69%'),
  },
  icon_up: {
    height: 15,
    width: 15,
  },
  itemImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginTop: 6,
    // marginLeft: wp('3.46'),
    // marginTop: hp('0.4%'),
  },
  showMoreText: {
    fontSize: wp('4%'),
    color: colors.info_color,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('4.53'),
    marginTop: hp('2.77%'),
    marginBottom: hp('3.44%'),
  },
  itemText1: {
    fontSize: wp('4.5%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  itemText2: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  textContainer2: {
    flex: 1,
    // width: wp('60%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  smallContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.4%'),
  },
  smallText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    // lineHeight: 30,
    marginLeft: wp('2.08%'),
  },
  totolText: {
    fontSize: wp('4.53%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
    //  textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },
  portFolioText: {
    fontSize: wp('4%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  stocksContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // paddingTop: hp('2.99%'),
    paddingLeft: wp('0%'),
    paddingRight: wp('0%'),
    paddingTop: wp('4%'),
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingTop: hp('2.3%'),
    paddingBottom: hp('2.9%'),
  },
  textContainerWidth: {width: wp('45.9%')},
  imageWidth: {width: wp('15%')},
  basketContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: wp('1.79%'),
  },
  myPortfolioContainer: {
    flex: 1,
    marginTop: hp('1.79%'),
  },
  portFolioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.2'),
  },
  addBasketButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('5%'),
    marginTop: hp('5.09%'),
    justifyContent: 'center',
  },
  chooseThematicText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  thematicContainer: {
    //   flex : 1,
    backgroundColor: colors.white,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
    borderRadius: 7,
  },
  investingPortfolioText: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  basket_image: {
    height: hp('14.84'),
    width: hp('14.84'),
    alignSelf: 'center',
    marginTop: hp('2.6%'),
    marginBottom: hp('3.89%'),
  },
  riskLevelText: {
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  aggressiveText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginBottom: 8,
  },
  itemText: {
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  itemSpace: {
    width: wp('50%'),
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: wp('3.46%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subPopupText: {
    fontSize: wp('2.72%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 15,
    marginLeft: 10,
  },
  dollarText: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 4,
  },
  totalNumber: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 21,
    textAlign: 'left',
    // marginTop: 28,
    marginBottom: 15,
  },
});
export default Dashboard;
