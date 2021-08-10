import React, { Component } from 'react';
import { Image, Dimensions, View, TouchableOpacity, Text, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { colors, localImages, fonts, translate } from '../utils/constant'
import Icon from "react-native-vector-icons/MaterialIcons";
const { height, width } = Dimensions.get('window');
export default class Accordian extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillMount = ()=>{
    //  var arr =   this.state.data.map((item,indx)=> {
    //      return{ item,isSelect : false}
    //  })
        // this.setState({data : arr})
    }

    render() {

        return (
            <View style={{ marginBottom: 10, borderRadius: 8,alignSelf : "center" }}>
                <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand(index)}>
                    <Text style={this.state.expanded ?styles.title1 : styles.title}>{this.props.title}</Text>
                    <Image source={this.state.expanded ? localImages.up : localImages.down} style={{ borderRadius: 50, height: 14, width: 14, alignSelf: 'center' }}></Image>
                    {/* <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={colors.DARKGRAY} /> */}
                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    // <View style={{}}>
                    //     <FlatList
                    //         data={this.state.data}
                    //         numColumns={1}
                    //         scrollEnabled={false}
                    //         renderItem={({ item, index }) =>
                    //             <View>
                    //                 <TouchableOpacity style={[styles.childRow, item.value ? styles.btnActive : styles.btnInActive]} onPress={() => this.onClick(index)}>
                    //                     <Text style={[styles.font, styles.itemInActive]} >{item.key}</Text>
                    //                     {/* <Icon name={'check-circle'} size={24} color={item.value ? colors.GREEN : colors.LIGHTGRAY} /> */}
                    //                 </TouchableOpacity>
                    //                 {/* <View style={styles.childHr} /> */}
                    //             </View>
                    //         } />
                    // </View>
                    <View style = {styles.AccordianTextContainer}>
                        <Text style = {styles.accordianText}>{this.state.data}</Text>
                        </View>
                        
                }

            </View>
        )
    }

    onClick = (index) => {
        // const temp = this.state.data.slice()
        // temp[index].value = !temp[index].value
        // this.setState({ data: temp })
        // this.setState({data : this.state.data.map((item,ind)=> ind == index? {...item,value : true}:{...item,value : false})})
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 12,
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.regularRoman,
        color: colors.text,
        marginRight: 5
    },
    title1: {
        fontSize: 16,
        fontFamily: fonts.regularRoman,
        color: colors.blue,
        marginRight: 5
    },
    itemActive: {
        fontSize: 16,
        color: colors.faqAn,
        fontFamily: fonts.regularRoman,
        marginLeft: 20
    },
    itemInActive: {
        fontSize: 16,
        color: colors.faqAn,
        fontFamily: fonts.regularRoman,
        marginLeft: 20
    },
    btnActive: {
        borderColor: colors.GREEN,
    },
    btnInActive: {
        borderColor: colors.DARKGRAY,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 50,
        width: width - 40,
        paddingLeft: 15,
        marginLeft: 5,
        // marginBottom: 10,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: colors.authBackGroud,
        padding : 5
    },
    childRow: {
        flexDirection: 'row',
        width: width - 40,
        marginLeft: 5,
        paddingVertical: 10,
        justifyContent: 'space-between',
        backgroundColor: colors.white,
    },
    parentHr: {

        color: colors.white,
        width: '100%'
    },
    childHr: {
        height: 1,
        backgroundColor: colors.LIGHTGRAY,
        width: '100%',
    },
    colorActive: {
        borderColor: colors.GREEN,
    },
    colorInActive: {
        borderColor: colors.DARKGRAY,
    },
    AccordianTextContainer : {
        backgroundColor : colors.white,
        // // flex : 1,
        width: width - 70,
       alignSelf : "center",
       padding : 5
    },
    accordianText : {
        fontSize: 12,
        color: colors.black,
        fontFamily: fonts.regularRoman,
        padding : 13,
        lineHeight : 20,
        //marginLeft: 20
    }

});
