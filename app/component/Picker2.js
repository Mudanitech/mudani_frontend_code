import React from 'react';
import {Image} from 'react-native';
import {Picker, View} from 'native-base';
import {colors, fonts, localImages} from './../utils/constant';

const Dropdown = (props) => {
  return (
    <View
      style={{
        borderRadius: 8,
       // borderWidth: 0.3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        borderColor: colors.grayColor,
        overflow: 'hidden',
        width: props.dropdownWidth,
        height: 56,
        marginTop: props.pickerMarginTop,
        backgroundColor: colors.white,
      }}>
      <Picker
        note
        mode="dropdown"
        value={props.value}
        style={{
          // color: colors.black,
          fontFamily: fonts.regular,
          fontSize: 14,
          lineHeight: 20,
          width: '116%',
          height: 43,
          borderColor: '#333333',
          //backgroundColor: '#fff',
          alignSelf: 'center',
          transform: [{scaleX: 0.8}, {scaleY: 0.8}],
        }}
        iosIcon={
          <Image
            source={localImages.down}
            style={{
              width: 14.7,
              height: 14,
             // opacity: 0.6,
             right: 5,
            }}
          />
        }

           selectedValue={props.selectedValue}
            onValueChange={[props.onValueChange]
            }
            // itemTextStyle={{ color: '#788ad2' }}
            // textStyle={{ color: "#5cb85c" }}

      >
        <Picker.Item  label={props.value} />
        {/* <Picker.Item label="Bank of India" value="Bank of India" />
        <Picker.Item label="SBI" value="SBI" />
        <Picker.Item label="Kotak Mahindra Bank" value="Kotak Mahindra Bank" />
        <Picker.Item label="ICICI" value="ICICI" />
        <Picker.Item label="Federal Bank" value="Federal Bank" /> */}
      </Picker>
    </View>
  );
};

export default Dropdown;