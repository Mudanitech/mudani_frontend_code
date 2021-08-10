import React, { Component } from 'react'
import { ImageBackground, ScrollView, StatusBar, Image, View, Text, SafeAreaView, Dimensions, Platform } from 'react-native'

import { CustomStyles, IntroStyles } from '../style/CustomStyles'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { colors, localImages, translate, fonts } from '../../utils/constant';
import Button from '../../component/Button';
import { actions } from "../../redux/reducer"
import { connect } from 'react-redux';
const { height, width } = Dimensions.get('window');
class IntroScreen extends Component {
    constructor(props) {
        super(props);
        // this.sharedClass = new SharedClass();
        this.state = {
            slider1ActiveSlide: 0,
            currentIndex: 0
        };

    }

    async componentDidMount() {


    }

    _onSkip = () => {
        this._carousel.snapToItem(3, false, true);
        this.setState({
            currentIndex: 3
        })
    }
    _renderItem = ({ item, index }) => {
        const { slider1ActiveSlide } = this.state;
        return (
            <View style={IntroStyles.sliderView}>
                <View style={slider1ActiveSlide == 3 ? IntroStyles.sliderImageView1 : IntroStyles.sliderImageView}>
                    <ImageBackground source={
                        slider1ActiveSlide == 0 ? localImages.wal2
                            : slider1ActiveSlide == 1 ? localImages.wal3
                                : slider1ActiveSlide == 2 ? localImages.wal4 : localImages.wal5


                    }


                        style={slider1ActiveSlide == 3 ? IntroStyles.image1 : IntroStyles.image}>


                    </ImageBackground>
                </View>
                <View style={slider1ActiveSlide == 3 ? IntroStyles.sliderCardView1 : IntroStyles.sliderCardView}>
                    {slider1ActiveSlide == 3 ? <Image source={localImages.logo} style={IntroStyles.logo}></Image> : null}
                    <Text style={IntroStyles.heading}>Hello welcome!</Text>
                    <Text style={IntroStyles.subtile}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.</Text>
                    {slider1ActiveSlide == 3 ? <Button
                        height={55}
                        backgroundColor={colors.greenColor}
                        width={width - 20}
                        borderRadius={8}
                        marginTop={20}
                        label="Start Now"
                        labelColor={colors.white}
                        onAction={() => {
                            this.props.setLoggedInUserType('guest')
                            this.props.setLoggedInUserStatus('home')
                        }}
                        fontSize={18}

                    ></Button> : null}
                </View>
            </View >
        );
    }




    render() {
        const { slider1ActiveSlide, currentIndex } = this.state;
        return (
            <View style={CustomStyles.container}>
                {slider1ActiveSlide != 3 ? <View style={{ position: 'absolute', top: 30, right: 10, zIndex: 999 }}>
                    <Button
                        height={60}
                        backgroundColor={colors.transparent2}
                        width={60}
                        borderRadius={8}
                        marginTop={0}
                        label="Skip"
                        labelColor={colors.white}
                        onAction={() => this._onSkip()}
                        fontSize={18}
                        fontFamily={fonts.regularRoman}
                    ></Button>
                </View> : null}
                {/* <SafeAreaView style={CustomStyles.mainContainer}> */}
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={[1, 2, 3, 4]}
                    renderItem={this._renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                    currentIndex={currentIndex}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                />
                {slider1ActiveSlide != 3 ? <View style={{ marginBottom: 30 }}>
                    <Pagination
                        dotsLength={3}
                        activeDotIndex={slider1ActiveSlide}
                        containerStyle={{ backgroundColor: colors.white }}
                        dotStyle={{
                            width: 20,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 8,
                            backgroundColor: colors.greenColor
                        }}
                        inactiveDotStyle={{
                            width: 25,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 8,
                            backgroundColor: colors.grayDot
                        }}

                    />

                </View> : null}
                {/* </SafeAreaView> */}
            </View>
        );
    }

}
const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUserAuthToken: token => {
            dispatch(actions.setLoggedInUserAuthToken(token));
        },
        setLoggedInUserDetails: userDetails => {
            dispatch(actions.setLoggedInUserDetails(userDetails));
        },
        setLoggedInUserStatus: loginStatus => {
            dispatch(actions.setLoggedInUserStatus(loginStatus));
        },
        setLoggedInUserType: loginType => {
            dispatch(actions.setLoggedInUserType(loginType));
        },
    };
};
const mapToProp = state => {
    return {
        // serverError: state.auth.error,
        // loading: state.auth.loading
    }
}

export default connect(mapToProp, mapDispatchToProps)(IntroScreen)

