import * as React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { color } from 'react-native-reanimated';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors, fonts, localImages} from '../../utils/constant';

const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];


const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.blue,
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: colors.greenColor,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: colors.white,
  stepIndicatorFinishedColor: colors.white,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};


const getStepIndicatorIconConfig = (position, stepStatus) => {
  console.log('Index', position);
  const iconConfig = {
    name: '',
    color: position.stepStatus === 'current' ? colors.blue : colors.light_blue,
    size: 16,
  };
  switch (position.position) {
    case 0: {
        return <Image source = {localImages.add} style = {{height : 50,width : 50}} />
    //   iconConfig.name = 'add';
      break;
    }
    case 1: {
      iconConfig.name = 'location-on';
      break;
    }
    case 2: {
      iconConfig.name = 'assessment';
      break;
    }
    case 3: {
      iconConfig.name = 'payment';
      break;
    }
    case 4: {
      iconConfig.name = 'track-changes';
      break;
    }
    default: {
      break;
    }
  }
//   return iconConfig;
};

export default function App() {
  const [currentPage, setCurrentPage] = React.useState(0);

  const onStepPress = (position) => {
    setCurrentPage(position);
  };

  const renderViewPagerPage = (data) => {
    return (
      <View key={data} style={styles.page}>
        <Text>{data}</Text>
      </View>
    );
  };

  const renderStepIndicator = (params) => {
    //    return <IonIcon {...getStepIndicatorIconConfig(params)}/>
    return getStepIndicatorIconConfig(params);
  };

  const renderLabel = (position, stepStatus, label, currentPosition) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }>
        {label}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={secondIndicatorStyles}
          currentPosition={currentPage}
          onPress={onStepPress}
          renderStepIndicator={(stepPosition, stepStatus) => {
            renderStepIndicator(stepPosition, stepStatus);
          }}
          labels={[
            'Cart',
            'Delivery Address',
            'Order Summary',
            'Payment Method',
            'Track',
          ]}
        />
      </View>
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <IonIcon name="add" size={16} color="blue" />
      </TouchableOpacity>
      <Swiper
        style={{flexGrow: 1}}
        loop={false}
        index={currentPage}
        autoplay={false}
        showsButtons
        onIndexChanged={(page) => {
          setCurrentPage(page);
        }}>
        {PAGES.map((page) => renderViewPagerPage(page))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 50,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});
