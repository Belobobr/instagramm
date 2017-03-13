import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import {ACCESS_TOKEN} from '../actions/session';

export default class SplashScreen extends Component {

    componentDidMount() {
        AsyncStorage.getItem(ACCESS_TOKEN).then((accessToken) => {
            if (accessToken != null) {
                this.props.authorize(accessToken, this.props.handleNavigate);
            } else {
                this.props.unAuthorize(this.props.handleNavigate);
            }
        });
    }

    render() {
        return <View style={styles.container}>
            <ActivityIndicator indeterminate={true} size='large'/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    }
});




