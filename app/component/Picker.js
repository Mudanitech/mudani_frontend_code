import React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
// import {Picker, View} from 'native-base';
import {colors, fonts, localImages} from './../utils/constant';
import {wp} from '../utils/responsive';
import RNPicker from 'rn-modal-picker';

const Dropdown = props => {
  //const text = props.value.length ? props.value.charAt(0).toUpperCase() + props.value.slice(1) : props.value
  return (
    <View style={Styles.container}>
      <RNPicker
        dataSource={props.data.map(item => {
          return {id: item.item, name: item.value};
        })}
        dummyDataSource={props.data.map(item => {
          return {id: item.item, name: item.value};
        })}
        defaultValue={false}
        pickerTitle={props.value}
        showSearchBar={false}
        disablePicker={false}
        changeAnimation={'none'}
        searchBarPlaceHolder={'Search.....'}
        showPickerTitle={true}
        // searchBarContainerStyle={this.props.searchBarContainerStyle}
        pickerStyle={[
          Styles.pickerStyle,
          {width: props.dropdownWidth, marginTop: props.pickerMarginTop},
        ]}
        // itemSeparatorStyle={Styles.itemSeparatorStyle}
        pickerItemTextStyle={Styles.listTextViewStyle}
        selectedLabel={props.selectedValue}
        placeHolderLabel={props.value}
        selectLabelTextStyle={Styles.selectLabelTextStyle}
        placeHolderTextStyle={Styles.placeHolderTextStyle}
        dropDownImageStyle={Styles.dropDownImageStyle}
        // dropDownImage={require("./res/ic_drop_down.png")}
        selectedValue={props.onValueChange}
      />
    </View>
    // <View
    //   style={{
    //     borderRadius: 40,
    //     borderWidth: 0.3,
    //     borderColor: colors.grayColor,
    //     overflow: 'hidden',
    //     width: props.dropdownWidth,
    //     height: 43,
    //     marginTop: props.pickerMarginTop,
    //     backgroundColor: colors.white,
    //   }}>
    //   <Picker
    //     note
    //     mode="dialog"
    //     // value={props.value}
    //     placeholder = {props.value}
    //     style={{
    //       width: Platform.OS == 'android' ? '116%' : '120%',
    //       height: 43,
    //       borderColor: '#333333',
    //       alignSelf: 'center',
    //       transform: [{scaleX: 0.8}, {scaleY: 0.8}],
    //       // backgroundColor : colors.white
    //     }}
    //     // itemStyle = {{backgroundColor : ""}}
    //     iosIcon={
    //       <Image
    //         source={localImages.down}
    //         style={{
    //           width: 10,
    //           height: 10,
    //           right: 10,
    //         }}
    //       />
    //     }
    //      selectedValue={props.selectedValue}
    //     onValueChange={props.onValueChange}
    //     itemTextStyle={{ color: colors.grayColor,fontSize : 14}}
    //     textStyle={{ color: colors.grayColor,
    //   }}

    //   >
    //      <Picker.Item label={text} />

    //     {
    //       props.data.map((item,index)=>{
    //        return <Picker.Item label={item.item} value = {item.value}/>
    //       })
    //     }

    //   </Picker>
    // </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemSeparatorStyle: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    // backgroundColor: "#D3D3D3"
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },

  selectLabelTextStyle: {
    color: colors.black,
    textAlign: 'left',
    width: '99%',
    padding: 10,
    flexDirection: 'row',
    fontSize: 14,
    // fontWeight : "900",
    paddingLeft: 20,
    fontFamily: fonts.regular,
  },
  placeHolderTextStyle: {
    color: colors.grayColor,
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
    fontSize: 14,
    paddingLeft: 20,
    fontFamily: fonts.regular,
  },
  dropDownImageStyle: {
    marginLeft: 0,
    width: 10,
    height: 10,
    alignSelf: 'center',
  },
  listTextViewStyle: {
    color: colors.info_color,
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
    fontSize: 15,
  },
  pickerStyle: {
    // marginLeft: 18,
    paddingRight: 25,
    marginRight: 10,
    // marginBottom: 2,
    backgroundColor: colors.white,
    borderRadius: 20,
    flexDirection: 'row',
    height: 43,
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 0.2,
    borderColor: colors.grayColor,
  },
});

// const Styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   itemSeparatorStyle:{
//     height: 1,
//     width: "90%",
//     alignSelf: "center",
//     backgroundColor: "#D3D3D3"
//   },
//   searchBarContainerStyle: {
//     marginBottom: 10,
//     flexDirection: "row",
//     height: 40,
//     shadowOpacity: 1.0,
//     shadowRadius: 5,
//     shadowOffset: {
//       width: 1,
//       height: 1
//     },
//     backgroundColor: "rgba(255,255,255,1)",
//     shadowColor: "#d3d3d3",
//     borderRadius: 10,
//     elevation: 3,
//     marginLeft: 10,
//     marginRight: 10
//   },

//   selectLabelTextStyle: {
//     color: colors.black,
//     textAlign: "left",
//     width: "99%",
//     padding: 10,
//     flexDirection: "row" ,
//     fontSize : 14,
//     // fontWeight : "900",
//     paddingLeft : 20,
//     fontFamily : fonts.bold
//   },
//   placeHolderTextStyle: {
//     color: colors.grayColor,
//     padding: 10,
//     textAlign: "left",
//     width: "99%",
//     flexDirection: "row",
//     fontSize : 14,
//     paddingLeft : 20,
//     fontFamily : fonts.bold
//   },
//   dropDownImageStyle: {
//     marginLeft: 0,
//     width: 10,
//     height: 10,
//     alignSelf: "center"
//   },
//   listTextViewStyle: {
//     color: colors.grayColor,
//     marginVertical: 10,
//     flex: 0.9,
//     marginLeft: 20,
//     marginHorizontal: 10,
//     textAlign: "left",
//     fontSize : 12,

//   },
//   pickerStyle: {
//     // marginLeft: 18,
//     paddingRight: 25,
//     marginRight: 10,
//     // marginBottom: 2,
//     backgroundColor: colors.white,
//     borderRadius: 20,
//     flexDirection: "row",
//     height : 43,
//     alignItems : "center",
//     borderColor : colors.white,
//     borderWidth : 0.2,
//     borderColor : colors.grayColor
//   }
// });
export default Dropdown;
