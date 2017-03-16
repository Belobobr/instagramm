import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

const mainRoute = {
    type: 'push',
    route: {
        key: 'main',
        title: 'Main'
    }
};

export default class LoginScreen extends Component {

    componentDidMount() {
        // this.props.authorize(null, this.props.handleNavigate);
    }

    render() {
        return <View style={styles.container}>
            <View style={{flex: 1}}/>
            <Image
                style={styles.image}
                source={require('./../images/instragram_logo.png')}
            />
            <TouchableOpacity onPress={() => {
                this.props.authorize(this.props.handleNavigate);
            }}>
                <Text style={styles.signIn}>
                    SIGN IN
                </Text>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <Text style={styles.usageTerms}>
                When sign in, you agree to accept and be bound by these terms and conditions.
            </Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    signIn: {
        fontSize: 16,
        textAlign: 'center',
        margin: 20,
        color: '#2196F3'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    image: {},
    usageTerms: {
        fontSize: 14,
        alignSelf: 'flex-end',
        textAlign: 'center',
        margin: 16
    }
});
