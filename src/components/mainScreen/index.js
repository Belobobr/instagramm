import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Toolbar from '../Toolbar';
import Tabs from './../tabs';
import {STATUS_BAR_SIZE} from '../../constants/dimensions';
import HashTagTab from './HashTagTab';
import FavoritesTab from './FavoritesTab';
import ProfileTab from './ProfileTab';

const itemRoute = {
    type: 'push',
    route: {
        key: 'item',
        title: 'item'
    }
};

export default class MainScreen extends Component {

    render() {
        return <View style={styles.container}>
            <Toolbar style={styles.toolbar} title="Instagramm"/>
            <Tabs>
                <HashTagTab iconName='hashtag' title='hashtag' {...this.props}/>
                <FavoritesTab iconName='user' title='favorites' {...this.props}/>
                <ProfileTab iconName='user' title='profile' {...this.props}/>
            </Tabs>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    toolbar: {
        marginTop: STATUS_BAR_SIZE,
    },
    tabContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    tabBar: {
        elevation: 4,
    },
});
