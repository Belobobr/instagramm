import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {BOTTOM_BAR_HEIGHT} from '../../constants/dimensions'
import Tab from './BottomBarTab';

export default class Tabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.tabContainer}>
                {this.props.children[this.state.selected]}
            </View>
            <View style={styles.bottomBarContainer}>
                {this.props.children.map(this.tabs.bind(this))}
            </View>
        </View>
    }

    tabs(child, index) {
        return <Tab
            activeTab={index === this.state.selected}
            iconName={child.props.iconName}
            title={child.props.title}
            key={index}
            onPress={() => {
                this.setState({
                    selected: index,
                })
            }}
        />;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomBarContainer: {
        height: BOTTOM_BAR_HEIGHT,
        backgroundColor: '#FAFAFA',
        flexDirection: 'row'
    },
    tabContainer: {
        flex: 1,
    }
});




