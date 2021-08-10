import React, { Component } from 'react'
import { SafeAreaView, View, Text, Dimensions, StyleSheet,Image ,TouchableOpacity,ScrollView} from "react-native";
import { ButtonWithoutShadow, HeaderWithBack } from "../../component/Button";
import InputBox from '../../component/InputBox';
import { colors, fonts ,localImages} from '../../utils/constant';
import { CustomStyles } from "../style/CustomStyles";
import RadioButtonAccordian from './../../component/RadioButtonAccordian'
import {hp, wp} from '../../utils/responsive';

const { height, width } = Dimensions.get("window")

class RecurringDeposit extends Component {
    


    render() {
        return <>

                <SafeAreaView style={CustomStyles.dashboardBoarding}>
                <HeaderWithBack backgroundColor={1} Header = {"Recurring Deposit"} labelStyle = {styles.labelStyle} />
                <ScrollView style = {{flexGrow : 1}}>
                    <View  style = {{alignSelf : "center"}}>
                    <View>
                <Image
                    source={ localImages.choose_a_plan_icon}
                    style={{
                      height: 146,
                      width: 95.5,
                      alignSelf: 'center',
                      resizeMode : "contain",
                      marginTop : hp("23.38%")
                    }}></Image>
                </View>
                        <Text style={{
                            color: colors.black,
                            fontSize: wp("5.33%"),
                            fontFamily: fonts.bold,
                            marginTop: hp("8.24%"),
                            // marginHorizontal: 40,
                            fontWeight: "600",
                            textAlign  : "center",
                            lineHeight : 27
                        }}>Automatic Deposit</Text>
                        
                        <View style={{ marginTop: hp("43.77%") ,marginBottom : 50}}>
                        <ButtonWithoutShadow
                            width={width - 150}
                            height={55}
                            marginTop={22}
                            borderRadius={20}
                            labelColor={colors.white}
                            label="Continue"
                            backgroundColor={colors.blue} />

                    </View>
                    </View>
                    </ScrollView>
                </SafeAreaView>
        </>
    }

}

const styles = StyleSheet.create({
    accordianTextContainer: {
        marginTop: 166,
        //flex : 1,
        // height : "60%",
        alignSelf : "center",
        marginBottom : 23
    },

    labelStyle:  {
        color: colors.black,
        fontSize: 18,
        fontFamily: fonts.bold,
        marginHorizontal: 40,
        fontWeight: "600",
        textAlign  : "center"
    }
});

export default RecurringDeposit