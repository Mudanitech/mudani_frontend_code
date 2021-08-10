import React from 'react';
import {View, Image, Text, TouchableOpacity, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
import {colors, fonts, localImages, translate} from '../utils/constant';
import { wp } from '../utils/responsive';
import ButtonStyles from './style/ButtonStyles';

export default (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onAction()}
      style={{
        ...ButtonStyles.button,
        height: props.height,
        backgroundColor: props.backgroundColor,
        width: props.width,
        borderRadius: props.borderRadius,
        marginTop: props.marginTop,
      }}>
      <Text
        style={{
          color: props.labelColor,
          fontSize: props.fontSize ? props.fontSize : 19,
          fontFamily: props.fontFamily ? props.fontFamily : fonts.regularRoman,
        }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export const ButtonWithoutShadow = (props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled ? props.disabled : false}
      onPress={() => props.onAction()}
      style={[
        ButtonStyles.buttonWithoutshadow,
        {
          height: props.height,
          backgroundColor: props.backgroundColor,
          width: props.width,
          borderRadius: props.borderRadius,
          marginTop: props.marginTop,
          marginBottom: props.marginBottom ? props.marginBottom : 0,
          marginLeft: props.marginLeft ? props.marginLeft : 0,
          borderColor : props.borderColor?props.borderColor:null,
          borderWidth : props.borderWidth?props.borderWidth:null
        },
      ]}>
      <Text
        style={[
          {
            color: props.labelColor,
            fontFamily: props.fontFamily,
            fontSize: props.fontSize,
            borderBottomWidth: props.borderBottomWidth
              ? props.borderBottomWidth
              : 0,
            borderBottomColor: props.borderBottomColor
              ? props.borderBottomColor
              : '#fff',
          },
        ]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export const OnBordingHeader = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        width: width,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => props.onActionLeft()}
        style={{
          width: 80,
          height: 50,
          backgroundColor: colors.ornageButton,
          borderBottomRightRadius: 25,
          borderTopRightRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={localImages.back}
          style={{height: 30, width: 30}}></Image>
      </TouchableOpacity>
      <View></View>
      <View></View>
    </View>
  );
};

export const DrawerHeader = (props) => {
  return (
    <View style={[ButtonStyles.drawerHeader, {width: width}]}>
      <TouchableOpacity
        onPress={() => props.onActionLeft()}
        style={{
          width: 80,
          borderBottomRightRadius: 25,
          borderTopRightRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={localImages.menu}
          style={{height: 30, width: 30}}></Image>
      </TouchableOpacity>
      {props.label ? (
        <TouchableOpacity
          onPress={() => props.onActionMiddle()}
          style={{flexDirection: 'row'}}>
          <Image
            source={localImages.seller}
            style={{height: 25, width: 25, borderRadius: 15}}></Image>
          <Text
            style={[
              {
                marginLeft: props.marginLeft,
                marginRight: props.marginRight,
                color: props.labelColor,
                fontFamily: props.fontFamily,
                fontSize: props.fontSize,
                borderBottomWidth: props.borderBottomWidth
                  ? props.borderBottomWidth
                  : 0,
                borderBottomColor: props.borderBottomColor
                  ? props.borderBottomColor
                  : '#fff',
                fontStyle: props.fontStyle ? props.fontStyle : null,
                fontWeight: props.fontWeight ? props.fontWeight : null,
              },
            ]}>
            {props.label}
          </Text>
        </TouchableOpacity>
      ) : null}

      <View style={{flexDirection: 'row', position: 'absolute', right: 20}}>
        <TouchableOpacity
          onPress={() => props.onActionRight('search')}
          style={{
            borderBottomRightRadius: 25,
            borderTopRightRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={localImages.serach}
            style={{height: 30, width: 30}}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onActionRight('cart')}
          style={{
            borderBottomRightRadius: 25,
            borderTopRightRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={localImages.cart}
            style={{height: 30, width: 30}}></Image>
          <View
            style={{borderRadius: 15, position: 'absolute', top: 0, bottom: 0}}>
            <Text
              style={[
                {
                  color: props.labelRightColor,
                  fontFamily: props.fontRightFamily,
                  fontSize: props.fontRightSize,
                  margin: 1,
                },
              ]}>
              {props.count}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const HeaderWithBack = (props) => {
  return (
    <View
      style={[
        props.backgroundColor == 1
          ? ButtonStyles.drawerHeaderWithoutCard
          : ButtonStyles.drawerHeader,
        {width: width},
      ]}>
      <TouchableOpacity
        onPress={() => props.onActionLeft()}
        style={{
          marginLeft: 20,
          height: 40,
          width: 40,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={props.imageArrow?localImages[props.imageArrow]:localImages.left_arrow}
          style={{height: 20, width: 20,left : -12}}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => null}
        style={{
          flexDirection: 'row',
          width: width - 120,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Text style={props.labelStyle}>{props.Header}</Text> */}

        {props.Header !== '' ? (
          <Text style={props.labelStyle}>{props.Header}</Text>
        ) : (
          <Image
            source={localImages.mudani_logo}
            style={{height: 35, width: 50 * 2.33,resizeMode : "contain"}}></Image>
        )}
        {/* <Text style={props.labelStyle}>{props.label}</Text> */}
      </TouchableOpacity>
      {props.rightIcon ? (
        <View style={{flexDirection: 'row', position: 'absolute', right: 20}}>
          <TouchableOpacity
            onPress={() => props.onActionRight()}
            style={{
              borderBottomRightRadius: 25,
              borderTopRightRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.white,
              height: 40,
              width: 40,
              borderRadius: 20,
            }}>
            <Image
              source={localImages[props.rightIcon]}
              style={{height: 20, width: 20}}></Image>
            <View
              style={{
                borderRadius: 15,
                position: 'absolute',
                top: 0,
                bottom: 0,
              }}>
              <Text
                style={{
                  ...props.showCardStyle,
                  margin: 1,
                }}>
                {props.count}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export const HeaderWithBackWhite = (props) => {
  return (
    <View
      style={[
        props.backgroundColor == 1
          ? ButtonStyles.drawerHeaderWithoutCard
          : ButtonStyles.drawerHeader,
        {width: width, backgroundColor: colors.white},
      ]}>
      <TouchableOpacity
        onPress={() => props.onActionLeft()}
        style={{
          marginLeft: 20,
          height: 40,
          width: 40,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={localImages.left_arrow}
          style={{height: 20, width: 20,left : -12}}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => null}
        style={{
          flexDirection: 'row',
          width: width - 120,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Text style={props.labelStyle}>{props.Header}</Text> */}

        {props.Header !== '' ? (
          <Text style={props.labelStyle}>{props.Header}</Text>
        ) : (
          <Image
            source={localImages.mudani_logo}
            style={{height: 35, width: 50 * 2.33}}></Image>
        )}
        {/* <Text style={props.labelStyle}>{props.label}</Text> */}
      </TouchableOpacity>
      {props.rightIcon ? (
        <View style={{flexDirection: 'row', position: 'absolute', right: 20}}>
          <TouchableOpacity
            onPress={() => props.onActionRight()}
            style={{
              borderBottomRightRadius: 25,
              borderTopRightRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.white,
              height: 40,
              width: 40,
              borderRadius: 20,
            }}>
            <Image
              source={localImages[props.rightIcon]}
              style={{height: 20, width: 20}}></Image>
            <View
              style={{
                borderRadius: 15,
                position: 'absolute',
                top: 0,
                bottom: 0,
              }}>
              <Text
                style={{
                  ...props.showCardStyle,
                  margin: 1,
                }}>
                {props.count}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export const HeaderWithDrawer = (props) => {
  return (
    <View style={[ButtonStyles.drawerHeaderWithoutCard, {width: width}]}>
      <TouchableOpacity
        onPress={() => props.onActionLeft()}
        style={{
          width: 80,
          borderBottomRightRadius: 25,
          borderTopRightRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={localImages.sidebar}
          style={{height: 40, width: 40}}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.onActionMiddle()}
        style={{
          flexDirection: 'row',
          width: width - 180,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={props.labelStyle}>{props.label}</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', position: 'absolute', right: 20}}>
        <TouchableOpacity
          onPress={() => props.onActionRight('cart')}
          style={{
            marginRight: 10,
            borderBottomRightRadius: 25,
            borderTopRightRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={localImages.notification}
            style={{height: 40, width: 40}}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onActionRight('cart')}
          style={{
            borderBottomRightRadius: 25,
            borderTopRightRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={localImages.cart}
            style={{height: 40, width: 40}}></Image>
          <View
            style={{
              borderRadius: 15,
              position: 'absolute',
              top: 0,
              bottom: 0,
            }}>
            <Text
              style={{
                ...props.showCardStyle,
                margin: 1,
              }}>
              {props.count}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const HeaderHomePage = (props) => {
  return (
    <View
      style={[
        props.backgroundColor == 1
          ? ButtonStyles.drawerHeaderWithoutCard
          : ButtonStyles.drawerHeader,
        {width: width},
      ]}>
      <TouchableOpacity
        onPress={() => props.onActionLeft()}
        style={{
          width: 80,
          borderBottomRightRadius: 25,
          borderTopRightRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={localImages.sidebar}
          style={{height: 40, width: 40}}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.onActionMiddle()}
        style={{
          flexDirection: 'row',
          width: width - 180,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={localImages.logo}
          style={{height: 50, width: 50 * 2.33}}></Image>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', position: 'absolute', right: 20}}>
        <TouchableOpacity
          onPress={() => props.onActionRight('noti')}
          style={{
            marginRight: 10,
            borderBottomRightRadius: 25,
            borderTopRightRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={localImages.notification}
            style={{height: 40, width: 40}}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onActionRight('cart')}
          style={{
            borderBottomRightRadius: 25,
            borderTopRightRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={localImages.cart}
            style={{height: 40, width: 40}}></Image>
          <View
            style={{
              borderRadius: 15,
              position: 'absolute',
              top: 0,
              bottom: 0,
            }}>
            <Text
              style={{
                ...props.showCardStyle,
                margin: 1,
              }}>
              {props.count}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SideButton = (props) => {
  let {onAction, title, image} = props;
  return (
    <>
      <TouchableOpacity
        style={ButtonStyles.touchableContainer}
        onPress={() => onAction()}>
        <View style={{height: 25, width: 25}}>
          <Image source={image} style={{height: '100%', width: '100%'}}></Image>
        </View>
        <Text style={ButtonStyles.navText}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export const AddButton = (props) => {
  return (
    <View>
      {props.data == 0 ? (
        <TouchableOpacity
          disabled={props.outofStock ? props.outofStock : false}
          onPress={() => props.addProduct()}
          style={{
            ...ButtonStyles.buttonWithoutshadow,
            height: props.height,
            backgroundColor: props.outofStock
              ? colors.outOfStock
              : props.backgroundColor,
            width: props.width,
            borderRadius: props.borderRadius,
            marginTop: props.marginTop,
            marginBottom: props.marginBottom ? props.marginBottom : 0,
            marginLeft: props.marginLeft ? props.marginLeft : 0,
          }}>
          <Image
            source={localImages.plus}
            style={{height: 20, width: 20}}></Image>
        </TouchableOpacity>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{marginHorizontal: 10, width: 30}}
              onPress={() => props.quantityDesc()}>
              <Image
                source={localImages.minus}
                style={{height: 30, width: 30}}></Image>
            </TouchableOpacity>
            <Text
              style={{
                ...ButtonStyles.navText,
                marginLeft: 0,
                color: colors.greenColor,
                fontFamily: fonts.bold,
              }}>
              {props.data}
            </Text>
            <TouchableOpacity
              style={{marginHorizontal: 10, width: 30}}
              onPress={() => props.quantityInc()}>
              <Image
                source={localImages.add}
                style={{height: 30, width: 30}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export const AddButtonMyCart = (props) => {
  return (
    <View>
      {props.data == 0 ? (
        <TouchableOpacity
          onPress={() => props.addProduct()}
          style={{
            width: props.width,
            height: props.height,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}>
          <Image
            source={localImages.add}
            style={{height: 20, width: 20}}></Image>
        </TouchableOpacity>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                borderWidth: 1,
                borderColor: colors.placeholderColor,
              }}
              onPress={() => props.quantityDesc()}>
              <Image
                source={localImages.minusblue}
                style={{height: 15, width: 15}}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                borderWidth: 1,
                borderColor: colors.placeholderColor,
              }}
              onPress={() => {}}>
              <Text
                style={{
                  ...ButtonStyles.navText,
                  textAlign: 'center',
                  width: 30,
                  height: 30,
                  marginLeft: 0,
                  color: colors.text,
                  fontFamily: fonts.bold,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: colors.placeholderColor,
                }}>
                {props.data}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                borderWidth: 1,
                borderColor: colors.placeholderColor,
              }}
              onPress={() => props.quantityInc()}>
              <Image
                source={localImages.plusblue}
                style={{height: 15, width: 15}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export const ButtonDropDown = (props) => {
  return (
    <View
      style={{
        ...props.containerStyle,
        ...ButtonStyles.dropDownContainer,
      }}>
      <TouchableOpacity
        onPress={() => props.onAction()}
        style={{
          ...ButtonStyles.ButtonDropDown,
          ...props.buttonStyle,
        }}>
        <Text style={props.placeholderStyle}>{props.palceholder}</Text>
        <Image
          style={{
            position: 'absolute',
            right: 20,
            width: 25,
            height: 25,
          }}
          source={localImages.down_orn}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkuButton = (props) => {
  return (
    <View>
      {props.data.measurementArray.length == 1 ? (
        <TouchableOpacity
          disabled={props.disabled ? props.disabled : false}
          style={{marginLeft: 10}}>
          <Text
            style={{
              color: colors.grayColor,
              fontFamily: props.fontFamily,
              fontSize: props.fontSize,
              borderBottomWidth: props.borderBottomWidth
                ? props.borderBottomWidth
                : 0,
              borderBottomColor: props.borderBottomColor
                ? props.borderBottomColor
                : '#fff',
              fontStyle: props.fontStyle ? props.fontStyle : null,
              fontWeight: props.fontWeight ? props.fontWeight : null,
            }}>
            {props.data.measurementArray[0].unit}
            {props.data.measurementArray[0].measurement}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => props.onAction()}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
            borderColor: colors.ornageButton,
            borderWidth: 1,
            borderRadius: 4,
            height: 30,
            width: 100,
          }}>
          <Text
            style={{
              color: colors.ornageButton,
              fontFamily: props.fontFamily,
              fontSize: props.fontSize,
              fontStyle: props.fontStyle ? props.fontStyle : null,
              fontWeight: props.fontWeight ? props.fontWeight : null,
            }}>
            {props.data.measurementArray[props.showIndex].unit}
            {props.data.measurementArray[props.showIndex].measurement}
          </Text>
          <Image
            source={localImages.down_orn}
            style={{height: 15, width: 15, marginLeft: 10}}></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const CrossButtonHeader = (props) => {
  return (
    <View style={[ButtonStyles.drawerHeaderWithoutCard, {width: width}]}>
      <TouchableOpacity
        onPress={() => props.onActionLeft()}
        style={{
          marginLeft: 20,
          height: 40,
          width: 40,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={localImages.cross_black}
          style={{height: 20, width: 20}}></Image>
      </TouchableOpacity>
    </View>
  );
};

export const HomeHeader = (props) => {
  return (
    <View style={{height: 60, alignItems: 'center', flexDirection: 'row',alignSelf : "center"}}>
      <View style = {{width : wp("100%")}}>
      
        {props.Header !== '' ? (
          <Text style={props.labelStyle}>{props.Header}</Text>
        ) : (
          <Image
            source={localImages.mudani_logo}
            style={{height: 35, width: 50 * 2.33,alignSelf : "center",resizeMode : "contain"}}></Image>
        )}
      </View>
      <View style = {{position : "absolute",left : wp("8%")}}>
        <TouchableOpacity onPress = {()=>props.firstOnPress()}>
        <Image
          source={localImages[props.rightIcon1]}
          style={{height: 20, width: 20,resizeMode : "contain"}}></Image>
        </TouchableOpacity>
      </View>
      <View style = {{position : "absolute",left : wp("83%")}}>
      <TouchableOpacity onPress = {()=>props.secondOnPress()}>
        <Image
          source={localImages[props.rightIcon2]}
          style={{height: 20, width: 20, resizeMode : "contain"}}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const GameHeader = (props) => {
  return (
    <View style={{height: 60, alignItems: 'center', flexDirection: 'row',backgroundColor : "transparent",justifyContent : "space-between",marginHorizontal : 20}}>
     <View style= {{marginLeft : -5}}>
        <TouchableOpacity style= {{width : 40}} onPress = {()=>props.onGoBack()}>
        <Image
          source={localImages.left_arrow_w}
          style={{height: 15, width: 15,resizeMode : "contain"}}></Image>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress = {()=>props.firstOnPress()}>
        <Image
          source={localImages[props.rightIcon1]}
          style={{height: 20, width: 20,resizeMode : "contain",right : 100}}></Image>
        </TouchableOpacity>
      </View>
      <View >
       
        {props.Header !== '' ? (
          <Text style={props.labelStyle}>{props.Header}</Text>
        ) : (
          <Image
            source={localImages.mudani_logo}
            style={{height: 35, width: 50 * 2.33,alignSelf : "center",resizeMode : "contain"}}></Image>
        )}
      </View>
     <View style = {{flexDirection : "row",alignItems : "center"}}>
     
      <View>
      <TouchableOpacity onPress = {()=>props.secondOnPress()}>
        <Image
          source={localImages[props.rightIcon2]}
          style={{height: 20, width: 20, resizeMode : "contain",right : 25}}></Image>
        </TouchableOpacity>
      </View>
     </View>
    </View>
  );
};


