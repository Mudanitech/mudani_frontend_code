import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Button, { ButtonWithoutShadow, ButtonDropDown, OnDatePicker,ButtonWithOutLine } from './Button'
import { colors, fonts, localImages } from '../utils/constant'
import { CustomStyles } from '../screen/style/CustomStyles'
const { width } = Dimensions.get('window');

const ProviderReq = (props) => {
    return (
        <View style={[CustomStyles.card, { backgroundColor: colors.white, marginBottom: 10, width: width - 40 }]}>

            {/* <Text style={{ ...CustomStyles.textLine, color: colors.grayColor, position: 'absolute', right: 20, top: 10 }}>02/06/2020 03:08 Pm</Text> */}
            <View
                style={{ flexDirection: 'row', }}

            >
                <Image source={localImages.img} style={{ height: 80, width: 80, borderRadius: 40, marginLeft: 10, marginTop: 10, }}></Image>
                <View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ ...CustomStyles.textLine, color: colors.backText, marginLeft: 20, marginTop: 10 }}>John Smith</Text>
                        <View style={{ marginTop: 10, backgroundColor: colors.ornageButton, flexDirection: 'row', padding: 2, borderRadius: 3, marginLeft: 10 }}>
                            <Image source={localImages.star} style={{ height: 20, width: 20 }}></Image>
                            <Text style={{ ...CustomStyles.textLine, color: colors.white, }}>4.2</Text>
                        </View>
                    </View>
                    <Text style={{ ...CustomStyles.textLine, color: colors.grayColor, marginLeft: 20, }}>Professional Engineer</Text>
                    <Text style={{ ...CustomStyles.textLine, color: colors.grayColor, marginLeft: 20, }}>Having certificate A</Text>
                </View>
            </View>


            <View style={{ marginHorizontal: 10, marginTop: 10, }}>
                <Text style={{ ...CustomStyles.textLine, color: colors.grayColor }}>Mesage</Text>
                <Text style={{ ...CustomStyles.textLine, color: colors.backText, fontSize: 18 }}>Set the mode prop to time. You can also display both the datepicker and the timepicker in one step by setting the mode prop to datetime</Text>
            </View>
           {props.categoryData.type==2? <View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10, height: 50, alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View>
                        <Text style={{ ...CustomStyles.textLine, color: colors.grayColor }}>Date Of Visit</Text>
                        <Text style={{ ...CustomStyles.textLine, color: colors.backText, fontSize: 18 }}>07/06/2020</Text>
                    </View>
                    <View>
                        <Text style={{ ...CustomStyles.textLine, color: colors.grayColor }}>Time Of Visit</Text>
                        <Text style={{ ...CustomStyles.textLine, color: colors.backText, fontSize: 18 }}>3:00 PM</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, height: 50, justifyContent: 'center' }}>
                    <Text style={{ ...CustomStyles.textLine, color: colors.grayColor }}>Price </Text>
                    <Text style={{ ...CustomStyles.textLine, color: colors.backText, fontSize: 18 }}>Decided after visit</Text>

                </View>
                <View style={{alignItems:'center', marginVertical:15}}>
                <ButtonWithoutShadow
                                height={60}
                                backgroundColor={colors.ornageButton}
                                width={width-100}
                                borderRadius={8}
                                marginTop={0}
                                label="Pay"
                                labelColor={colors.white}
                                onAction={() => { }}
                                fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                                fontWeight={Platform.OS == 'ios' ? 'normal' : null}
                                fontSize={17}
                            />
                </View>
            </View>:
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 30, height: 50, alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                   <ButtonWithOutLine
                                height={60}
                                borderColor={colors.ornageButton}
                                // backgroundColor={colors.green}
                                width={(width-80)/2}
                                borderRadius={8}
                                marginTop={0}
                                label="Invite To Visit"
                                labelColor={colors.ornageButton}
                                onAction={() => { }}
                                fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                                fontWeight={Platform.OS == 'ios' ? 'normal' : null}
                                fontSize={17}
                            />
                   
                    <ButtonWithoutShadow
                                height={60}
                                backgroundColor={colors.green}
                                width={(width-80)/2}
                                borderRadius={8}
                                marginTop={0}
                                label="Hire"
                                labelColor={colors.white}
                                onAction={() => { }}
                                fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                                fontWeight={Platform.OS == 'ios' ? 'normal' : null}
                                fontSize={17}
                            />

            </View>
            }


        </View>
    )
}



export default ProviderReq



const styles = StyleSheet.create({
    serviceView: {
        height: 70,
        width: 70,



    },
    serviceCate: {
        width: width - 40,
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1.65,
        elevation: 1,
    },
    serviceImage: {
        // height: 40,

        borderRadius: 8,
        // backgroundColor: colors.ornageButton,
        width: (width / 3) - 20,
        height: (width / 3) - 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 3,
    },
    nameText: {
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',
        // color: colors.white,
        fontFamily: Platform.OS == 'ios' ? fonts.regular : fonts.regular,
        fontStyle: Platform.OS == 'ios' ? 'normal' : null,
        fontWeight: Platform.OS == 'ios' ? 'normal' : null
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
        fontFamily: Platform.OS == 'ios' ? fonts.regular : fonts.regular,
        fontStyle: Platform.OS == 'ios' ? 'normal' : null,
        fontWeight: Platform.OS == 'ios' ? 'normal' : null
    }
})

