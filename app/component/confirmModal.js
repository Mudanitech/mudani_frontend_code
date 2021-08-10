import React, { useState,useEffect } from 'react';
import {
  Image,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import {colors, localImages, fonts} from '../utils/constant';
import ModalStyle from './style/ModalStyle';
import {ButtonWithoutShadow} from './../component/Button';
const {height, width} = Dimensions.get('window');
import { wp } from "./../utils/responsive";
const ConfirmModal = ({isModalVisible, headerText, modalClose , descriptionText,submitAction , nameOnSubmitButton,nameOnIgnoreButton}) => {
  return (
    <>
      <Modal
        isVisible={isModalVisible}
        style={ModalStyle.bottomModal}
        onBackdropPress={() => modalClose()}>
        <View style={styles.container}>
          <Text style={styles.headerText}>{headerText}</Text>
          <Text style={styles.descriptionText}>
          {descriptionText}
            {/* Kindly confirm your basket. These Trades will be executed at current
            market price. */}
          </Text>
          <View style={styles.buttonContainer}>
            <ButtonWithoutShadow
              width={wp("35%")}
              height={38}
              marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label={nameOnSubmitButton}
              backgroundColor={colors.blue}
              onAction={() => submitAction()}
            />

            <ButtonWithoutShadow
              width={wp("35%")}
              height={38}
              marginTop={22}
              borderRadius={20}
              labelColor={colors.blue}
              label={nameOnIgnoreButton}
              backgroundColor={colors.light_blue}
              onAction={() => modalClose()}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export const SingleButtonModal = ({isModalVisible, headerText, modalClose , descriptionText,submitAction , nameOnSubmitButton,nameOnIgnoreButton}) => {
  return (
    <>
      <Modal
        isVisible={isModalVisible}
        style={ModalStyle.bottomModal}
        onBackdropPress={() => modalClose()}>
        <View style={styles.container}>
          <Text style={styles.headerText}>{headerText}</Text>
          <Text style={styles.descriptionText2}>
          {descriptionText}
            {/* Kindly confirm your basket. These Trades will be executed at current
            market price. */}
          </Text>
          <View style={styles.buttonContainer}>
            <ButtonWithoutShadow
              width={width - 240}
              height={38}
              marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label={nameOnSubmitButton}
              backgroundColor={colors.blue}
              onAction={() => submitAction()}
            />

            {/* <ButtonWithoutShadow
              width={width - 240}
              height={38}
              marginTop={22}
              borderRadius={20}
              labelColor={colors.blue}
              label={nameOnIgnoreButton}
              backgroundColor={colors.light_blue}
              onAction={() => modalClose()}
            /> */}
          </View>
        </View>
      </Modal>
    </>
  );
};

export const TwoButtonModal = (props) => {
  return (
    <>
      <Modal
        isVisible={props.isModalVisible}
        style={ModalStyle.bottomModal}
        onBackdropPress={() => props.modalClose()}>
        <View style={styles.container}>
          {props.children}
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
   marginBottom : height/30
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

export default ConfirmModal;
