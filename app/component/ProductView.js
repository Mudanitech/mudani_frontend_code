import React from 'react'
import { colors, fonts, localImages } from '../utils/constant'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { AddButton, AddButtonMyCart, SkuButton, ButtonWithoutShadow } from './Button'
const { width } = Dimensions.get('window');
import Tooltip from 'react-native-walkthrough-tooltip';

const data = {
    sku: [{
        skuMesure: '500g',
        mrp: 300,
        price: 200,
        discount: 10
    },
    ]
}

const ProductView = (props) => {

    return (
        <View style={{ ...styles.ProductView, width: (width / 2) - 30 }} >

            <TouchableOpacity style={{ backgroundColor: colors.greenProduct }} onPress={() => props.onProduct()}>
                <Image source={{ uri: props.productData.image[0] }} style={{ marginTop: 5, borderRadius: 8, height: 100, width: 100, alignSelf: 'center' }}></Image>

                {props.productData.fav ? <TouchableOpacity onPress={() => props.onFav()} style={{ position: 'absolute', right: 10, top: 10, backgroundColor: colors.white, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={localImages.heartfill} style={{ height: 10, width: 10 }}></Image>

                </TouchableOpacity> : <TouchableOpacity onPress={() => props.onFav()} style={{ position: 'absolute', right: 10, top: 10, backgroundColor: colors.white, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={localImages.heart} style={{ height: 10, width: 10 }}></Image>

                    </TouchableOpacity>
                }
                <View style={{ position: 'absolute', right: 10, bottom: 10, backgroundColor: colors.white, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Tooltip
                        isVisible={props.productData.toolTipVisible}
                        content={<Text>{props.productData.post_excerpt}</Text>}
                        placement="left"
                        onClose={() => props.onToolTip()}
                    >
                        <TouchableOpacity onPress={() => props.onToolTip()}>
                            <Image source={localImages.info} style={{ height: 20, width: 20 }}></Image>
                        </TouchableOpacity>
                    </Tooltip>


                </View>


            </TouchableOpacity>
            <View>
                <TouchableOpacity onPress={() => props.onProduct()}>
                    <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.headingColor, fontSize: 12, lineHeight: 15 }}>{props.productData.post_title}</Text>
                </TouchableOpacity>
                {/* <SkuButton
                    height={30}
                    backgroundColor={colors.ornageButton}
                    width={60}
                    borderRadius={8}
                    marginTop={10}
                    label="Add"
                    labelColor={colors.white}
                    onAction={() => { }}
                    fontSize={15}
                    data={props.productData}
                    fontFamily={Platform.OS == 'ios' ? fonts.regularRoman : fonts.regularRoman}
                    fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                    fontWeight={Platform.OS == 'ios' ? 'normal' : null}>
                </SkuButton> */}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...styles.mrp, color: colors.greenColor, fontSize: 12, marginLeft: 10 }}>AED{props.productData.price}</Text>
                <Text style={{ ...styles.nameText, color: colors.grayColor, marginLeft: 5, fontSize: 8, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>AED{props.productData.regular_price}</Text>
            </View>
            {!props.hideAdd ? <View style={{ alignItems: 'center' }}>
                <AddButton

                    height={30}
                    backgroundColor={colors.greenColor}
                    width={30}
                    borderRadius={4}
                    marginTop={10}
                    marginBottom={20}
                    label="Add"
                    labelColor={colors.white}
                    addProduct={() => { props.addProduct() }}
                    quantityDesc={() => { props.quantityDesc() }}
                    quantityInc={() => { props.quantityInc() }}
                    fontSize={15}
                    outofStock={props.productData.outofStock}
                    data={props.productData.quantity ? props.productData.quantity : 0}
                    fontFamily={Platform.OS == 'ios' ? fonts.regularRomanRoman : fonts.regularRomanRoman}
                >

                </AddButton>
            </View> : null}

        </View>
    )
}


export const ProductViewHorizontal = (props) => {


    return (
        <View style={styles.ProductView} >
            <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: colors.green, minHeight: 30, borderTopLeftRadius: 15, borderBottomRightRadius: 15, borderTopRightRadius: 15, justifyContent: 'center' }}>
                    <Text style={{ ...styles.nameText, marginHorizontal: 10 }}>10 % off</Text>

                </View>
                <View style={{ position: 'absolute', right: 5 }}>
                    <Image source={localImages.fav_s} style={{ height: 30, width: 30 }}></Image>

                </View>

            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => props.onProduct()}>
                    <Image source={localImages[props.productData.image]} style={{ height: 100, width: 100, alignSelf: 'center' }}></Image>
                    {props.productData.outofStock ? <View style={{ position: 'absolute', top: 30, left: 10, backgroundColor: colors.outOfStock, opacity: .7 }}>
                        <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.red, fontSize: 17, }}>Sold Out</Text>
                    </View> : null}
                </TouchableOpacity>
                <View>
                    <TouchableOpacity onPress={() => props.onProduct()}>
                        <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.backText, fontSize: 17 }}>{props.productData.name}({props.productData.name_hi})</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <SkuButton

                                height={30}
                                backgroundColor={colors.ornageButton}
                                width={60}
                                borderRadius={8}
                                marginTop={10}
                                label="Add"
                                labelColor={colors.white}
                                onAction={() => { }}
                                fontSize={15}
                                data={props.productData}
                                fontFamily={Platform.OS == 'ios' ? fonts.regularRoman : fonts.regularRoman}
                                fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                                fontWeight={Platform.OS == 'ios' ? 'normal' : null}>

                            </SkuButton>

                            <Text style={{ ...styles.mrp, color: colors.backText, fontSize: 17 }}>₹{props.productData.showPrice}</Text>
                            <Text style={{ ...styles.nameText, color: colors.grayColor, fontSize: 17, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>₹{props.productData.actualPrice}</Text>

                        </View>

                    </View>
                </View>

            </View>

            <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
                <AddButton

                    height={30}
                    backgroundColor={colors.ornageButton}
                    width={60}
                    borderRadius={4}
                    marginTop={10}
                    label="Add"
                    labelColor={colors.white}
                    onAction={() => { }}
                    fontSize={15}
                    outofStock={props.productData.outofStock}
                    data={props.productData.quantity}
                    fontFamily={Platform.OS == 'ios' ? fonts.regularRoman : fonts.regularRoman}
                    fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                    fontWeight={Platform.OS == 'ios' ? 'normal' : null}>

                </AddButton>
            </View>


        </View>
    )
}

export const ProductViewMyCart = (props) => {

    console.log(props.productData)
    return (
        <View style={{ marginBottom: 5 }} >
            <View style={{ width: width - 40, backgroundColor: colors.white, flexDirection: 'row' }}>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <Image source={{ uri: props.productData.image[0] }} style={{ borderRadius: 50, height: 100, width: 100, alignSelf: 'center' }}></Image>
                </View>
                <View style={{ width: width - 150 }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ marginRight: 20, marginTop: 10 }} onPress={() => props.onRemove()}>
                            <Image source={localImages.cancel} style={{ height: 15, width: 15, }}></Image>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => props.onProduct()}>
                        <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.text, fontSize: 16, fontFamily: fonts.whitneybook }}>{props.productData.post_title}</Text>
                    </TouchableOpacity>
                    <Text style={{ ...styles.mrp, color: colors.greenColor, fontSize: 14, marginLeft: 10, fontFamily: fonts.whitneybook }}>AED{props.productData.price}</Text>
                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={{ marginRight: 20 }}>
                            <AddButtonMyCart

                                height={30}
                                backgroundColor={colors.greenColor}
                                width={30}
                                borderRadius={4}
                                marginTop={10}
                                marginBottom={20}
                                label="Add"
                                labelColor={colors.white}
                                addProduct={() => { props.addProduct() }}
                                quantityDesc={() => { props.quantityDesc() }}
                                quantityInc={() => { props.quantityInc() }}
                                fontSize={15}
                                outofStock={props.productData.outofStock}
                                data={props.productData.quantity}
                                fontFamily={Platform.OS == 'ios' ? fonts.regularRomanRoman : fonts.regularRomanRoman}
                            >

                            </AddButtonMyCart>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}

export const ProductViewReview = (props) => {

    console.log(props.productData)
    return (
        <View style={{ marginBottom: 10 }} >
            <View style={{ width: width - 40, backgroundColor: colors.white, flexDirection: 'row', borderRadius: 8 }}>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <Image source={props.productData.productImages[0].image} style={{ borderRadius: 50, height: 100, width: 100, alignSelf: 'center' }}></Image>
                </View>
                <View style={{ width: width - 150, justifyContent: 'center' }}>

                    <TouchableOpacity onPress={() => props.onProduct()}>
                        <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.text, fontSize: 14, fontFamily: fonts.semiBold }}>{props.productData.productName}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...styles.mrp, color: colors.greenColor, fontSize: 12, marginLeft: 10 }}>AED{(props.productData.showPrice).toFixed(2)}</Text>
                        <Text style={{ ...styles.nameText, color: colors.grayColor, marginLeft: 5, fontSize: 8, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>AED{(props.productData.actualPrice).toFixed(2)}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={{ marginRight: 20 }}>
                            <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.text, fontSize: 16, fontFamily: fonts.semiBold }}>Qty -  {props.productData.quantity}</Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}

export const ProductViewOrderDetails = (props) => {



    return (
        <View style={{}} >

            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Image source={localImages[props.productData.image]} style={{ height: 100, width: 100, alignSelf: 'center' }}></Image>

                </View>
                <View>
                    <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.backText, fontSize: 17 }}>{props.productData.name}({props.productData.name_hi})</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <SkuButton

                                height={30}
                                backgroundColor={colors.ornageButton}
                                width={60}
                                borderRadius={8}
                                marginTop={10}
                                label="Add"
                                labelColor={colors.white}
                                onAction={() => { }}
                                fontSize={15}
                                data={props.productData}
                                fontFamily={Platform.OS == 'ios' ? fonts.regularRoman : fonts.regularRoman}
                                fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                                fontWeight={Platform.OS == 'ios' ? 'normal' : null}>

                            </SkuButton>

                            {/* <Text style={{ ...styles.mrp, marginHorizontal: 10, color: colors.backText, fontSize: 17 }}>₹{props.productData.sku[0].price}</Text> */}
                            <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.grayColor, fontSize: 17, }}>₹{props.productData.sku[0].mrp}</Text>

                        </View>

                    </View>
                </View>

            </View>



        </View>
    )
}
export const OrderHistory = (props) => {



    return (
        <TouchableOpacity onPress={() => { props.onSelectCate() }} style={{ marginBottom: 5 }} >
            <View style={{ width: width - 40, backgroundColor: colors.white, flexDirection: 'row', borderRadius: 8 }}>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <Image source={props.productData.image} style={{ borderRadius: 50, height: 100, width: 100, alignSelf: 'center' }}></Image>
                </View>
                <View style={{ width: width - 200, justifyContent: 'center' }}>


                    <Text style={{ ...styles.nameText, color: colors.text, fontSize: 14, fontFamily: fonts.semiBold }}>{props.productData.orderId}</Text>
                    <Text style={{ ...styles.nameText, color: colors.text, fontSize: 14, fontFamily: fonts.semiBold }}>{props.productData.title}</Text>
                    <Text style={{ ...styles.nameText, color: colors.greenColor, fontSize: 14, fontFamily: fonts.semiBold }}>{props.productData.price}</Text>


                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Image source={localImages.arrowright} style={{ height: 15, width: 9, alignSelf: 'center' }}></Image>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export const AddressView = (props) => {

    console.log(props.productData)
    return (
        <View style={{ marginBottom: 15, backgroundColor: colors.white, borderRadius: 5 }} >
            <View style={{ flexDirection: 'row', width: width - 40, marginTop: 15 }}>
                <TouchableOpacity onPress={() => props.onDefault()}>
                    <Image source={props.addressData.default ? localImages.select_mark : localImages.unselect} style={{ height: 20, width: 20, marginLeft: 15 }}></Image>
                </TouchableOpacity>

                <View>
                    <Text style={{ color: colors.text, fontFamily: fonts.semiBold, fontSize: 18, marginLeft: 20 }}>{props.addressData.title}</Text>
                    <Text style={{ color: colors.grayColor, fontFamily: fonts.semiBold, fontSize: 16, marginLeft: 20, marginRight: 20 }}>{props.addressData.address}</Text>
                    <View style={{ width: width - 100, flexDirection: 'row', marginLeft: 20, justifyContent: 'space-between', marginVertical: 10 }}>
                        <ButtonWithoutShadow
                            height={40}
                            backgroundColor={props.addressData.default ? colors.lightGreen : colors.deleteButton}
                            width={100}
                            borderRadius={5}
                            fontFamily={fonts.semiBold}
                            fontSize={18}
                            labelColor={props.addressData.default ? colors.greenColor : colors.headingColor}
                            label="Edit"
                            onAction={() => props.onEdit()}
                        />
                        <ButtonWithoutShadow
                            height={40}
                            backgroundColor={colors.deleteButton}
                            width={100}
                            borderRadius={5}
                            fontFamily={fonts.semiBold}
                            fontSize={18}
                            labelColor={colors.headingColor}
                            label="Delete"
                            onAction={() => props.onDelete()}
                        />
                    </View>
                </View>

            </View>
        </View>
    )
}


export const NotificationView = (props) => {

    console.log(props.productData)
    return (
        <View style={{ marginBottom: 10 }} >
            <View style={{ width: width - 40, backgroundColor: colors.white, flexDirection: 'row' }}>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <Image source={props.productData.image} style={{ borderRadius: 50, height: 100, width: 100, alignSelf: 'center' }}></Image>
                </View>
                <View style={{ width: width - 150, justifyContent: 'center' }}>

                    <View onPress={() => props.onProduct()} style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>
                        <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.text, fontSize: 14, fontFamily: fonts.bold }}>{props.productData.title}</Text>
                        <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.grayColor, fontSize: 14, fontFamily: fonts.regularRoman }}>{props.productData.time}</Text>
                    </View>
                    <View onPress={() => props.onProduct()} style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>
                        <Text style={{ ...styles.nameText, marginHorizontal: 10, color: colors.grayColor, fontSize: 14, fontFamily: fonts.regularRoman }}>{props.productData.descrption}</Text>
                    </View>


                </View>
            </View>
        </View>
    )
}


export default ProductView



const styles = StyleSheet.create({
    ProductView: {
        // width: (width / 2) - 30,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 15,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        //elevation: 8,
        // paddingBottom: 10
    },
    categoryButton: {
        height: 40,
        borderRadius: 8,
        backgroundColor: colors.ornageButton,
        width: (width / 3) - 30,
        marginTop: -30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameText: {

        // textAlign: 'center',
        color: colors.white,
        // marginTop: 5,
        fontFamily: Platform.OS == 'ios' ? fonts.bold : fonts.bold,

    },
    mrp: {

        // textAlign: 'center',
        color: colors.white,
        // marginTop: 5,
        fontFamily: Platform.OS == 'ios' ? fonts.bold : fonts.bold,

    }

})

