import React from 'react';
import {
  Image,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
// import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import {colors, localImages, fonts} from '../utils/constant';
import ModalStyle from './style/ModalStyle';
import {ButtonWithoutShadow} from './../component/Button';
const {height, width} = Dimensions.get('window');
import {wp} from './../utils/responsive';
import { Children } from 'react';

export const GrayColorPopup = ({
  isModalVisible,
  headerText,
  modalClose,
  descriptionText,
  submitAction,
  nameOnSubmitButton,
  nameOnIgnoreButton,
  children
}) => {
  return (
    <>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          () => modalClose();
        }}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgb(105,105,105)',
            padding: 20,
          }}>
              {children}
          </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 21,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 15,
  },
  descriptionText2: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    textAlign: 'center',
    // marginTop: 15,
    marginBottom: height / 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

Modal.confirmModal = {
  headerText: PropTypes.string,
  alreadySelected: PropTypes.string,
  onSelect: PropTypes.func,
  modalClose: PropTypes.func,
  list: PropTypes.array,
};

export default GrayColorPopup;
