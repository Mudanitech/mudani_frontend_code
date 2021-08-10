import React, { Component } from 'react'
import { SafeAreaView, View, Text, Dimensions, StyleSheet,Image ,TouchableOpacity,ScrollView} from "react-native";
import { ButtonWithoutShadow, HeaderWithBack } from "../../component/Button";
import InputBox from '../../component/InputBox';
import { colors, fonts ,localImages} from '../../utils/constant';
import { CustomStyles } from "../style/CustomStyles";
import RadioButtonAccordian from './../../component/RadioButtonAccordian'

const { height, width } = Dimensions.get("window")

class HelpMeDecide extends Component {
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
                <HeaderWithBack backgroundColor={1} Header = {"Help Me Decide"} labelStyle = {styles.labelStyle} />
                <ScrollView style = {{flexGrow : 1}}>
                {/* <Image
                    source={ localImages.basket}
                    style={{
                     // borderRadius: 50,
                      height: 156,
                      width: 156,
                      alignSelf: 'center',
                    }}></Image> */}
               
                    
                    <View  style = {{alignSelf : "center"}}>
                    <Text numberOfLines = {2} style={{
                            color: colors.blue,
                            fontSize: 16,
                            fontFamily: fonts.bold,
                           marginTop: 48,
                            // marginHorizontal: 40,
                            fontWeight: "600",
                           textAlign  : "center",
                            lineHeight : 21,
                            width : width - 140,
                            alignSelf :"center"
                        }}>Based on your answer we are
                        Suggesting you</Text>
                    <View>
                <Image
                    source={ localImages.self_directed_account}
                    style={{
marginTop : 57.3,
                        height: 99.6,
                      width: 99.6,
                      alignSelf: 'center',
                      resizeMode : "stretch"
                    }}></Image>
                </View>
                        <Text style={{
                            color: colors.black,
                            fontSize: 29,
                            fontFamily: fonts.bold,
                            marginTop: 48,
                           // marginHorizontal: 40,
                            fontWeight: "600",
                            textAlign  : "center",
                            lineHeight : 38,
                        }}>Self-Directed Account</Text>
                        
                        {/* <Text style={{
                            color: colors.black,
                            fontSize: 13,
                            fontFamily: fonts.bold,
                            marginTop: 13,
                            marginHorizontal: 40,
                            fontWeight: "600",
                            textAlign  : "center"
                        }}>Link your account through plaid</Text> */}

                        {/* <View style = {styles.textContainer}>
                                <Text style = {styles.btnText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat sit amet elementum. Donec efficitur justo vitae molestie feugiat. Pellentesque vestibulum velit id lectus varius vehicula. Sed lorem mi, blandit ultrices ultrices in, sodales id ex. </Text>
                        </View> */}
                        
                        <View style={{ marginHorizontal: 40, marginTop: 103 }}>
                        <ButtonWithoutShadow
                            width={width - 80}
                            height={43}
                            marginTop={22}
                            borderRadius={20}
                            labelColor={colors.white}
                            label="Continue as Self-Directed Account"
                            backgroundColor={colors.blue} 
                            onAction = {()=>this.props.navigation.navigate("SelectAccountType")}
                            />

                    </View>
                    <View style={{ marginHorizontal: 40, marginTop: 10 ,marginBottom : 50}}>
                        <ButtonWithoutShadow
                            width={width - 80}
                            height={43}
                            marginTop={22}
                            borderRadius={20}
                            labelColor={colors.blue}
                            label="Back to Selection Screen"
                            backgroundColor={colors.light_blue} 
                            onAction = {()=>this.props.navigation.navigate("WalkThrough")}
                            />

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
    footerText: {
        //width: width - 40,
        height: 27,
        fontFamily: fonts.regular,
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
    },
    createBasketBtn : {
        alignSelf : "center",
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        marginTop : 55
    },
    createBasketBtn1 : {
        alignSelf : "center",
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        marginTop : 29,
        width : "80%"
    },
    btnInsideView : {
        backgroundColor : "#e0eef8",
        height : 30,
        width : 30,
        borderRadius : 50,
        alignItems : "center",
        justifyContent : "center",
        marginRight : 14,
        
    },
    circleText : {
        fontSize : 15, 
        color : "#2b8ecd",
        fontFamily: fonts.regular,
    },
    btnText : {
        fontSize : 14, 
        color : colors.black,
        fontFamily: fonts.regular,
        lineHeight : 20,
       
       textAlign : "center"
    },
    textContainer : {
       //width : width -46,
        // alignSelf : "center",
        marginLeft :46,
        marginRight :46,
        marginTop : 16,
        // alignSelf : "center",
       
    },
   labelStyle:  {
        color: colors.black,
        fontSize: 18,
        fontFamily: fonts.bold,
       // marginTop: 48,
        marginHorizontal: 40,
        fontWeight: "600",
        textAlign  : "center"
    }
});

export default HelpMeDecide