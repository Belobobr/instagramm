import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
} from 'react-native';
import {LoginButton} from 'react-native-fbsdk';
import {CONTENT_MARGIN, HORIZONTAL_CONTENT_MARGIN} from '../../constants/dimensions';

export default class ProfileTab extends Component {

    componentDidMount() {
        this.props.loadProfile();
    }

    render() {
        const profile = this.props.profile.data;
        const content = <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={{uri: profile.profile_picture}}
            />
            <View style={styles.descriptionContainer}>
                <Text style={styles.fieldDescription}>{'Username'}</Text>
                <Text style={styles.userName}>{profile.username}</Text>
                <Text style={styles.fieldDescription}>{'Full name'}</Text>
                <Text style={styles.fullName}>{profile.full_name}</Text>
            </View>
        </View>;

        const loading = <View style={styles.loading}>
            <ActivityIndicator/>
        </View>;

        return this.props.profile.loading ? loading : content;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    avatar: {
        marginTop: CONTENT_MARGIN,
        marginLeft: HORIZONTAL_CONTENT_MARGIN,
        marginRight: HORIZONTAL_CONTENT_MARGIN,
        height: 320,
    },
    fieldDescription: {
        fontSize: 12,
        color: '#000a',
    },
    userName: {
        fontSize: 16,
        color: '#000',
    },
    fullName: {
        fontSize: 16,
        color: '#000',
    },
    descriptionContainer: {
        marginTop: CONTENT_MARGIN,
        marginLeft: HORIZONTAL_CONTENT_MARGIN,
        marginRight: HORIZONTAL_CONTENT_MARGIN,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});




