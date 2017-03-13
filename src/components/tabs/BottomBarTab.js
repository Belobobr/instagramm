import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {BOTTOM_BAR_HEIGHT, ICON_SIZE, BOTTOM_BAR_ICON_TOP_MARGIN} from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

const ACTIVE_TAB_COLOR = '#2196F3';
const INACTIVE_TAB_COLOR = 'rgba(0, 0, 0, 0.54)';

export default class Tab extends Component {

    componentDidMount() {
    }

    render() {
        return <View style={styles.container}>
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Icon
                        style={styles.icon}
                        name={this.props.iconName}
                        size={ICON_SIZE}
                        color={this.props.activeTab ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
                    />
                    <Text style={[styles.title, {color: this.props.activeTab ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}]}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        height: BOTTOM_BAR_HEIGHT,
        flex: 1,
        alignItems: 'center'
    },
    icon: {
        marginTop: BOTTOM_BAR_ICON_TOP_MARGIN,
        width: ICON_SIZE,
        height: ICON_SIZE
    },
    title: {
        fontSize: 14,
        color: '#000000',
    },
});




