import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Button, { ButtonWithoutShadow, ButtonDropDown, OnDatePicker } from './Button'
import { colors, fonts, localImages, translate } from '../utils/constant'

const { width } = Dimensions.get('window');

const CategoryView = (props) => {
    console.log(props.categoryData)
    return (
        <View style={{ width: width / props.numColumns, alignItems: 'center', marginBottom: 10 }} >
            <TouchableOpacity onPress={() => props.onSelectCate()} style={{ ...styles.serviceImage, backgroundColor: props.styleData.backgroundColor, width: (width / props.numColumns) - 20, minHeight: (width / props.numColumns) - 20 }}>
                {/* <Image
                    source={localImages[props.categoryData.image]}
                    style={{ ...styles.CategoryView, height: (width / props.numColumns) - 70, width: (width / props.numColumns) - 70 }}
                /> */}
                {
                    props.categoryData.image ?
                        <Image
                            source={localImages[props.categoryData.image]}
                            style={{ ...styles.CategoryView, height: (width / props.numColumns) - 70, width: (width / props.numColumns) - 70 }}
                        />

                        :

                        <Image
                            source={localImages['logoscreen']}
                            style={{ ...styles.CategoryView, height: (width / props.numColumns) - 70, width: (width / props.numColumns) - 70 }}
                        />
                }
                <Text style={{ ...styles.nameText, color: props.styleData.color }}>{props.categoryData.name}</Text>
            </TouchableOpacity>



        </View>
    )
}



export default CategoryView



const styles = StyleSheet.create({
    CategoryView: {
        height: 80,
        width: 80,



    },
    serviceCate: {
        width: width - 40,
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 1.65,
        // elevation: 1,
    },
    serviceProImagView: {
        height: (width / 3) - 10,
        width: (width / 3) - 10,
        marginTop: -8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8




    },
    serviceProImage: {
        // height: 40,

        borderRadius: 8,
        // backgroundColor: colors.ornageButton,
        width: (width / 3) - 10,
        // height: (width / 3) - 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 3,

    },
    serviceImage: {
        // height: 40,

        borderRadius: 8,
        // backgroundColor: colors.ornageButton,
        // width: (width / 3) - 20,
        // height: (width / 3) - 20,
        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 3,
    },
    nameText: {
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 14,
        // color: colors.white,
        fontFamily: fonts.semiBold

    },
    rightIcon: {
        height: 30,
        width: 30,
        position: 'absolute',
        right: 10
    },
    catText: {

        // color: colors.white,
        marginLeft: 20,
        fontSize: 18,
        fontFamily: fonts.regularRoman
    }
})

