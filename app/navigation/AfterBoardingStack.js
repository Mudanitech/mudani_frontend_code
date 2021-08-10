import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {localImages} from '../utils/constant';

import LoginScreen from '../screen/afterBording/LoginScreen';
import SignUp from '../screen/afterBording/SignUp';
import SignUp2 from '../screen/afterBording/SignUp2';
import SignUp3 from '../screen/afterBording/SignUp3';
import ChoosePasswordScreen from '../screen/afterBording/ChoosePasswordScreen';
import otp_screen from '../screen/afterBording/otp_screen';
import WalkThrough from '../screen/afterBording/WalkThrough';
import SelectAccountType from '../screen/afterBording/SelectAccountType';
import StartYourSignUpJourney1 from '../screen/afterBording/StartYourSignUpJourney1';
import StartYourSignUpJourney2 from '../screen/afterBording/StartYourSignUpJourney2';
import StartYourSignUpJourney3 from '../screen/afterBording/StartYourSignUpJourney3';
import VerifyYourIdentity from '../screen/afterBording/VerifyYourIdentity';
import ChooseAPlan from '../screen/afterBording/ChooseAPlan';
import LinkYourAccount from '../screen/afterBording/LinkYourAccount';
import ClientAgreement from '../screen/afterBording/ClientAgreement';
import HelpMeDecide from '../screen/afterBording/HelpMeDecide';
import FundYourAccount from '../screen/afterBording/FundYourAccount';
import VerifyYourIdentiyStep from '../screen/afterBording/VerifyYourIdentiyStep';
import VerifyYourIdentityStep1 from '../screen/afterBording/VerifyYourIdentityStep1.js';
import VerifyYourIdentityStep2 from '../screen/afterBording/VerifyYourIdentityStep2';
import VerifyYourIdentityStep3 from '../screen/afterBording/VerifyYourIdentityStep3';
import VerifyYourIdentityStep4 from '../screen/afterBording/VerifyYourIdentityStep4';
import VerifyYourIdentityStep5 from '../screen/afterBording/VerifyYourIdentityStep5';

import YourPlan from '../screen/afterBording/YourPlan';
import AfterLoginCarousel from '../screen/afterBording/AfterLoginCarousel';
import SpinScreen from '../screen/afterBording/SpinScreen';
import HelpMeDecide2 from '../screen/afterBording/HelpMeDecide2';
import Plaid from '../screen/afterBording/Plaid';
import Plaid2 from '../screen/afterBording/Plaid2';
import AfterLoginSlider from '../screen/afterBording/AfterLoginSlider';
import ConfirmationAccount from '../screen/afterBording/ConfirmationAccount';
import ForgetPassword from '../screen/afterBording/ForgetPassword';
import LoginOTP from '../screen/afterBording/LoginOTP';
import LoginResetPassword from '../screen/afterBording/LoginResetPassword';
import SelectAccountTypeForSelfRedirected from '../screen/afterBording/SelectAccountTypeForSelfRedirected';
import SpinScreen2 from '../screen/afterBording/SpinScreen2';
import ManagedAccount from '../screen/afterBording/ManagedAccount';
import CustomizedPortfolio from '../screen/afterBording/CustomizedPortfolio';
import InvestingPortfolio from '../screen/afterBording/InvestingPortfolio';

import CustomizedPortfolioHome from '../screen/afterBording/CustomizedPortfolioHome';
import Spin3 from '../screen/afterBording/Spin3';
import SelectAccountTypeDual from '../screen/afterBording/SelectAccountTypeDual';
import DualCreateBasket from '../screen/afterBording/DualCreateBasket';
import SpinScreen3 from '../screen/afterBording/SpinScreen3';

/////payment GetWay//////////

import ExitScreen from '../screen/afterBording/ExitScreen.tsx';
import HomeScreen from '../screen/afterBording/HomeScreen.tsx';
import PlaidLink from '../screen/afterBording/PlaidLink.tsx';
import SuccessScreen from '../screen/afterBording/SuccessScreen.tsx';

//Dashboard screens
import RecurringDeposit from '../screen/Dashboard/RecurringDeposit';
import UpgradePlan from '../screen/Dashboard/UpgradePlan';
import Settings from '../screen/Dashboard/Settings';
import Help from '../screen/Dashboard/Help';
import MyProfiles from '../screen/Dashboard/MyProfiles';
import LinkedAccount from '../screen/Dashboard/LinkedAccount';
import DocumentAndStatement from '../screen/Dashboard/DocumentAndStatement';
import Statement from '../screen/Dashboard/Statement';
import Notifications from '../screen/Dashboard/Notifications';
import WatchList from '../screen/Dashboard/WatchList';
import PrivacyPolicy from '../screen/Dashboard/PrivacyPolicy';
import AboutMudani from '../screen/Dashboard/AboutMudani';
import TermsAndConditions from '../screen/Dashboard/TermsAndConditions';
import NameOfThePortfolio from '../screen/Dashboard/NameOfThePortfolio';
import MyPlans from '../screen/Dashboard/MyPlans';
import MyPortfolio from '../screen/Dashboard/MyPortfolio';
import ChangePortfolio from '../screen/Dashboard/ChangePortfolio';
import ChangePortfolioWithoutHoldings from '../screen/Dashboard/ChangePortfolioWithoutHoldings';
import ThematicBasket from '../screen/Dashboard/ThematicBasket';
import StockDetails from '../screen/Dashboard/StockDetails';
import StockTrade from '../screen/Dashboard/StockTrade';
import TrackerScreen from '../screen/Dashboard/TrackerScreen';
import WatchListRoundIcon from '../screen/Dashboard/WatchListRoundIcon';
import ReferAFriend from '../screen/Dashboard/ReferAFriend';
import Activity from '../screen/Dashboard/Activity';
import ResetPassword from '../screen/Dashboard/ResetPassword';
import AccountInfo from '../screen/Dashboard/AccountInfo';
import Messages from '../screen/Dashboard/Messages';
import WithDrawal from '../screen/Dashboard/WithDrawal';
import Recurring3 from '../screen/Dashboard/Recurring/Recurring3';
import Recurring4 from '../screen/Dashboard/Recurring/Recurring4';
import Recurring5 from '../screen/Dashboard/Recurring/Recurring5';
import Recurring1 from '../screen/Dashboard/Recurring/Recurring1';
import PurchaseDetails from '../screen/Dashboard/PurchaseDetails';
import SellingDetails from '../screen/Dashboard/SellingDetails';
import ReviewScreen from '../screen/Dashboard/ReviewScreen';
import SaleReviewScreen from '../screen/Dashboard/SaleReviewScreen';
import BuyShareSaleDetails from '../screen/Dashboard/BuyShareSaleDetails';
import SaleShareDetails from '../screen/Dashboard/SaleShareDetails';
import SaleDetails from '../screen/Dashboard/SaleDetails';
import LinkedAccount2 from '../screen/Dashboard/LinkedAccount2';
import BuyDetails from '../screen/Dashboard/BuyDetails';
import DepositScreen from '../screen/Dashboard/DepositScreen';
import FAQ from '../screen/Dashboard/FAQ';
import TellAboutManagedAccount from '../screen/Dashboard/TellAboutManagedAccount';
import AddManagedAccount from '../screen/Dashboard/AddManagedAccount';
import AddManagedClientAgreement from '../screen/Dashboard/AddManagedClientAgreement';
import AddManagedFundYourAccount from '../screen/Dashboard/AddManagedFundYourAccount';
import CreateBasket from '../screen/Dashboard/CreateBasket';

import TopStockList from '../screen/Dashboard/TopStockList';
import BasketCreatedView from '../screen/Dashboard/BasketCreatedView';
import ThemeticsAgreement from '../screen/Dashboard/ThemeticsAgreement';

import BasketTermsAndConditions from '../screen/Dashboard/BasketTermsAndConditions';
import ThematicBasketClientAgreement from '../screen/Dashboard/ThematicBasketClientAgreement';
import BasketShow from '../screen/Dashboard/BasketShow';
import MyGames from '../screen/Dashboard/MyGames';
import MyGame2 from '../screen/Dashboard/MyGame2';
import MyWeeklyLineup from '../screen/Dashboard/MyWeeklyLineup';
import MyGameHowItWorks from '../screen/Dashboard/MyGameHowItWorks';
import MyGameSFL from '../screen/Dashboard/MyGameSFL';
import MyStock from '../screen/Dashboard/MyStock';
import MyGameStatus from '../screen/Dashboard/MyGameStatus';
import MyGameResult from '../screen/Dashboard/MyGameResult';
import Leaderboard from '../screen/Dashboard/Leaderboard';
import CreateBasketSelf from '../screen/Dashboard/CreateBasketSelf';

import EarnRewards from '../screen/Dashboard/EarnRewards';
import ChooseGameMode from '../screen/Dashboard/ChooseGameMode';

//import SignUp from '../screen/afterBording/SignUp'
import LoginByPin from '../screen/Dashboard/LoginByPin';
import TwoStepLogin from '../screen/Dashboard/TwoStepLogin';

import TwoStepConfirmPinCode from '../screen/Dashboard/TwoStepConfirmPinCode';

import BottomTabNavigation from './BottomTabNavigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function MyTabs() {
  return (
    <View style={{height: '95%', backgroundColor: 'red'}}>
      <Tab.Navigator
        initialRouteName="TermsAndConditions"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
        sceneContainerStyle={{}}>
        <Tab.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const AfterBoardingStack = () => (
  <>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        // animationEnabled: false,
      }}
      headerMode={'none'}
      mode={'card'}
      initialRouteName="AfterLoginCarousel"
      // initialRouteName="CustomizedPortfolio"
      // initialRouteName="WalkThrough"
    >
      <Stack.Screen
        name="ConfirmationAccount"
        component={ConfirmationAccount}
      />
      <Stack.Screen name="Home" component={BottomTabNavigation} />
      {/* Dashboard Screens */}
      <Stack.Screen name="CreateBasketSelf" component={CreateBasketSelf} />
      <Stack.Screen name="EarnRewards" component={EarnRewards} />
      <Stack.Screen name="ChooseGameMode" component={ChooseGameMode} />

      <Stack.Screen name="Leaderboard" component={Leaderboard} />
      <Stack.Screen name="MyGameResult" component={MyGameResult} />
      <Stack.Screen name="MyGameStatus" component={MyGameStatus} />
      <Stack.Screen name="MyStock" component={MyStock} />
      <Stack.Screen name="MyGameSFL" component={MyGameSFL} />
      <Stack.Screen name="MyGameHowItWorks" component={MyGameHowItWorks} />
      <Stack.Screen name="MyWeeklyLineup" component={MyWeeklyLineup} />
      <Stack.Screen name="MyGame2" component={MyGame2} />
      <Stack.Screen name="MyGames" component={MyGames} />
      <Stack.Screen name="BasketShow" component={BasketShow} />
      <Stack.Screen
        name="ThematicBasketClientAgreement"
        component={ThematicBasketClientAgreement}
      />

      <Stack.Screen name="ThemeticsAgreement" component={ThemeticsAgreement} />
      <Stack.Screen name="TwoStepLogin" component={TwoStepLogin} />
      <Stack.Screen name="LoginByPin" component={LoginByPin} />
      <Stack.Screen
        name="TwoStepConfirmPinCode"
        component={TwoStepConfirmPinCode}
      />

      <Stack.Screen
        name="BasketTermsAndConditions"
        component={BasketTermsAndConditions}
      />
      <Stack.Screen name="CreateBasket" component={CreateBasket} />
      <Stack.Screen name="TopStockList" component={TopStockList} />
      <Stack.Screen name="BasketCreatedView" component={BasketCreatedView} />

      <Stack.Screen
        name="AddManagedFundYourAccount"
        component={AddManagedFundYourAccount}
      />
      <Stack.Screen
        name="AddManagedClientAgreement"
        component={AddManagedClientAgreement}
      />
      <Stack.Screen
        name="TellAboutManagedAccount"
        component={TellAboutManagedAccount}
      />
      <Stack.Screen name="AddManagedAccount" component={AddManagedAccount} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="DepositScreen" component={DepositScreen} />
      <Stack.Screen name="BuyDetails" component={BuyDetails} />
      <Stack.Screen name="LinkedAccount2" component={LinkedAccount2} />
      <Stack.Screen name="SaleDetails" component={SaleDetails} />
      <Stack.Screen name="SaleShareDetails" component={SaleShareDetails} />
      <Stack.Screen
        name="BuyShareSaleDetails"
        component={BuyShareSaleDetails}
      />
      <Stack.Screen name="SaleReviewScreen" component={SaleReviewScreen} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="SellingDetails" component={SellingDetails} />
      <Stack.Screen name="PurchaseDetails" component={PurchaseDetails} />
      <Stack.Screen name="Recurring1" component={Recurring1} />
      <Stack.Screen name="WithDrawal" component={WithDrawal} />
      <Stack.Screen name="Recurring5" component={Recurring5} />
      <Stack.Screen name="Recurring4" component={Recurring4} />
      <Stack.Screen name="Recurring3" component={Recurring3} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="AccountInfo" component={AccountInfo} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="ReferAFriend" component={ReferAFriend} />
      <Stack.Screen name="WatchListRoundIcon" component={WatchListRoundIcon} />
      <Stack.Screen name="TrackerScreen" component={TrackerScreen} />
      <Stack.Screen name="StockTrade" component={StockTrade} />
      <Stack.Screen name="StockDetails" component={StockDetails} />
      <Stack.Screen name="ThematicBasket" component={ThematicBasket} />
      <Stack.Screen
        name="ChangePortfolioWithoutHoldings"
        component={ChangePortfolioWithoutHoldings}
      />
      <Stack.Screen name="ChangePortfolio" component={ChangePortfolio} />
      <Stack.Screen name="MyPortfolio" component={MyPortfolio} />
      <Stack.Screen name="MyPlans" component={MyPlans} />
      <Stack.Screen name="NameOfThePortfolio" component={NameOfThePortfolio} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="AboutMudani" component={AboutMudani} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="WatchList" component={WatchList} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Statement" component={Statement} />
      <Stack.Screen
        name="DocumentAndStatement"
        component={DocumentAndStatement}
      />
      <Stack.Screen name="LinkedAccount" component={LinkedAccount} />
      <Stack.Screen name="MyProfiles" component={MyProfiles} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="UpgradePlan" component={UpgradePlan} />
      <Stack.Screen name="RecurringDeposit" component={RecurringDeposit} />
      {/* AfterOnBoard */}
      <Stack.Screen name="SpinScreen3" component={SpinScreen3} />
      <Stack.Screen name="DualCreateBasket" component={DualCreateBasket} />
      <Stack.Screen name="InvestingPortfolio" component={InvestingPortfolio} />
      <Stack.Screen
        name="SelectAccountTypeDual"
        component={SelectAccountTypeDual}
      />
      <Stack.Screen name="Spin3" component={Spin3} />
      <Stack.Screen
        name="CustomizedPortfolio"
        component={CustomizedPortfolio}
      />
      <Stack.Screen
        name="CustomizedPortfolioHome"
        component={CustomizedPortfolioHome}
      />
      <Stack.Screen name="ManagedAccount" component={ManagedAccount} />
      {/* <Stack.Screen name="SpinScreen2" component={SpinScreen2} /> */}
      <Stack.Screen
        name="SelectAccountTypeForSelfRedirected"
        component={SelectAccountTypeForSelfRedirected}
      />
      <Stack.Screen name="LoginResetPassword" component={LoginResetPassword} />
      <Stack.Screen name="LoginOTP" component={LoginOTP} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="AfterLoginSlider" component={AfterLoginSlider} />
      <Stack.Screen name="Plaid2" component={Plaid2} />
      <Stack.Screen name="Plaid" component={Plaid} />
      <Stack.Screen name="HelpMeDecide2" component={HelpMeDecide2} />
      <Stack.Screen name="SpinScreen" component={SpinScreen} />
      <Stack.Screen name="SpinScreen2" component={SpinScreen2} />
      <Stack.Screen name="AfterLoginCarousel" component={AfterLoginCarousel} />
      <Stack.Screen name="YourPlan" component={YourPlan} />
      <Stack.Screen
        name="VerifyYourIdentiyStep"
        component={VerifyYourIdentiyStep}
      />
      <Stack.Screen
        name="VerifyYourIdentityStep1"
        component={VerifyYourIdentityStep1}
      />
      <Stack.Screen
        name="VerifyYourIdentityStep2"
        component={VerifyYourIdentityStep2}
      />
      <Stack.Screen name="FundYourAccount" component={FundYourAccount} />
      <Stack.Screen name="HelpMeDecide" component={HelpMeDecide} />
      <Stack.Screen name="ClientAgreement" component={ClientAgreement} />
      <Stack.Screen name="LinkYourAccount" component={LinkYourAccount} />
      <Stack.Screen name="ChooseAPlan" component={ChooseAPlan} />
      <Stack.Screen name="VerifyYourIdentity" component={VerifyYourIdentity} />
      <Stack.Screen
        name="StartYourSignUpJourney3"
        component={StartYourSignUpJourney3}
      />
      <Stack.Screen
        name="VerifyYourIdentityStep4"
        component={VerifyYourIdentityStep4}
      />
      <Stack.Screen
        name="VerifyYourIdentityStep5"
        component={VerifyYourIdentityStep5}
      />
      <Stack.Screen
        name="VerifyYourIdentityStep3"
        component={VerifyYourIdentityStep3}
      />
      <Stack.Screen
        name="StartYourSignUpJourney2"
        component={StartYourSignUpJourney2}
      />
      <Stack.Screen
        name="StartYourSignUpJourney1"
        component={StartYourSignUpJourney1}
      />
      <Stack.Screen name="SelectAccountType" component={SelectAccountType} />
      <Stack.Screen name="WalkThrough" component={WalkThrough} />
      <Stack.Screen name="otp_screen" component={otp_screen} />
      <Stack.Screen
        name="ChoosePasswordScreen"
        component={ChoosePasswordScreen}
      />
      <Stack.Screen name="SignUp3" component={SignUp3} />
      <Stack.Screen name="SignUp2" component={SignUp2} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ExitScreen" component={ExitScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PlaidLink" component={PlaidLink} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  </>
);

export default AfterBoardingStack;
