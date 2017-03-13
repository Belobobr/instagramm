import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import {ANDROID_TOOLBAR_SIZE, ICON_SIZE, HORIZONTAL_CONTENT_MARGIN} from '../constants/dimensions';

export default class Toolbar extends Component {

    render() {
        return <View style={[styles.container, this.props.style]}>
            {this.props.icon && <TouchableOpacity onPress={this.props.onIconClicked}>
                <Image
                    style={styles.icon}
                    source={this.props.icon}
                />
            </TouchableOpacity>}
            <Text style={styles.title}>
                {this.props.title}
            </Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: ANDROID_TOOLBAR_SIZE,
        backgroundColor: '#FAFAFA',
    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        color: '#000000',
        margin: HORIZONTAL_CONTENT_MARGIN,
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        marginLeft: HORIZONTAL_CONTENT_MARGIN,
        marginRight: HORIZONTAL_CONTENT_MARGIN,
    }
});
