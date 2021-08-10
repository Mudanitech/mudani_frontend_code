import React from 'react';
import {
  Dimensions,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
// import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import {colors, localImages, fonts, translate} from '../utils/constant';

import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');
export default props => {
  console.log(props);
  // debugger
  return (
    <View
      style={{
        marginTop: props.marginTop ? props.marginTop : 0,
        marginStart: props.marginStart ? props.marginStart : 0,
        width: props.width,
        backgroundColor: props.backgroundColor,
        alignItems: props.alignItem ? props.alignItem : 'center',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.inputBorderColor,
        borderRadius: 20,
        keyboardType: 'web-search',
        flex: props.flex ? props.flex : 0,
      }}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderColor}
        secureTextEntry={props.secureTextEntry}
        editable={props.editable}
        value={props.value}
        multiline={props.multiline ? props.multiline : false}
        maxLength={props.maxLength}
        onChangeText={text => props.onChangeText(text)}
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        style={{
          width: props.width - 30,
          paddingLeft: 10,
          // borderRadius: 8,
          color: props.inputTextColor,
          height: props.height,
          marginLeft: 0,
          fontSize: 18,
          fontFamily: fonts.regular,
        }}></TextInput>
      {props.iconName ? (
        <TouchableOpacity onPress={() => props.onIconClick()}>
          <Image
            source={localImages[props.iconName]}
            style={{height: 20, width: 20, marginRight: 15}}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const PlainTextInput = props => {
  return (
    <View style={{marginTop: props.marginTop}}>
      <View
        style={{
          width: props.width,
          backgroundColor: colors.transparent,
          marginBottom: 0,
        }}>
        {props.label == '' ? null : (
          <Text
            style={{
              color: props.labelColor,
              fontSize: 18,
              fontFamily: fonts.regularRoman,
            }}>
            {props.label}
          </Text>
        )}
      </View>
      <View
        style={{
          // ...styles.card,
          width: props.width,
          flexDirection: 'row',
          backgroundColor: props.backgroundColor,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderWidth: 1,
          borderWidth: 1,
          borderColor: colors.inputBorderColor,
          borderRadius: 30,
        }}>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderColor}
          secureTextEntry={props.secureTextEntry}
          editable={props.editable}
          value={props.value}
          multiline={props.multiline ? props.multiline : false}
          maxLength={props.maxLength}
          inputTextColor={props.inputTextColor}
          onChangeText={text => props.onChangeText(text)}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          onSubmitEditing={props.onSubmitEditing}
          blurOnSubmit={false}
          autoFocus={props.autoFocus}
          // ref = {props.ref}
          ref={input => props.inputRef && props.inputRef(input)}
          returnKeyType={props.returnKeyType}
          autoCapitalize={props.autoCapitalize}
          style={{
            width: props.width - 35,
            paddingLeft: 20,
            borderRadius: 8,
            color: colors.black,
            // color: props.placeholderColor,
            height: props.height,
            marginLeft: 0,
            fontSize: 14,
            fontFamily: fonts.regular,
          }}></TextInput>
        {props.iconName ? (
          <TouchableOpacity onPress={() => props.onIconClick()}>
            <Image
              source={localImages[props.iconName]}
              style={{height: 20, width: 20, marginRight: 15}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export const SearchTextInput = props => {
  return (
    <View style={{marginTop: props.marginTop}}>
      <View
        style={{
          width: props.width,
          backgroundColor: colors.transparent,
          marginBottom: 5,
        }}>
        <Text
          style={{
            color: props.labelColor,
            fontSize: 18,
            fontFamily: fonts.regularRoman,
          }}>
          {props.label}
        </Text>
      </View>
      <View
        style={{
          // ...styles.card,
          width: props.width,

          flexDirection: 'row',
          backgroundColor: props.backgroundColor,
          alignItems: 'center',
          borderBottomWidth: 1,
          // borderTopWidth: 1,
          borderLeftWidth: 1,
          borderWidth: 1,
          // borderWidth: 1,
          borderColor: colors.inputBorderColor,
          borderRadius: 50,
          flexDirection: 'row',
        }}>
        {props.iconName ? (
          <TouchableOpacity onPress={() => props.onIconClick()}>
            <Image
              source={localImages[props.iconName]}
              style={{height: 15, width: 15, marginLeft: 10}}
            />
          </TouchableOpacity>
        ) : null}
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderColor}
          secureTextEntry={props.secureTextEntry}
          editable={props.editable}
          value={props.value}
          multiline={props.multiline ? props.multiline : false}
          maxLength={props.maxLength}
          inputTextColor={props.inputTextColor}
          onChangeText={text => props.onChangeText(text)}
          onSubmitEditing={props.onSubmitEditing}
          // onChangeText={(text) => props.onChangeText(text)}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          style={{
            width: props.width - 30,
            paddingLeft: 10,
            borderRadius: 8,
            color: props.inputTextColor,
            height: props.height,
            marginLeft: 0,
            fontSize: 14,
            fontFamily: fonts.semiBold,
          }}></TextInput>
      </View>
    </View>
  );
};
// export const OtpBox = (props) => {
//     return (
//         <SmoothPinCodeInput
//             containerStyle={{ alignSelf: 'center' }}
//             cellSpacing={30}
//             cellSize={60}
//             password={false}
//             cellStyle={{
//                 borderWidth: 1,
//                 borderRadius: 8,
//                 backgroundColor: colors.inputBox,
//                 borderColor: colors.backText,
//                 shadowColor: '#000',
//                 shadowOffset: {
//                     width: 2,
//                     height: 4,
//                 },
//                 shadowOpacity: 0.30,
//                 shadowRadius: 4.65,
//                 elevation: 8,
//                 marginTop: 40
//             }}
//             cellStyleFocused={{
//                 borderBottomWidth: 1.5,
//                 borderColor: colors.ornageButton,
//             }}
//             textStyle={{
//                 color: colors.backText,
//                 fontSize: 20
//             }}
//             autoFocus
//             placeholder={''}
//             value={props.value}
//             onTextChange={(text) => props.onChangeText(text)}
//         />
//     )
// }

export const ErrorMsg = props => {
  return (
    <Animatable.View animation="fadeInLeft" duration={500}>
      <Text style={styles.textLine}>{props.message}</Text>
    </Animatable.View>
  );
};

export const InputViewBox = props => {
  console.log(props);
  debugger;
  return (
    <View
      style={{
        ...styles.card,
        ...props.customStyle,
        // width: props.width,
        // marginTop: props.marginTop,
        // flexDirection: 'row',
        // backgroundColor: props.backgroundColor,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => props.onViewClick()}
        style={{
          width: props.width - 30,
          justifyContent: 'center',
          // borderRadius: 8,
          color: props.inpOuTouchableOpacityColor,
          height: props.height,
          color: props.placeholderColor,
        }}>
        <Text
          style={{
            color: props.placeholderColor,
          }}>
          {props.value ? props.value : props.placeholder}{' '}
        </Text>
      </TouchableOpacity>
      {props.iconName ? (
        <TouchableOpacity onPress={() => props.onIconClick()}>
          <Image
            source={localImages[props.iconName]}
            style={{height: 20, width: 20, marginRight: 5}}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

var styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: 'center',
    // borderRadius: 8
  },
  button: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLine: {
    color: colors.red,
    fontSize: 17,
    fontFamily: Platform.OS == 'ios' ? fonts.regular : fonts.regular,
    fontStyle: Platform.OS == 'ios' ? 'normal' : null,
    fontWeight: Platform.OS == 'ios' ? 'normal' : null,
  },
});
