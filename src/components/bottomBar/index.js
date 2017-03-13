import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {BOTTOM_BAR_HEIGHT} from '../../constants/dimensions'
import Tab from '../tabs/BottomBarTab';

export default class BottomBar extends Component {

    componentDidMount() {
    }

    render() {
        return <View style={styles.container}>
            {this.props.tabs.map((tab, i) => {
                return <Tab iconName={tab.iconName} title={tab.title} key={i}/>;
            })}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        height: BOTTOM_BAR_HEIGHT,
        backgroundColor: '#FAFAFA',
        flexDirection: 'row'
    },
});




