import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

export default class SplashScreen extends Component {

    componentDidMount() {
        this.props.initApp(this.props.handleNavigate);
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




