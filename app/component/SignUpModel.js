import React from 'react';
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
import { ScrollView } from "react-native";
import {colors, localImages, fonts} from '../utils/constant';
import ModalStyle from './style/ModalStyle';
import {ButtonWithoutShadow} from './../component/Button';
const {height, width} = Dimensions.get('window');

export const SignUpModal = (props) => {
  const reload=()=>window.location.reload();

  return (
    <>
      <Modal onExiting={reload}
        isVisible={props.isModalVisible}
        style={ModalStyle.bottomModal}
        onBackdropPress={() => props.modalClose()}>
        <View style={styles.container}>
          <ScrollView>{props.children}</ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 7,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    // marginBottom: 10,
    alignSelf: 'center',
    marginTop : 30
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

export default SignUpModal;
