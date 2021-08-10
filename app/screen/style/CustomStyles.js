import { Dimensions, StyleSheet, Platform } from 'react-native';
import { colors, fonts, localImages } from '../../utils/constant'

const { height, width } = Dimensions.get('window');

export const CustomStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
    },
    containerbording: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.authBackGroud,
    },
    dashboardBoarding: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.dashboard_color,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.authBackGroud,
    },
    mainContainerBording: {
        flex: 1,
        backgroundColor: colors.authBackGroud,
    },
    scrollview: {
        flexGrow: 1,

    },
    mainContent: {
        flexGrow: 1,
        padding: 10,
    },
    sliderView: {
        width: width,
        height: height,
        // backgroundColor: 'green'
    },
   subLabel :  {
        width: width - 40,
        fontFamily: fonts.regular,
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 20,
        letterSpacing: 0,
        marginTop: 20,
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'left',
        color: '#082b3c',
      }

});

export const IntroStyles = StyleSheet.create({

    sliderView: {
        width: width,
        height: height,
        // backgroundColor: 'green'
    },
    sliderImageView: {
        height: (height / 3) * 2.1,
        backgroundColor: 'green'
    },
    sliderCardView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: -50,
        borderTopRightRadius: 50,
        height: (height / 3) * .8,
        backgroundColor: '#fff',
    },
    image: {
        height: (height / 3) * 2.1,
        width: width
    },

    sliderImageView1: {
        height: (height / 3) * 1.5,
        backgroundColor: 'green'
    },
    sliderCardView1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: -50,
        borderTopRightRadius: 50,
        height: (height / 3) * 1.55,
        backgroundColor: '#fff',
    },
    image1: {
        height: (height / 3) * 1.5,
        width: width,
        backgroundColor: colors.white
    },


    heading: {
        fontFamily: fonts.extraBold,

        color: colors.headingColor,
        fontSize: 30,
        textAlign: 'center'
    },
    subtile: {
        fontFamily: fonts.regularRoman,
        marginTop: 20,
        color: colors.grayColor,
        fontSize: 18,
        textAlign: 'center'
    },
    logo: {

        width: width - 60,
        height: (width - 60) * .44
    }


});