import React, { Component } from 'react';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";



import { colors } from './constant'
class SharedClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelShow: false
        }

    }
    static navigationOptions = {
        header: null

    }

    HideSnakBar() {
    }

    ShowSnakBar({ message, type, delay }) {



        setTimeout(() => {
            showMessage({
                message: 'Alert',
                description: message,
                type: type
                // text: message,
                // // duration: Snackbar.LENGTH_SHORT,
                // backgroundColor: type == 'success' ? colors.success : type == 'error' ? colors.error : colors.warning, // background color
                // textColor: type == 'success' ? colors.white : type == 'error' ? colors.white : colors.inputTextColor,// text color
            });
        }, delay ? delay : 500)


    }


}
export default SharedClass

