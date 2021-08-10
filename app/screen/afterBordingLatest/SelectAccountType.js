import React, { Component } from 'react'
import { SafeAreaView, View, Text, Dimensions, StyleSheet } from "react-native";
import { ButtonWithoutShadow, HeaderWithBack } from "../../component/Button";
import InputBox from '../../component/InputBox';
import { colors, fonts } from '../../utils/constant';
import { CustomStyles } from "../style/CustomStyles";
import RadioButtonAccordian from './../../component/RadioButtonAccordian'

const { height, width } = Dimensions.get("window")

class SelectAccountType extends Component {
    constructor(props) {
        super()
        this.state = {
            accountType: [
                { AccountType: "Individual", text: "hsdfjkhksjdf" },
                { AccountType: "Joint", text: "hsdfjkhksjdf" },
                { AccountType: "Retirement", text: "hsdfjkhksjdf" },
            ]
        }
    }


    render() {
        return <>
                <SafeAreaView style={CustomStyles.containerbording}>
                <HeaderWithBack backgroundColor={1} onActionLeft = {()=>this.props.navigation.navigate("WalkThrough")}/>
                    <View >

                        <Text style={{
                            color: colors.blue,
                            fontSize: 22,
                            fontFamily: fonts.bold,
                            marginTop: 20,
                            marginHorizontal: 40,
                            fontWeight: "600"
                        }}>
                            Select Account Type :
                    </Text>

                        <View style={styles.accordianTextContainer}>
                            <View style = {styles.accordianPadding}>
                                <RadioButtonAccordian  data = {this.state.accountType} ></RadioButtonAccordian>
                            </View>
                        </View>

                        <View style={{ marginHorizontal: 40, marginTop: 0 }}>
                        <ButtonWithoutShadow
                            width={width - 80}
                            height={43}
                            marginTop={22}
                            borderRadius={20}
                            labelColor={colors.white}
                            label="Next"
                            backgroundColor={colors.blue} 
                            onAction = {()=>this.props.navigation.navigate("FundYourAccount")}
                            />

                    </View>
                    </View>
                </SafeAreaView>
        </>
    }

}

const styles = StyleSheet.create({
    accordianTextContainer: {
        marginTop: 50,
        //flex : 1,
        height : "60%",
    },
    footerText: {
        //width: width - 40,
        height: 27,
        fontFamily: "SegoeUI",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 19,
        letterSpacing: 0,
        textAlign: "left",
        // marginTop:50,
        //marginStart:40,
        //marginEnd:40,
        color: "#72e2db",
        textAlign: "center"
    },
    accordianPadding: {
        paddingTop: 8,
        // paddingBottom : 4,

    },
    viewSeparator: {
        borderColor: "#707070",
        borderWidth: 0.3,
        width: "100%",
        alignSelf: "center"
    }
});

export default SelectAccountType