import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {PRIMARY_COLOR} from '../constants/colors';
import {CARD_ELEVATION, CONTENT_MARGIN, FLOATING_BUTTON_SIZE, ICON_SIZE} from '../constants/dimensions'

export default class FloatingButton extends Component {
    render() {
        return <View style={styles.container}>
            <TouchableOpacity onPress={this.props.onPress}>
                <Image
                    style={styles.icon}
                    source={require('./../images/icon_plus.png')}
                />
            </TouchableOpacity>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        borderRadius: FLOATING_BUTTON_SIZE / 2,
        right: CONTENT_MARGIN,
        bottom: CONTENT_MARGIN,
        backgroundColor: PRIMARY_COLOR,
        width: FLOATING_BUTTON_SIZE,
        height: FLOATING_BUTTON_SIZE,
        elevation: CARD_ELEVATION,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        margin: CONTENT_MARGIN,
    },
});




