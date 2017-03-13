import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {PRIMARY_COLOR} from '../constants/colors';
import {BUTTON_HEIGHT} from '../constants/dimensions';

export default ({title, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        height: BUTTON_HEIGHT,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'white'
    }
});