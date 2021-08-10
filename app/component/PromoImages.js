import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper';

import { colors, localImages } from '../utils/constant'
const { width } = Dimensions.get('window');
const PromoImages = (props) => {
  return (
    <Swiper
      index={0}
      onIndexChanged={(index) => {
      }}
      activeDotColor={colors.greenColor}
      showsPagination={true}
      loop={false}
      paginationStyle={{
        paddingTop: 40
      }}
    >
      {
        props.data.length > 0 &&
        props.data.map((item, key) => {
          return (
            <Image
              resizeMode={'contain'}
              source={localImages[item.image]}
              style={styles.imageCard}
              key={key} />
          );
        })}
    </Swiper>
  )
}

export const ProductImages = (props) => {
  return (
    <Swiper
      index={0}
      onIndexChanged={(index) => {
      }}
      showsPagination={true}
      loop={false}
    >
      {
        props.data.length > 0 &&
        props.data.map((item, key) => {
          return (
            <Image
              resizeMode={'contain'}
              source={localImages[item.image]}
              style={styles.imageCard}
              key={key} />
          );
        })}
    </Swiper>
  )
}
export const BannerImage = (props) => {
  return (
    <Swiper
      index={0}
      onIndexChanged={(index) => {
      }}
      showsPagination={false}
      loop={false}
    >
      {
        props.data.length > 0 &&
        props.data.map((item, key) => {
          return (
            <TouchableOpacity style={{ width: width, alignItems: 'center' }} onPress={() => props.onAction()}>
              <Image
                resizeMode={'contain'}
                source={localImages[item.image]}
                style={{ ...styles.bannerImage, width: props.width, height: props.height }}
                key={key} />
            </TouchableOpacity>

          );
        })}
    </Swiper>
  )
}
export default PromoImages
const styles = StyleSheet.create({
  button: {
    shadowColor: colors.loginshadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 6,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWithoutshadow: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageCard: {
    width: width,
    height: width * .54
  },
  bannerImage: {

    width: width,
  }
});